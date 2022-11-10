import { HttpStatus } from "@nestjs/common";

export class ApiBadRequestResponseDto {
  /**
   * Status code
   */
  public statusCode: number = HttpStatus.BAD_REQUEST;

  /**
   * Message
   */
  public message!: string[];

  /**
   * Error
   */
  public error: string = "Bad Request";
}
