#!/bin/sh

if [ -z "$1" ]; then
    echo "No argument supplied"
    exit 1
fi

if [ ! -f "$1" ]; then
    echo "File not found!"
    exit 2
fi

JS_DATA_FILE=www/kt_data.js

echo -n "var kt_data = [" > $JS_DATA_FILE
# check for yajl util json_reformat to minimize data file
if command -v json_reformat >/dev/null 2>&1; then
	json_reformat -m <$1 >> $JS_DATA_FILE
else
	cat $1 >> $JS_DATA_FILE
fi
echo "];" >> $JS_DATA_FILE
