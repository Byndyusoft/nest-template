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
  CheckUserExistsQuery,
  CreateUserCommand,
  DeleteUserCommand,
  GetUserByIdQuery,
  ListUsersQuery,
  UpdateUserCommand,
} from "~/src";
import {
  createUserDtoFactory,
  listUsersQueryDtoFactory,
  listUsersResponseDtoFactory,
  paramsWithUserIdDtoFactory,
  queryWithUserVersionDtoFactory,
  updateUserDtoFactory,
  userDtoFactory,
} from "ᐸDtos testingᐳ";

import { UsersController } from "./usersController";
import { UsersService } from "./usersService";

describe("api/v1/users", () => {
  let controller: UsersController;
  let service: UsersService;

  let checkUserExistsQuery: MockProxy<CheckUserExistsQuery>;
  let createUserCommand: MockProxy<CreateUserCommand>;
  let deleteUserCommand: MockProxy<DeleteUserCommand>;
  let getUserByIdQuery: MockProxy<GetUserByIdQuery>;
  let listUsersQuery: MockProxy<ListUsersQuery>;
  let updateUserCommand: MockProxy<UpdateUserCommand>;

  beforeAll(() => {
    checkUserExistsQuery = mock();
    createUserCommand = mock();
    deleteUserCommand = mock();
    getUserByIdQuery = mock();
    listUsersQuery = mock();
    updateUserCommand = mock();

    service = new UsersService(
      checkUserExistsQuery,
      createUserCommand,
      deleteUserCommand,
      getUserByIdQuery,
      listUsersQuery,
      updateUserCommand,
    );
    controller = new UsersController(service);
  });

  describe("::createUser", () => {
    it("must create user", async () => {
      const createUserDto = createUserDtoFactory.build();

      const userDto = userDtoFactory.build({
        ...createUserDto,
      });

      createUserCommand.execute.mockResolvedValue(userDto);

      await expect(controller.createUser(createUserDto)).resolves.toStrictEqual(
        userDto,
      );

      expect(createUserCommand.execute).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe("::deleteUser", () => {
    it("must delete user", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build();

      const queryWithUserVersionDto = queryWithUserVersionDtoFactory.build();

      const userDto = userDtoFactory.build({
        userId: paramsWithUserIdDto.userId,
        userVersion: queryWithUserVersionDto.userVersion + 1,
      });

      checkUserExistsQuery.ask.mockResolvedValue(true);

      deleteUserCommand.execute.mockResolvedValue(userDto);

      await expect(
        controller.deleteUser(paramsWithUserIdDto, queryWithUserVersionDto),
      ).resolves.toStrictEqual(userDto);

      expect(checkUserExistsQuery.ask).toHaveBeenCalledWith(
        paramsWithUserIdDto,
      );

      expect(deleteUserCommand.execute).toHaveBeenCalledWith({
        ...paramsWithUserIdDto,
        ...queryWithUserVersionDto,
      });
    });

    it("must throw error if user not found", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build({
        userId: "99",
      });

      const queryWithUserVersionDto = queryWithUserVersionDtoFactory.build();

      const userDto = userDtoFactory.build({
        userId: paramsWithUserIdDto.userId,
        userVersion: queryWithUserVersionDto.userVersion + 1,
      });

      checkUserExistsQuery.ask.mockResolvedValue(false);

      deleteUserCommand.execute.mockResolvedValue(userDto);

      await expect(
        controller.deleteUser(paramsWithUserIdDto, queryWithUserVersionDto),
      ).rejects.toThrowError("user with id 99 not found");

      expect(checkUserExistsQuery.ask).toHaveBeenCalledWith(
        paramsWithUserIdDto,
      );

      expect(deleteUserCommand.execute).not.toHaveBeenCalled();
    });
  });

  describe("::getUserById", () => {
    it("must find user by id", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build();

      const userDto = userDtoFactory.build({
        userId: paramsWithUserIdDto.userId,
      });

      getUserByIdQuery.ask.mockResolvedValue(userDto);

      await expect(
        controller.getUserById(paramsWithUserIdDto),
      ).resolves.toStrictEqual(userDto);

      expect(getUserByIdQuery.ask).toHaveBeenCalledWith(paramsWithUserIdDto);
    });

    it("must throw error if user not found", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build({
        userId: "99",
      });

      getUserByIdQuery.ask.mockResolvedValue(null);

      await expect(
        controller.getUserById(paramsWithUserIdDto),
      ).rejects.toThrowError("user with id 99 not found");

      expect(getUserByIdQuery.ask).toHaveBeenCalledWith(paramsWithUserIdDto);
    });
  });

  describe("::listUsers", () => {
    it("must list user", async () => {
      const listUsersQueryDto = listUsersQueryDtoFactory.build({
        pageSize: 10,
        pageToken: 0,
      });

      const userDtos = userDtoFactory.buildList(10);

      listUsersQuery.ask.mockResolvedValue(userDtos);

      await expect(
        controller.listUsers(listUsersQueryDto),
      ).resolves.toStrictEqual(
        listUsersResponseDtoFactory.build({
          users: userDtos,
          nextPageToken: 10,
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
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build();

      const queryWithUserVersionDto = queryWithUserVersionDtoFactory.build();

      const updateUserDto = updateUserDtoFactory.build();

      const userDto = userDtoFactory.build({
        ...updateUserDto,
        userId: paramsWithUserIdDto.userId,
        userVersion: queryWithUserVersionDto.userVersion + 1,
      });

      checkUserExistsQuery.ask.mockResolvedValue(true);

      updateUserCommand.execute.mockResolvedValue(userDto);

      await expect(
        controller.updateUser(
          paramsWithUserIdDto,
          queryWithUserVersionDto,
          updateUserDto,
        ),
      ).resolves.toStrictEqual(userDto);

      expect(checkUserExistsQuery.ask).toHaveBeenCalledWith(
        paramsWithUserIdDto,
      );

      expect(updateUserCommand.execute).toHaveBeenCalledWith({
        ...paramsWithUserIdDto,
        ...queryWithUserVersionDto,
        ...updateUserDto,
      });
    });

    it("must throw error if user not found", async () => {
      const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build({
        userId: "99",
      });

      const queryWithUserVersionDto = queryWithUserVersionDtoFactory.build();

      const updateUserDto = updateUserDtoFactory.build();

      const userDto = userDtoFactory.build({
        ...updateUserDto,
        userId: paramsWithUserIdDto.userId,
        userVersion: queryWithUserVersionDto.userVersion + 1,
      });

      checkUserExistsQuery.ask.mockResolvedValue(false);

      updateUserCommand.execute.mockResolvedValue(userDto);

      await expect(
        controller.updateUser(
          paramsWithUserIdDto,
          queryWithUserVersionDto,
          updateUserDto,
        ),
      ).rejects.toThrowError("user with id 99 not found");

      expect(checkUserExistsQuery.ask).toHaveBeenCalledWith(
        paramsWithUserIdDto,
      );

      expect(updateUserCommand.execute).not.toHaveBeenCalled();
    });
  });
});
