import { TracingService } from "@byndyusoft/nest-opentracing";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import _ from "lodash";
import { In, Repository } from "typeorm";

import { UserDto } from "ᐸDtosᐳ";
import { UserEntity } from "ᐸEntitiesᐳ";

import { UserEntityToUserDtoMapper } from "../mappers";

export interface IListUsersQueryOptions {
  readonly userIds?: string[];
  readonly names?: string[];
  readonly emails?: string[];
  readonly pageSize?: number;
  readonly pageToken?: number;
}

@Injectable()
export class ListUsersQuery {
  public constructor(
    private readonly tracingService: TracingService,
    private readonly userEntityToUserDtoMapper: UserEntityToUserDtoMapper,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public ask(options: IListUsersQueryOptions): Promise<UserDto[]> {
    return this.tracingService.traceAsyncFunction(
      ListUsersQuery.name,
      async () => {
        const users = await this.userRepository.find({
          where: _.omitBy(
            {
              userId: options.userIds ? In(options.userIds) : undefined,
              name: options.names ? In(options.names) : undefined,
              email: options.emails ? In(options.emails) : undefined,
            },
            (value) => value === undefined,
          ),
          order: options.pageSize
            ? {
                userId: "DESC",
              }
            : undefined,
          skip: options.pageToken,
          take: options.pageSize,
        });

        return users.map((x) => this.userEntityToUserDtoMapper.map(x));
      },
    );
  }
}
