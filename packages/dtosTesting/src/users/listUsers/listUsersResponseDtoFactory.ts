import { makeDtoFactory } from "@byndyusoft/dto-factory";
import { faker } from "@faker-js/faker";

import { ListUsersResponseDto } from "ᐸDtosᐳ";

import { userDtoFactory } from "../common";

export const listUsersResponseDtoFactory = makeDtoFactory<ListUsersResponseDto>(
  () => ({
    users: userDtoFactory.buildList(faker.number.int(10)),

    nextPageToken: faker.string.numeric(),
  }),
);
