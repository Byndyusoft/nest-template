import { HttpModule, HttpService } from "@nestjs/axios";
import { Module, OnModuleInit } from "@nestjs/common";

import { ConfigDto } from "../config";

@Module({
  imports: [HttpModule],
})
export class ClientsModule implements OnModuleInit {
  public constructor(
    private readonly config: ConfigDto,
    private readonly httpService: HttpService,
  ) {}

  public onModuleInit(): void {
    this.httpService.axiosRef.defaults.timeout =
      this.config.http.defaultClientTimeout;
  }
}
