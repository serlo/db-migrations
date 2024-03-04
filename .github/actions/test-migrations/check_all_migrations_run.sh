migrations_run=$(yarn mysql:list-migrations:ci)

for migration_file in src/*.ts
do
  migration_filename=$(basename -- "$migration_file")
  migration_name=${migration_filename%%.*}
  match=$(echo $migrations_run | grep -o $migration_name)

  # Exit if the file name was not found within migrations that have been run
  if [ -z "$match" ]
  then
    exit 1
  fi
done

echo "all migration have been run"
