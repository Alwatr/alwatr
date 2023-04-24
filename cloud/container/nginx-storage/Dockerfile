ARG ALWATR_NGINX_VERSION=1.3.2-1.24-alpine

FROM ghcr.io/alimd/nginx:$ALWATR_NGINX_VERSION

# Default environment for nginx template
ENV NGINX_OPEN_FILE_CACHE_INACTIVE=1s \
    NGINX_OPEN_FILE_CACHE_VALID=2s \
    NGINX_EXPIRES_DYNAMIC=epoch \
    NGINX_EXPIRES_STATIC=max \
    NGINX_EXPIRES_DEFAULT=epoch

RUN rm -fv index.html
COPY index.json ./
COPY _error.json /var/www/
COPY conf/ /etc/nginx/templates/
