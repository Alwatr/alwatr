#!/usr/bin/env bash
set -ex

docker network create alwatr-private-network 2>/dev/null || true

mysqlPath="/var/lib/mysql"
docker compose stop
time docker compose run --rm --name 'fix-db' --user=root database \
  bash -c "ls -lahF $mysqlPath; chown -R mysql:mysql $mysqlPath; ls -lahF $mysqlPath;"

docker compose up --detach --remove-orphans # --force-recreate
