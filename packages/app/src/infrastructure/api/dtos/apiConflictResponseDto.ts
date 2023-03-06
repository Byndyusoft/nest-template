import { HttpStatus } from "@nestjs/common";

export class ApiConflictResponseDto {
  /**
   * Status code
   */
  public statusCode: number = HttpStatus.CONFLICT;

  /**
   * Message
   * @example resource with same id already exists
   */
  public message!: string;

  /**
   * Error
   */
  public error: string = "Conflict";
}
