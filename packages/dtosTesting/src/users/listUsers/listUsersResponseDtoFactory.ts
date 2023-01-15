import dtoFactory from "@byndyusoft/dto-factory"; // TODO: make ESM
import { faker } from "@faker-js/faker";

import { ListUsersResponseDto } from "ᐸDtosᐳ";

import { userDtoFactory } from "../common";

const { makeDtoFactory } = dtoFactory;

export const listUsersResponseDtoFactory = makeDtoFactory<ListUsersResponseDto>(
  () => ({
    users: userDtoFactory.buildList(faker.datatype.number(10)),

    nextPageToken: String(faker.datatype.number()),
  }),
);
