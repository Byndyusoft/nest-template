import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Exception, SpanStatusCode } from "@opentelemetry/api";
import { Request } from "express";
import { TraceService } from "nestjs-otel";
import { catchError, Observable, tap } from "rxjs";

import { dataToString } from "./dataToString";

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  public constructor(private readonly traceService: TraceService) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();

    const currentSpan = this.traceService.getSpan();

    currentSpan?.addEvent("request", {
      body: dataToString(request.body),
    });

    return next.handle().pipe(
      tap((data) => {
        currentSpan?.addEvent("response", {
          body: dataToString(data),
        });
      }),
      catchError((error: unknown) => {
        currentSpan?.setStatus({ code: SpanStatusCode.ERROR });
        currentSpan?.recordException(error as Exception);

        throw error;
      }),
    );
  }
}
