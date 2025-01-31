import os from "os";

import { LogLevel } from "@byndyusoft/pino-logger-factory";
import { DynamicModule, Module } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { ConfigDto } from "./dtos";

@Module({})
export class ConfigModule {
  public static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      global: true,
      providers: [
        {
          provide: ConfigDto,
          useFactory: () => ConfigModule.configFactory(),
        },
      ],
      exports: [ConfigDto],
    };
  }

  private static async configFactory(): Promise<ConfigDto> {
    const config = ConfigModule.loadConfig();
    await ConfigModule.validateConfig(config);

    return config;
  }

  private static loadConfig(): ConfigDto {
    const plainConfig: ConfigDto = {
      configEnv: process.env.CONFIG_ENV as string,
      http: {
        port: Number(process.env.HTTP_PORT ?? "8080"),
        host: process.env.HTTP_HOST ?? "0.0.0.0",
        swaggerServer: process.env.SWAGGER_SERVER ?? "/",
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

  private static async validateConfig(config: ConfigDto): Promise<void> {
    const errors = await validate(config, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new Error(errors.map((x) => x.toString()).join(os.EOL));
    }
  }
}
