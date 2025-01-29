import { makeDtoFactory } from "@byndyusoft/dto-factory";
import { faker } from "@faker-js/faker";

import { UserDto } from "ᐸDtosᐳ";

export const userDtoFactory = makeDtoFactory<UserDto>(() => ({
  userId: faker.string.numeric(),

  name: faker.string.sample(),
  email: faker.internet.email(),

  userVersion: faker.number.int(),
}));
