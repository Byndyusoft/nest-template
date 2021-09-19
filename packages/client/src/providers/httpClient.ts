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

/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any */

import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "axios";
import { lastValueFrom } from "rxjs";

import { AxiosRequestConfigToken } from "~/src/tokens";

@Injectable()
export class HttpClient {
  public constructor(
    @Inject(AxiosRequestConfigToken)
    private readonly __axiosRequestConfig: AxiosRequestConfig,
    private readonly __httpService: HttpService,
  ) {}

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await lastValueFrom(
      this.__httpService.delete<T>(url, this.__mergeConfigs(config)),
    );

    return response.data;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await lastValueFrom(
      this.__httpService.get<T>(url, this.__mergeConfigs(config)),
    );

    return response.data;
  }

  public async head<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await lastValueFrom(
      this.__httpService.head<T>(url, this.__mergeConfigs(config)),
    );

    return response.data;
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await lastValueFrom(
      this.__httpService.patch<T>(url, data, this.__mergeConfigs(config)),
    );

    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await lastValueFrom(
      this.__httpService.post<T>(url, data, this.__mergeConfigs(config)),
    );

    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await lastValueFrom(
      this.__httpService.put<T>(url, data, this.__mergeConfigs(config)),
    );

    return response.data;
  }

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await lastValueFrom(
      this.__httpService.request<T>(this.__mergeConfigs(config)),
    );

    return response.data;
  }

  private __mergeConfigs(config?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...config,
      ...this.__axiosRequestConfig,
    };
  }
}
