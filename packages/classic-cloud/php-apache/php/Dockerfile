ARG PHP_VERSION=8.1
ARG IMAGE_NAME=docker.io/php:${PHP_VERSION}-apache

FROM $IMAGE_NAME

WORKDIR /var/www/html
EXPOSE 80

COPY php.conf.ini $PHP_INI_DIR/conf.d/
COPY fix-permition.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/fix-permition.sh

ARG APT_INSTALL
RUN set -ex; \
  if [ -z "$APT_INSTALL" ]; then \
    echo "Skip apt packages: $APT_INSTALL"; \
  else \
    echo "Installing apt packages"; \
    apt-get update -y; \
    apt-get install -y --no-install-recommends $APT_INSTALL; \
    apt-get autoremove -y; \
    apt-get clean -y; \
    rm -rfv /var/lib/apt/lists/*; \
  fi
ARG PHP_EXT_INSTALL
RUN set -ex; \
  if [ -z "$PHP_EXT_INSTALL" ]; then \
    echo "Skip php extensions"; \
  else \
    echo "Installing php extensions: $PHP_EXT_INSTALL"; \
    docker-php-ext-install $PHP_EXT_INSTALL; \
  fi

ARG APACHE_MODULE
RUN set -ex; \
  if [ -z "$APACHE_MODULE" ]; then \
    echo "Skip apache modules"; \
  else \
    echo "Installing apache modules: $APACHE_MODULE"; \
    a2enmod $APACHE_MODULE; \
  fi

ARG SOURCEGUARDIAN_LOADER=0
RUN set -ex; \
  if [ "$SOURCEGUARDIAN_LOADER" != "1" ]; then \
    echo "Skip sourceguardian loader"; \
  else \
    echo "Installing sourceguardian loader"; \
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

ARG IONCUBE_LOADER=0
RUN set -ex; \
  if [ "$IONCUBE_LOADER" != "1" ]; then \
    echo "Skip ioncube loader"; \
  else \
    echo "Installing ioncube loader"; \
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
