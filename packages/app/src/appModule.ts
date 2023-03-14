import { DynamicModule, Module } from "@nestjs/common";

import { CliModule } from "./cli/cliModule";
import { UsersModule } from "./users/usersModule";

// @Module({
//   imports: [CliModule],
// })
@Module({})
export class AppModule {
  public static async register(): Promise<DynamicModule> {
    // InfrastructureModule must be imported last, due to decorated providers
    const { InfrastructureModule } = await import(
      "./infrastructure/infrastructureModule"
    );

    return {
      module: AppModule,
      imports: [UsersModule, InfrastructureModule, CliModule],
    };
  }
}
