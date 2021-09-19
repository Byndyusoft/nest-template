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
  CreateUserCommand,
  GetUserByIdQuery,
  ListUsersQuery,
  UpdateUserCommand,
} from "~/src";
import {
  createUserDtoFactory,
  listUsersQueryDtoFactory,
  listUsersResponseDtoFactory,
  paramsWithUserIdDtoFactory,
  updateUserDtoFactory,
  userDtoFactory,
} from "ᐸDtos testingᐳ";
import { UserDto } from "ᐸDtosᐳ";

import { UsersController } from "./usersController";
import { UsersService } from "./usersService";

describe("api/v1/users", () => {
  let controller: UsersController;
  let service: UsersService;

  let createUserCommand: MockProxy<CreateUserCommand>;
  let getUserByIdQuery: MockProxy<GetUserByIdQuery>;
  let listUsersQuery: MockProxy<ListUsersQuery>;
  let updateUserCommand: MockProxy<UpdateUserCommand>;

  beforeAll(() => {
    createUserCommand = mock();
    getUserByIdQuery = mock();
    listUsersQuery = mock();
    updateUserCommand = mock();

    service = new UsersService(
      createUserCommand,
      getUserByIdQuery,
      listUsersQuery,
      updateUserCommand,
    );
    controller = new UsersController(service);
  });

  describe("::createUser", () => {
    it("must create user", async () => {
      const createUserDto = createUserDtoFactory.build();

      const userDto: UserDto = {
        ...createUserDto,
        id: "1",
      };

      createUserCommand.execute.mockResolvedValue(userDto);

      await expect(controller.createUser(createUserDto)).resolves.toStrictEqual(
        userDto,
      );

      expect(createUserCommand.execute).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe("::getUserById", () => {
    it("must find user by id", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build();

      const userDto = userDtoFactory.build({
        id: paramsWithUserIdDto.id,
      });

      getUserByIdQuery.ask.mockResolvedValue(userDto);

      await expect(
        controller.getUserById(paramsWithUserIdDto),
      ).resolves.toStrictEqual(userDto);

      expect(getUserByIdQuery.ask).toHaveBeenCalledWith(paramsWithUserIdDto);
    });

    it("must throw error if user not found", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build({
        id: "99",
      });

      getUserByIdQuery.ask.mockResolvedValue(null);

      await expect(
        controller.getUserById(paramsWithUserIdDto),
      ).rejects.toThrowError(`user with id 99 not found`);

      expect(getUserByIdQuery.ask).toHaveBeenCalledWith(paramsWithUserIdDto);
    });
  });

  describe("::listUsers", () => {
    it("must list user", async () => {
      const listUsersQueryDto = listUsersQueryDtoFactory.build({
        pageSize: 10,
        pageToken: "0",
      });

      const userDtos = userDtoFactory.buildList(10);

      listUsersQuery.ask.mockResolvedValue(userDtos);

      await expect(
        controller.listUsers(listUsersQueryDto),
      ).resolves.toStrictEqual(
        listUsersResponseDtoFactory.build({
          users: userDtos,
          nextPageToken: "10",
        }),
      );

      expect(listUsersQuery.ask).toHaveBeenCalledWith(listUsersQueryDto);
    });

    it("must return empty nextPageToken if users less than pageSize", async () => {
      const listUsersQueryDto = listUsersQueryDtoFactory.build({
        pageSize: 10,
      });

      const userDtos = userDtoFactory.buildList(5);

      listUsersQuery.ask.mockResolvedValue(userDtos);

      await expect(
        controller.listUsers(listUsersQueryDto),
      ).resolves.toStrictEqual(
        listUsersResponseDtoFactory.build({
          users: userDtos,
          nextPageToken: undefined,
        }),
      );

      expect(listUsersQuery.ask).toHaveBeenCalledWith(listUsersQueryDto);
    });
  });

  describe("::updateUser", () => {
    it("must update user", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build({
        id: "99",
      });

      const updateUserDto = updateUserDtoFactory.build();

      const userDto: UserDto = userDtoFactory.build({
        ...updateUserDto,
        id: paramsWithUserIdDto.id,
      });

      updateUserCommand.execute.mockResolvedValue(userDto);

      await expect(
        controller.updateUser(paramsWithUserIdDto, updateUserDto),
      ).resolves.toStrictEqual(userDto);

      expect(updateUserCommand.execute).toHaveBeenCalledWith({
        ...paramsWithUserIdDto,
        ...updateUserDto,
      });
    });

    it("must throw error if user not found", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build({
        id: "99",
      });

      const updateUserDto = updateUserDtoFactory.build();

      updateUserCommand.execute.mockResolvedValue(null);

      await expect(
        controller.updateUser(paramsWithUserIdDto, updateUserDto),
      ).rejects.toThrowError("user with id 99 not found");

      expect(updateUserCommand.execute).toHaveBeenCalledWith({
        ...paramsWithUserIdDto,
        ...updateUserDto,
      });
    });
  });
});
