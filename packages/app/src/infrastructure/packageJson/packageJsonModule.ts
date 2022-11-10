import fs from "fs/promises";
import path from "path";

import { Global, Module } from "@nestjs/common";

import { PackageJsonDto } from "./dtos";

@Global()
@Module({
  providers: [
    {
      provide: PackageJsonDto,
      async useFactory(): Promise<PackageJsonDto> {
        const packageJsonPath = path.join(process.cwd(), "package.json");

        return JSON.parse(
          await fs.readFile(packageJsonPath, "utf8"),
        ) as PackageJsonDto;
      },
    },
  ],
  exports: [PackageJsonDto],
})
export class PackageJsonModule {}
