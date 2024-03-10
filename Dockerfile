FROM node:18-alpine AS base_image
WORKDIR /app

FROM base_image as build_node_modules
COPY .yarn .yarn
COPY .yarnrc.yml package.json yarn.lock .
RUN yarn workspaces focus --production

FROM build_node_modules as build_migrations
COPY tsconfig.json tsconfig.scripts.json tsconfig.prod.json .
COPY scripts scripts
COPY src src
RUN yarn
# `yarn build:all` does not work here since `yarn ts-node` raises a
# ".ts file extension is not allowed" error. Thus we build `scripts/build.ts`
# via `tsc` first and run the compiled `js` file via node.
#
# FIXME Fix this error and use `yarn build:all` here
RUN yarn tsc -p tsconfig.scripts.json
RUN BUILD_OUTDIR=migrations node scripts/build.js src/*ts

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
