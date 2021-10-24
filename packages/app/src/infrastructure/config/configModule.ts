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

import os from "os";
import path from "path";

import { LogLevel } from "@byndyusoft/pino-logger-factory";
import { DynamicModule, Module } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import dotenv from "dotenv";

import { ConfigDto } from "./dtos";
import { ConfigEnvToken } from "./tokens";

@Module({})
export class ConfigModule {
  public static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      global: true,
      providers: [
        {
          provide: ConfigEnvToken,
          useFactory: () => ConfigModule.__configEnvFactory(),
        },
        {
          provide: ConfigDto,
          useFactory: () => ConfigModule.__configFactory(),
        },
      ],
      exports: [ConfigEnvToken, ConfigDto],
    };
  }

  private static __configEnvFactory(): string {
    dotenv.config({
      path: path.join(process.cwd(), ".env"),
    });

    return process.env.CONFIG_ENV ?? "unknown";
  }

  private static async __configFactory(): Promise<ConfigDto> {
    const config = ConfigModule.__loadConfig();
    await ConfigModule.__validateConfig(config);

    return config;
  }

  private static __loadConfig(): ConfigDto {
    const plainConfig: ConfigDto = {
      pg: {
        writeConnectionString: process.env.PG_WRITE_CONNECTION_STRING as string,
        readConnectionString: process.env.PG_READ_CONNECTION_STRING as string,
        connectionTimeout: Number(process.env.PG_CONNECTION_TIMEOUT ?? "60000"),
        poolSize: Number(process.env.PG_POOL_SIZE ?? "10"),
      },
      http: {
        port: Number(process.env.HTTP_PORT ?? "8080"),
        host: process.env.HTTP_HOST ?? "0.0.0.0",
        defaultClientTimeout: Number(
          process.env.HTTP_DEFAULT_CLIENT_TIMEOUT ?? "60000",
        ),
      },
      logger: {
        level: (process.env.LOGGER_LEVEL ?? LogLevel.info) as LogLevel,
        pretty: (process.env.LOGGER_PRETTY ?? "false") === "true",
      },
    };

    return plainToClass(ConfigDto, plainConfig);
  }

  private static async __validateConfig(config: ConfigDto): Promise<void> {
    const errors = await validate(config, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new Error(errors.map((x) => x.toString()).join(os.EOL));
    }
  }
}
