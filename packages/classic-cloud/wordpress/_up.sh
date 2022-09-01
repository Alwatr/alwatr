#!/usr/bin/env bash
set -ex

[ ! -d "_data" ] && mkdir "_data"
[ -f "_data/wp-config.php" ] && mv -fv "_data/wp-config.php" "_data/wp-config.php.bak"

docker compose up --detach --remove-orphans --force-recreate

time docker compose exec php "fix-permition.sh" || true
