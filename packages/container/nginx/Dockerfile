ARG NGINX_VERSION=1.23
ARG NGINX_IMAGE=docker.io/nginx:${NGINX_VERSION}-alpine

FROM $NGINX_IMAGE

# Default environment for nginx template
ENV NGINX_ERROR_LOG_LEVEL=notice \
    NGINX_ACCESS_LOG="/var/log/nginx/access.log json" \
    NGINX_WORKER_CONNECTIONS=2048 \
    NGINX_CLIENT_MAX_BODY_SIZE=10m \
    NGINX_SENDFILE=on \
    NGINX_TCP_NOPUSH=off \
    NGINX_TCP_NODELAY=off \
    NGINX_OPEN_FILE_CACHE_VALID=5m \
    NGINX_EXPIRES_HTML=epoch \
    NGINX_EXPIRES_STATIC=max \
    NGINX_EXPIRES_DEFAULT=5m \
    NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE=1

RUN mkdir -p /var/www/html

COPY html/  /var/www/

# All nginx configuration include entrypoints
COPY conf/ /etc/nginx/

EXPOSE 80
ENTRYPOINT ["/etc/nginx/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -fso /dev/null http://localhost/ || exit 1
