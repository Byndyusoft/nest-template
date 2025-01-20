import { makeDtoFactory } from "@byndyusoft/dto-factory";
import _ from "lodash";
import { QueryWithUserVersionDto } from "open-telemetry-example-dtos";

import { userDtoFactory } from "./userDtoFactory";

export const queryWithUserVersionDtoFactory =
  makeDtoFactory<QueryWithUserVersionDto>(() =>
    _.pick(userDtoFactory.build(), "userVersion"),
  );
