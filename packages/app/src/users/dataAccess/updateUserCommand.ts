import { TracingService } from "@byndyusoft/nest-opentracing";
import { Injectable } from "@nestjs/common";

import { UserDto } from "ᐸDtosᐳ";

export interface IUpdateUserCommandOptions {
  readonly userId: string;
  readonly userVersion: number;

  readonly payload: {
    deletedAt?: Date;
    name?: string;
    email?: string;
  };
}

@Injectable()
export class UpdateUserCommand {
  public constructor(private readonly tracingService: TracingService) {}

  public execute(options: IUpdateUserCommandOptions): Promise<UserDto> {
    return this.tracingService.traceAsyncFunction(UpdateUserCommand.name, () =>
      Promise.resolve({
        name: `user${options.userId}`,
        userId: options.userId,
        email: `user${options.userId}@example.com`,
        userVersion: 1,
      }),
    );
  }
}
