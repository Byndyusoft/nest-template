import { AtLeastOneDefined } from "@byndyusoft/class-validator-extended";
import { ApiHideProperty, PartialType } from "@byndyusoft/nest-swagger";

import { CreateUserDto } from "../createUser";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiHideProperty()
  @AtLeastOneDefined()
  protected readonly atLeastOneDefined?: unknown;
}
