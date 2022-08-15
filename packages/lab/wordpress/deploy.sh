#!/usr/bin/env bash
set -Eeuo pipefail
trap "echo '❌ Error'" ERR

thisPath="$(pwd)"
thisBasename="$(basename "$thisPath")"
cd $thisPath;

if [ -z ${DEPLOY_HOST:-} ]
then
  echo '❌ Plsease set deploy host env by `export DEPLOY_HOST=root@srv1.alwatr.io`'
  exit 1
fi

if [ -z ${DEPLOY_PATH:-} ]
then
  echo "❌ Plsease set deploy path env by 'DEPLOY_PATH=$thisBasename ./deploy.sh'"
  exit 1
fi

DEPLOY_PATH="/srv/${DEPLOY_PATH:-$thisBasename}/"

echo "DEPLOY_HOST: $DEPLOY_HOST"
echo "DEPLOY_PATH: $DEPLOY_PATH"

echoStep () {
  echo "🔸 $1"
}

remoteShell () {
  server=$1; shift;
  echo "🔸 remoteShell => $server"
  ssh -o "ConnectTimeout=5" -tt -q $server $@
}

if [ ! -f .env ]
then
  echo "❌ .env file not found"
  cp .env.example .env
  nano .env
fi

echoStep "Sync..."

remoteShell $DEPLOY_HOST "mkdir -p $DEPLOY_PATH"

rsync -Pazh --del ./_*.sh ./.env ./*.yml php nginx $DEPLOY_HOST:$DEPLOY_PATH/

if [[ "${1:-}" == "--down" ]]
then
  echoStep "Down..."
  remoteShell $DEPLOY_HOST "cd $DEPLOY_PATH && docker-compose down --remove-orphans"
else
  echoStep "Up..."
  remoteShell $DEPLOY_HOST "cd $DEPLOY_PATH && chmod +x _up.sh && ./_up.sh"
fi
