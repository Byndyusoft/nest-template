/*
 * Copyright 2022 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
