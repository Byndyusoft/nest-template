import { Module } from "@nestjs/common";

import * as useCases from "./useCases";
import { UsersController } from "./usersController";
import { UsersService } from "./usersService";

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ...Object.values(useCases)],
})
export class UsersModule {}
