import { Injectable } from "@nestjs/common";
import { UserOutboxDto } from "open-telemetry-example-dtos";
import { UserEntity } from "open-telemetry-example-entities";

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
