################################################################################

ARG RUNTIME_IMAGE=node:16-bullseye-slim

################################################################################

FROM ${RUNTIME_IMAGE}

WORKDIR /app

COPY . .

USER node
