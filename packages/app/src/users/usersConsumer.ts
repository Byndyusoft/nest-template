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
  IKafkaConsumerPayloadHeaders,
  KafkaConsumerErrorTopicExceptionFilter,
  KafkaConsumerEventPattern,
  KafkaConsumerPayloadDecoder,
  KafkaHeaders,
  KafkaKey,
  KafkaValue,
} from "@byndyusoft/nest-kafka";
import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";

import { UserDto } from "ᐸDtosᐳ";

import { ConfigDto } from "../infrastructure";

@Controller()
export class UsersConsumer {
  @KafkaConsumerEventPattern({
    topicPicker: (config: ConfigDto) => config.kafka.topic,
    fromBeginning: true,
  })
  @UseInterceptors(
    new KafkaConsumerPayloadDecoder({
      key: "string",
      value: "schemaRegistry",
      headers: "string",
    }),
  )
  @UseFilters(
    new KafkaConsumerErrorTopicExceptionFilter({
      topicPicker: (config: ConfigDto) => config.kafka.errorTopic,
    }),
  )
  public onMessage(
    @KafkaKey() key: string,
    @KafkaValue() value: UserDto,
    @KafkaHeaders() headers: IKafkaConsumerPayloadHeaders,
  ): Promise<void> {
    // eslint-disable-next-line no-console
    console.log({
      key,
      value,
      headers,
    });

    throw new Error("fuck");
  }
}
