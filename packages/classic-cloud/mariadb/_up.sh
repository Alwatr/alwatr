#!/usr/bin/env bash
set -Eeuo pipefail
trap "echo '❌ Error'" ERR

TIMEFORMAT="done in %Rs"
thisPath="$(pwd)"
cd $thisPath;
ls -lahF;

echoStep () {
  echo "🔸 $1"
}

echoStep "Preparing..."

docker network create alwatr-private-network || echo "network exist"

[ ! -d _data ] && mkdir _data

time docker compose pull
# docker compose build --pull

echoStep "Fix permitions..."

docker compose stop
mysqlPath=/var/lib/mysql
time docker compose run --rm --name 'fix-db' --user=root database \
  bash -c "ls -lahF $mysqlPath; chown -R mysql:mysql $mysqlPath; ls -lahF $mysqlPath;"

echoStep "Starting..."

time docker compose up --detach --remove-orphans # --force-recreate

echoStep "Done"

docker compose logs --tail=300 --follow || true
