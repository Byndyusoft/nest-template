import dtoFactory from "@byndyusoft/dto-factory"; // TODO: make ESM

import { UpdateUserDto } from "ᐸDtosᐳ";

import { createUserDtoFactory } from "../createUser";

const { makeDtoFactory } = dtoFactory;

export const updateUserDtoFactory = makeDtoFactory<UpdateUserDto>(() =>
  createUserDtoFactory.build(),
);
