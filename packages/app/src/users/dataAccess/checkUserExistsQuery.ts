import { TracingService } from "@byndyusoft/nest-opentracing";
import { Injectable } from "@nestjs/common";

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
        const userVariableCheck = options.userId ? true : false;

        return Promise.resolve(userVariableCheck);
      },
    );
  }
}
