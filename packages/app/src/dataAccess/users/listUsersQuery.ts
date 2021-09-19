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

import { ListUsersQueryDto, UserDto } from "ᐸDtosᐳ";

@Injectable()
export class ListUsersQuery {
  public constructor(private readonly __tracingService: TracingService) {}

  public ask(options: ListUsersQueryDto): Promise<UserDto[]> {
    return this.__tracingService.traceAsyncFunction(
      nameof(ListUsersQuery),
      () => {
        return Promise.resolve(
          Array.from({ length: options.pageSize }).map((_value, index) => {
            const id = BigInt(index + 1) + BigInt(options.pageToken);

            return {
              id: String(id),
              name: `user${id}`,
              email: `user${id}@example.com`,
            };
          }),
        );
      },
    );
  }
}
