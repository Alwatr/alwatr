#!/bin/sh
# vim:sw=2:ts=2:sts=2:et

set -e

ME=$(basename $0)

config_js_envsubst() {
  local config_js_path="${NGINX_ENVSUBST_CONFIG_JS_PATH:-/var/www/html/config.js}"

  local defined_envs=$(printf '${%s} ' $(env | cut -d= -f1))
  [ -f "$config_js_path" ] || return 0
  if [ ! -w "$config_js_path" ]; then
    echo >&3 "$ME: ERROR: $config_js_path exists, but is not writable"
    return 0
  fi
  echo >&3 "$ME: Running envsubst on $config_js_path"
  envsubst "$defined_envs" < "$config_js_path" > "${config_js_path}.tmp"
  mv -f "${config_js_path}.tmp" "$config_js_path"
}

config_js_envsubst

exit 0
