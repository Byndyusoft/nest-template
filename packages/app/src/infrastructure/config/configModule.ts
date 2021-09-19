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

import { DynamicModule, Module } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import dotenv from "dotenv";
import execa from "execa";

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
          inject: [ConfigEnvToken],
          useFactory: (configEnv: string) =>
            ConfigModule.__configFactory(configEnv),
        },
      ],
      exports: [ConfigEnvToken, ConfigDto],
    };
  }

  private static __configEnvFactory(): string {
    dotenv.config({
      path: path.join(process.cwd(), ".env"),
    });

    if (!process.env.CASC_ENV) {
      throw new TypeError("process.env.CASC_ENV must be provided");
    }

    return process.env.CASC_ENV;
  }

  private static async __configFactory(configEnv: string): Promise<ConfigDto> {
    const config = await ConfigModule.__loadConfig(configEnv);
    await ConfigModule.__validateConfig(config);

    return config;
  }

  private static async __loadConfig(configEnv: string): Promise<ConfigDto> {
    const cascBinPath = path.join(
      path.dirname(require.resolve("@byndyusoft/casc")),
      "bin",
      "index.js",
    );

    const cascDirectory = path.join(process.cwd(), ".casc");

    const { stdout } = await execa(
      "node",
      [
        cascBinPath,
        "config:build",
        ...["--cascDir", cascDirectory],
        ...["--env", configEnv],
      ],
      {
        env: {
          FORCE_COLOR: "false",
        },
      },
    );

    return plainToClass(ConfigDto, JSON.parse(stdout));
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
