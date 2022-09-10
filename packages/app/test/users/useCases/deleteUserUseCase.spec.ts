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
  paramsWithUserIdDtoFactory,
  queryWithUserVersionDtoFactory,
  userDtoFactory,
} from "ᐸDtos testingᐳ";

import { UpdateUserCommand } from "../../../src/users/dataAccess";
import {
  CheckUserExistsUseCase,
  DeleteUserUseCase,
} from "../../../src/users/useCases";

describe("DeleteUserUseCase", () => {
  let useCase: DeleteUserUseCase;

  let checkUserExistsUseCase: MockProxy<CheckUserExistsUseCase>;
  let updateUserCommand: MockProxy<UpdateUserCommand>;

  beforeAll(() => {
    checkUserExistsUseCase = mock();
    updateUserCommand = mock();

    useCase = new DeleteUserUseCase(checkUserExistsUseCase, updateUserCommand);
  });

  it("must delete user", async () => {
    const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build();

    const queryWithUserVersionDto = queryWithUserVersionDtoFactory.build();

    const userDto = userDtoFactory.build();

    updateUserCommand.execute.mockResolvedValue(userDto);

    await expect(
      useCase.execute(paramsWithUserIdDto, queryWithUserVersionDto),
    ).resolves.toStrictEqual(userDto);
  });
});
