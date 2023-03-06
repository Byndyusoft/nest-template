import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

import { BaseExceptionFilter } from "./baseExceptionFilter";
import { PrometheusExceptionFilter } from "./prometheusExceptionFilter";

@Catch()
export class CatchAllExceptionFilter implements ExceptionFilter<unknown> {
  public constructor(
    private readonly baseExceptionFilter: BaseExceptionFilter,
    private readonly prometheusExceptionFilter: PrometheusExceptionFilter,
  ) {}

  public catch(exception: unknown, host: ArgumentsHost): void {
    this.prometheusExceptionFilter.catch(exception, host);
    this.baseExceptionFilter.catch(exception, host);
  }
}
