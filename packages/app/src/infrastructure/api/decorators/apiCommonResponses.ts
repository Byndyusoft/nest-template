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
