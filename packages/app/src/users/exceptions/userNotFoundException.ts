import { NotFoundException } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  public constructor(userId: string) {
    super(`user with id ${userId} not found`, "BYS_404");
  }
}
