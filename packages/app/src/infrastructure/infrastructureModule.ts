import { Logger } from "@byndyusoft/nest-pino";
import { ApiTags } from "@byndyusoft/nest-swagger";
import { PromController, PromModule } from "@digikare/nestjs-prom";
import { Module } from "@nestjs/common";
import { OpenTelemetryModule } from "nestjs-otel";

import { AboutModule } from "./about/aboutModule";
import { ClientsModule } from "./clients/clientsModule";
import { ConfigModule } from "./config/configModule";
import { ExceptionsModule } from "./exceptions/exceptionsModule";
import { HealthCheckModule } from "./healthCheck/healthCheckModule";
import { LoggerModule } from "./logger/loggerModule";
import { PackageJsonModule } from "./packageJson/packageJsonModule";
import { PgModule } from "./pg/pgModule";

ApiTags("Infrastructure")(PromController);

@Module({
  imports: [
    OpenTelemetryModule.forRoot(),
    // Initial modules
    ConfigModule.forRoot(),
    PackageJsonModule,
    ClientsModule,
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
    // Extra modules
    PgModule,
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
