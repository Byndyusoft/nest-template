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

import { ApiCommonResponses } from "../infrastructure";

import { UsersService } from "./usersService";

@ApiTags("Users")
@Controller({
  path: "users",
  version: "1",
})
export class UsersController {
  public constructor(private readonly service: UsersService) {}

  @ApiCommonResponses(HttpStatus.BAD_REQUEST)
  @Post("/")
  public createUser(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.service.createUser(body);
  }

  @ApiCommonResponses(HttpStatus.BAD_REQUEST)
  @Get("/")
  public listUsers(
    @Query() query: ListUsersQueryDto,
  ): Promise<ListUsersResponseDto> {
    return this.service.listUsers(query);
  }

  @ApiCommonResponses(HttpStatus.BAD_REQUEST, HttpStatus.NOT_FOUND)
  @Get("/:userId")
  public getUserById(@Param() params: ParamsWithUserIdDto): Promise<UserDto> {
    return this.service.getUserById(params);
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
    return this.service.updateUser(params, query, body);
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
    return this.service.deleteUser(params, query);
  }
}
