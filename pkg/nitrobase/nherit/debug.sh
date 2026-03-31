#!/usr/bin/env bash

set -Eeuo pipefail
trap "echo '❌ Error'" ERR

source $ALWATR_LIB/common.sh

command="${1:-help}"
[ ! -z "${1:-}" ] && shift

sshPort=404
deployHost=mci2.alwatr.ir
deployUser=root
deployPath=/tmp/alwatr-nitrobase-nginx
deployPort="8585"
containerName=alwatr-nitrobase-nginx-debug
imageName=alwatr/nitrobase-nginx:debug
remoteHost="$deployUser@$deployHost"
remotePath="$remoteHost:$deployPath"
prefixUri=/api/s7

function remoteShellInPath() {
  remoteShell "mkdir -p $deployPath; cd $deployPath/; $@"
}

function command_sync() {
  echoStep "Sync..."
  syncDeployment ./ $remotePath/
}

function command_build() {
  command_sync
  echoStep "Build..."
  remoteShellInPath "docker build --pull --tag $imageName ."
}

function command_down() {
  echoStep "Down..."
  remoteShellInPath "docker rm --volumes --force $containerName"
}

function command_rm() {
  command_down
  echoStep "Remove..."
  remoteShellInPath "rm -rfv $deployPath"
}

function command_up() {
  command_down
  command_build
  echoStep "Up..."

  remoteShellInPath "
    docker run \
      --detach --interactive --tty \
      --name $containerName \
      --publish $deployPort:80 \
      --volume $deployPath/temp:/data \
      $imageName
  "
  command_logs
}

function command_logs() {
  echoStep "Logs..."
  remoteShellInPath "docker logs --tail=2000 --follow $containerName" || true
}

function command_curl() {
  local url="http://$deployHost:$deployPort$1"; shift
  local auth="authorization: $1"; shift
  echoStep "Curl: $url ($auth)"
  curl --compressed --insecure --silent --show-error --include --header "$auth"  "$@" $url
  echoGap
}

function command_request() {
  local uri="$1"; shift
  echoStep "Request: $uri"
  # command_curl $uri '' "$@" || true
  # command_curl $uri 'Alwatr anonymous:anonymous' "$@" || true
  # command_curl $uri 'Alwatr Ual1md:Jafang' "$@" || true
  command_curl $uri 'Alwatr Ual1md1:T0k3n1' "$@" || true
  # command_curl $uri 'Alwatr Ual1md2:T0k3n2' "$@" || true
  # command_curl $uri 'Alwatr Uadm1n:T0k3nA' "$@" || true
}

function command_test() {
  echoStep "Test..."
  command_request $prefixUri/debug-info-110 --verbose
  return

  # command_request $prefixUri/u/Ual/Ual1md1/info.doc.asj -X OPTIONS -H "Origin: www.example.com" -H "Access-Control-Request-Method: GET" -H "Access-Control-Request-Headers: Content-Type"

  echoStep "Test Home..."
  command_request /
  command_request $prefixUri/

  echoStep "Test Public..."
  command_request $prefixUri/p/post-list.col.asj

  echoStep "Test Secret..."
  command_request $prefixUri/.s/.nitrobase.col.asj

  echoStep "Test Authentificated..."
  command_request $prefixUri/a/posts/intro-to-alwatr-nitrobase.doc.asj

  echoStep "Test Managers..."
  command_request $prefixUri/m/user-list.col.asj

  echoStep "Test PerUser..."
  command_request $prefixUri/u/Ual/Ual1md1/info.doc.asj
  command_request $prefixUri/u/Ual/Ual1md1/404.doc.asj
  command_request $prefixUri/u/Ual/Ual1md2/info.doc.asj

  echoStep "Test PerOwner..."
  command_request $prefixUri/o/D3v/D3v1ce1/info.doc.asj
  command_request $prefixUri/o/T0k/T0k3n1/info.doc.asj

  echoStep "Test Other..."
  command_request $prefixUri/test.json
  command_request $prefixUri/p/post-list.col.asj.bak
}

function command_exec() {
  echoStep "Execute... $@"
  remoteShellInPath "docker exec --interactive --tty $containerName $@"
}

function command_ps() {
  echoStep "PS... $@"
  remoteShellInPath "docker ps --filter 'name=$containerName'"
}

function command_help() {
  echo "
  Alwatr Nitrobase Nginx Debug and test.

  Usage: ./debug.sh COMMAND [OPTIONS]

  Command:
    up     Sync, Build, Create containers.
    down   Down and remove containers (no file removed).
    build  Sync, Build/rebuild containers.
    sync   Upload all files with remote host (exclude \"_data\").
    logs   View output from all containers.
    rm     Down and remove containers and delete all files.
    exec   Execute a command in a running container.
    test   Execute tests requests.
    ps     Show docker status.
    docker Direct access to docker.
  "
}

if [ "$command" == 'help' ]; then
  command_help
  exit
fi

sshAgent
command_${command} $@
