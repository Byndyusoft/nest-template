import { Injectable } from "@nestjs/common";

import {
  ParamsWithUserIdDto,
  QueryWithUserVersionDto,
  UpdateUserDto,
  UserDto,
} from "ᐸDtosᐳ";

import { UpdateUserCommand } from "../dataAccess";

import { CheckUserExistsUseCase } from "./checkUserExistsUseCase";

@Injectable()
export class UpdateUserUseCase {
  public constructor(
    private readonly checkUserExistsUseCase: CheckUserExistsUseCase,
    private readonly updateUserCommand: UpdateUserCommand,
  ) {}

  public async execute(
    params: ParamsWithUserIdDto,
    query: QueryWithUserVersionDto,
    body: UpdateUserDto,
  ): Promise<UserDto> {
    await this.checkUserExistsUseCase.execute(params);

    return this.updateUserCommand.execute({
      userId: params.userId,
      userVersion: query.userVersion,

      payload: {
        name: body.name,
        email: body.email,
      },
    });
  }
}
