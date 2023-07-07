FROM node:18-alpine AS dependencies
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn --immutable --immutable-cache --check-cache

FROM dependencies
COPY dist migrations
COPY database.json .
ENTRYPOINT ["yarn", "db-migrate"]
CMD ["up"]
