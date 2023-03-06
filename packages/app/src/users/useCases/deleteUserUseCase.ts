import { Injectable } from "@nestjs/common";

import { ParamsWithUserIdDto, QueryWithUserVersionDto, UserDto } from "ᐸDtosᐳ";

import { UpdateUserCommand } from "../dataAccess";

import { CheckUserExistsUseCase } from "./checkUserExistsUseCase";

@Injectable()
export class DeleteUserUseCase {
  public constructor(
    private readonly checkUserExistsUseCase: CheckUserExistsUseCase,
    private readonly updateUserCommand: UpdateUserCommand,
  ) {}

  public async execute(
    params: ParamsWithUserIdDto,
    query: QueryWithUserVersionDto,
  ): Promise<UserDto> {
    await this.checkUserExistsUseCase.execute(params);

    return this.updateUserCommand.execute({
      userId: params.userId,
      userVersion: query.userVersion,

      payload: {
        deletedAt: new Date(),
      },
    });
  }
}
