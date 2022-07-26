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

import {
  CreateUserDto,
  ListUsersQueryDto,
  ListUsersResponseDto,
  ParamsWithUserIdDto,
  QueryWithUserVersionDto,
  UpdateUserDto,
  UserDto,
} from "ᐸDtosᐳ";

import { ApiCommonResponses } from "../../infrastructure";
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
} from "../useCases";

@ApiTags("Users")
@Controller({
  path: "users",
  version: "1",
})
export class UsersController {
  public constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @ApiCommonResponses(HttpStatus.BAD_REQUEST)
  @Post("/")
  public createUser(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.createUserUseCase.execute(body);
  }

  @ApiCommonResponses(HttpStatus.BAD_REQUEST)
  @Get("/")
  public listUsers(
    @Query() query: ListUsersQueryDto,
  ): Promise<ListUsersResponseDto> {
    return this.listUsersUseCase.execute(query);
  }

  @ApiCommonResponses(HttpStatus.BAD_REQUEST, HttpStatus.NOT_FOUND)
  @Get("/:userId")
  public getUserById(@Param() params: ParamsWithUserIdDto): Promise<UserDto> {
    return this.getUserByIdUseCase.execute(params);
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
    return this.updateUserUseCase.execute(params, query, body);
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
    return this.deleteUserUseCase.execute(params, query);
  }
}
