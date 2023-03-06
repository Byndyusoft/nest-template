import { LogLevel } from "@byndyusoft/pino-logger-factory";
import { IsBoolean, IsEnum } from "class-validator";

export class LoggerConfigDto {
  @IsEnum(LogLevel)
  public readonly level!: LogLevel;

  @IsBoolean()
  public readonly pretty!: boolean;
}
