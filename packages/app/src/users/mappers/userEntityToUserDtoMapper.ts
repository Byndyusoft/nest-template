import { Injectable } from "@nestjs/common";

import { UserDto } from "ᐸDtosᐳ";
import { UserEntity } from "ᐸEntitiesᐳ";

@Injectable()
export class UserEntityToUserDtoMapper {
  public map(value: UserEntity): UserDto {
    return {
      userId: value.userId,
      name: value.name,
      email: value.email,
      userVersion: value.userVersion,
    };
  }
}
