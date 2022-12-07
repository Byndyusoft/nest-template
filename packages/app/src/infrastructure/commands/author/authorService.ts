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

import { readFile, writeFile } from "fs/promises";

import { getDirectories } from "../utils/path";

export class AuthorService {
  public async process(authorName: string): Promise<void> {
    const packagesFolder = await getDirectories("../");
    const authorTemplate = '"author": "(.*)"';
    const authorValue = `"author": "${authorName}"`;
    packagesFolder.push("../");

    for (const folder of packagesFolder) {
      const packageJsonPath = `../${folder}/package.json`;

      // eslint-disable-next-line no-await-in-loop
      await readFile(packageJsonPath, "utf8")
        .then((contents) => {
          const replaced = contents.replace(
            new RegExp(authorTemplate, "gm"),
            authorValue,
          );

          writeFile(packageJsonPath, replaced, "utf8").catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }
}
