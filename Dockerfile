FROM node:20-alpine as dependencies
WORKDIR /usr/src/app
# COPY .yarn .yarn
COPY package.json .
COPY yarn.lock .
RUN yarn --silent

FROM dependencies
COPY dist migrations
COPY database.json .
ENTRYPOINT ["yarn", "db-migrate"]
CMD ["up"]
