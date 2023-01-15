import dtoFactory from "@byndyusoft/dto-factory"; // TODO: make ESM
import _ from "lodash";

import { CreateUserDto } from "ᐸDtosᐳ";

import { userDtoFactory } from "../common";

const { makeDtoFactory } = dtoFactory;

export const createUserDtoFactory = makeDtoFactory<CreateUserDto>(() =>
  _.omit(userDtoFactory.build(), "userId", "userVersion"),
);
