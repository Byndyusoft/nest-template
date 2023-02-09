/* eslint-disable no-console,n/no-process-exit,unicorn/no-process-exit */

import "reflect-metadata";
import "source-map-support/register";

import { Logger, LoggerErrorInterceptor } from "@byndyusoft/nest-pino";
import { DocumentBuilder, SwaggerModule } from "@byndyusoft/nest-swagger";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import helmet from "helmet";

import { AppModule } from "./appModule";
import { ConfigDto, PackageJsonDto } from "./infrastructure";

function setupApp(app: NestExpressApplication): void {
  app.enableShutdownHooks();

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: "api/v",
  });

  app.use(helmet());

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new LoggerErrorInterceptor());
}

function setupSwagger(app: NestExpressApplication): void {
  const config = app.get(ConfigDto);
  const packageJson = app.get(PackageJsonDto);

  const options = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setVersion(packageJson.version)
    .setDescription(packageJson.description)
    .addServer(config.http.swaggerServer)
    .build();

  SwaggerModule.setup("api", app, SwaggerModule.createDocument(app, options));
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(
    await AppModule.register(),
    new ExpressAdapter(),
    {
      bufferLogs: true,
    },
  );

  const logger = app.get(Logger);
  app.useLogger(logger);

  setupApp(app);
  setupSwagger(app);

  const config = app.get(ConfigDto);
  await app.listen(config.http.port, config.http.host);

  logger.log(
    "Nest application listening on %s",
    await app.getUrl(),
    "NestApplication",
  );
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
