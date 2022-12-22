#!/bin/sh
# vim:sw=4:ts=4:et

set -e

if [ -z "${NGINX_ENTRYPOINT_QUIET_LOGS:-}" ]; then
    exec 3>&1
else
    exec 3>/dev/null
fi

entrypointDir=/etc/nginx/entrypoint.d/

if [ "$1" = "nginx" -o "$1" = "nginx-debug" ]; then
    if /usr/bin/find "$entrypointDir" -mindepth 1 -maxdepth 1 -type f -print -quit 2>/dev/null | read v; then
        echo >&3 "$0: $entrypointDir is not empty, will attempt to perform configuration"

        echo >&3 "$0: Looking for shell scripts in $entrypointDir"
        find "$entrypointDir" -follow -type f -print | sort -V | while read -r f; do
            case "$f" in
                *.sh)
                    if [ -x "$f" ]; then
                        echo >&3 "$0: Launching $f";
                        "$f"
                    else
                        # warn on shell scripts without exec bit
                        echo >&3 "$0: Ignoring $f, not executable";
                    fi
                    ;;
                *) echo >&3 "$0: Ignoring $f";;
            esac
        done

        echo >&3 "$0: Configuration complete; ready for start up"
    else
        echo >&3 "$0: No files found in $entrypointDir, skipping configuration"
    fi
fi

exec "$@"
