import { Injectable } from "@nestjs/common";

import { UserOutboxDto } from "ᐸDtosᐳ";
import { UserEntity } from "ᐸEntitiesᐳ";

@Injectable()
export class UserEntityToUserOutboxDtoMapper {
  public map(value: UserEntity): UserOutboxDto {
    return {
      userId: value.userId,
      name: value.name,
      email: value.email,
      userVersion: value.userVersion,
      deletedAt: value.deletedAt ?? undefined,
    };
  }
}
