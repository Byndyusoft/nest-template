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

import { createUserDtoFactory, userDtoFactory } from "ᐸDtos testingᐳ";

import { CreateUserCommand } from "../../dataAccess";

import { CreateUserUseCase } from "./createUserUseCase";

describe("CreateUserUseCase", () => {
  let useCase: CreateUserUseCase;

  let createUserCommand: MockProxy<CreateUserCommand>;

  beforeAll(() => {
    createUserCommand = mock();

    useCase = new CreateUserUseCase(createUserCommand);
  });

  it("must create user", async () => {
    const createUserDto = createUserDtoFactory.build();

    const userDto = userDtoFactory.build();

    createUserCommand.execute.mockResolvedValue(userDto);

    await expect(useCase.execute(createUserDto)).resolves.toStrictEqual(
      userDto,
    );
  });
});
