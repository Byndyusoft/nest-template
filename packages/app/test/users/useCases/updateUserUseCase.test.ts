import { mock, MockProxy } from "jest-mock-extended";

import {
  paramsWithUserIdDtoFactory,
  queryWithUserVersionDtoFactory,
  updateUserDtoFactory,
  userDtoFactory,
} from "ᐸDtos testingᐳ";

import { UpdateUserCommand } from "../../../src/users/dataAccess";
import {
  CheckUserExistsUseCase,
  UpdateUserUseCase,
} from "../../../src/users/useCases";

describe("UpdateUserCommand", () => {
  let useCase: UpdateUserUseCase;

  let checkUserExistsUseCase: MockProxy<CheckUserExistsUseCase>;
  let updateUserCommand: MockProxy<UpdateUserCommand>;

  beforeAll(() => {
    checkUserExistsUseCase = mock();
    updateUserCommand = mock();

    useCase = new UpdateUserUseCase(checkUserExistsUseCase, updateUserCommand);
  });

  it("must update user", async () => {
    const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build();

    const queryWithUserVersionDto = queryWithUserVersionDtoFactory.build();

    const updateUserDto = updateUserDtoFactory.build();

    const userDto = userDtoFactory.build();

    updateUserCommand.execute.mockResolvedValue(userDto);

    await expect(
      useCase.execute(
        paramsWithUserIdDto,
        queryWithUserVersionDto,
        updateUserDto,
      ),
    ).resolves.toStrictEqual(userDto);
  });
});
