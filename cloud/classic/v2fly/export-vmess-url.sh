#!/usr/bin/env bash

set -Eeuo pipefail
trap "echo '❌ Error'" ERR

thisPath="$(pwd)"
cd $thisPath

configPath="${1}"
serverUrl="${2}"
configName="${3}"
outputPath="${4}"

function makeConfig() {
  local url=${1}
  local port=${2}
  local protocol=${3}
  local userId=${4}
  local userName=${5}

  cat <<EOF
{
  "add": "$url",
  "aid": "0",
  "alpn": "",
  "fp": "",
  "host": "",
  "id": "$userId",
  "net": "$protocol",
  "path": "",
  "port": "$port",
  "ps": "$userName",
  "scy": "zero",
  "sni": "",
  "tls": "",
  "type": "none",
  "v": "2"
}
EOF
}

function exportConfig() {
  local index=0
  serverPort=$(jq -r '.inbounds[0].port' ${configPath})
  local output=""
  for userId in $(jq -r '.inbounds[0].settings.users[]' ${configPath}); do
    oldOutput=$output
    local userName="⚡️${configName}, user${index}, $1"
    config=$(makeConfig $serverUrl $serverPort $1 $userId "$userName")
    url=$(echo $config | base64)
    # output="${oldOutput}\n${userName}\tvmess://${url}"
    output="${oldOutput}\nvmess://${url}"
    ((index++))
  done

  echo -e $output
}


function exportConfigToFile() {
  output=$(exportConfig ws)
  echo -e "ws\n${output}" >> $outputPath
  output=$(exportConfig tcp)
  echo -e "\n---------------------\n\ntcp\n${output}" >> $outputPath
}

exportConfigToFile
