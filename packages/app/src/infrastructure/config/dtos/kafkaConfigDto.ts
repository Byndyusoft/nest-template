/*
 * Copyright 2022 Byndyusoft
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
  KafkaClusterConfigDto,
  KafkaConsumerConfigDto,
  KafkaProducerConfigDto,
  KafkaSchemaRegistryArgsConfigDto,
} from "@byndyusoft/nest-kafka";
import { Type } from "class-transformer";
import { IsDefined, IsString, ValidateNested } from "class-validator";

export class KafkaConfigDto {
  @Type(() => KafkaClusterConfigDto)
  @IsDefined()
  @ValidateNested()
  public readonly cluster!: KafkaClusterConfigDto;

  @Type(() => KafkaConsumerConfigDto)
  @IsDefined()
  @ValidateNested()
  public readonly consumer!: KafkaConsumerConfigDto;

  @Type(() => KafkaProducerConfigDto)
  @IsDefined()
  @ValidateNested()
  public readonly producer!: KafkaProducerConfigDto;

  @Type(() => KafkaSchemaRegistryArgsConfigDto)
  @IsDefined()
  @ValidateNested()
  public readonly schemaRegistry!: KafkaSchemaRegistryArgsConfigDto;

  @IsString()
  public readonly topic!: string;

  @IsString()
  public readonly errorTopic!: string;
}
