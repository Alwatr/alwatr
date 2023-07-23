ARG RUST_VERSION=1
ARG NODE_VERSION=20

FROM docker.io/library/rust:${RUST_VERSION}-alpine as rust-builder

RUN apk add --no-cache build-base llvm lld
RUN cargo install viceroy

# ---

FROM docker.io/library/node:${NODE_VERSION} as es-builder

WORKDIR /app

RUN apt update
RUN apt install curl tar


# tmp: must use a tag
# ENV POLYFILL_VERSION tags/v4.50.1
ENV POLYFILL_VERSION heads/main

RUN curl -L -o polyfill-service.tar.gz https://codeload.github.com/Financial-Times/polyfill-service/tar.gz/refs/${POLYFILL_VERSION}
RUN tar -xzf polyfill-service.tar.gz --strip-components=1

RUN yarn global add pnpm

# just pnpm-lock file exists!
RUN pnpm install

RUN yarn build:app

# ---

FROM docker.io/library/node:${NODE_VERSION}-alpine as app

WORKDIR /app

COPY --from=rust-builder /usr/local/cargo/bin/viceroy /usr/local/bin/viceroy
COPY --from=es-builder /app/bin/main.wasm /app/fastly.toml ./

CMD ["viceroy", "main.wasm",  "-C", "fastly.toml"]
