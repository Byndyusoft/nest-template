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

import { Global, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import {
  BaseExceptionFilter,
  CatchAllExceptionFilter,
  PrometheusExceptionFilter,
} from "./exceptionFilters";

@Global()
@Module({
  providers: [
    BaseExceptionFilter,
    PrometheusExceptionFilter,
    {
      provide: APP_FILTER,
      useClass: CatchAllExceptionFilter,
    },
  ],
})
export class ExceptionsModule {}
