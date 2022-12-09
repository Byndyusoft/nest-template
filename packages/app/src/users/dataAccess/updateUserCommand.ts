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

import { UserDto } from "ᐸDtosᐳ";

export interface IUpdateUserCommandOptions {
  readonly userId: string;
  readonly userVersion: number;

  readonly payload: {
    deletedAt?: Date;
    name?: string;
    email?: string;
  };
}

@Injectable()
export class UpdateUserCommand {
  public constructor(private readonly tracingService: TracingService) {}

  public execute(options: IUpdateUserCommandOptions): Promise<UserDto> {
    return this.tracingService.traceAsyncFunction(UpdateUserCommand.name, () =>
      Promise.resolve({
        name: `user${options.userId}`,
        userId: options.userId,
        email: `user${options.userId}@example.com`,
        userVersion: 1,
      }),
    );
  }
}
