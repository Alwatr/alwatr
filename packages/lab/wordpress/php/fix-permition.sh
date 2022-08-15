#!/usr/bin/env bash

set -Eeuo pipefail
trap "echo '❌ Error'" ERR

data=/var/www/html/

echo "Fix permitions..."

ls -lahF $data
chown www-data:www-data -R $data
find $data -type d -exec chmod 755 {} \;
find $data -type f -exec chmod 644 {} \;
ls -lahF $data
