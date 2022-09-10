/*
 * Copyright 2022 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { mock, MockProxy } from "jest-mock-extended";

import { paramsWithUserIdDtoFactory } from "ᐸDtos testingᐳ";

import { CheckUserExistsQuery } from "../../../src/users/dataAccess";
import { UserNotFoundException } from "../../../src/users/exceptions";
import { CheckUserExistsUseCase } from "../../../src/users/useCases";

describe("CheckUserExistsUseCase", () => {
  let useCase: CheckUserExistsUseCase;

  let checkUserExistsQuery: MockProxy<CheckUserExistsQuery>;

  beforeAll(() => {
    checkUserExistsQuery = mock();

    useCase = new CheckUserExistsUseCase(checkUserExistsQuery);
  });

  it("must throw exception if user doesn't exists", async () => {
    const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build({
      userId: "1",
    });

    checkUserExistsQuery.ask.mockResolvedValue(false);

    await expect(useCase.execute(paramsWithUserIdDto)).rejects.toThrow(
      UserNotFoundException,
    );
  });

  it("must resolves without exceptions if user exists", async () => {
    const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build({
      userId: "1",
    });

    checkUserExistsQuery.ask.mockResolvedValue(true);

    await expect(useCase.execute(paramsWithUserIdDto)).resolves.not.toThrow();
  });
});
