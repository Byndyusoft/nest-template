import { makeDtoFactory } from "@byndyusoft/dto-factory";
import { UpdateUserDto } from "open-telemetry-example-dtos";

import { createUserDtoFactory } from "../createUser";

export const updateUserDtoFactory = makeDtoFactory<UpdateUserDto>(() =>
  createUserDtoFactory.build(),
);
