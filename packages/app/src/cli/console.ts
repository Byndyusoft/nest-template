/* eslint-disable no-console,n/no-process-exit,unicorn/no-process-exit */
import { BootstrapConsole } from "nestjs-console";

import { AppModule } from "../appModule";

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
});

async function cli(): Promise<void> {
  const app = await bootstrap.init();
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (event) {
    console.error(event);
    await app.close();
    process.exit(1);
  }
}

cli().catch((error) => {
  console.error(error);
  process.exit(1);
});
