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
