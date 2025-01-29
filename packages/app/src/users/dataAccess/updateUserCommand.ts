import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import _ from "lodash";
import { UserDto } from "open-telemetry-example-dtos";
import { UserEntity, UserOutboxEntity } from "open-telemetry-example-entities";
import { DataSource, EntityManager } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

import {
  UserEntityToUserDtoMapper,
  UserEntityToUserOutboxDtoMapper,
} from "../mappers";

export interface IUpdateUserCommandOptions {
  readonly userId: string;
  readonly userVersion: number;

  readonly payload: QueryDeepPartialEntity<UserEntity>;
}

@Injectable()
export class UpdateUserCommand {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly userEntityToUserDtoMapper: UserEntityToUserDtoMapper,
    private readonly userEntityToUserOutboxDtoMapper: UserEntityToUserOutboxDtoMapper,
  ) {}

  public execute(options: IUpdateUserCommandOptions): Promise<UserDto> {
    return this.dataSource.transaction((entityManager) =>
      this.executeTransaction(entityManager, options),
    );
  }

  private async executeTransaction(
    entityManager: EntityManager,
    options: IUpdateUserCommandOptions,
  ): Promise<UserDto> {
    const userRepository = entityManager.getRepository(UserEntity);

    const userOutboxRepository = entityManager.getRepository(UserOutboxEntity);

    const updateResult = await userRepository
      .createQueryBuilder()
      .update()
      .set(options.payload)
      .whereEntity({ userId: options.userId } as UserEntity)
      .where({
        userId: options.userId,
        userVersion: options.userVersion,
      })
      .returning(UserEntity.columns)
      .execute();

    if (updateResult.affected === 0) {
      throw new ConflictException(
        "version conflict when updating user",
        "BYS_409",
      );
    }

    if (!_.isNil(updateResult.affected) && updateResult.affected > 1) {
      throw new InternalServerErrorException("updated more than 1 user");
    }

    const [updatedEntity] = updateResult.generatedMaps as UserEntity[];

    const now = new Date();

    await userOutboxRepository.insert({
      entity: this.userEntityToUserOutboxDtoMapper.map(updatedEntity),
      timestamp: now,
    });

    return this.userEntityToUserDtoMapper.map(updatedEntity);
  }
}
