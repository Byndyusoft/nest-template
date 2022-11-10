import {
  PinoHttpLoggerOptionsBuilder,
  PinoLoggerFactory,
  PinoLoggerOptionsBuilder,
} from "@byndyusoft/pino-logger-factory";
import { Module } from "@nestjs/common";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";

import { ConfigDto } from "../config";
import { PackageJsonDto } from "../packageJson";

// We need increase nestjs-pino LoggerModule topological level for correct middlewares register
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigDto, PackageJsonDto],
      useFactory: (config: ConfigDto, packageJson: PackageJsonDto) => ({
        pinoHttp: new PinoHttpLoggerOptionsBuilder()
          .withLogger(
            new PinoLoggerFactory().create(
              new PinoLoggerOptionsBuilder()
                .withBase({
                  name: packageJson.name,
                  version: packageJson.version,
                  env: config.configEnv,
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
