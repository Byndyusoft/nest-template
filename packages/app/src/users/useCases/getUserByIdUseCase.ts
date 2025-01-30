import { Injectable } from "@nestjs/common";

import { ParamsWithUserIdDto, UserDto } from "ᐸDtosᐳ";

import { UserNotFoundException } from "../exceptions";

@Injectable()
export class GetUserByIdUseCase {
  public async execute(params: ParamsWithUserIdDto): Promise<UserDto> {
    return new Promise<UserDto>((resolve) => {
      if (params.userId === "1") {
        throw new UserNotFoundException(params.userId);
      }

      resolve(new UserDto());
    });
  }
}
