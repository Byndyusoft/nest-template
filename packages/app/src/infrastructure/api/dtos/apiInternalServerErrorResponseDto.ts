import { HttpStatus } from "@nestjs/common";

export class ApiInternalServerErrorResponseDto {
  /**
   * Status code
   */
  public statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;

  /**
   * Message
   */
  public message: string = "Internal server error";
}
