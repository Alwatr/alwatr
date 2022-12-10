ARG NODE_VERSION=19

FROM docker.io/library/node:${NODE_VERSION}-alpine as builder

WORKDIR /app

# Install dependencies
COPY package.json *.lock ./
RUN if [ -f *.lock ]; then \
      yarn install --frozen-lockfile --non-interactive; \
    else \
      yarn install --non-interactive; \
    fi;

COPY . .

# Reinstall to link internal packages
RUN yarn install --frozen-lockfile --non-interactive;

# Build all ts files
RUN  yarn build:ts;

# Build target package
ARG PACKAGE_SOURCE
RUN set -ex;\
    if [ -z "${PACKAGE_SOURCE}" ]; then\
      echo 'PACKAGE_SOURCE not defined'>&2;\
      exit 1;\
    fi;
RUN set -ex;\
    cd "${PACKAGE_SOURCE}"; pwd; ls -lahF;\
    yarn build;\
    cd dist; pwd; ls -lahF;

# Clean devDependencies
RUN set -ex;\
    pwd;\
    rm -rf node_modules;\
    yarn install --frozen-lockfile --non-interactive --production;

# ---

FROM docker.io/library/node:${NODE_VERSION}-alpine as app

WORKDIR /app

# Install tini for recive system signal in nodejs
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "--input-type=module", "index.js"]

ENV NODE_ENV production
ENV ALWATR_DEBUG *
ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80

# Copy all deps from last stage (temporary until refactor build)
COPY --from=builder /app/node_modules/ ./node_modules/

# Copy builded files from last stage
ARG PACKAGE_SOURCE
COPY --from=builder /app/${PACKAGE_SOURCE}/dist/ ./
RUN pwd; ls -lAhF;
