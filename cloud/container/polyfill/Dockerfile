ARG RUST_VERSION=1
ARG NODE_VERSION=20
FROM docker.io/library/rust:${RUST_VERSION}-alpine as rust-builder

RUN apk update
RUN apk add --no-cache build-base llvm lld

RUN cargo install viceroy

FROM docker.io/library/node:${NODE_VERSION}-alpine as node-builder

WORKDIR /app

RUN apk add --no-cache curl tar

# ENV POLYFILL_VERSION tags/v4.50.1
ENV POLYFILL_VERSION heads/main
RUN curl -L -o polyfill-service.tar.gz https://codeload.github.com/Financial-Times/polyfill-service/tar.gz/refs/${POLYFILL_VERSION}
RUN tar -xzf polyfill-service.tar.gz --strip-components=1

RUN npm install
RUN npm build
