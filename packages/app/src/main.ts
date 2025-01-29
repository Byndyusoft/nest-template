/* eslint-disable no-console,n/no-process-exit,unicorn/no-process-exit */

import "reflect-metadata";
import "source-map-support/register";

import fs from "fs/promises";
import { IncomingMessage } from "http";
import path from "path";
import process from "process";

import { Logger, LoggerErrorInterceptor } from "@byndyusoft/nest-pino";
import { DocumentBuilder, SwaggerModule } from "@byndyusoft/nest-swagger";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
  CompositePropagator,
  W3CTraceContextPropagator,
} from "@opentelemetry/core";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import {
  ExpressInstrumentation,
  ExpressLayerType,
} from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { PinoInstrumentation } from "@opentelemetry/instrumentation-pino";
import { JaegerPropagator } from "@opentelemetry/propagator-jaeger";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import helmet from "helmet";

import { AppModule } from "./appModule";
import { ConfigDto, PackageJsonDto } from "./infrastructure";

const ignoreUrls = ["_healthz", "_readiness", "metrics", "swagger"];

async function openTelemetrySetup(): Promise<void> {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJson = JSON.parse(
    await fs.readFile(packageJsonPath, "utf8"),
  ) as PackageJsonDto;

  const exporter = new OTLPTraceExporter({
    url: String(process.env.JAEGER_ENDPOINT),
  });

  const otelSDK = new NodeSDK({
    serviceName: packageJson.name,
    spanProcessors: [new BatchSpanProcessor(exporter)],
    contextManager: new AsyncLocalStorageContextManager(),
    textMapPropagator: new CompositePropagator({
      propagators: [new JaegerPropagator(), new W3CTraceContextPropagator()],
    }),
    instrumentations: [
      new HttpInstrumentation({
        ignoreIncomingRequestHook(request: IncomingMessage) {
          return ignoreUrls
            ? ignoreUrls.some((x) => !!request.url?.includes(x))
            : false;
        },
      }),
      new ExpressInstrumentation({
        ignoreLayersType: Object.values(ExpressLayerType),
      }),
      new PinoInstrumentation(),
      new PgInstrumentation(),
    ],
  });

  otelSDK.start();
}

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

  SwaggerModule.setup(
    "swagger",
    app,
    SwaggerModule.createDocument(app, options),
  );
}

async function bootstrap(): Promise<void> {
  // Start Open Telemetry before Nestjs factory creation
  // docs: https://opentelemetry.io/docs/languages/js/getting-started/nodejs/#setup
  await openTelemetrySetup();

  const app = await NestFactory.create<NestExpressApplication>(
    await AppModule.register(),
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
