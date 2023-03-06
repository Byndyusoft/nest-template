import { TracingService } from "@byndyusoft/nest-opentracing";
import { Injectable } from "@nestjs/common";

import { UserDto } from "ᐸDtosᐳ";

export interface ICheckUserExistsQueryOptions {
  readonly userId: string;
}

@Injectable()
export class CheckUserExistsQuery {
  public constructor(private readonly tracingService: TracingService) {}

  public ask(options: ICheckUserExistsQueryOptions): Promise<boolean> {
    return this.tracingService.traceAsyncFunction(
      CheckUserExistsQuery.name,
      () => {
        const user: UserDto = {
          name: `user${options.userId}`,
          userId: options.userId,
          email: `user${options.userId}@example.com`,
          userVersion: 1,
        };

        return Promise.resolve(!!user);
      },
    );
  }
}
