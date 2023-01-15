import dtoFactory from "@byndyusoft/dto-factory"; // TODO: make ESM
import _ from "lodash";

import { ParamsWithUserIdDto } from "ᐸDtosᐳ";

import { userDtoFactory } from "./userDtoFactory";

const { makeDtoFactory } = dtoFactory;

export const paramsWithUserIdDtoFactory = makeDtoFactory<ParamsWithUserIdDto>(
  () => _.pick(userDtoFactory.build(), "userId"),
);
