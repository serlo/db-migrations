FROM node:20-alpine AS base_image
WORKDIR /app

FROM base_image as build_node_modules
COPY .yarn .yarn
COPY .yarnrc.yml package.json yarn.lock .
RUN yarn workspaces focus --production

FROM build_node_modules as build_migrations
COPY tsconfig.json .
COPY scripts scripts
COPY src src
RUN yarn
RUN yarn build:all

FROM base_image as runner
COPY database.json .
COPY .yarn/releases .yarn/releases
COPY .yarn/plugins .yarn/plugins
COPY .yarnrc.yml .
COPY package.json yarn.lock .
COPY --from=build_node_modules /app/node_modules node_modules
COPY --from=build_migrations /app/migrations migrations
COPY migrations/package.json migrations/package.json
ENTRYPOINT ["yarn", "db-migrate"]
CMD ["up"]
