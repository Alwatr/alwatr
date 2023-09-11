#!/usr/bin/env bash

set -Eeuo pipefail
trap "echo '❌ Error'" ERR

thisPath="$(pwd)"
cd $thisPath

configPath="${1}"
count="${2-1}"

for ((i=1; i<=$count; i++))
do
  uuid=$(uuidgen)
  jq --arg uuid "$(v2ray uuid)" '.inbounds[0].settings.users += [$uuid]' ${configPath} > ${configPath}.new
  mv ${configPath}.new ${configPath}
done
