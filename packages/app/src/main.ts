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

/* eslint-disable no-console,no-process-exit,unicorn/no-process-exit */

import "reflect-metadata";
import "source-map-support/register";

import { DocumentBuilder, SwaggerModule } from "@byndyusoft/nest-swagger";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import helmet from "helmet";
import { Logger } from "nestjs-pino";

import { ConfigDto, PackageJsonDto } from "~/src";

import { AppModule } from "./appModule";

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
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
}

function setupSwagger(app: NestExpressApplication): void {
  const packageJson = app.get(PackageJsonDto);

  const options = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setVersion(packageJson.version)
    .setDescription(packageJson.description)
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
