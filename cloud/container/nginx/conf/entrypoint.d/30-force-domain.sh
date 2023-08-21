#!/bin/sh

# remove force-domain.conf if NGINX_FORCE_DOMAIN is not set

set -eu

ME=$(basename $0)

force_domain() {
  [ -z $NGINX_FORCE_DOMAIN ] && rm -f /etc/nginx/location.d/force-domain.conf
}

force_domain

exit 0
