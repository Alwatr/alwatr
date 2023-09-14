#!/usr/bin/env bash

set -Eeuo pipefail
trap "echo '❌ Error'" ERR

thisPath="$(pwd)"
cd $thisPath

v2ray run -format=jsonv5 -c ${1:-./secret/dev/vmess-client.json}
