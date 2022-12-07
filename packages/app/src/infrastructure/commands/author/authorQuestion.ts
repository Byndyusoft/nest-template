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

import { Question, QuestionSet, ValidateFor, WhenFor } from "nest-commander";

@QuestionSet({ name: "setAuthor" })
export class AuthorQuestion {
  @Question({
    type: "confirm",
    name: "toBeReplaced",
    message: "Replace author in all packages",
    default: false,
  })
  public authorParseToBeReplaced(value: boolean): boolean {
    return value;
  }

  @Question({
    type: "input",
    name: "author",
    message: "Enter Author Name",
  })
  public parseComments(value: string): string {
    return value;
  }

  @ValidateFor({ name: "author" })
  public validateAuthor(value: string): boolean | string {
    if (value.length > 0) {
      return true;
    }

    return "Please enter a valid Name";
  }

  @WhenFor({ name: "author" })
  public whenAuthorSet(answers: { toBeReplaced: boolean }): boolean {
    return answers.toBeReplaced;
  }
}
