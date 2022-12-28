import { mock, MockProxy } from "jest-mock-extended";

import {
  listUsersQueryDtoFactory,
  listUsersResponseDtoFactory,
  userDtoFactory,
} from "ᐸDtos testingᐳ";

import { ListUsersQuery } from "../../../src/users/dataAccess";
import { ListUsersUseCase } from "../../../src/users/useCases";

describe("ListUsersUseCase", () => {
  let useCase: ListUsersUseCase;

  let listUsersQuery: MockProxy<ListUsersQuery>;

  beforeAll(() => {
    listUsersQuery = mock();

    useCase = new ListUsersUseCase(listUsersQuery);
  });

  it("must return empty nextPageToken if users less than pageSize", async () => {
    const listUsersQueryDto = listUsersQueryDtoFactory.build({
      pageSize: 10,
    });

    const userDtos = userDtoFactory.buildList(5);

    listUsersQuery.ask.mockResolvedValue(userDtos);

    await expect(useCase.execute(listUsersQueryDto)).resolves.toStrictEqual(
      listUsersResponseDtoFactory.build({
        users: userDtos,
        nextPageToken: undefined,
      }),
    );
  });

  it("must list users", async () => {
    const listUsersQueryDto = listUsersQueryDtoFactory.build({
      pageSize: 10,
      pageToken: "0",
    });

    const userDtos = userDtoFactory.buildList(10);

    listUsersQuery.ask.mockResolvedValue(userDtos);

    await expect(useCase.execute(listUsersQueryDto)).resolves.toStrictEqual(
      listUsersResponseDtoFactory.build({
        users: userDtos,
        nextPageToken: "10",
      }),
    );
  });
});
