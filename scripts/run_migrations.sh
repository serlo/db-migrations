#!/bin/bash

set -e
export BUILD_OUTDIR=dist

main() {
  clear_build_outdir
  build_migrations_into_build_outdir "$@"
  delete_migrations_in_mysql "$@"
  run_migrations_in_build_outdir
}

clear_build_outdir() {
  if ls $BUILD_OUTDIR/*js &> /dev/null; then
    rm $BUILD_OUTDIR/*js
  fi
}

build_migrations_into_build_outdir() {
  yarn _build "$@"
}

delete_migrations_in_mysql() {
  FIRST=true

  for ARG in "$@"; do
    if [ "$FIRST" = "true" ]; then
      FIRST=false
    else
      MIGRATIONS="${MIGRATIONS}, "
    fi

    FILENAME="$(basename "$ARG")"
    MIGRATIONS="\"/${FILENAME%.*}\""
  done

  yarn mysql --execute "DELETE FROM migrations WHERE name IN ($MIGRATIONS)"
}

run_migrations_in_build_outdir() {
  yarn migrate:up:dist
}

main "$@"
