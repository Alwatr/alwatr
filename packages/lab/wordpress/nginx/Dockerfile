ARG NGINX_VERSION=1.23

FROM nginx:${NGINX_VERSION}-alpine

COPY nginx.conf /etc/nginx/
COPY conf.d/ /etc/nginx/conf.d/
COPY toggle-cache.html /var/www/

RUN ls -lahF /etc/nginx && ls -lahF /etc/nginx/conf.d/ # for debug
