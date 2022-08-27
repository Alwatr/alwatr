ARG ALPINE_VERSION=3.16
FROM ghcr.io/alimd/alpine:${ALPINE_VERSION}

ARG TDLIB_VERSION=1.8.0
RUN set -ex; \
    apk add --no-cache --virtual .build-deps \
      curl \
      ca-certificates \
      g++ \
      make \
      cmake \
      gperf \
      libressl-dev \
      zlib-dev \
      zlib-static \
      linux-headers; \
    curl -sSLo tdlib.tar.gz https://github.com/tdlib/td/archive/refs/tags/v${TDLIB_VERSION}.tar.gz; \
    mkdir /tmp/td/ && cd /tmp/td/; \
    tar -xzvf tdlib.tar.gz && cd td-${TDLIB_VERSION}; \
    mkdir build && cd build; \
    cmake -DCMAKE_BUILD_TYPE=Release ..; \
    ls -lAhFtr; \
    cmake --build .; \
    ls -lAhFtr; \
    make install; \
    ls -lAhFtr /usr/local/lib/; \
    apk del .build-deps; \
    rm -rfv /tmp/td/;
