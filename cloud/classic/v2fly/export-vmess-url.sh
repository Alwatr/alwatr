#!/usr/bin/env bash

set -Eeuo pipefail
trap "echo '❌ Error'" ERR

thisPath="$(pwd)"
cd $thisPath

configPath="${1}"

url=$(cat $configPath | base64)
echo "vmess://${url}"
