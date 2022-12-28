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
