#!/usr/bin/env bash
set -Eeuo pipefail
trap "echo '❌ Error'" ERR

thisPath="$(pwd)"
projectName="$(basename "$thisPath")"
cd $thisPath;

host=${1:-}; shift;
if [ -z "$host" ]
then
  echo "Pass the host as the first argument."
  exit 1
fi

echoStep () {
  echo "🔸 $1"
}

remoteShell() {
  server=$1; shift;
  echo "🔸 remoteShell => $server"
  ssh -o "ConnectTimeout=5" -tt -q $server $@ || echo "❌ remoteShell error for $server"
}

if [ ! -f .env ]
then
  echo "❌ .env file not found"
  cp .env.example .env
  nano .env
fi

echoStep "Sync..."

remoteShell $host "mkdir -p /srv/$projectName"

rsync -Pazh --del ./_*.sh ./.env ./*.yml $host:/srv/$projectName/

if [[ "${1:-}" == "--down" ]]
then
  echoStep "Down..."
  remoteShell $host "cd /srv/$projectName && docker-compose down --remove-orphans"
else
  echoStep "Up..."
  remoteShell $host "cd /srv/$projectName && chmod +x _up.sh && ./_up.sh"
fi
