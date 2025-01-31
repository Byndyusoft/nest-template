import { paramsWithUserIdDtoFactory } from "ᐸDtos testingᐳ";

import { UserNotFoundException } from "../../src/users/exceptions";
import { GetUserByIdUseCase } from "../../src/users/useCases";
import { UsersController } from "../../src/users/usersController";
import { UsersService } from "../../src/users/usersService";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  beforeAll(() => {
    service = new UsersService(new GetUserByIdUseCase());

    controller = new UsersController(service);
  });

  describe("getUserById", () => {
    describe("when userId is 1", () => {
      const params = paramsWithUserIdDtoFactory.build({ userId: "1" });

      it("throw error", async () => {
        await expect(controller.getUserById(params)).rejects.toThrow(
          UserNotFoundException,
        );
      });
    });
  });
});
