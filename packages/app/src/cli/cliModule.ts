import { Module } from "@nestjs/common";
import { ConsoleModule } from "nestjs-console";

import { MyService } from "./service";

@Module({
  imports: [ConsoleModule],
  providers: [MyService],
  exports: [MyService],
})
export class CliModule {}
