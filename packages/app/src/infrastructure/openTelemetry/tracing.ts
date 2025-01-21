import { IncomingMessage } from "http";
import * as process from "process";

import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from "@opentelemetry/core";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import {
  ExpressInstrumentation,
  ExpressLayerType,
} from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { PinoInstrumentation } from "@opentelemetry/instrumentation-pino";
import { B3InjectEncoding, B3Propagator } from "@opentelemetry/propagator-b3";
import { JaegerPropagator } from "@opentelemetry/propagator-jaeger";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";

const exporter = new OTLPTraceExporter({
  url: String(process.env.JAEGER_ENDPOINT),
});

const ignoreUrls = ["_healthz", "_readiness", "metrics", "swagger"];

const otelSDK = new NodeSDK({
  serviceName: process.env.SERVICE_NAME,
  spanProcessors: [new BatchSpanProcessor(exporter)],
  contextManager: new AsyncLocalStorageContextManager(),
  textMapPropagator: new CompositePropagator({
    propagators: [
      new JaegerPropagator(),
      new W3CTraceContextPropagator(),
      new W3CBaggagePropagator(),
      new B3Propagator(),
      new B3Propagator({
        injectEncoding: B3InjectEncoding.MULTI_HEADER,
      }),
    ],
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
  ],
});

export default otelSDK;
