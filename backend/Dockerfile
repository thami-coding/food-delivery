ARG NODE_VERSION=24.2.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV development

USER node

WORKDIR /workspaces/${COMPOSE_PROJECT_NAME}/backend
COPY --chown=node:node package*.json ./

# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci


EXPOSE 3000
