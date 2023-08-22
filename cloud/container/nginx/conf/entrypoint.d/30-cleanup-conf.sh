#!/bin/sh

set -eu

# Remove some configs base on envs
cleanup_confings() {
  if [ -z ${NGINX_FORCE_DOMAIN:-} ]; then
    rm -fv /etc/nginx/conf.d/location.d/90-force-domain.conf
  fi
}

cleanup_confings

exit 0
