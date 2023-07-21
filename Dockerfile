FROM node:18-alpine AS dependencies
WORKDIR /usr/src/app
COPY .yarn .yarn
COPY .yarnrc.yml .
COPY package.json .
COPY yarn.lock .
RUN yarn --immutable --immutable-cache --check-cache --silent

FROM dependencies
# Set the module type inside the docker container to CommonJS
# Reason: Without the setting the `.js` files are handles as ESM modules.
# Changing it to `.cjs` does not help since `db-migrate` ignores them in the
# current stable version, see https://github.com/db-migrate/node-db-migrate/issues/782
# Updating `db-migrate` seems to be also a bigger step since then
# `db-migrate-plugin-typescript` does not work any more.
RUN sed -i "s/\"module\"/\"commonjs\"/g" package.json
COPY dist migrations
COPY database.json .
ENTRYPOINT ["yarn", "db-migrate"]
CMD ["up"]
