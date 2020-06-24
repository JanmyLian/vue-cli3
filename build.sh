#!/bin/sh
project="vue"

if [ -z "$1" ]; then
    echo "params empty! eg: sh build.sh admin"
    exit
fi

# clear
pack_name="${project}-build-$1.zip"
rm -rf dist/$1/**
rm ${pack_name}

# build
npm run build-$1

# zip
if type 7z 2>/dev/null; then
    7z a -tZip ${pack_name} dist/$1 -mx0
else
    zip -q -r ${pack_name} dist/$1
fi