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

import { Injectable } from "@nestjs/common";

import { ConfigDto } from "../config";
import { PackageJsonDto } from "../packageJson";

import { AboutDto } from "./dtos";

@Injectable()
export class AboutService {
  public constructor(
    private readonly config: ConfigDto,
    private readonly packageJson: PackageJsonDto,
  ) {}

  public about(): AboutDto {
    return {
      name: this.packageJson.name,
      version: this.packageJson.version,
      env: this.config.configEnv,
    };
  }
}
