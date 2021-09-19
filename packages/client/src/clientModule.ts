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

import { URL } from "url";

import {
  DynamicModuleHelper,
  TRegisterAsyncOptions,
} from "@byndyusoft/nest-dynamic-module";
import { HttpModule } from "@nestjs/axios";
import { DynamicModule, Module } from "@nestjs/common";
import { AxiosRequestConfig } from "axios";
import qs from "qs";

import * as providers from "./providers";
import { AxiosBaseRequestConfigToken, AxiosRequestConfigToken } from "./tokens";

@Module({
  providers: Object.values(providers),
  exports: Object.values(providers),
})
export class ClientModule {
  public static registerAsync(
    options?: TRegisterAsyncOptions<AxiosRequestConfig>,
  ): DynamicModule {
    return DynamicModuleHelper.registerAsync(
      {
        module: ClientModule,
        global: true,
        imports:
          options?.imports && options.imports.length > 0 ? [] : [HttpModule],
        providers: [
          {
            provide: AxiosRequestConfigToken,
            inject: [AxiosBaseRequestConfigToken],
            useFactory: (
              baseAxiosRequestConfig: AxiosRequestConfig,
            ): AxiosRequestConfig => ({
              ...baseAxiosRequestConfig,
              baseURL: new URL("/api/v1", baseAxiosRequestConfig.baseURL).href,
              paramsSerializer: (params) =>
                qs.stringify(params, {
                  skipNulls: true,
                  arrayFormat: "repeat",
                }),
            }),
          },
        ],
      },
      AxiosBaseRequestConfigToken,
      options,
    );
  }
}
