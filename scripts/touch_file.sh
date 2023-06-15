echo "Enter the name of the migration (no spaces and with hifens)"

read filename

d=$(date +%Y%m%d%H%M00)

touch "src/${d}-${filename}.ts"