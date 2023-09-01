import { Module } from "@nestjs/common";

import { UsersController } from "./usersController";
import { UsersService } from "./usersService";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
