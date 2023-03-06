import { Injectable } from "@nestjs/common";

import {
  CreateUserDto,
  ListUsersQueryDto,
  ListUsersResponseDto,
  ParamsWithUserIdDto,
  QueryWithUserVersionDto,
  UpdateUserDto,
  UserDto,
} from "ᐸDtosᐳ";

import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
} from "./useCases";

@Injectable()
export class UsersService {
  public constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  public createUser(body: CreateUserDto): Promise<UserDto> {
    return this.createUserUseCase.execute(body);
  }

  public deleteUser(
    params: ParamsWithUserIdDto,
    query: QueryWithUserVersionDto,
  ): Promise<UserDto> {
    return this.deleteUserUseCase.execute(params, query);
  }

  public getUserById(params: ParamsWithUserIdDto): Promise<UserDto> {
    return this.getUserByIdUseCase.execute(params);
  }

  public listUsers(query: ListUsersQueryDto): Promise<ListUsersResponseDto> {
    return this.listUsersUseCase.execute(query);
  }

  public updateUser(
    params: ParamsWithUserIdDto,
    query: QueryWithUserVersionDto,
    body: UpdateUserDto,
  ): Promise<UserDto> {
    return this.updateUserUseCase.execute(params, query, body);
  }
}
