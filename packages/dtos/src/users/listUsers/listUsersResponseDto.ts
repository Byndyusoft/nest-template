import { UserDto } from "../common";

export class ListUsersResponseDto {
  public readonly users!: UserDto[];

  public readonly nextPageToken?: string;
}
