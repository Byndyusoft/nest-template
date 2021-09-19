/*
 * Copyright 2021 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from "@nestjs/common";
import { isObject } from "@nestjs/common/utils/shared.utils";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { MESSAGES } from "@nestjs/core/constants";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

@Catch()
export class BaseExceptionFilter implements ExceptionFilter<unknown> {
  @Inject()
  protected readonly httpAdapterHost!: HttpAdapterHost;

  public constructor(
    @InjectPinoLogger("ExceptionsHandler")
    private readonly __logger: PinoLogger,
  ) {}

  private static __handleHttpException(
    exception: HttpException,
    host: ArgumentsHost,
    httpAdapter: AbstractHttpAdapter,
  ): void {
    const response = exception.getResponse();

    const message = isObject(response)
      ? response
      : {
          statusCode: exception.getStatus(),
          message: response,
        };

    httpAdapter.reply(host.getArgByIndex(1), message, exception.getStatus());
  }

  public catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    if (exception instanceof HttpException) {
      BaseExceptionFilter.__handleHttpException(exception, host, httpAdapter);
    } else {
      this.__handleUnknownException(exception, host, httpAdapter);
    }
  }

  private __handleUnknownException(
    exception: unknown,
    host: ArgumentsHost,
    httpAdapter: AbstractHttpAdapter,
  ): void {
    const body = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
    };

    httpAdapter.reply(host.getArgByIndex(1), body, body.statusCode);

    this.__logger.error(exception as Error);
  }
}
