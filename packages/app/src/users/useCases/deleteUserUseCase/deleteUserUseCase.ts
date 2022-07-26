/*
 * Copyright 2022 Byndyusoft
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

import { Injectable } from "@nestjs/common";

import { ParamsWithUserIdDto, QueryWithUserVersionDto, UserDto } from "ᐸDtosᐳ";

import { UpdateUserCommand } from "../../dataAccess";
import { CheckUserExistsUseCase } from "../checkUserExistsUseCase";

@Injectable()
export class DeleteUserUseCase {
  public constructor(
    private readonly checkUserExistsUseCase: CheckUserExistsUseCase,
    private readonly updateUserCommand: UpdateUserCommand,
  ) {}

  public async execute(
    params: ParamsWithUserIdDto,
    query: QueryWithUserVersionDto,
  ): Promise<UserDto> {
    await this.checkUserExistsUseCase.execute(params);

    return this.updateUserCommand.execute({
      userId: params.userId,
      userVersion: query.userVersion,

      payload: {
        deletedAt: new Date(),
      },
    });
  }
}
