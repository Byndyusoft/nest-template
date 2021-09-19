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
  OpenTracingModule,
  TracedHttpModule,
} from "@byndyusoft/nest-opentracing";
import {
  PinoHttpLoggerOptionsBuilder,
  PinoLoggerFactory,
  PinoLoggerOptionsBuilder,
} from "@byndyusoft/pino-logger-factory";
import { PromController, PromModule } from "@digikare/nestjs-prom";
import { Module, OnApplicationShutdown } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { initTracerFromEnv } from "jaeger-client";
import { Logger, LoggerModule } from "nestjs-pino";

import { AboutModule } from "./about/aboutModule";
import { ClientsModule } from "./clients/clientsModule";
import { ConfigModule } from "./config/configModule";
import { ExceptionsModule } from "./exceptions/exceptionsModule";
import { HealthCheckModule } from "./healthCheck/healthCheckModule";
import { PackageJsonModule } from "./packageJson/packageJsonModule";
import { ConfigDto, ConfigEnvToken } from "./config";
import { PackageJsonDto } from "./packageJson";

ApiTags("Infrastructure")(PromController);

@Module({
  imports: [
    // Initial modules
    ConfigModule.forRoot(),
    PackageJsonModule,
    // ClientsModule must be registered before @byndyusoft/nest-opentracing because axios interceptors order is reversed
    ClientsModule,
    // @byndyusoft/nest-opentracing
    OpenTracingModule.forRootAsync({
      inject: [ConfigEnvToken, PackageJsonDto],
      useFactory: (configEnv: string, packageJson: PackageJsonDto) => ({
        tracer: initTracerFromEnv(
          {
            serviceName: packageJson.name,
          },
          {
            tags: {
              version: packageJson.version,
              env: configEnv,
            },
          },
        ),
        applyRoutes: ["/api/*"],
        ignoreRoutes: [],
        logBodies: true,
      }),
    }),
    TracedHttpModule.registerAsync({
      useFactory: () => ({
        logBodies: true,
      }),
    }),
    // LoggerModule must be registered after @byndyusoft/nest-opentracing, to get trace id
    LoggerModule.forRootAsync({
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
    // Infrastructure controllers
    AboutModule,
    PromModule.forRoot({
      withExceptionFilter: false,
      withHttpMiddleware: {
        enable: true,
      },
    }),
    HealthCheckModule,
    // ExceptionsModule must be registered after all modules with exception filters
    ExceptionsModule,
  ],
})
export class InfrastructureModule implements OnApplicationShutdown {
  public constructor(private readonly __logger: Logger) {}

  public onApplicationShutdown(signal?: string): void {
    this.__logger.log(
      "Nest application stopped by %s",
      "NestApplication",
      signal ?? "???",
    );
  }
}