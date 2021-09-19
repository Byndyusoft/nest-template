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

import { HttpModule, HttpService } from "@nestjs/axios";
import { Module, OnModuleInit } from "@nestjs/common";

import { ConfigDto } from "../config";

@Module({
  imports: [HttpModule],
})
export class ClientsModule implements OnModuleInit {
  public constructor(
    private readonly __config: ConfigDto,
    private readonly __httpService: HttpService,
  ) {}

  public onModuleInit(): void {
    this.__httpService.axiosRef.defaults.timeout =
      this.__config.http.defaultClientTimeout;
  }
}
