#!/bin/sh
project="vue"

if [ -z "$1" ]; then
	echo "error params empty! eg: sh unzip.sh admin"
	exit
fi

cd /data/www/vue

# backup
time=$(date "+%Y-%m-%d")
backup_name="${project}-backup-$1-${time}.zip"
if type 7z 2>/dev/null; then
	7z a -tZip ${backup_name} dist/$1 -mx0
else
	zip -q -r ${backup_name} dist/$1
fi

# clear
rm -rf dist/$1/**

# unzip
unzip_name="${project}-build-$1.zip"
unzip -o -d ./ ${unzip_name}
rm ${unzip_name}