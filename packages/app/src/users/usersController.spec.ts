/*
 * Copyright 2021 Byndyusoft
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
  createUserDtoFactory,
  listUsersQueryDtoFactory,
  listUsersResponseDtoFactory,
  paramsWithUserIdDtoFactory,
  queryWithUserVersionDtoFactory,
  updateUserDtoFactory,
  userDtoFactory,
} from "ᐸDtos testingᐳ";

import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
} from "./useCases";
import { UsersController } from "./usersController";
import { UsersService } from "./usersService";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  let createUserUseCase: MockProxy<CreateUserUseCase>;
  let deleteUserUseCase: MockProxy<DeleteUserUseCase>;
  let getUserByIdUseCase: MockProxy<GetUserByIdUseCase>;
  let listUsersUseCase: MockProxy<ListUsersUseCase>;
  let updateUserUseCase: MockProxy<UpdateUserUseCase>;

  beforeAll(() => {
    createUserUseCase = mock();
    deleteUserUseCase = mock();
    getUserByIdUseCase = mock();
    listUsersUseCase = mock();
    updateUserUseCase = mock();

    service = new UsersService(
      createUserUseCase,
      deleteUserUseCase,
      getUserByIdUseCase,
      listUsersUseCase,
      updateUserUseCase,
    );

    controller = new UsersController(service);
  });

  describe("createUser", () => {
    it("must create user", async () => {
      const createUserDto = createUserDtoFactory.build();

      const userDto = userDtoFactory.build();

      createUserUseCase.execute.mockResolvedValue(userDto);

      await expect(controller.createUser(createUserDto)).resolves.toStrictEqual(
        userDto,
      );
    });
  });

  describe("listUsers", () => {
    it("must list users", async () => {
      const listUsersQueryDto = listUsersQueryDtoFactory.build();

      const listUsersResponseDto = listUsersResponseDtoFactory.build();

      listUsersUseCase.execute.mockResolvedValue(listUsersResponseDto);

      await expect(
        controller.listUsers(listUsersQueryDto),
      ).resolves.toStrictEqual(listUsersResponseDto);
    });
  });

  describe("getUserById", () => {
    it("must get user by id", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build();

      const userDto = userDtoFactory.build();

      getUserByIdUseCase.execute.mockResolvedValue(userDto);

      await expect(
        controller.getUserById(paramsWithUserIdDto),
      ).resolves.toStrictEqual(userDto);
    });
  });

  describe("updateUser", () => {
    it("must update user", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build();

      const queryWithUserVersionDto = queryWithUserVersionDtoFactory.build();

      const updateUserDto = updateUserDtoFactory.build();

      const userDto = userDtoFactory.build();

      updateUserUseCase.execute.mockResolvedValue(userDto);

      await expect(
        controller.updateUser(
          paramsWithUserIdDto,
          queryWithUserVersionDto,
          updateUserDto,
        ),
      ).resolves.toStrictEqual(userDto);
    });
  });

  describe("deleteUser", () => {
    it("must delete user", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build();

      const queryWithUserVersionDto = queryWithUserVersionDtoFactory.build();

      const userDto = userDtoFactory.build();

      deleteUserUseCase.execute.mockResolvedValue(userDto);

      await expect(
        controller.deleteUser(paramsWithUserIdDto, queryWithUserVersionDto),
      ).resolves.toStrictEqual(userDto);
    });
  });
});
