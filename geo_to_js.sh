#!/bin/sh

if [ -z "$1" ]; then
    echo "No argument supplied"
    exit 1
fi

if [ ! -f "$1" ]; then
    echo "File not found!"
    exit 2
fi

echo "var kt_data = [" > www/kt_data.js
cat $1 >> www/kt_data.js
echo "];" >> www/kt_data.js
