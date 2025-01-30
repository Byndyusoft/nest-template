import { ApiTags } from "@byndyusoft/nest-swagger";
import { Controller, Get, HttpStatus, Param } from "@nestjs/common";

import { ParamsWithUserIdDto, UserDto } from "ᐸDtosᐳ";

import { ApiCommonResponses } from "../infrastructure";

import { UsersService } from "./usersService";

@ApiTags("Users")
@Controller({
  path: "users",
  version: "1",
})
export class UsersController {
  public constructor(private readonly service: UsersService) {}

  @ApiCommonResponses(HttpStatus.BAD_REQUEST, HttpStatus.NOT_FOUND)
  @Get("/:userId")
  public getUserById(@Param() params: ParamsWithUserIdDto): Promise<UserDto> {
    return this.service.getUserById(params);
  }
}
