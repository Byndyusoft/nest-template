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
import { Repository } from "./dataSource";

import { UserEntity } from "ᐸEntitiesᐳ";

export interface ICheckUserExistsQueryOptions {
  readonly userId: string;
}

@Injectable()
export class CheckUserExistsQuery {
  private userRepository  = new Repository<UserEntity>(new UserEntity);

  public constructor(
    private readonly tracingService: TracingService,
    // private readonly userRepository: Repository<UserEntity>,
  ) {}

  public ask(options: ICheckUserExistsQueryOptions): Promise<boolean> {
    return this.tracingService.traceAsyncFunction(
      CheckUserExistsQuery.name,
      async () => {
        const user = await this.userRepository.findOne({
          where: {
            userId: options.userId,
          },
          select: {
            userId: true,
          },
        });

        return !!user;
      },
    );
  }
}
