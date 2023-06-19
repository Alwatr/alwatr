ARG NGINX_VERSION=1.7.0-1.24

FROM ghcr.io/alimd/nginx:${NGINX_VERSION}-alpine

RUN rm -rfv /etc/nginx/templates

COPY toggle-cache.html /var/www/
COPY conf.d/ /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/
