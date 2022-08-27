ARG ALPINE_VERSION=3.16
FROM docker.io/alpine:${ALPINE_VERSION}

docker pull ghcr.io/alimd/alpine:next

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
    tar -xzf tdlib.tar.gz && cd td-${TDLIB_VERSION}; \
    mkdir build && cd build; \
    cmake -DCMAKE_BUILD_TYPE=Release ..; \
    cmake --build .; \
    make install;
    # apk del .build-deps;
