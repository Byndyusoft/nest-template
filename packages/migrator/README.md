# ᐸMigratorᐳ

ᐸMigrator descriptionᐳ.

## General folders layout

- [src](./src) - directory with source code
  - [migrations](./src/migrations) - migrations
  - [ormconfig.ts](./src/ormconfig.ts) - TypeORM config

## Dependencies

Migrator dependencies are listed in [package.json](./package.json) file.
All internal dependencies must be built before run migrator.

## Running locally

Migrator can be run locally using the following command:

```bash
yarn run start
```

## Configuring

You can configure migrator via environment variables (see [example.env](./example.env)) for more details.
For local development you can pass environment variables via `.env` file (see [dotenv](https://www.npmjs.com/package/dotenv) for more details).
