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

import { paramsWithUserIdDtoFactory, userDtoFactory } from "ᐸDtos testingᐳ";

import { ListUsersQuery } from "../../../src/users/dataAccess";
import { UserNotFoundException } from "../../../src/users/exceptions";
import { GetUserByIdUseCase } from "../../../src/users/useCases";

describe("GetUserByIdUseCase", () => {
  let useCase: GetUserByIdUseCase;

  let listUsersQuery: MockProxy<ListUsersQuery>;

  beforeAll(() => {
    listUsersQuery = mock();

    useCase = new GetUserByIdUseCase(listUsersQuery);
  });

  it("must throw exception if user doesn't exists", async () => {
    const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build({
      userId: "1",
    });

    listUsersQuery.ask.mockResolvedValue([]);

    await expect(useCase.execute(paramsWithUserIdDto)).rejects.toThrow(
      UserNotFoundException,
    );
  });

  it("must get user by id", async () => {
    const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build();

    const userDto = userDtoFactory.build();

    listUsersQuery.ask.mockResolvedValue([userDto]);

    await expect(useCase.execute(paramsWithUserIdDto)).resolves.toStrictEqual(
      userDto,
    );
  });
});
