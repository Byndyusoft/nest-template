################################################################################

ARG NODEJS_IMAGE=node:14.18.1-alpine3.14

################################################################################

FROM ${NODEJS_IMAGE} as workspaces

WORKDIR /workspaces

COPY . .

USER node

################################################################################

FROM workspaces AS app

WORKDIR ./packages/app

EXPOSE 8080

CMD ["node", "./dist/main.js"]

################################################################################

FROM workspaces AS migrator

WORKDIR ./packages/migrator

CMD ["yarn", "start:prod"]
