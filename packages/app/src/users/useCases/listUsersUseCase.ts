import { Injectable } from "@nestjs/common";

import { ListUsersQueryDto, ListUsersResponseDto } from "ᐸDtosᐳ";

import { ListUsersQuery } from "../dataAccess";

@Injectable()
export class ListUsersUseCase {
  public constructor(private readonly listUsersQuery: ListUsersQuery) {}

  public async execute(
    query: ListUsersQueryDto,
  ): Promise<ListUsersResponseDto> {
    const pageToken = Number(query.pageToken);

    const users = await this.listUsersQuery.ask({
      userIds: query.userIds,
      names: query.names,
      emails: query.emails,
      pageSize: query.pageSize,
      pageToken,
    });

    return {
      users,
      nextPageToken:
        users.length < query.pageSize
          ? undefined
          : String(users.length + pageToken),
    };
  }
}
