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

sshPort=404

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
  sshKeyCleanup $deployHost
  echoGap
}

function command_ssh() {
  echoStep "Setup openssh"

  echoStep "Setup ssh: change port"
  local oldSshPort=$sshPort
  sshPort=22
  sshKeyCleanup $deployHost
  remoteShell 'echo "Port 404" >> /etc/ssh/sshd_config; systemctl restart ssh && echo "ssh restarted"' || true
  echoGap

  sshPort=$oldSshPort
  sshKeyCleanup $deployHost

  echoStep "Setup ssh: add ssh auth keys"
  scopy ./config/ssh-auth "$remoteHost:~/.ssh/authorized_keys"
  copyConfigFile ssh-auth '~/.sak'

  echoGap

  echoStep "Setup ssh: reconfigure openssh-server"
  remoteShell 'rm -v /etc/ssh/ssh_host_*; dpkg-reconfigure openssh-server --default-priority; systemctl restart ssh'
  sshKeyCleanup $deployHost

  echoStep "Setup ssh: add sshd_config"
  copyConfigFile ssh-banner /etc/ssh/banner
  copyConfigFile ssh-config /etc/ssh/sshd_config

  echoStep "Setup ssh: add ssh key"
  copyConfigFile ssh-rsa "~/.ssh/id_rsa"
  copyConfigFile ssh-rsa.pub "~/.ssh/id_rsa.pub"
  remoteShell 'chmod 600 ~/.ssh/id_rsa'

  echoStep "Setup ssh: restart ssh and test"

  remoteShell 'systemctl restart ssh'
  sleep 1
  remoteShell "echo 'SSH OK ;)'"
}

function command_apt() {
  echoStep "Prepare debian"

  echoStep "Prepare debian: add apt sources.list"
  copyConfigFile apt-source-list /etc/apt/sources.list

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
    apt autoremove -y --purge
    apt list --upgradable
    apt dist-upgrade -y
    apt autoremove -y --purge
    apt upgrade -y
    apt autoremove -y --purge
    uname -a
  '

  remoteShell 'apt install -y curl ca-certificates gnupg screen rsync htop iotop'
}

function command_dns() {
  echoStep "Update DNS"

  copyConfigFile resolv.conf /etc/resolv.conf
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
    for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do
      apt remove -y --purge $pkg
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
    apt autoremove -y --purge
  '

  command_dtest
}

function command_dtest() {
  echoStep "Test docker"

  remoteShell '
    docker --version
    docker compose version
    echo ''
    docker image rm hello-world || true
    echo ''
    docker pull hello-world
    echo ''
    docker run --rm hello-world
    echo ''
    docker image rm hello-world
  '
}

function command_sysctl() {
  echoStep "Config sysctl"

  remoteShell '
    sysctl --all
    echo ''

    if [ ! -d /etc/sysctl.d.bk ]
    then
      mkdir -p /etc/sysctl.d.bk
      mv -v /etc/sysctl.d/* /etc/sysctl.d.bk/ || true
      mv -v /etc/sysctl.conf /etc/sysctl.d.bk/ || true
    fi

    if [ -f /etc/sysctl.conf ]
    then
      rm -fv /etc/sysctl.conf
    fi
  '

  rcopy ./config/sysctl/ $remoteHost:/etc/sysctl.d/
  # if [ -d "./config/$envName/sysctl" ]; then
  #   rcopy "./config/$envName/sysctl/" $remoteHost:/etc/sysctl.d/
  # fi

  remoteShell 'sysctl --system' || remoteShell 'sysctl --system'
  sleep 1
}

function command_disk() {
  echoStep "Configure disk"
  remoteShell '
    cat /sys/block/sda/queue/scheduler || true
    echo scheduler="noop" > /etc/default/scheduler
  '
  command_reboot
  command_ping
  remoteShell 'cat /sys/block/sda/queue/scheduler' || true
}

function command_reboot() {
  echoStep "Reboot"
  remoteShell 'reboot' || true
  sleep 2
}

function command_net() {
  echoStep "Config network interfaces"
  local remotePath=/etc/network/interfaces

  copyConfigFile net.conf $remotePath || return 0

  remoteShell "
    if ! systemctl restart networking; then
      echo 'Failed to restart network service. Rolling back...'
      cp -v $remotePath.bak $remotePath
      systemctl restart networking
    else
      echo 'Network service restarted.'
      if ! ping -c 1 -W 1 1.1.1.1; then
        echo 'Failed to ping, rolling back...'
        cp -v $remotePath.bak $remotePath
        systemctl restart networking
      fi
    fi
  "
}

# TODO: function command_hostname() {}

function command_full() {
  echoStep "Full setup..."
  command_ping 1
  command_ssh

  command_time
  command_net
  command_dns

  command_apt

  command_sysctl
  command_disk
  command_docker

  command_reboot
  command_ping
  echoLogo
}

function command_exec() {
  echoStep "Exec $@"
  remoteShell $@
}

function command_sh() {
  echoStep "Remote shell"
  ssh -o ConnectTimeout=2 -o ConnectionAttempts=1  -p ${sshPort:-22} -t $remoteHost
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
    sysctl   Config sysctl.
    exec     Execute custome command.
    sh       Access remote shell.
  "
}

echoLogo

loadEnv

remoteHost="${deployUser:-root}@${deployHost:-None}"
remotePath="${remoteHost}:${deployPath:-/lib/setup}"
envName=$(basename $envPath .env)

sshAgent
command_${command} $@
