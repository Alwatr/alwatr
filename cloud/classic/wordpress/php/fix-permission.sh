#!/usr/bin/env bash
set -ex

data=/var/www/html/
ls -lahF $data
chown www-data:www-data -R $data
find $data -type d -exec chmod 755 {} \;
find $data -type f -exec chmod 644 {} \;
ls -lahF $data

chown www-data:www-data -R /var/cache
ls -lahF /var/cache
