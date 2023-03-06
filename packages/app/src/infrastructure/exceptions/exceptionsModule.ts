import { Global, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import {
  BaseExceptionFilter,
  CatchAllExceptionFilter,
  PrometheusExceptionFilter,
} from "./exceptionFilters";

@Global()
@Module({
  providers: [
    BaseExceptionFilter,
    PrometheusExceptionFilter,
    {
      provide: APP_FILTER,
      useClass: CatchAllExceptionFilter,
    },
  ],
})
export class ExceptionsModule {}
