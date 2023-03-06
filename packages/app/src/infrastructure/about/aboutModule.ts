import { Module } from "@nestjs/common";

import { AboutController } from "./aboutController";
import { AboutService } from "./aboutService";

@Module({
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
