import dtoFactory from "@byndyusoft/dto-factory"; // TODO: make ESM
import _ from "lodash";

import { QueryWithUserVersionDto } from "ᐸDtosᐳ";

import { userDtoFactory } from "./userDtoFactory";

const { makeDtoFactory } = dtoFactory;

export const queryWithUserVersionDtoFactory =
  makeDtoFactory<QueryWithUserVersionDto>(() =>
    _.pick(userDtoFactory.build(), "userVersion"),
  );
