import { Injectable } from "@nestjs/common";

import { UserOutboxDto } from "ᐸDtosᐳ";

@Injectable()
export class UserEntityToUserOutboxDtoMapper {
  public map(value: UserOutboxDto): UserOutboxDto {
    return {
      userId: value.userId,
      name: value.name,
      email: value.email,
      userVersion: value.userVersion,
      deletedAt: value.deletedAt ?? undefined,
    };
  }
}
