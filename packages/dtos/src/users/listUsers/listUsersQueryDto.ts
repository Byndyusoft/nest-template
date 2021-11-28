/*
 * Copyright 2021 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

  @TransformToNumber()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional()
  public readonly pageToken: number = 0;
}
