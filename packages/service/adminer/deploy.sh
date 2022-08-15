#!/usr/bin/env bash
set -Eeuo pipefail
trap "echo '❌ Error'" ERR

thisPath="$(pwd)"
thisBasename="$(basename "$thisPath")"
cd $thisPath;

if [ -z ${DEPLOY_HOST:-} ]
then
  echo '❌ Please set deploy host env by `export DEPLOY_HOST=root@srv1.alwatr.io`'
  exit 1
fi

if [ -z ${DEPLOY_NAME:-} ]
then
  echo "❌ Please set deploy path env by 'DEPLOY_NAME=$thisBasename ./deploy.sh'"
  exit 1
fi

DEPLOY_NAME=${DEPLOY_NAME:-$thisBasename}
deployPath="/srv/$DEPLOY_NAME/"
envPath=".env.$DEPLOY_NAME"

echo "DEPLOY_HOST: $DEPLOY_HOST"
echo "DEPLOY_NAME: $DEPLOY_NAME"
echo "DEPLOY_PATH: $deployPath"

echoStep () {
  echo "🔸 $1"
}

remoteShell () {
  server=$1; shift;
  echo "🔸 remoteShell => $server"
  ssh -o "ConnectTimeout=5" -tt -q $server $@
}

if [ ! -f $envPath ]
then
  echo "❌ $envPath not found!"
  cp .env.example $envPath
  nano $envPath
fi

echoStep "Sync..."

remoteShell $DEPLOY_HOST "mkdir -p $deployPath"

cp -afv $envPath .env
rsync -Pazh --del ./_*.sh ./.env ./*.yml $DEPLOY_HOST:$deployPath
rm -fv .env

if [[ "${1:-}" == "--down" ]]
then
  echoStep "Down..."
  remoteShell $DEPLOY_HOST "cd $deployPath && docker-compose down --remove-orphans"
else
  echoStep "Up..."
  remoteShell $DEPLOY_HOST "cd $deployPath && chmod +x _up.sh && ./_up.sh"
fi
