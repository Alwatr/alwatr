ARG NGINX_IMAGE=ghcr.io/alimd/nginx:1.9.2-1.25-alpine
FROM $NGINX_IMAGE

# Default environment for nginx template
ENV NGINX_OPEN_FILE_CACHE="max=1000 inactive=1h" \
    NGINX_OPEN_FILE_CACHE_VALID=1M \
    NGINX_OPEN_FILE_CACHE_MIN_USES=2 \
    NGINX_OUTPUT_BUFFERS="8 8k" \
    NGINX_EXPIRES_DYNAMIC=epoch \
    NGINX_EXPIRES_DEFAULT=epoch \
    NGINX_EXPIRES_STATIC=max \
    NGINX_LIMIT_REQ_RATE=200

COPY conf/ /etc/nginx/
