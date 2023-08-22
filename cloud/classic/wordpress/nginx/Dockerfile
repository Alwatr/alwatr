ARG NGINX_IMAGE=ghcr.io/alimd/nginx:1.9.1-1.25-alpine
FROM $NGINX_IMAGE

RUN rm -rfv /etc/nginx/templates /etc/nginx/conf.d/* /etc/nginx/nginx.conf

COPY toggle-cache.html /var/www/
COPY conf.d/ /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/
