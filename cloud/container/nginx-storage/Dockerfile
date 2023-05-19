ARG ALWATR_NGINX_VERSION=1.6.0-1.24-alpine

FROM ghcr.io/alimd/nginx:$ALWATR_NGINX_VERSION

# Default environment for nginx template
ENV NGINX_OPEN_FILE_CACHE_INACTIVE=20s \
    NGINX_OPEN_FILE_CACHE_VALID=1m \
    NGINX_DOCUMENT_ROOT=/storage/publistore \
    NGINX_EXPIRES_DYNAMIC=epoch \
    NGINX_EXPIRES_STATIC=max \
    NGINX_EXPIRES_DEFAULT=epoch \
    NGINX_DISABLE_SYMLINKS=if_not_owner \
    NGINX_LIMIT_REQ_RATE=400

COPY _error.json /var/www/
COPY conf/ /etc/nginx/templates/
