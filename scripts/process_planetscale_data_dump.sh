#!/bin/bash

# PlanetScale SQL dump folder
PLANETSCALE_SQL_DUMP_FOLDER="./pscale_dump"

# Define keywords to filter filenames
keywords=("ABTestingData" "EquationsAppStats" "ExerciseSubmission" "QuickbarStats")

# Remove schema files
rm $(ls "$PLANETSCALE_SQL_DUMP_FOLDER" | grep 'schema.sql' )

echo "Concatenating relevant tables..."

# Concatenate relevant tables
cat_files=()
for keyword in "${keywords[@]}"; do
    cat_files+=( $(ls "$PLANETSCALE_SQL_DUMP_FOLDER"/*"$keyword"*.sql) )
done
cat "${cat_files[@]}" > all_files.sql_all

# Rename concatenated file
mv all_files.sql_all planetscale_data_dump.sql

echo "Replacements in progress..."
# Define an associative array for replacements
declare -A replacements=(
    ["ABTestingData"]="ab_testing_data"
    ["EquationsAppStats"]="equations_app_stats"
    ["ExerciseSubmission"]="exercise_submission"
    ["QuickbarStats"]="quickbar_stats"
    ["entityId"]="entity_id"
    ["sessionId"]="session_id"
    ["revisionId"]="revision_id"
    ["topicId"]="topic_id"
    ["threadId"]="thread_id"
    ["isProduction"]="is_production"
    ["isSubject"]="is_subject"
    ["key"]="link_key"
    ["group"]="experiment_group"
)

# Define the filename for replacements
PLANETSCALE_SQL_DUMP_FILE_NAME="planetscale_data_dump.sql"

# Loop through the keys of the replacements array
for old_str in "${!replacements[@]}"; do
    new_str=${replacements["$old_str"]}

    # Run sed command
    sed -i "s/$old_str/$new_str/g" "$PLANETSCALE_SQL_DUMP_FILE_NAME"
done

echo "Done!"
