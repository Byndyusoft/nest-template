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
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from "@byndyusoft/nest-swagger";
import { applyDecorators, HttpStatus } from "@nestjs/common";

import {
  ApiBadRequestResponseDto,
  ApiConflictResponseDto,
  ApiForbiddenResponseDto,
  ApiInternalServerErrorResponseDto,
  ApiNotFoundResponseDto,
} from "../dtos";

export function ApiCommonResponses(
  ...extraHttpStatuses: ReadonlyArray<
    | HttpStatus.BAD_REQUEST
    | HttpStatus.FORBIDDEN
    | HttpStatus.NOT_FOUND
    | HttpStatus.CONFLICT
  >
): MethodDecorator {
  return applyDecorators(
    ...(extraHttpStatuses.includes(HttpStatus.BAD_REQUEST)
      ? [
          ApiBadRequestResponse({
            description: "Bad Request",
            type: ApiBadRequestResponseDto,
          }),
        ]
      : []),
    ...(extraHttpStatuses.includes(HttpStatus.FORBIDDEN)
      ? [
          ApiForbiddenResponse({
            description: "Forbidden",
            type: ApiForbiddenResponseDto,
          }),
        ]
      : []),
    ...(extraHttpStatuses.includes(HttpStatus.NOT_FOUND)
      ? [
          ApiNotFoundResponse({
            description: "Not Found",
            type: ApiNotFoundResponseDto,
          }),
        ]
      : []),
    ...(extraHttpStatuses.includes(HttpStatus.CONFLICT)
      ? [
          ApiConflictResponse({
            description: "Conflict",
            type: ApiConflictResponseDto,
          }),
        ]
      : []),
    ApiInternalServerErrorResponse({
      description: "Internal Server Error",
      type: ApiInternalServerErrorResponseDto,
    }),
  );
}
