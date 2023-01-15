import classValidatorExtended from "@byndyusoft/class-validator-extended"; // TODO: make ESM
import { ApiHideProperty, PartialType } from "@byndyusoft/nest-swagger";

import { CreateUserDto } from "../createUser";

const { AtLeastOneDefined } = classValidatorExtended;

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiHideProperty()
  @AtLeastOneDefined()
  protected readonly atLeastOneDefined?: unknown;
}
