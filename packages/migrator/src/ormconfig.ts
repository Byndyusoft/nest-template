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

import path from "path";

import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";

import * as entities from "ᐸEntitiesᐳ";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  entities: Object.values(entities),
  migrations: ["dist/migrations/*.js"],
  migrationsTransactionMode:
    (process.env.TYPEORM_MIGRATIONS_TRANSACTION_MODE as
      | "all"
      | "each"
      | undefined) ?? "each",
  logger: "advanced-console",
  cli: {
    migrationsDir: "src/migrations",
  },
  url: process.env.PG_CONNECTION_STRING as string,
  connectTimeoutMS: Number(process.env.PG_CONNECTION_TIMEOUT ?? "60000"),
};

export default connectionOptions;
