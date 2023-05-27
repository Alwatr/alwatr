ARG NGINX_VERSION=1.24
ARG NGINX_IMAGE=docker.io/library/nginx:${NGINX_VERSION}-alpine

FROM $NGINX_IMAGE

# Default environment for nginx template
# ENV NGINX_ACCESS_LOG="/var/log/nginx/access.log json"
ENV NGINX_ACCESS_LOG=off \
    NGINX_ERROR_LOG_LEVEL=notice \
    NGINX_WORKER_CONNECTIONS=2048 \
    NGINX_CLIENT_MAX_BODY_SIZE=10m \
    NGINX_SENDFILE=on \
    NGINX_SENDFILE_MAX_CHUNK=2m \
    NGINX_TCP_NOPUSH=on \
    NGINX_TCP_NODELAY=on \
    NGINX_OPEN_FILE_CACHE="max=1000 inactive=30m" \
    NGINX_OPEN_FILE_CACHE_VALID=1d \
    NGINX_OPEN_FILE_CACHE_MIN_USES=2 \
    NGINX_OUTPUT_BUFFERS="8 16k" \
    NGINX_EXPIRES_DYNAMIC=max \
    NGINX_EXPIRES_STATIC=max \
    NGINX_EXPIRES_DEFAULT=max \
    NGINX_LIMIT_REQ_RATE=200 \
    NGINX_LIMIT_REQ_BURST=1000 \
    NGINX_LIMIT_REQ_ERROR=503 \
    NGINX_LIMIT_REQ_LOG=notice \
    NGINX_AUTOINDEX=off \
    NGINX_DOCUMENT_ROOT=/var/www/html \
    NGINX_DISABLE_SYMLINKS=if_not_owner \
    NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE=1

RUN apk add --no-cache curl
HEALTHCHECK --interval=30s --timeout=3s --start-period=1s --retries=3 CMD curl -fso /dev/null http://localhost/server-info || exit 1

RUN rm -rfv /etc/nginx/conf.d/*
COPY conf/ /etc/nginx/
COPY www/  /var/www/

EXPOSE 80
WORKDIR /var/www/html/
ENTRYPOINT ["/etc/nginx/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
