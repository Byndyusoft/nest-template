import { ApiTags } from "@byndyusoft/nest-swagger";
import { Controller, HttpStatus, Post } from "@nestjs/common";

import { ApiCommonResponses } from "../infrastructure";

import { UsersService } from "./usersService";

@ApiTags("Test Logger")
@Controller({
  path: "/",
  version: "1",
})
export class UsersController {
  public constructor(private readonly service: UsersService) {}

  @ApiCommonResponses(HttpStatus.BAD_REQUEST)
  @Post("/test")
  public test(): Promise<void> {
    return this.service.test();
  }
}
