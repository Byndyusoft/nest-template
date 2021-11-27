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
import { keys } from "ts-transformer-keys";
import { Connection, EntityManager } from "typeorm";

import {
  UserEntityToUserDtoMapper,
  UserEntityToUserOutboxDtoMapper,
} from "~/src/mappers";
import {
  ParamsWithUserIdDto,
  QueryWithUserVersionDto,
  UpdateUserDto,
  UserDto,
} from "ᐸDtosᐳ";
import { UserEntity, UserOutboxEntity } from "ᐸEntitiesᐳ";

@Injectable()
export class UpdateUserCommand {
  public constructor(
    private readonly __connection: Connection,
    private readonly __tracingService: TracingService,
  ) {}

  private static async __execute(
    entityManager: EntityManager,
    options: ParamsWithUserIdDto & QueryWithUserVersionDto & UpdateUserDto,
  ): Promise<UserDto> {
    const userRepository = entityManager.getRepository(UserEntity);

    const userOutboxRepository = entityManager.getRepository(UserOutboxEntity);

    const updateResult = await userRepository
      .createQueryBuilder()
      .update()
      .set(_.pick(options, keys<UpdateUserDto>()))
      .whereEntity({ userId: options.userId } as UserEntity)
      .where({
        userId: options.userId,
        userVersion: options.userVersion,
      })
      .returning(keys<UserEntity>())
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

    const updatedEntities = updateResult.generatedMaps as UserEntity[];

    const now = new Date();

    await userOutboxRepository.insert(
      UserEntityToUserOutboxDtoMapper.map(...updatedEntities).map((x) => ({
        entity: x,
        timestamp: now,
      })),
    );

    return UserEntityToUserDtoMapper.map(...updatedEntities)[0];
  }

  public execute(
    options: ParamsWithUserIdDto & QueryWithUserVersionDto & UpdateUserDto,
  ): Promise<UserDto> {
    return this.__tracingService.traceAsyncFunction(
      nameof(UpdateUserCommand),
      () =>
        this.__connection.transaction((entityManager) =>
          UpdateUserCommand.__execute(entityManager, options),
        ),
    );
  }
}
