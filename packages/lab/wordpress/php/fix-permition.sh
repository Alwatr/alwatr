#!/usr/bin/env bash

set -Eeuo pipefail
trap "echo '❌ Error'" ERR

if [ "${SKIP_FIX_PERMISSIONS:-}" = "1" ]
then
  echo "Skip fix permitions"
  exit 0
fi

echo "Fix permitions..."

data=/var/www/html/
ls -lahF $data
chown www-data:www-data -R $data
find $data -type d -exec chmod 755 {} \;
find $data -type f -exec chmod 644 {} \;
ls -lahF $data
