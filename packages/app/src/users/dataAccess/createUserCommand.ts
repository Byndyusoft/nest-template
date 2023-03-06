import { TracingService } from "@byndyusoft/nest-opentracing";
import { Injectable } from "@nestjs/common";

import { UserDto } from "ᐸDtosᐳ";

export interface ICreateUserCommandOptions {
  readonly payload: { name: string; email: string };
}

@Injectable()
export class CreateUserCommand {
  public constructor(private readonly tracingService: TracingService) {}

  public execute(options: ICreateUserCommandOptions): Promise<UserDto> {
    return this.tracingService.traceAsyncFunction(CreateUserCommand.name, () =>
      Promise.resolve({
        name: `user${options.payload.name}`,
        userId: "1",
        email: `user${options.payload.email}@example.com`,
        userVersion: 1,
      }),
    );
  }
}
