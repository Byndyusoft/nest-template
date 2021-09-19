# ᐸAppᐳ

ᐸApp descriptionᐳ.

## General folders layout

- [src](./src) - directory with source code
  - [api](./src/api) - API controllers and services
  - [dataAccess](./src/dataAccess) - commands and queries to work with DB
  - [infrastructure](./src/infrastructure) - infrastructure code
  - [appModule.ts](./src/appModule.ts) - main module
  - [main.ts](./src/main.ts) - entrypoint where NestJS applications are bootstrapped and started
- [test](./test) - directory for tests

## Dependencies

Service dependencies are listed in [package.json](./package.json) file.
All internal dependencies must be built before run service and unit tests.

## Running locally

Service can be run locally using the following command:

```bash
yarn run start
```

API routes and documentation can be obtained via Swagger, hosted on route `/api`.

## Running tests

Unit tests ended on `*.spec.ts` and located inside various directories in [src](./src).
Tests can be run using the following commands:

```bash
yarn run test
yarn run test:cov
```

## Configuring

Service load configuration from:

- [.env](./.env) - this [dotenv](https://www.npmjs.com/package/dotenv) file must contain following environment variables (you can use [example.env](./example.env) as example):
  - `CASC_ENV` - environment for [node-casc](https://github.com/Byndyusoft/node-casc)
  - `JAEGER_*` - see [jaeger-client](https://github.com/jaegertracing/jaeger-client-node#environment-variables) for more usage information
- [.casc](./.casc) - service configuration, see [node-casc](https://github.com/Byndyusoft/node-casc) for more usage information
