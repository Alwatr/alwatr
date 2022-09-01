#!/usr/bin/env bash
set -ex

docker network create alwatr-private-network 2>/dev/null || true

docker compose up --detach --remove-orphans --force-recreate
