import { mock, MockProxy } from "jest-mock-extended";

import { paramsWithUserIdDtoFactory, userDtoFactory } from "ᐸDtos testingᐳ";

import { ListUsersQuery } from "../../../src/users/dataAccess";
import { UserNotFoundException } from "../../../src/users/exceptions";
import { GetUserByIdUseCase } from "../../../src/users/useCases";

describe("GetUserByIdUseCase", () => {
  let useCase: GetUserByIdUseCase;

  let listUsersQuery: MockProxy<ListUsersQuery>;

  beforeAll(() => {
    listUsersQuery = mock();

    useCase = new GetUserByIdUseCase(listUsersQuery);
  });

  it("must throw exception if user doesn't exists", async () => {
    const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build({
      userId: "1",
    });

    listUsersQuery.ask.mockResolvedValue([]);

    await expect(useCase.execute(paramsWithUserIdDto)).rejects.toThrow(
      UserNotFoundException,
    );
  });

  it("must get user by id", async () => {
    const paramsWithUserIdDto = paramsWithUserIdDtoFactory.build();

    const userDto = userDtoFactory.build();

    listUsersQuery.ask.mockResolvedValue([userDto]);

    await expect(useCase.execute(paramsWithUserIdDto)).resolves.toStrictEqual(
      userDto,
    );
  });
});
