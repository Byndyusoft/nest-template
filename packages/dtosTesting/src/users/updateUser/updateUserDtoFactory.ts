import { makeDtoFactory } from "@byndyusoft/dto-factory";

import { UpdateUserDto } from "ᐸDtosᐳ";

import { createUserDtoFactory } from "../createUser";

export const updateUserDtoFactory = makeDtoFactory<UpdateUserDto>(() =>
  createUserDtoFactory.build(),
);
