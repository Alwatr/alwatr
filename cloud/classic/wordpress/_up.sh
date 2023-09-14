#!/usr/bin/env bash
set -ex

[ -f "_data/wp-config.php" ] && mv -fv "_data/wp-config.php" "_data/wp-config.php.bak"

docker compose up --detach --remove-orphans --force-recreate

time docker compose exec php bash -c 'if [ "$SKIP_FIX_PERMISSIONS" != "1" ]; then fix-permission.sh; fi'
