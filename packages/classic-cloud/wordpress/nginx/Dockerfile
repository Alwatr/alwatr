ARG NGINX_VERSION=1.23

FROM docker.io/library/nginx:${NGINX_VERSION}-alpine

COPY toggle-cache.html /var/www/
COPY conf.d/ /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/
