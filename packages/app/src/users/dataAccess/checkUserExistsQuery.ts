import { TracingService } from "@byndyusoft/nest-opentracing";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "ᐸEntitiesᐳ";

export interface ICheckUserExistsQueryOptions {
  readonly userId: string;
}

@Injectable()
export class CheckUserExistsQuery {
  public constructor(
    private readonly tracingService: TracingService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public ask(options: ICheckUserExistsQueryOptions): Promise<boolean> {
    return this.tracingService.traceAsyncFunction(
      CheckUserExistsQuery.name,
      async () => {
        const user = await this.userRepository.findOne({
          where: {
            userId: options.userId,
          },
          select: {
            userId: true,
          },
        });

        return !!user;
      },
    );
  }
}
