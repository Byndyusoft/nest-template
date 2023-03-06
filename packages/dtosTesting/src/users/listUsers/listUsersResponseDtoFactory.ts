import { makeDtoFactory } from "@byndyusoft/dto-factory";
import { faker } from "@faker-js/faker";

import { ListUsersResponseDto } from "ᐸDtosᐳ";

import { userDtoFactory } from "../common";

export const listUsersResponseDtoFactory = makeDtoFactory<ListUsersResponseDto>(
  () => ({
    users: userDtoFactory.buildList(faker.datatype.number(10)),

    nextPageToken: String(faker.datatype.number()),
  }),
);
