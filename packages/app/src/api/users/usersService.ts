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

import { Injectable, NotFoundException } from "@nestjs/common";

import {
  CreateUserCommand,
  GetUserByIdQuery,
  ListUsersQuery,
  UpdateUserCommand,
} from "~/src";
import {
  CreateUserDto,
  ListUsersQueryDto,
  ListUsersResponseDto,
  ParamsWithUserIdDto,
  UpdateUserDto,
  UserDto,
} from "ᐸDtosᐳ";

@Injectable()
export class UsersService {
  public constructor(
    private readonly __createUserCommand: CreateUserCommand,
    private readonly __getUserByIdQuery: GetUserByIdQuery,
    private readonly __listUsersQuery: ListUsersQuery,
    private readonly __updateUserCommand: UpdateUserCommand,
  ) {}

  public createUser(body: CreateUserDto): Promise<UserDto> {
    return this.__createUserCommand.execute(body);
  }

  public async getUserById(params: ParamsWithUserIdDto): Promise<UserDto> {
    const user = await this.__getUserByIdQuery.ask(params);

    if (!user) {
      throw new NotFoundException(
        `user with id ${params.id} not found`,
        "BYS_404",
      );
    }

    return user;
  }

  public async listUsers(
    query: ListUsersQueryDto,
  ): Promise<ListUsersResponseDto> {
    const users = await this.__listUsersQuery.ask(query);

    return {
      users,
      nextPageToken:
        users.length < query.pageSize
          ? undefined
          : (BigInt(users.length) + BigInt(query.pageToken)).toString(),
    };
  }

  public async updateUser(
    params: ParamsWithUserIdDto,
    body: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.__updateUserCommand.execute({
      ...params,
      ...body,
    });

    if (!user) {
      throw new NotFoundException(
        `user with id ${params.id} not found`,
        "BYS_404",
      );
    }

    return user;
  }
}
