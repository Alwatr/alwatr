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

function command_ping() {
  echoStep "ping $remoteHost"

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
    cat /etc/os-release
    ip addr show
    docker version
    free -h
    docker ps --all
  '
}

function command_keyscan() {
  echoStep "Setup ssh: update local known_hosts"
  ssh-keygen -R $deployHost &>/dev/null || true
  ssh-keyscan -t rsa $deployHost >>~/.ssh/known_hosts || echoError "Cannot scan $deployHost public key."
  echoGap
}

function command_ssh() {
  echoStep "Setup openssh"

  command_keyscan

  echoStep "Setup ssh: add ssh auth keys"
  scp ./config/ssh-auth "$remoteHost:~/.ssh/authorized_keys"
  scp ./config/ssh-auth "$remoteHost:~/.sak"
  echoGap

  echoStep "Setup ssh: reconfigure openssh-server"
  remoteShell 'rm -v /etc/ssh/ssh_host_*; dpkg-reconfigure openssh-server --default-priority'
  command_keyscan

  echoStep "Setup ssh: add sshd_config"
  scp ./config/ssh-banner $remoteHost:/etc/ssh/banner
  scp ./config/ssh-config $remoteHost:/etc/ssh/sshd_config

  remoteShell 'systemctl restart ssh'
  sleep 1

  remoteShell 'cat /etc/os-release; echo ''; cat ~/.ssh/authorized_keys'
}

function command_apt() {
  echoStep "Prepare debian"

  echoStep "Prepare debian: add apt sources.list"
  scp ./config/apt-source-list "$remoteHost:/etc/apt/sources.list"

  echoStep "Prepare debian: upgrade"

  remoteShell '
    if [ ! -d /etc/apt/sources.list.bk ] && [ "$(ls -A /etc/apt/sources.list.d/)" ]
    then
      mkdir -p /etc/apt/sources.list.bk
      mv -v /etc/apt/sources.list.d/* /etc/apt/sources.list.bk/
    fi
    uname -a
    apt clean
    apt update
    apt autoremove -y
    apt list --upgradable
    apt upgrade -y
    apt autoremove -y
    apt dist-upgrade -y
    apt autoremove -y
    uname -a
  '

  remoteShell 'apt install -y curl ca-certificates gnupg screen rsync htop iotop'
}

function command_dns() {
  echoStep "Update DNS"

  remotePath=/etc/resolv.conf
  remoteShell "if [ ! -f $remotePath.bak ]; then cat $remotePath; cp -av $remotePath $remotePath.bak; fi"

  localPath=./config/resolv.conf

  if [ -f ./config/$envName/resolv.conf ]
  then
    localPath=./config/$envName/resolv.conf
  fi

  scp $localPath "$remoteHost:$remotePath"

  remoteShell "cat $remotePath"
}

function command_exec() {
  echoStep "Exec $@"
  remoteShell $@
}

function command_time() {
  echoStep "Config timezone"

  remoteShell '
    unlink /etc/localtime
    ln -s /usr/share/zoneinfo/Asia/Tehran /etc/localtime

    date
    hwclock --systohc
    date
  '
}

function command_docker() {
  echoStep "Install docker"

  echoStep "Install docker: cleanup old versions"
  remoteShell '
    for pkg in docker.io docker-doc docker-compose podman-docker containerd runc
      do apt remove -y $pkg
    done
  '
  echoStep "Install docker: sources.list"
  remoteShell '
    if [ ! -f /etc/apt/keyrings/docker.gpg ]
    then
      install -m 0755 -d /etc/apt/keyrings
      curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
      chmod a+r /etc/apt/keyrings/docker.gpg
    fi

    echo \
    "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
    "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" > /etc/apt/sources.list.d/docker.list
  '

  echoStep "Install docker: install"
  remoteShell '
    cat /etc/apt/sources.list.d/docker.list
    apt update
    apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    apt autoremove -y
  '

  command_dtest
}

function command_dtest() {
  echoStep "Test docker"
  remoteShell '
    docker --version
    docker compose version
    echo ''
    docker image rm hello-world
    echo ''
    docker pull hello-world
    echo ''
    docker run --rm hello-world
    echo ''
    docker image rm hello-world
  '
}

function command_full() {
  echoStep "Full setup..."
  command_ping
  command_ssh
  command_time
  command_apt
  command_dns
  command_docker
  command_dtest
}

function command_help() {
  echo "
  Usage: ./deploy.sh ./env/your.env COMMAND [OPTIONS]

  Alwatr prepare node script.

  Command:
    full     Full setup on clean npde.
    ping     Check server is up with ping.
    info     Get server info.
    keyscan  add server to known_hosts.
    ssh      Setup ssh.
    apt      Update source list, Upgrade, Dist update.
    dns      Setup dns.
    time     Config time and timezone.
    docker   Install and setup docker & docker compose.
    dtest    Test docekr.
    exec     Execute custome command
  "
}

loadEnv

remoteHost="${deployUser:-root}@${deployHost:-None}"
remotePath="${remoteHost}:${deployPath:-/lib/setup}"
envName=$(basename $envPath .env)

sshAgent
command_${command} $@
