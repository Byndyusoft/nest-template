# ᐸAppᐳ

ᐸApp descriptionᐳ

## General folders layout

- [src](./src) - directory with source code
- [test](./test) - directory for tests

## Dependencies

Service dependencies are listed in [package.json](./package.json) file.
All internal dependencies must be built before run service and unit tests.

## Running locally

See [Root readme](../../README.md).

API routes and documentation can be obtained via Swagger, hosted on route `/api`.

## Running tests

Unit tests ended on `*.spec.ts` and located inside various directories in [src](./src).
Tests can be run using the following commands:

```bash
yarn run test
yarn run test:cov
```

## Configuring

You can configure service via environment variables (see [example.env](./example.env)) for more details.
For local development you can pass environment variables via `.env` file (see [dotenv](https://www.npmjs.com/package/dotenv) for more details).
