import { makeDtoFactory } from "@byndyusoft/dto-factory";
import { faker } from "@faker-js/faker";
import { UserDto } from "open-telemetry-example-dtos";

export const userDtoFactory = makeDtoFactory<UserDto>(() => ({
  userId: String(faker.datatype.number()),

  name: faker.name.fullName(),
  email: faker.internet.email(),

  userVersion: faker.datatype.number(),
}));
