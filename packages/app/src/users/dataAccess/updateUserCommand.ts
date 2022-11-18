/*
 * Copyright 2021 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TracingService } from "@byndyusoft/nest-opentracing";
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import _ from "lodash";

import { UserDto } from "ᐸDtosᐳ";
import { UserEntity, UserOutboxEntity } from "ᐸEntitiesᐳ";

import {
  UserEntityToUserDtoMapper,
  UserEntityToUserOutboxDtoMapper,
} from "../mappers";

import { DataSource, EntityManager, QueryDeepPartialEntity } from "./dataSource";

export interface IUpdateUserCommandOptions {
  readonly userId: string;
  readonly userVersion: number;

  readonly payload: QueryDeepPartialEntity<UserEntity>;
}

@Injectable()
export class UpdateUserCommand {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly tracingService: TracingService,
    private readonly userEntityToUserDtoMapper: UserEntityToUserDtoMapper,
    private readonly userEntityToUserOutboxDtoMapper: UserEntityToUserOutboxDtoMapper,
  ) {}

  public execute(options: IUpdateUserCommandOptions): Promise<UserDto> {
    return this.tracingService.traceAsyncFunction(UpdateUserCommand.name, () =>
      this.dataSource.transaction((entityManager: EntityManager) =>
        this.executeTransaction(entityManager, options),
      ),
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
