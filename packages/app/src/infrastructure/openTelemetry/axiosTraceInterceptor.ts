import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { Span, SpanStatusCode } from "@opentelemetry/api";
import { AxiosResponse, InternalAxiosRequestConfig, isAxiosError } from "axios";
import { TraceService } from "nestjs-otel";

import { dataToString } from "./dataToString";
import { TraceModuleOptions } from "./traceModuleOptions";
import { TRACE_MODULE_OPTIONS_TOKEN } from "./traceModuleOptionsToken";

const AXIOS_TRACE_CONFIG_KEY = Symbol("AxiosTraceInterceptor");

interface AxiosRequestConfigWithSpan extends InternalAxiosRequestConfig {
  [AXIOS_TRACE_CONFIG_KEY]?: {
    childSpan: Span;
  };
}

@Injectable()
export class AxiosTraceInterceptor implements OnModuleInit {
  public constructor(
    private readonly traceService: TraceService,
    private readonly httpService: HttpService,
    @Inject(TRACE_MODULE_OPTIONS_TOKEN)
    private readonly options: TraceModuleOptions,
  ) {}

  public onModuleInit(): void {
    const { axiosRef } = this.httpService;
    axiosRef.interceptors.request.use(this.requestFulfilled(), this.rejected());
    axiosRef.interceptors.response.use(
      this.responseFulfilled(),
      this.rejected(),
    );
  }

  private getSpanFromConfig(
    config: AxiosRequestConfigWithSpan,
  ): Span | undefined {
    return config[AXIOS_TRACE_CONFIG_KEY]?.childSpan;
  }

  private rejected(): (error: unknown) => unknown {
    return (error) => {
      if (isAxiosError(error)) {
        const span = this.getSpanFromConfig(
          error.config as AxiosRequestConfigWithSpan,
        );

        if (error.status && error.status >= 500) {
          span?.setStatus({ code: SpanStatusCode.ERROR });
        }

        span?.recordException(error);

        span?.end();
      }

      throw error;
    };
  }

  private requestFulfilled(): (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig {
    return (config) => {
      if (!this.options.logBodies) {
        return config;
      }

      const method = (config.method ?? "").toUpperCase();

      const span = this.traceService.startSpan(
        `${method} request, response logs`,
      );

      span.addEvent("request", {
        body: dataToString(config.data),
      });

      // @ts-expect-error
      config[AXIOS_TRACE_CONFIG_KEY] = {
        childSpan: span,
      };

      return config;
    };
  }

  private responseFulfilled(): (response: AxiosResponse) => AxiosResponse {
    return (response) => {
      if (!this.options.logBodies) {
        return response;
      }

      const span = this.getSpanFromConfig(
        response.config as AxiosRequestConfigWithSpan,
      );

      span?.addEvent("response", {
        body: dataToString(response.data),
      });

      span?.end();

      return response;
    };
  }
}
