# DB migrations

particularly for the legacy database

## Prerequisites

- [Node.js](https://nodejs.org/) and [yarn cli](https://yarnpkg.com/cli/)
  versions from [.tool-versions](.tool-versions)
  - You may use [asdf](https://asdf-vm.com/) for the installation.
- Docker and Docker Compose

Note: Also make sure you have `cmake` installed on your machine (e.g.
`sudo apt install cmake`).

## Steps to add a new migration

1. Go to [`src`](./src) and add a new file. It's name needs to be
   `YYYYMMDDHHMMSS-xyz.ts` (The prefix of the number for the date when you have
   added the file are important). It is a good idea to copy and paste one of the
   current migration as a template for the new one. Example:

- [`src/20220614111600-make-subjects-in-construction-a-subject.ts`](./src/20220614111600-make-subjects-in-construction-a-subject.ts)
  when you just want to execute SQL statements.
- [`src/20210923231900-add-transformation-target-to-equations.ts`](./src/20210923231900-add-transformation-target-to-equations.ts)
  when you want to migrate edtr-io plugins

2. You need to build a migration by running
`yarn build src/YYYYMMDDHHMMSS-xyz.ts` in the `src` directory. This creates a
new file in `dist`. Both files in `dist` and `src` need to be added in the PR.
_Notice that any changes in other directories that are imported by the file will
be built together!_
<!-- TODO: in conception still in the new infrastructure.
   3. Update the version of the `serlo.org` server at
   `packages/public/server/package.json`. Deploy this version with the changes
   in the `migrations` package and the database migrations should take effect. -->

## How to test a new migration

In `serlo/local-dev-env` or `serlo/database-layer` you will find instructions on
how to run a local serlo database with dummy data.

In the root of this repository you can run `yarn migrate` to locally run all
migrations. You can check the changes afterwards using `yarn mysql` in the other
repo. With `yarn mysql:rollback` or `yarn mysql:import-anonymous-data` you can
reset your changes there.

<!-- Of course you can also test your migrations in the `staging` enviornment by
deploying the new server version. Note that each night the database in `staging`
is reset. -->


Patito
