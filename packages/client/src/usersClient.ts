import { HttpClient } from "@byndyusoft/nest-http-client";
import { Injectable } from "@nestjs/common";

import { ParamsWithUserIdDto, UserDto } from "ᐸDtosᐳ";

@Injectable()
export class UsersClient {
  public constructor(private readonly httpClient: HttpClient) {}

  public getUserById(request: ParamsWithUserIdDto): Promise<UserDto> {
    return this.httpClient.endpoint("GET /users/{userId}", request);
  }
}
