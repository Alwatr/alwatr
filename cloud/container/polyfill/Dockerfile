ARG NODE_VERSION=18
FROM docker.io/library/node:${NODE_VERSION}-alpine as builder

WORKDIR /app

RUN apk update

# RUN apk add --no-cache build-base llvm lld rust cargo
# RUN cargo install wizer --all-features
# RUN cargo install viceroy

RUN apk add --no-cache curl tar

# ENV POLYFILL_VERSION tags/v4.50.1
ENV POLYFILL_VERSION heads/main
RUN curl -L -o polyfill-service.tar.gz https://codeload.github.com/Financial-Times/polyfill-service/tar.gz/refs/${POLYFILL_VERSION}
RUN tar -xzf polyfill-service.tar.gz --strip-components=1

RUN yarn install --frozen-lockfile --non-interactive

# RUN export PATH="/root/.cargo/bin:$PATH"
RUN yarn run build:app

FROM docker.io/library/node:${NODE_VERSION}-alpine as app

WORKDIR /app

COPY --from=builder /usr/local/cargo/bin/viceroy /usr/local/bin/viceroy
COPY --from=builder /app/ /app/

CMD ["yarn", "start"]
