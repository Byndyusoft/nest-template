import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Exception, SpanStatusCode } from "@opentelemetry/api";
import { Request } from "express";
import { TraceService } from "nestjs-otel";
import { catchError, Observable, tap } from "rxjs";

import { dataToString } from "./dataToString";
import { TraceModuleOptions } from "./traceModuleOptions";
import { TRACE_MODULE_OPTIONS_TOKEN } from "./traceModuleOptionsToken";

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  public constructor(
    private readonly traceService: TraceService,
    @Inject(TRACE_MODULE_OPTIONS_TOKEN)
    private readonly options: TraceModuleOptions,
  ) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const currentSpan = this.traceService.getSpan();

    if (this.options.logBodies) {
      const request = context.switchToHttp().getRequest<Request>();

      currentSpan?.addEvent("request", {
        body: dataToString(request.body),
      });
    }

    return next.handle().pipe(
      tap((data) => {
        if (this.options.logBodies) {
          currentSpan?.addEvent("response", {
            body: dataToString(data),
          });
        }
      }),
      catchError((error: unknown) => {
        currentSpan?.setStatus({ code: SpanStatusCode.ERROR });
        currentSpan?.recordException(error as Exception);

        throw error;
      }),
    );
  }
}
