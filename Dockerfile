################################################################################

ARG RUNTIME_IMAGE=docker.art.lmru.tech/node:22.13.0-bookworm-slim

################################################################################

FROM ${RUNTIME_IMAGE} as workspaces

WORKDIR /workspaces

COPY . .

USER node

################################################################################

FROM workspaces AS app

EXPOSE 8080

WORKDIR packages/app/

CMD ["node", "./dist/main.js"]
