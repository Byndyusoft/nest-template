import { IncomingMessage } from "http";
import process from "process";

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

const ignoreUrls = ["_healthz", "_readiness", "metrics", "swagger"];

const exporter = new OTLPTraceExporter({
  url: String(process.env.JAEGER_ENDPOINT),
});

/** PinoInstrumentation работает только тогда, когда:
 * экземпляр NodeSDK создается в отдельном файле и экспортируется, файл расположен именно в этой директории
 * скорее всего, проблема в сортировке импортов */
export const otelSDK = new NodeSDK({
  serviceName: process.env.SERVICE_NAME,
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
