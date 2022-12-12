import { IsInt, IsIP, IsString, Max, Min } from "class-validator";

export class HttpConfigDto {
  @IsInt()
  @Min(1)
  @Max(65_535)
  public readonly port!: number;

  @IsIP()
  public readonly host!: string;

  @IsString()
  public readonly swaggerServer!: string;

  @IsInt()
  @Min(0)
  public readonly defaultClientTimeout!: number;
}
