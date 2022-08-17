# https://hub.docker.com/_/wordpress/
ARG PHP_VERSION=8.1

FROM docker.io/php:${PHP_VERSION}-apache

ARG SOURCEGUARDIAN_LOADER=0
ARG IONCUBE_LOADER=0

RUN set -ex; \
  apt-get update -y; \
  apt-get install -y \
    libxml2-dev \
  ; \
  apt-get clean -y; \
  docker-php-ext-install -j$(nproc) \
    soap \
    pdo_mysql \
  ;

# Install and enable fu... sourceguardian loader! :_(
RUN set -ex; \
  if [ "$SOURCEGUARDIAN_LOADER" != "1" ]; then \
    echo "Skip install sourceguardian loader"; \
  else \
    PHP_VERSION=$(php -v | head -n1 | cut -d' ' -f2 | cut -d. -f1-2) \
    PHP_EXT_DIR=$(php -i | grep '^extension_dir =' | cut -d' ' -f3); \
    mkdir -p /tmp/sourceguardian; \
    cd /tmp/sourceguardian; \
    curl -sSLO https://www.sourceguardian.com/loaders/download/loaders.linux-x86_64.tar.gz; \
    tar xzf loaders.linux-x86_64.tar.gz; \
    mv ixed.${PHP_VERSION}.lin "$PHP_EXT_DIR/sourceguardian.so"; \
    echo "extension=sourceguardian.so" > $PHP_INI_DIR/conf.d/15-sourceguardian.ini; \
    rm -rf /tmp/sourceguardian; \
  fi

# Install and enable fu... ioncube loader! :_(
RUN set -ex; \
  if [ "$IONCUBE_LOADER" != "1" ]; then \
    echo "Skip install ioncube loader"; \
  else \
    PHP_VERSION=$(php -v | head -n1 | cut -d' ' -f2 | cut -d. -f1-2) \
    PHP_EXT_DIR=$(php -i | grep '^extension_dir =' | cut -d' ' -f3); \
    mkdir -p /tmp/ioncube; \
    cd /tmp/ioncube; \
    curl -sSLO http://downloads3.ioncube.com/loader_downloads/ioncube_loaders_lin_x86-64.tar.gz; \
    tar xzf ioncube_loaders_lin_x86-64.tar.gz; \
    mv ioncube/ioncube_loader_lin_${PHP_VERSION}.so "$PHP_EXT_DIR/ioncube.so"; \
    echo "zend_extension=ioncube.so" > $PHP_INI_DIR/conf.d/16-ioncube.ini; \
    rm -rf /tmp/ioncube; \
  fi

COPY php.conf.ini $PHP_INI_DIR/conf.d/
COPY fix-permition.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/fix-permition.sh

RUN a2enmod rewrite

WORKDIR /var/www/html

EXPOSE 80
