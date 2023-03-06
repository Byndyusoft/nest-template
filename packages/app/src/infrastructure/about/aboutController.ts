import { ApiTags } from "@byndyusoft/nest-swagger";
import { Controller, Get } from "@nestjs/common";

import { AboutService } from "./aboutService";
import { AboutDto } from "./dtos";

@ApiTags("Infrastructure")
@Controller("/about")
export class AboutController {
  public constructor(private readonly service: AboutService) {}

  @Get("/")
  public about(): AboutDto {
    return this.service.about();
  }
}
