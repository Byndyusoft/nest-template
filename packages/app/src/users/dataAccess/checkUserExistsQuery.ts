import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "open-telemetry-example-entities";
import { Repository } from "typeorm";

export interface ICheckUserExistsQueryOptions {
  readonly userId: string;
}

@Injectable()
export class CheckUserExistsQuery {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async ask(options: ICheckUserExistsQueryOptions): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        userId: options.userId,
      },
      select: {
        userId: true,
      },
    });

    return !!user;
  }
}
