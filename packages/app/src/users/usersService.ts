/*
 * Copyright 2021 Byndyusoft
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

import {
  InjectKafkaProducer,
  InjectKafkaSchemaRegistry,
  KafkaProducer,
  KafkaSchemaRegistry,
} from "@byndyusoft/nest-kafka";
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

import { ConfigDto } from "../infrastructure";

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
    @InjectKafkaProducer()
    private readonly kafkaProducer: KafkaProducer,
    @InjectKafkaSchemaRegistry()
    private readonly kafkaSchemaRegistry: KafkaSchemaRegistry,
    private readonly config: ConfigDto,
  ) {}

  public async createUser(body: CreateUserDto): Promise<UserDto> {
    const user = await this.createUserUseCase.execute(body);

    const schemaId = await this.kafkaSchemaRegistry.getLatestSchemaId(
      `${this.config.kafka.topic}-value`,
    );

    const userAvro = await this.kafkaSchemaRegistry.encode(schemaId, user);

    await this.kafkaProducer.send({
      topic: this.config.kafka.topic,
      messages: [
        {
          key: user.userId,
          value: userAvro,
          headers: {
            "app.name": "nest-template",
            "app.magic_array": ["1", "2"],
          },
        },
      ],
    });

    return user;
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
