import { Injectable } from "@nestjs/common";

import { ParamsWithUserIdDto, UserDto } from "ᐸDtosᐳ";

import { GetUserByIdUseCase } from "./useCases";

@Injectable()
export class UsersService {
  public constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  public getUserById(params: ParamsWithUserIdDto): Promise<UserDto> {
    return this.getUserByIdUseCase.execute(params);
  }
}
