import { IsInt, IsString, Min } from "class-validator";

export class PgConfigDto {
  @IsString()
  public readonly writeConnectionString!: string;

  @IsString()
  public readonly readConnectionString!: string;

  @IsInt()
  @Min(0)
  public readonly connectionTimeout!: number;

  @IsInt()
  @Min(1)
  public readonly poolSize!: number;
}
