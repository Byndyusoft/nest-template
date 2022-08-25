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

import { Injectable } from "@nestjs/common";

import {
  CreateUserDto,
  ListUsersQueryDto,
  ListUsersResponseDto,
  ParamsWithUserIdDto,
  QueryWithUserVersionDto,
  UpdateUserDto,
  UserDto,
} from "ᐸDtosᐳ";

import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
} from "./useCases";

@Injectable()
export class UsersService {
  public constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  public createUser(body: CreateUserDto): Promise<UserDto> {
    return this.createUserUseCase.execute(body);
  }

  public deleteUser(
    params: ParamsWithUserIdDto,
    query: QueryWithUserVersionDto,
  ): Promise<UserDto> {
    return this.deleteUserUseCase.execute(params, query);
  }

  public getUserById(params: ParamsWithUserIdDto): Promise<UserDto> {
    return this.getUserByIdUseCase.execute(params);
  }

  public listUsers(query: ListUsersQueryDto): Promise<ListUsersResponseDto> {
    return this.listUsersUseCase.execute(query);
  }

  public updateUser(
    params: ParamsWithUserIdDto,
    query: QueryWithUserVersionDto,
    body: UpdateUserDto,
  ): Promise<UserDto> {
    return this.updateUserUseCase.execute(params, query, body);
  }
}
