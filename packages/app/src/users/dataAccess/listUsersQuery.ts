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

import { UserDto } from "ᐸDtosᐳ";

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
    private readonly userEntityToUserDtoMapper: UserEntityToUserDtoMapper,
    private readonly tracingService: TracingService,
  ) {}

  public ask(options: IListUsersQueryOptions): Promise<UserDto[]> {
    return this.tracingService.traceAsyncFunction(ListUsersQuery.name, () => {
      const users: UserDto[] = [
        {
          userId: "1",
          name: _.first(options.names) ?? "name",
          email: "email",
          userVersion: 1,
        },
      ];

      return Promise.resolve(
        users.map((x) => this.userEntityToUserDtoMapper.map(x)),
      );
    });
  }
}
