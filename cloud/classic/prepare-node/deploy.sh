#!/usr/bin/env bash

set -Eeuo pipefail
trap "echo '❌ Error'" ERR

ALWATR_LIB=../lib
source $ALWATR_LIB/common.sh

thisPath="$(pwd)"
cd $thisPath

envPath="${1:-}"
[ ! -z "${1:-}" ] && shift

command="${1:-help}"
[ ! -z "${1:-}" ] && shift

function command_hi() {
  echoStep "Hello $remoteHost"

  if ping -c 1 '8.8.8.8' &>/dev/null; then
    ping='ping -c'
  else
    ping='ping -n'
  fi

  $ping 1 $deployHost || echoError "Cannot access to $deployHost"
}

function command_info() {
  echoStep "Node info"

  remoteShell '
    cat /etc/os-release;\
    ip addr show;\
    docker version;\
    free -h;\
    docker ps --all;\
  '
}

function command_keyscan() {
  echoStep "Setup ssh: update local known_hosts"
  ssh-keygen -R $deployHost &>/dev/null || true
  ssh-keyscan -t rsa $deployHost >> ~/.ssh/known_hosts || echoError "Cannot scan $deployHost public key."
  echoGap
}

function command_sshs() {
  echoStep "Setup openssh"

  command_keyscan

  echoStep "Setup ssh: add ssh auth keys"
  scp ./config/ssh-auth "$remoteHost:~/.ssh/authorized_keys"
  scp ./config/ssh-auth "$remoteHost:~/.sak"
  echoGap

  echoStep "Setup ssh: reconfigure openssh-server"
  remoteShell 'dpkg-reconfigure openssh-server'
  command_keyscan

  echoStep "Setup ssh: add sshd_config"
  scp ./config/ssh-banner $remoteHost:/etc/ssh/banner
  scp ./config/ssh-config $remoteHost:/etc/ssh/sshd_config

  remoteShell 'if [ -f /etc/init.d/sshd ]; then /etc/init.d/sshd restart; else /etc/init.d/ssh restart; fi'
  sleep 1

  remoteShell 'cat /etc/os-release; echo ''; cat ~/.ssh/authorized_keys'
}

function command_apt() {
  echoStep "Prepare debian"

  echoStep "Prepare debian: add apt sources.list"
  scp ./config/apt-source-list "$remoteHost:/etc/apt/sources.list"

  echoStep "Prepare debian: upgrade"

  remoteShell '
    uname -a
    apt clean
    apt update
    apt autoremove
    apt list --upgradable
    apt upgrade
    apt autoremove
    apt dist-upgrade
    apt autoremove
    uname -a
  '

  remoteShell 'apt install -y curl ca-certificates gnupg screen rsync htop iotop'
}

function command_dns() {
  echoStep "Update DNS"

  file=/etc/resolv.conf
  remoteShell "if [ ! -f $file.bak ]; then cat $file; cp -av $file $file.bak; fi"

  if [ -f ./config/$envName/resolv.conf ]
  then
    scp ./config/$envName/resolv.conf  "$remoteHost:$file"
  else
    scp ./config/resolv.conf  "$remoteHost:$file"
  fi

  remoteShell "cat $file"
}

function command_sync() {
  echoStep "Sync..."
  $rsync ./ "$remotePath/"
}

function command_help() {
  echo "
  Usage: ./deploy.sh ./env/your.env COMMAND [OPTIONS]

  Alwatr prepare node script.

  Command:
    full     Sync, Build, Create/Recreate containers.
    sync   Upload all files with remote host (exclude \"_data\").
  "
}

loadEnv

remoteHost="${deployUser:-root}@${deployHost:-None}"
remotePath="${remoteHost}:${deployPath:-/lib/setup}"
envName=$(basename $envPath .env)

sshAgent
sync
command_${command} $@
