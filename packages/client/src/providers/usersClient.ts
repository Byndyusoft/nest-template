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
import _ from "lodash";
import { keys } from "ts-transformer-keys";

import {
  CreateUserDto,
  ListUsersQueryDto,
  ListUsersResponseDto,
  ParamsWithUserIdDto,
  QueryWithUserVersionDto,
  UpdateUserDto,
  UserDto,
} from "ᐸDtosᐳ";

import { HttpClient } from "./httpClient";

@Injectable()
export class UsersClient {
  public constructor(private readonly __httpClient: HttpClient) {}

  public createUser(request: CreateUserDto): Promise<UserDto> {
    return this.__httpClient.post("/users", request);
  }

  public deleteUser(
    request: ParamsWithUserIdDto & QueryWithUserVersionDto,
  ): Promise<UserDto> {
    return this.__httpClient.delete(
      `/users/${encodeURIComponent(request.userId)}`,
      {
        params: _.pick(request, keys<QueryWithUserVersionDto>()),
      },
    );
  }

  public getUserById(request: ParamsWithUserIdDto): Promise<UserDto> {
    return this.__httpClient.get(
      `/users/${encodeURIComponent(request.userId)}`,
    );
  }

  public listUsers(
    request?: Partial<ListUsersQueryDto>,
  ): Promise<ListUsersResponseDto> {
    return this.__httpClient.get("/users", {
      params: request,
    });
  }

  public updateUser(
    request: ParamsWithUserIdDto & QueryWithUserVersionDto & UpdateUserDto,
  ): Promise<UserDto> {
    return this.__httpClient.patch(
      `/users/${encodeURIComponent(request.userId)}`,
      _.pick(request, keys<UpdateUserDto>()),
      {
        params: _.pick(request, keys<QueryWithUserVersionDto>()),
      },
    );
  }
}
