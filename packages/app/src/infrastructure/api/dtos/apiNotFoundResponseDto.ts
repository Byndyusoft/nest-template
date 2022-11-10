import { HttpStatus } from "@nestjs/common";

export class ApiNotFoundResponseDto {
  /**
   * Status code
   */
  public statusCode: number = HttpStatus.NOT_FOUND;

  /**
   * Message
   * @example something not found
   */
  public message!: string;

  /**
   * Error
   */
  public error: string = "Not Found";
}
