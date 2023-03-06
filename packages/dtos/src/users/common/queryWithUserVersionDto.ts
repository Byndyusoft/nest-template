import { PickType } from "@byndyusoft/nest-swagger";

import { UserDto } from "./userDto";

export class QueryWithUserVersionDto extends PickType(UserDto, [
  "userVersion",
]) {}
