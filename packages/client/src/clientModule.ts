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
  DynamicModuleHelper,
  TRegisterAsyncOptions,
} from "@byndyusoft/nest-dynamic-module";
import {
  HttpClientModule,
  IHttpClientOptions,
} from "@byndyusoft/nest-http-client";
import { DynamicModule, Module } from "@nestjs/common";
import urlJoin from "proper-url-join";
import qs from "qs";

import * as providers from "./providers";
import { ClientBaseOptionsToken, ClientOptionsToken } from "./tokens";

@Module({
  imports: [
    HttpClientModule.registerAsync({
      inject: [ClientOptionsToken],
      useFactory: (options: IHttpClientOptions) => options,
    }),
  ],
  providers: Object.values(providers),
  exports: Object.values(providers),
})
export class ClientModule {
  public static registerAsync(
    options?: TRegisterAsyncOptions<IHttpClientOptions>,
  ): DynamicModule {
    return DynamicModuleHelper.registerAsync(
      {
        module: ClientModule,
        global: true,
        providers: [
          {
            provide: ClientOptionsToken,
            inject: [ClientBaseOptionsToken],
            useFactory: (baseOptions: IHttpClientOptions) =>
              ClientModule.__clientOptionsFactory(baseOptions),
          },
        ],
        exports: [ClientOptionsToken],
      },
      ClientBaseOptionsToken,
      options,
    );
  }

  private static __clientOptionsFactory(
    baseOptions: IHttpClientOptions,
  ): IHttpClientOptions {
    return {
      ...baseOptions,
      config: {
        ...baseOptions.config,
        baseURL: urlJoin(baseOptions.config?.baseURL as string, "/api/v1"),
        paramsSerializer: (params) =>
          qs.stringify(params, {
            skipNulls: true,
            arrayFormat: "repeat",
          }),
      },
    };
  }
}
