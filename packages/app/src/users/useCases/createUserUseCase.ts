import { Injectable } from "@nestjs/common";

import { CreateUserDto, UserDto } from "ᐸDtosᐳ";

import { CreateUserCommand } from "../dataAccess";

@Injectable()
export class CreateUserUseCase {
  public constructor(private readonly createUserCommand: CreateUserCommand) {}

  public execute(body: CreateUserDto): Promise<UserDto> {
    return this.createUserCommand.execute({
      payload: {
        name: body.name,
        email: body.email,
      },
    });
  }
}
