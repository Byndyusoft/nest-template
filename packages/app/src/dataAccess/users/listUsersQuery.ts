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
import { InjectRepository } from "@nestjs/typeorm";
import _ from "lodash";
import { In, Repository } from "typeorm";

import { UserEntityToUserDtoMapper } from "~/src/mappers";
import { ListUsersQueryDto, UserDto } from "ᐸDtosᐳ";
import { UserEntity } from "ᐸEntitiesᐳ";

@Injectable()
export class ListUsersQuery {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly __userRepository: Repository<UserEntity>,
    private readonly __tracingService: TracingService,
  ) {}

  public ask(options: ListUsersQueryDto): Promise<UserDto[]> {
    return this.__tracingService.traceAsyncFunction(
      nameof(ListUsersQuery),
      async () => {
        const users = await this.__userRepository.find({
          where: _.omitBy(
            {
              userId: options.userIds ? In(options.userIds) : undefined,
              name: options.names ? In(options.names) : undefined,
              email: options.emails ? In(options.emails) : undefined,
            },
            (value) => value === undefined,
          ),
          order: {
            userId: "DESC",
          },
          skip: options.pageToken,
          take: options.pageSize,
        });

        return UserEntityToUserDtoMapper.map(...users);
      },
    );
  }
}
