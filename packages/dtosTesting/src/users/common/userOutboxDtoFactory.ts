import dtoFactory from "@byndyusoft/dto-factory"; // TODO: make ESM
import { faker } from "@faker-js/faker";

import { UserOutboxDto } from "ᐸDtosᐳ";

import { userDtoFactory } from "./userDtoFactory";

const { makeDtoFactory } = dtoFactory;

export const userOutboxDtoFactory = makeDtoFactory<UserOutboxDto>(() => ({
  ...userDtoFactory.build(),

  deletedAt: faker.date.soon(),
}));
