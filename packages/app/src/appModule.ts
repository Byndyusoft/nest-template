import { DynamicModule, Module } from "@nestjs/common";
import { OpenTelemetryModule } from "nestjs-otel";

import { UsersModule } from "./users/usersModule";

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true, // Includes Host Metrics
    apiMetrics: {
      enable: true, // Includes api metrics
      defaultAttributes: {
        // You can set default labels for api metrics
        custom: "label",
      },
      ignoreRoutes: ["/favicon.ico"], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
      ignoreUndefinedRoutes: true, //Records metrics for all URLs, even undefined ones
      prefix: "my_prefix", // Add a custom prefix to all API metrics
    },
  },
});

@Module({
  imports: [OpenTelemetryModuleConfig],
})
export class AppModule {
  public static async register(): Promise<DynamicModule> {
    // InfrastructureModule must be imported last, due to decorated providers
    const { InfrastructureModule } = await import(
      "./infrastructure/infrastructureModule"
    );

    return {
      module: AppModule,
      imports: [UsersModule, InfrastructureModule],
    };
  }
}
