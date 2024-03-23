echo "Enter the name of the migration (no spaces and with hifens)"

read FILENAME

DATE=$(date +%Y%m%d%H%M00)

touch "src/${DATE}-${FILENAME}.ts"
