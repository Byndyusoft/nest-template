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

import { Command, CommandRunner, InquirerService } from "nest-commander";

import { IAuthorOptions } from "./authorInterface";
import { AuthorService } from "./authorService";

@Command({ name: "author", options: { isDefault: true } })
export class AuthorCommand extends CommandRunner {
  public constructor(
    private readonly inquirerService: InquirerService,
    private readonly authorService: AuthorService,
  ) {
    super();
  }
  public async run(_inputs: string[], options?: IAuthorOptions): Promise<void> {
    const { author }: IAuthorOptions = await this.inquirerService.ask(
      "setAuthor",
      options,
    );

    if (!author) return;

    await this.authorService.process(author);
  }
}
