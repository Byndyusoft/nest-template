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

import {
  listUsersQueryDtoFactory,
  listUsersResponseDtoFactory,
  userDtoFactory,
} from "ᐸDtos testingᐳ";

import { ListUsersQuery } from "../../../src/users/dataAccess";
import { ListUsersUseCase } from "../../../src/users/useCases";

describe("ListUsersUseCase", () => {
  let useCase: ListUsersUseCase;

  let listUsersQuery: MockProxy<ListUsersQuery>;

  beforeAll(() => {
    listUsersQuery = mock();

    useCase = new ListUsersUseCase(listUsersQuery);
  });

  it("must return empty nextPageToken if users less than pageSize", async () => {
    const listUsersQueryDto = listUsersQueryDtoFactory.build({
      pageSize: 10,
    });

    const userDtos = userDtoFactory.buildList(5);

    listUsersQuery.ask.mockResolvedValue(userDtos);

    await expect(useCase.execute(listUsersQueryDto)).resolves.toStrictEqual(
      listUsersResponseDtoFactory.build({
        users: userDtos,
        nextPageToken: undefined,
      }),
    );
  });

  it("must list users", async () => {
    const listUsersQueryDto = listUsersQueryDtoFactory.build({
      pageSize: 10,
      pageToken: "0",
    });

    const userDtos = userDtoFactory.buildList(10);

    listUsersQuery.ask.mockResolvedValue(userDtos);

    await expect(useCase.execute(listUsersQueryDto)).resolves.toStrictEqual(
      listUsersResponseDtoFactory.build({
        users: userDtos,
        nextPageToken: "10",
      }),
    );
  });
});
