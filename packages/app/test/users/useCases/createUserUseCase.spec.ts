import { mock, MockProxy } from "jest-mock-extended";

import { createUserDtoFactory, userDtoFactory } from "ᐸDtos testingᐳ";

import { CreateUserCommand } from "../../../src/users/dataAccess";
import { CreateUserUseCase } from "../../../src/users/useCases";

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
