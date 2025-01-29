import { Injectable } from "@nestjs/common";
import { UserDto } from "open-telemetry-example-dtos";
import { UserEntity } from "open-telemetry-example-entities";

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
