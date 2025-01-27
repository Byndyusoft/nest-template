import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as entities from "open-telemetry-example-entities";

import * as dataAccess from "./dataAccess";
import * as mappers from "./mappers";
import * as useCases from "./useCases";
import { UsersConsumer } from "./usersConsumer";
import { UsersController } from "./usersController";
import { UsersService } from "./usersService";

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(entities)), HttpModule],
  controllers: [UsersController, UsersConsumer],
  providers: [
    UsersService,
    ...Object.values(dataAccess),
    ...Object.values(mappers),
    ...Object.values(useCases),
  ],
})
export class UsersModule {}
