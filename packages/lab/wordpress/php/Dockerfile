# https://hub.docker.com/_/wordpress/
ARG PHP_VERSION=8.1
ARG WORDPRESS_VERSION=6.0

FROM wordpress:${WORDPRESS_VERSION}-php${PHP_VERSION}-fpm

# Install and enable Source Gaurdian loader! :_(
RUN PHP_VERSION=$(php -v | head -n1 | cut -d' ' -f2 | cut -d. -f1-2) \
    && mkdir -p /tmp/sourceguardian \
    && cd /tmp/sourceguardian \
    && curl -Os https://www.sourceguardian.com/loaders/download/loaders.linux-x86_64.tar.gz \
    && tar xzf loaders.linux-x86_64.tar.gz \
    && cp ixed.${PHP_VERSION}.lin "$(php -i | grep '^extension_dir =' | cut -d' ' -f3)/sourceguardian.so" \
    && echo "extension=sourceguardian.so" > /usr/local/etc/php/conf.d/15-sourceguardian.ini \
    && rm -rf /tmp/sourceguardian

COPY php.conf.ini $PHP_INI_DIR/conf.d/
COPY fix-permition.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/fix-permition.sh
