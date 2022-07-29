################################################################################

BUILDER_IMAGE := node:16-bullseye
RUNTIME_IMAGE := node:16-bullseye-slim

################################################################################

YARN := yarn

################################################################################

define docker-inside
	docker run \
		--rm -t \
		-v $(CURDIR):/app \
		-w /app \
		$(BUILDER_IMAGE) \
		sh -x -c "$(strip $(1))"
endef

################################################################################

NEW_VERSION := 0.0.0-development

.PHONY: build-app

build-app:
	$(call docker-inside, \
		$(YARN) install --immutable && \
		git config --global --add safe.directory /app && \
		$(YARN) workspaces foreach version --deferred $(NEW_VERSION) && \
		$(YARN) version apply --all && \
		$(YARN) run build)

################################################################################

.PHONY: test

test:
	$(call docker-inside, $(YARN) run test:cov)

################################################################################

.PHONY: lint

lint:
	$(call docker-inside, $(YARN) run lint)

################################################################################

PACKAGES_TAG := latest

YARN_NPM_AUTH_IDENT := dXNlcjpwYXNzd29yZA==
YARN_NPM_PUBLISH_REGISTRY := https://art.example.com/api/npm/npm-repo

.PHONY: publish-packages

publish-packages:
	$(call docker-inside, \
		export YARN_NPM_AUTH_IDENT=$(YARN_NPM_AUTH_IDENT) && \
		export YARN_NPM_PUBLISH_REGISTRY=$(YARN_NPM_PUBLISH_REGISTRY) && \
		$(YARN) workspaces foreach --no-private npm publish --tag $(PACKAGES_TAG))

################################################################################

IMAGE_NAME := app:latest

.PHONY: build-image

build-image:
	$(call docker-inside, $(YARN) workspaces focus --all --production)
	docker build . \
		--build-arg RUNTIME_IMAGE=$(RUNTIME_IMAGE) \
		-t $(IMAGE_NAME)
