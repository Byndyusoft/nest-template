import "reflect-metadata";

import path from "path";

import dotenv from "dotenv";
import { DataSource } from "typeorm";

import * as entities from "ᐸEntitiesᐳ";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const AppDataSource = new DataSource({
  type: "postgres",
  entities: Object.values(entities),
  migrations: ["dist/migrations/*.js"],
  migrationsTransactionMode:
    (process.env.TYPEORM_MIGRATIONS_TRANSACTION_MODE as
      | "all"
      | "each"
      | undefined) ?? "each",
  logger: "advanced-console",
  url: process.env.PG_CONNECTION_STRING as string,
  connectTimeoutMS: Number(process.env.PG_CONNECTION_TIMEOUT ?? "60000"),
});
