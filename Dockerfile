FROM node:18-alpine AS base_image
WORKDIR /app

FROM base_image as build
COPY .yarn .yarn
COPY .yarnrc.yml package.json yarn.lock .
RUN yarn workspaces focus --production

FROM base_image as runner
COPY database.json .
COPY .yarn/releases .yarn/releases
COPY .yarn/plugins .yarn/plugins
COPY .yarnrc.yml .
COPY package.json yarn.lock .
COPY --from=build /app/node_modules node_modules
COPY migrations migrations
ENTRYPOINT ["yarn", "db-migrate"]
CMD ["up"]
