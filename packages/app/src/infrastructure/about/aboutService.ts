import { Injectable } from "@nestjs/common";

import { ConfigDto } from "../config";
import { PackageJsonDto } from "../packageJson";

import { AboutDto } from "./dtos";

@Injectable()
export class AboutService {
  public constructor(
    private readonly config: ConfigDto,
    private readonly packageJson: PackageJsonDto,
  ) {}

  public about(): AboutDto {
    return {
      name: this.packageJson.name,
      version: this.packageJson.version,
      env: this.config.configEnv,
    };
  }
}
