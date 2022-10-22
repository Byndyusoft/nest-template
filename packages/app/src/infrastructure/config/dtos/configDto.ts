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

import { Type } from "class-transformer";
import { IsDefined, IsString, ValidateNested } from "class-validator";

import { HttpConfigDto } from "./httpConfigDto";
import { KafkaConfigDto } from "./kafkaConfigDto";
import { LoggerConfigDto } from "./loggerConfigDto";
import { PgConfigDto } from "./pgConfigDto";

export class ConfigDto {
  @IsString()
  public readonly configEnv!: string;

  @Type(() => PgConfigDto)
  @IsDefined()
  @ValidateNested()
  public readonly pg!: PgConfigDto;

  @Type(() => KafkaConfigDto)
  @IsDefined()
  @ValidateNested()
  public readonly kafka!: KafkaConfigDto;

  @Type(() => HttpConfigDto)
  @IsDefined()
  @ValidateNested()
  public readonly http!: HttpConfigDto;

  @Type(() => LoggerConfigDto)
  @IsDefined()
  @ValidateNested()
  public readonly logger!: LoggerConfigDto;
}
