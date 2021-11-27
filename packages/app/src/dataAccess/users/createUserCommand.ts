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
import { Injectable } from "@nestjs/common";
import { keys } from "ts-transformer-keys";
import { Connection, EntityManager } from "typeorm";

import {
  UserEntityToUserDtoMapper,
  UserEntityToUserOutboxDtoMapper,
} from "~/src/mappers";
import { CreateUserDto, UserDto } from "ᐸDtosᐳ";
import { UserEntity, UserOutboxEntity } from "ᐸEntitiesᐳ";

@Injectable()
export class CreateUserCommand {
  public constructor(
    private readonly __connection: Connection,
    private readonly __tracingService: TracingService,
  ) {}

  private static async __execute(
    entityManager: EntityManager,
    options: CreateUserDto,
  ): Promise<UserDto> {
    const userRepository = entityManager.getRepository(UserEntity);

    const userOutboxRepository = entityManager.getRepository(UserOutboxEntity);

    const insertResult = await userRepository
      .createQueryBuilder()
      .insert()
      .values(options)
      .returning(keys<UserEntity>())
      .execute();

    const insertedEntities = insertResult.generatedMaps as UserEntity[];

    const now = new Date();

    await userOutboxRepository.insert(
      UserEntityToUserOutboxDtoMapper.map(...insertedEntities).map((x) => ({
        entity: x,
        timestamp: now,
      })),
    );

    return UserEntityToUserDtoMapper.map(...insertedEntities)[0];
  }

  public execute(options: CreateUserDto): Promise<UserDto> {
    return this.__tracingService.traceAsyncFunction(
      nameof(CreateUserCommand),
      () =>
        this.__connection.transaction((entityManager) =>
          CreateUserCommand.__execute(entityManager, options),
        ),
    );
  }
}
