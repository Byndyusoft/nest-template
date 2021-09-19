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

import { ParamsWithUserIdDto, UserDto } from "ᐸDtosᐳ";

@Injectable()
export class GetUserByIdQuery {
  public constructor(private readonly __tracingService: TracingService) {}

  public ask(options: ParamsWithUserIdDto): Promise<UserDto | null> {
    return this.__tracingService.traceAsyncFunction(
      nameof(GetUserByIdQuery),
      () => {
        return Promise.resolve({
          id: options.id,
          name: `user${options.id}`,
          email: `user${options.id}@example.com`,
        });
      },
    );
  }
}
