import dtoFactory from "@byndyusoft/dto-factory"; // TODO: make ESM
import { faker } from "@faker-js/faker";

import { UserDto } from "ᐸDtosᐳ";

const { makeDtoFactory } = dtoFactory;

export const userDtoFactory = makeDtoFactory<UserDto>(() => ({
  userId: String(faker.datatype.number()),

  name: faker.name.fullName(),
  email: faker.internet.email(),

  userVersion: faker.datatype.number(),
}));
