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
import _ from "lodash";
import { Repository, In } from "./dataSource";
import { UserDto } from "ᐸDtosᐳ";
import { UserEntity } from "ᐸEntitiesᐳ";

import { UserEntityToUserDtoMapper } from "../mappers";

export interface IListUsersQueryOptions {
  readonly userIds?: string[];
  readonly names?: string[];
  readonly emails?: string[];
  readonly pageSize?: number;
  readonly pageToken?: number;
}

@Injectable()
export class ListUsersQuery {
  public constructor(
    private readonly tracingService: TracingService,
    private readonly userEntityToUserDtoMapper: UserEntityToUserDtoMapper,
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public ask(options: IListUsersQueryOptions): Promise<UserDto[]> {
    return this.tracingService.traceAsyncFunction(
      ListUsersQuery.name,
      async () => {
        const users = await this.userRepository.find({
          where: _.omitBy(
            {
              userId: options.userIds ? In(options.userIds) : undefined,
              name: options.names ? In(options.names) : undefined,
              email: options.emails ? In(options.emails) : undefined,
            },
            (value) => value === undefined,
          ),
          order: options.pageSize
            ? {
                userId: "DESC",
              }
            : undefined,
          skip: options.pageToken,
          take: options.pageSize,
        });

        return users.map((x) => this.userEntityToUserDtoMapper.map(x));
      },
    );
  }
}
