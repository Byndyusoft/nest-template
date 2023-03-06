import { Module } from "@nestjs/common";

import * as dataAccess from "./dataAccess";
import * as mappers from "./mappers";
import * as useCases from "./useCases";
import { UsersController } from "./usersController";
import { UsersService } from "./usersService";

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ...Object.values(dataAccess),
    ...Object.values(mappers),
    ...Object.values(useCases),
  ],
})
export class UsersModule {}
