import { DynamicModule, Module } from "@nestjs/common";

import { UsersModule } from "./users/usersModule";

@Module({})
export class AppModule {
  public static async register(): Promise<DynamicModule> {
    // InfrastructureModule must be imported last, see InjectPinoLogger in nestjs-pino for more details
    const { InfrastructureModule } = await import(
      "./infrastructure/infrastructureModule"
    );

    return {
      module: AppModule,
      imports: [UsersModule, InfrastructureModule],
    };
  }
}
