import { HttpStatus } from "@nestjs/common";

export class ApiForbiddenResponseDto {
  /**
   * Status code
   */
  public statusCode: number = HttpStatus.FORBIDDEN;

  /**
   * Message
   */
  public message: string = "Forbidden resource";

  /**
   * Error
   */
  public error: string = "Forbidden";
}
