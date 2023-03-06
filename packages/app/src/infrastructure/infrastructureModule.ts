import {
  OpenTracingModule,
  TracedHttpModule,
} from "@byndyusoft/nest-opentracing";
import { Logger } from "@byndyusoft/nest-pino";
import { ApiTags } from "@byndyusoft/nest-swagger";
import { PromController, PromModule } from "@digikare/nestjs-prom";
import { Module } from "@nestjs/common";
import { initTracerFromEnv } from "jaeger-client";

import { AboutModule } from "./about/aboutModule";
import { ClientsModule } from "./clients/clientsModule";
import { ConfigModule } from "./config/configModule";
import { ExceptionsModule } from "./exceptions/exceptionsModule";
import { HealthCheckModule } from "./healthCheck/healthCheckModule";
import { LoggerModule } from "./logger/loggerModule";
import { PackageJsonModule } from "./packageJson/packageJsonModule";
import { ConfigDto } from "./config";
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
      inject: [ConfigDto, PackageJsonDto],
      useFactory: (configDto: ConfigDto, packageJson: PackageJsonDto) => ({
        tracer: initTracerFromEnv(
          {
            serviceName: packageJson.name,
          },
          {
            tags: {
              version: packageJson.version,
              env: configDto.configEnv,
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
    LoggerModule,
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
export class InfrastructureModule {
  public constructor(private readonly logger: Logger) {}

  public onApplicationShutdown(signal?: string): void {
    this.logger.log(
      "Nest application stopped by %s",
      signal ?? "???",
      "NestApplication",
    );
  }
}
