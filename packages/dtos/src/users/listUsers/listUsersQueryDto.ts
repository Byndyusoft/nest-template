import {
  TransformToArray,
  TransformToNumber,
} from "@byndyusoft/class-validator-extended";
import { ApiPropertyOptional } from "@byndyusoft/nest-swagger";
import {
  IsEmail,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class ListUsersQueryDto {
  @TransformToArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @IsOptional()
  public readonly userIds?: string[];

  @TransformToArray()
  @IsString({ each: true })
  @IsOptional()
  public readonly names?: string[];

  @TransformToArray()
  @IsEmail(undefined, { each: true })
  @IsOptional()
  public readonly emails?: string[];

  @TransformToNumber()
  @IsInt()
  @Min(1)
  @Max(100)
  @ApiPropertyOptional()
  public readonly pageSize: number = 10;

  @IsNumberString({ no_symbols: true })
  @ApiPropertyOptional()
  public readonly pageToken: string = "0";
}
