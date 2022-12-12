import { TracingService } from "@byndyusoft/nest-opentracing";
import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

import { UserDto } from "ᐸDtosᐳ";
import { UserEntity, UserOutboxEntity } from "ᐸEntitiesᐳ";

import {
  UserEntityToUserDtoMapper,
  UserEntityToUserOutboxDtoMapper,
} from "../mappers";

export interface ICreateUserCommandOptions {
  readonly payload: QueryDeepPartialEntity<UserEntity>;
}

@Injectable()
export class CreateUserCommand {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly tracingService: TracingService,
    private readonly userEntityToUserDtoMapper: UserEntityToUserDtoMapper,
    private readonly userEntityToUserOutboxDtoMapper: UserEntityToUserOutboxDtoMapper,
  ) {}

  public execute(options: ICreateUserCommandOptions): Promise<UserDto> {
    return this.tracingService.traceAsyncFunction(CreateUserCommand.name, () =>
      this.dataSource.transaction((entityManager) =>
        this.executeTransaction(entityManager, options),
      ),
    );
  }

  private async executeTransaction(
    entityManager: EntityManager,
    options: ICreateUserCommandOptions,
  ): Promise<UserDto> {
    const userRepository = entityManager.getRepository(UserEntity);

    const userOutboxRepository = entityManager.getRepository(UserOutboxEntity);

    const insertResult = await userRepository
      .createQueryBuilder()
      .insert()
      .values(options.payload)
      .returning(UserEntity.columns)
      .execute();

    const [insertedEntity] = insertResult.generatedMaps as UserEntity[];

    const now = new Date();

    await userOutboxRepository.insert({
      entity: this.userEntityToUserOutboxDtoMapper.map(insertedEntity),
      timestamp: now,
    });

    return this.userEntityToUserDtoMapper.map(insertedEntity);
  }
}
