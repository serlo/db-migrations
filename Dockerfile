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
COPY migrations migrations
COPY database.json .
ENTRYPOINT ["yarn", "db-migrate"]
CMD ["up"]
