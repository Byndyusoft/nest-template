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
} from "../../src/users/useCases";
import { UsersController } from "../../src/users/usersController";
import { UsersService } from "../../src/users/usersService";

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
