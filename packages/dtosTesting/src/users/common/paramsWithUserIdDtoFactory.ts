import { makeDtoFactory } from "@byndyusoft/dto-factory";
import _ from "lodash";
import { ParamsWithUserIdDto } from "open-telemetry-example-dtos";

import { userDtoFactory } from "./userDtoFactory";

export const paramsWithUserIdDtoFactory = makeDtoFactory<ParamsWithUserIdDto>(
  () => _.pick(userDtoFactory.build(), "userId"),
);
