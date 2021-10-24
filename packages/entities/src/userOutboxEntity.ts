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

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { UserOutboxDto } from "ᐸDtosᐳ";

@Entity({
  name: "users_outbox",
})
export class UserOutboxEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id",
  })
  public readonly id!: string;

  @Column({
    type: "jsonb",
    name: "entity",
  })
  public readonly entity!: UserOutboxDto;

  @Column({
    type: "timestamptz",
    name: "timestamp",
  })
  public readonly timestamp!: Date;
}
