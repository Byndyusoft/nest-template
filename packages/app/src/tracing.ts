import * as process from "process";

import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from "@opentelemetry/core";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { B3InjectEncoding, B3Propagator } from "@opentelemetry/propagator-b3";
import { JaegerPropagator } from "@opentelemetry/propagator-jaeger";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";

const exporter = new OTLPTraceExporter({
  url: String(process.env.JAEGER_ENDPOINT),
});

const otelSDK = new NodeSDK({
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
  instrumentations: [getNodeAutoInstrumentations()],
});

export default otelSDK;
