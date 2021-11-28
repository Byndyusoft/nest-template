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

import { ApiTags } from "@byndyusoft/nest-swagger";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

import { ApiCommonResponses } from "~/src";
import {
  CreateUserDto,
  ListUsersQueryDto,
  ListUsersResponseDto,
  ParamsWithUserIdDto,
  QueryWithUserVersionDto,
  UpdateUserDto,
  UserDto,
} from "ᐸDtosᐳ";

import { UsersService } from "./usersService";

@ApiTags("Users")
@Controller({
  path: "users",
  version: "1",
})
export class UsersController {
  public constructor(private readonly __service: UsersService) {}

  @ApiCommonResponses(HttpStatus.BAD_REQUEST)
  @Post("/")
  public createUser(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.__service.createUser(body);
  }

  @ApiCommonResponses(HttpStatus.BAD_REQUEST)
  @Get("/")
  public listUsers(
    @Query() query: ListUsersQueryDto,
  ): Promise<ListUsersResponseDto> {
    return this.__service.listUsers(query);
  }

  @ApiCommonResponses(HttpStatus.BAD_REQUEST, HttpStatus.NOT_FOUND)
  @Get("/:userId")
  public getUserById(@Param() params: ParamsWithUserIdDto): Promise<UserDto> {
    return this.__service.getUserById(params);
  }

  @ApiCommonResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.CONFLICT,
  )
  @Patch("/:userId")
  public updateUser(
    @Param() params: ParamsWithUserIdDto,
    @Query() query: QueryWithUserVersionDto,
    @Body() body: UpdateUserDto,
  ): Promise<UserDto> {
    return this.__service.updateUser(params, query, body);
  }

  @ApiCommonResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.CONFLICT,
  )
  @Delete("/:userId")
  public deleteUser(
    @Param() params: ParamsWithUserIdDto,
    @Query() query: QueryWithUserVersionDto,
  ): Promise<UserDto> {
    return this.__service.deleteUser(params, query);
  }
}
