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

import { UserDto } from "ᐸDtosᐳ";

export class DataSource {

  public transaction(enityManager: unknown): Promise<UserDto> {
    Object.assign({}, enityManager);
    return Promise.resolve(new UserDto);
  }
}

export class EntityManager {

  public createQueryBuilder(): CreateQueryBuilder {
    return new CreateQueryBuilder;
  }

  public getRepository(get?: unknown): EntityManager {
    Object.assign({}, get);
    return this;
  }

  public insert(get: unknown): Promise<string> {
    Object.assign({}, get);
    return new Promise(resolve => {
      resolve("test");
    });
  }
}

class CreateQueryBuilder {
  public affected = 0;
  public generatedMaps = [];

  public execute(): Promise<CreateQueryBuilder>  {
    return new Promise(resolve => {
      resolve(this);
    });
  }

  public set(get?: unknown): CreateQueryBuilder {
    Object.assign({}, get);
    return this;
  }

  public values(get: unknown): CreateQueryBuilder {
    Object.assign({}, get);
    return this;
  }

  public where(get?: unknown): CreateQueryBuilder {
    Object.assign({}, get);
    return this;
  }

  public whereEntity(get?: unknown): CreateQueryBuilder {
    Object.assign({}, get);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public insert(get?: unknown): CreateQueryBuilder {
    Object.assign({}, get);
    return this;
  }

  public returning(get: unknown): CreateQueryBuilder {
    Object.assign({}, get);
    return this;
  }

  public update(get?: unknown): CreateQueryBuilder {
    Object.assign({}, get);
    return this;
  }
}
