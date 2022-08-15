# https://hub.docker.com/_/wordpress/
ARG PHP_VERSION=8.1
ARG WORDPRESS_VERSION=6.0

FROM wordpress:${WORDPRESS_VERSION}-php${PHP_VERSION}-fpm

COPY php.conf.ini $PHP_INI_DIR/conf.d/
COPY fix-permition.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/fix-permition.sh
