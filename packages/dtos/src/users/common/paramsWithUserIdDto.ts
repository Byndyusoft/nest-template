import { PickType } from "@byndyusoft/nest-swagger";

import { UserDto } from "./userDto";

export class ParamsWithUserIdDto extends PickType(UserDto, ["userId"]) {}
