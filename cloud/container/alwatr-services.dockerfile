ARG NODE_VERSION=20

FROM docker.io/library/node:${NODE_VERSION}-alpine as builder

WORKDIR /app

ENV NODE_ENV production

# Install dependencies
COPY package.json *.lock ./
RUN if [ -f *.lock ]; then \
      yarn install --frozen-lockfile --non-interactive --production false; \
    else \
      yarn install --non-interactive --production false; \
    fi;

COPY . .

# Reinstall to link internal packages
RUN yarn install --frozen-lockfile --non-interactive --production false;

# Build all ts files
RUN yarn build:ts

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
    yarn install --frozen-lockfile --non-interactive --production true;

# ---

FROM docker.io/library/node:${NODE_VERSION}-alpine as app

WORKDIR /app

# Install tini for recive system signal in nodejs
# RUN apk add --no-cache tini
# ENTRYPOINT ["/sbin/tini", "--"]
CMD ["yarn", "serve"]

ENV NODE_ENV production
ENV NODE_OPTIONS --enable-source-maps
# ENV ALWATR_DEBUG 1
ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80

# Tell nodejs to run as ESM Modules
# RUN echo '{"type":"module"}' > package.json

# Copy all deps from last stage
COPY --from=builder /app/node_modules ./node_modules

# Copy builded files from last stage
ARG PACKAGE_SOURCE
COPY --from=builder /app/${PACKAGE_SOURCE}/package.json ./
COPY --from=builder /app/${PACKAGE_SOURCE}/dist ./dist
RUN pwd; ls -lAhF;
