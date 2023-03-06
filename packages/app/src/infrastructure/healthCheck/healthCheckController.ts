import { ApiTags } from "@byndyusoft/nest-swagger";
import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from "@nestjs/terminus";

@ApiTags("Infrastructure")
@Controller("/")
export class HealthCheckController {
  public constructor(private service: HealthCheckService) {}

  @Get("/_healthz")
  @HealthCheck()
  public healthz(): Promise<HealthCheckResult> {
    return this.service.check([]);
  }

  @Get("/_readiness")
  @HealthCheck()
  public readiness(): Promise<HealthCheckResult> {
    return this.service.check([]);
  }
}
