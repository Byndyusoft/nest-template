import { Injectable } from "@nestjs/common";

import { UserDto } from "ᐸDtosᐳ";

@Injectable()
export class UserEntityToUserDtoMapper {
  public map(value: UserDto): UserDto {
    return {
      userId: value.userId,
      name: value.name,
      email: value.email,
      userVersion: value.userVersion,
    };
  }
}
