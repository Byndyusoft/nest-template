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

import { TransformToNumber } from "@byndyusoft/class-validator-extended";
import { IsEmail, IsInt, IsNumberString, IsString } from "class-validator";

export class UserDto {
  /**
   * User ID
   * @example 1
   */
  @IsNumberString({ no_symbols: true })
  public readonly userId!: string;

  /**
   * User name
   * @example user
   */
  @IsString()
  public readonly name!: string;

  /**
   * User email
   * @example user@example.com
   */
  @IsEmail()
  public readonly email!: string;

  /**
   * User version
   * @example 2
   */
  @TransformToNumber()
  @IsInt()
  public readonly userVersion!: number;
}
