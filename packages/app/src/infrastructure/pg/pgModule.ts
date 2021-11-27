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

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import * as entities from "ᐸEntitiesᐳ";

import { ConfigDto } from "../config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigDto],
      useFactory: (config: ConfigDto) => ({
        type: "postgres",
        entities: Object.values(entities),
        logging: "all",
        logger: "debug",
        extra: {
          max: config.pg.poolSize,
        },
        replication: {
          master: {
            url: config.pg.writeConnectionString,
          },
          slaves: [
            {
              url: config.pg.readConnectionString,
            },
          ],
        },
        connectTimeoutMS: config.pg.connectionTimeout,
      }),
    }),
  ],
})
export class PgModule {}
