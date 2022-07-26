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

import { TRegisterAsyncOptions } from "@byndyusoft/nest-dynamic-module";
import {
  HttpClientModule,
  IHttpClientOptions,
} from "@byndyusoft/nest-http-client";
import { DynamicModule, Global, Module } from "@nestjs/common";
import urlJoin from "proper-url-join";
import qs from "qs";

import { UsersClient } from "./usersClient";

@Global()
@Module({
  providers: [UsersClient],
  exports: [UsersClient],
})
export class ClientModule {
  public static registerAsync(
    options?: TRegisterAsyncOptions<IHttpClientOptions>,
  ): DynamicModule {
    return HttpClientModule.registerClientModule(
      { module: ClientModule },
      options,
      (config) => ({
        ...config,
        baseURL: urlJoin(config?.baseURL as string, "/api/v1"),
        paramsSerializer: (params) =>
          qs.stringify(params, {
            skipNulls: true,
            arrayFormat: "repeat",
          }),
      }),
    );
  }
}
