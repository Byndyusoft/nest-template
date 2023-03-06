import { UserDto } from "./userDto";

export class UserOutboxDto extends UserDto {
  public readonly deletedAt?: Date;
}
