FROM node:18-alpine AS base_image
WORKDIR /app
COPY .yarnrc.yml package.json yarn.lock .

FROM base_image as build
COPY .yarn .yarn
RUN yarn workspaces focus --production

FROM base_image as runner
COPY --from=build /app/node_modules node_modules
COPY .yarn/plugins .yarn/plugins
COPY .yarn/releases .yarn/releases
# Set the module type inside the docker container to CommonJS
# Reason: Without the setting the `.js` files are handles as ESM modules.
# Changing it to `.cjs` does not help since `db-migrate` ignores them in the
# current stable version, see https://github.com/db-migrate/node-db-migrate/issues/782
# Updating `db-migrate` seems to be also a bigger step since then
# `db-migrate-plugin-typescript` does not work any more.
RUN sed -i "s/\"module\"/\"commonjs\"/g" package.json
COPY migrations migrations
COPY database.json .
ENTRYPOINT ["yarn", "db-migrate"]
CMD ["up"]
