import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TraceService } from "nestjs-otel";

import { AxiosTraceInterceptor } from "./axiosTraceInterceptor";
import { TraceInterceptor } from "./traceInterceptor";

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
export class TraceModule {}
