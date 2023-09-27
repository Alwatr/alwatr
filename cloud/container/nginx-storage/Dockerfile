ARG NGINX_IMAGE=ghcr.io/alimd/nginx:1.10.0-1.25-alpine
FROM $NGINX_IMAGE

# Default environment for nginx template
ENV NGINX_OPEN_FILE_CACHE="max=5000 inactive=1h" \
    NGINX_OPEN_FILE_CACHE_VALID=1s \
    NGINX_OPEN_FILE_CACHE_MIN_USES=2 \
    NGINX_OUTPUT_BUFFERS="8 8k" \
    NGINX_DOCUMENT_ROOT=/storage/publistore \
    NGINX_EXPIRES_DYNAMIC=epoch \
    NGINX_EXPIRES_STATIC=max \
    NGINX_EXPIRES_DEFAULT=epoch \
    NGINX_DISABLE_SYMLINKS=if_not_owner \
    NGINX_LIMIT_REQ_RATE=400

COPY _error.json /var/www/
COPY conf/ /etc/nginx/templates/
