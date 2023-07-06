FROM node:18-alpine as dependencies
WORKDIR /usr/src/app
# COPY .yarn .yarn
COPY package.json .
COPY yarn.lock .
RUN yarn --immutable

FROM dependencies
COPY dist migrations
COPY database.json .
ENTRYPOINT ["yarn", "db-migrate"]
CMD ["up"]
