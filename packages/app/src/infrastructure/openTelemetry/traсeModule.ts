import { HttpModule } from "@nestjs/axios";
import { ConfigurableModuleBuilder, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TraceService } from "nestjs-otel";

import { AxiosTraceInterceptor } from "./axiosTraceInterceptor";
import { TraceInterceptor } from "./traceInterceptor";
import { TraceModuleOptions } from "./traceModuleOptions";
import { TRACE_MODULE_OPTIONS_TOKEN } from "./traceModuleOptionsToken";

const { ConfigurableModuleClass } =
  new ConfigurableModuleBuilder<TraceModuleOptions>({
    optionsInjectionToken: TRACE_MODULE_OPTIONS_TOKEN,
  }).build();

@Module({
  imports: [HttpModule],
  providers: [
    TraceService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TraceInterceptor,
    },
    AxiosTraceInterceptor,
  ],
})
export class TraceModule extends ConfigurableModuleClass {}
