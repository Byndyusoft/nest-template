import { IncomingMessage } from "http";
import * as process from "process";

import { Span } from "@opentelemetry/api";
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
import { KafkaJsInstrumentation } from "@opentelemetry/instrumentation-kafkajs";
import { MessageInfo } from "@opentelemetry/instrumentation-kafkajs/build/src/types";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { PinoInstrumentation } from "@opentelemetry/instrumentation-pino";
import { JaegerPropagator } from "@opentelemetry/propagator-jaeger";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";

const ignoreUrls = ["_healthz", "_readiness", "metrics", "swagger"];

export const openTelemetrySetup = (serviceName: string): void => {
  const exporter = new OTLPTraceExporter({
    url: String(process.env.JAEGER_ENDPOINT),
  });

  const otelSDK = new NodeSDK({
    serviceName,
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
      // не заработало. возможно, из-за зависимости от open-tracing в nest-kafka
      new KafkaJsInstrumentation({
        consumerHook(span: Span, info: MessageInfo) {
          span.setAttribute("topic", info.topic);
          span.setAttribute("partition", info.message.partition ?? "");
        },
      }),
    ],
  });

  otelSDK.start();
};
