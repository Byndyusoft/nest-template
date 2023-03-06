import { CounterMetric, PromService } from "@digikare/nestjs-prom";
import { normalizePath } from "@digikare/nestjs-prom/dist/utils";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request } from "express";

@Catch()
export class PrometheusExceptionFilter implements ExceptionFilter<unknown> {
  private readonly counter: CounterMetric;

  public constructor(promService: PromService) {
    this.counter = promService.getCounter({
      name: "http_exceptions",
      labelNames: ["method", "status", "path"],
    });
  }

  public catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request: Request = context.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const path = normalizePath(request.url, [], "#val");

    this.counter.inc({
      method: request.method,
      path,
      status,
    });
  }
}
