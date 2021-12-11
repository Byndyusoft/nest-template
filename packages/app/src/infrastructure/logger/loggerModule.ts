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
  PinoHttpLoggerOptionsBuilder,
  PinoLoggerFactory,
  PinoLoggerOptionsBuilder,
} from "@byndyusoft/pino-logger-factory";
import { Module } from "@nestjs/common";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";

import { ConfigDto, ConfigEnvToken } from "../config";
import { PackageJsonDto } from "../packageJson";

// We need increase nestjs-pino LoggerModule topological level for correct middlewares register
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigEnvToken, ConfigDto, PackageJsonDto],
      useFactory: (
        configEnv: string,
        config: ConfigDto,
        packageJson: PackageJsonDto,
      ) => ({
        pinoHttp: new PinoHttpLoggerOptionsBuilder()
          .withLogger(
            new PinoLoggerFactory().create(
              new PinoLoggerOptionsBuilder()
                .withBase({
                  name: packageJson.name,
                  version: packageJson.version,
                  env: configEnv,
                })
                .withLevel(config.logger.level)
                .withPrettyPrint(config.logger.pretty)
                .build(),
            ),
          )
          .build(),
      }),
    }),
  ],
})
export class LoggerModule {}
