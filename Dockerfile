################################################################################

ARG NODEJS_IMAGE=node:14.17.6-alpine3.14

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
