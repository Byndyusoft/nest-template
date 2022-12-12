import { makeDtoFactory } from "@byndyusoft/dto-factory";
import { faker } from "@faker-js/faker";

import { ListUsersQueryDto } from "ᐸDtosᐳ";

export const listUsersQueryDtoFactory = makeDtoFactory<ListUsersQueryDto>(
  () => ({
    userIds: Array.from({ length: faker.datatype.number(10) }).map(() =>
      String(faker.datatype.number()),
    ),
    names: Array.from({ length: faker.datatype.number(10) }).map(() =>
      faker.name.fullName(),
    ),
    emails: Array.from({ length: faker.datatype.number(10) }).map(() =>
      faker.internet.email(),
    ),

    pageSize: faker.datatype.number(),
    pageToken: String(faker.datatype.number()),
  }),
);
