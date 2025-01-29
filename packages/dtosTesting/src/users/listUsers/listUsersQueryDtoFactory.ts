import { makeDtoFactory } from "@byndyusoft/dto-factory";
import { faker } from "@faker-js/faker";

import { ListUsersQueryDto } from "ᐸDtosᐳ";

export const listUsersQueryDtoFactory = makeDtoFactory<ListUsersQueryDto>(
  () => ({
    userIds: Array.from({ length: faker.number.int(10) }).map(() =>
      faker.string.numeric(),
    ),
    names: Array.from({ length: faker.number.int(10) }).map(() =>
      faker.string.sample(),
    ),
    emails: Array.from({ length: faker.number.int(10) }).map(() =>
      faker.internet.email(),
    ),

    pageSize: faker.number.int(10),
    pageToken: faker.string.numeric(),
  }),
);
