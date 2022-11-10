import { HttpClient } from "@byndyusoft/nest-http-client";
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

@Injectable()
export class UsersClient {
  public constructor(private readonly httpClient: HttpClient) {}

  public createUser(request: CreateUserDto): Promise<UserDto> {
    return this.httpClient.endpoint("POST /users", request);
  }

  public deleteUser(
    request: ParamsWithUserIdDto & QueryWithUserVersionDto,
  ): Promise<UserDto> {
    return this.httpClient.endpoint(
      "DELETE /users/{userId}{?userVersion}",
      request,
    );
  }

  public getUserById(request: ParamsWithUserIdDto): Promise<UserDto> {
    return this.httpClient.endpoint("GET /users/{userId}", request);
  }

  public listUsers(
    request?: Partial<ListUsersQueryDto>,
  ): Promise<ListUsersResponseDto> {
    return this.httpClient.endpoint("GET /users", request);
  }

  public updateUser(
    request: ParamsWithUserIdDto & QueryWithUserVersionDto & UpdateUserDto,
  ): Promise<UserDto> {
    return this.httpClient.endpoint(
      "PATCH /users/{userId}{?userVersion}",
      request,
    );
  }
}
