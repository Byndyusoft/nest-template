import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  public async test(): Promise<void> {
    this.logger.error(new Error("fuck"));
  }
}
