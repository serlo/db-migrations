<img width="688" alt="image" src="https://github.com/serlo/db-migrations/assets/1258870/e19d4bc1-977c-4327-ab06-7b187e4dc8ab">

# DB migrations

particularly for the legacy database

## Prerequisites

- [Node.js](https://nodejs.org/) and [yarn cli](https://yarnpkg.com/cli/)
  versions from [.tool-versions](.tool-versions)
  - You may use [asdf](https://asdf-vm.com/) for the installation.
- Docker and Docker Compose

Note: Also make sure you have `cmake` installed on your machine (e.g.
`sudo apt install cmake`).

## Add a new migration

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
new file in `migrations`. Both files in `migrations` and `src` need to be added
in the PR. _Notice that any changes in other directories that are imported by
the file will be built together!_
<!-- TODO: in conception still in the new infrastructure.
   3. Update the version of the `serlo.org` server at
   `packages/public/server/package.json`. Deploy this version with the changes
   in the `migrations` package and the database migrations should take effect. -->

## Test a new migration

Start a local version of the mysql database via `yarn start`. There are the
following helper functions:

- `yarn mysql` – Open a shell to MySQL
- `yarn migrate:run [path]` – Run a certain migration (like
  `yarn migrate:run src/20201023104526-update-subjects.ts`)
- `yarn mysql:rollback` – Rollback database before any applied migrations
- `yarn mysql:list-migrations` – List all migrations which have been already run
- `yarn migrate:ts` – Run all migrations directly from `src` directory (no build
  needed)
- `yarn migrate:docker` – Build docker container and run migrations
- `yarn mysql:delete-last-migration` – Delete information that last migration
  was already executed (will be thus executed the next time again)
- `yarn mysql:import-anonymous-data` – Import last anonymized dump

### Test on staging

Once it seems to work as desired locally, it can be deployed to staging and will
then be run every night after the new anonymous data import. If you then find an
error and want to deploy a fixed version of the migration, run the `dbsetup` job
on the staging cluster to undo the changes of the erroneous migration first
before deploying the fixed version of `db-migrations`.
