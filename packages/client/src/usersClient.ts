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

import { HttpClient } from "@byndyusoft/nest-http-client";
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

@Injectable()
export class UsersClient {
  public constructor(private readonly httpClient: HttpClient) {}

  public createUser(request: CreateUserDto): Promise<UserDto> {
    return this.httpClient.endpoint("POST /users", request);
  }

  public deleteUser(
    request: ParamsWithUserIdDto & QueryWithUserVersionDto,
  ): Promise<UserDto> {
    return this.httpClient.endpoint(
      "DELETE /users/{userId}{?userVersion}",
      request,
    );
  }

  public getUserById(request: ParamsWithUserIdDto): Promise<UserDto> {
    return this.httpClient.endpoint("GET /users/{userId}", request);
  }

  public listUsers(
    request?: Partial<ListUsersQueryDto>,
  ): Promise<ListUsersResponseDto> {
    return this.httpClient.endpoint("GET /users", request);
  }

  public updateUser(
    request: ParamsWithUserIdDto & QueryWithUserVersionDto & UpdateUserDto,
  ): Promise<UserDto> {
    return this.httpClient.endpoint(
      "PATCH /users/{userId}{?userVersion}",
      request,
    );
  }
}
