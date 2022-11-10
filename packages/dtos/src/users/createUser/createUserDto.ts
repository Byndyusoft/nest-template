import { OmitType } from "@byndyusoft/nest-swagger";

import { UserDto } from "../common";

export class CreateUserDto extends OmitType(UserDto, [
  "userId",
  "userVersion",
]) {}
