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
  ssh-keyscan -t rsa $deployHost >>~/.ssh/known_hosts || echoError "Cannot scan $deployHost public key."
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

  remotePath=/etc/resolv.conf
  remoteShell "if [ ! -f $remotePath.bak ]; then cat $remotePath; cp -av $remotePath $remotePath.bak; fi"

  localPath=/etc/resolv.conf

  if [ -f ./config/$envName/resolv.conf ]
  then
    localPath=./config/$envName/resolv.conf
  fi

  scp $localPath "$remoteHost:$serverFile"

  remoteShell "cat $file"
}

function command_idocker() {
  echoStep "Install Docker"

  if [ ! -f /etc/apt/keyrings/docker.gpg ]; then
    remoteShell "mkdir -p /etc/apt/keyrings"
    remoteShell "curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg"
  fi

  scp ./config/docker-source-list "$remoteHost:/etc/apt/sources.list.d/docker.list"
  remoteShell '
    cat /etc/apt/sources.list.d/docker.list
    apt update
    apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    docker --version
    docker compose --version
  '
}

command_full() {
  echoStep "Full setup..."
  command_hi
  command_info || true
  command_keyscan
  command_sshs
  command_apt
  command_dns
  command_idocker
}

function command_help() {
  echo "
  Usage: ./deploy.sh ./env/your.env COMMAND [OPTIONS]

  Alwatr prepare node script.

  Command:
    full     Full setup docker.
    hi       Check server is up with ping.
    info     Get server info.
    keyscan  add server to known_hosts.
    sshs     Setup ssh.
    apt      Update source list, Upgrade, Dist update.
    dns      Setup dns.
    idocker  Install and setup docker & docker compose.
  "
}

loadEnv

remoteHost="${deployUser:-root}@${deployHost:-None}"
remotePath="${remoteHost}:${deployPath:-/lib/setup}"
envName=$(basename $envPath .env)

sshAgent
command_${command} $@
