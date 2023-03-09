# ᐸRepository nameᐳ

[![test](https://github.com/Byndyusoft/nest-template/actions/workflows/test.yaml/badge.svg?branch=master)](https://github.com/Byndyusoft/nest-template/actions/workflows/test.yaml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

ᐸRepository descriptionᐳ

## Monorepo

Monorepo structure is described in root [package.json](./package.json) and contains the following packages:

- [app](./packages/app) - executable service
- [client](./packages/client) - service client
- [dtos](./packages/dtos) - common dtos between service and its client
- [dtosTesting](./packages/dtosTesting) - dtos factories for unit tests

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org) (version 16 LTS or higher)
- [Yarn](https://yarnpkg.com) package manager

## Code conventions

Some code conventions are enforced automatically by ESLint + Prettier + markdownlint + husky + lint-staged stack.

## Service development lifecycle

- Implement business logic
- Add or adapt unit-tests (prefer before and simultaneously with coding)
- Add or change the documentation as needed
- Open pull request in the correct branch. Target the project's `master` branch

## Running locally

Service can be run locally using the following command:

```bash
yarn install
yarn run build
yarn run start
```

## Maintainers

- [@Byndyusoft/owners](https://github.com/orgs/Byndyusoft/teams/owners) <<github.maintain@byndyusoft.com>>
- [@Byndyusoft/team](https://github.com/orgs/Byndyusoft/teams/team)
- [@KillWolfVlad](https://github.com/KillWolfVlad)

## Wiki

- [Home](https://github.com/Byndyusoft/nest-template/wiki)
- [PostgreSQL](https://github.com/Byndyusoft/nest-template/wiki/PostgreSQL)
- [add-typeOrm](https://github.com/Byndyusoft/nest-template/wiki/add-typeOrm)

## License

This repository is released under version 2.0 of the
[Apache License](https://www.apache.org/licenses/LICENSE-2.0).
