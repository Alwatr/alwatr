FROM ghcr.io/alwatr/nginx-json:4.0.0

LABEL org.opencontainers.image.base.name="ghcr.io/alwatr/nginx-json:3.5.0"

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --start-interval=1s --retries=3 CMD curl -fso /dev/null --header 'authorization: Alwatr healthcheck:healthcheck' http://localhost/server-info || exit 1

RUN rm -fv /etc/nginx/templates/location.d/90-home-json.conf.template
COPY etc/nginx/ /etc/nginx/
COPY default-data/ /default-data/
RUN ls -RlahF /etc/nginx /default-data /data

ENV NGINX_DOCUMENT_ROOT=/data \
    NGINX_OPEN_FILE_CACHE="max=5000 inactive=1h" \
    NGINX_OPEN_FILE_CACHE_VALID=1s \
    NGINX_OPEN_FILE_CACHE_MIN_USES=2 \
    NGINX_OUTPUT_BUFFERS="8 8k" \
    NGINX_EXPIRES_DYNAMIC=epoch \
    NGINX_EXPIRES_STATIC=max \
    NGINX_EXPIRES_DEFAULT=epoch \
    NGINX_LIMIT_REQ_RATE=400 \
    NGINX_LIMIT_REQ_BURST=1000 \
    NGINX_DISABLE_SYMLINKS=if_not_owner \
    NGINX_CORS_ENABLE="" \
    NGINX_CORS_ORIGIN="*" \
    NGINX_CORS_METHODS="GET, OPTIONS" \
    NGINX_CORS_HEADERS="*" \
    NGINX_CORS_MAXAGE=86400

ENV nitrobaseApiPrefix="/api/s7" \
    nitrobaseDebugPath="/debug-info-110" \
    nitrobaseRegionPublic="p" \
    nitrobaseRegionSecret=".s" \
    nitrobaseRegionAuthenticated="a" \
    nitrobaseRegionManagers="m" \
    nitrobaseRegionPerUser="u" \
    nitrobaseRegionPerOwner="o" \
    nitrobaseRegionValidateAuth="auth"

LABEL org.opencontainers.image.title="alwatr/nitrobase-nginx" \
    org.opencontainers.image.description="Extremely fast and compact JSON-based database that operates in memory, includes a JSON file backup, and serves over the highly accelerated Nginx." \
    org.opencontainers.image.base.name="ghcr.io/alwatr/nginx-core:3.5.0" \
    org.opencontainers.image.version="3.5.0" \
    org.opencontainers.image.ref.name="3.5.0-nginx1.27.4-alpine-slim" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.revision=${BUILD_REV} \
    org.opencontainers.image.vendor="Alwatr" \
    org.opencontainers.image.source="https://github.com/Alwatr/nginx" \
    org.opencontainers.image.url="https://github.com/Alwatr/nginx" \
    org.opencontainers.image.documentation="https://github.com/Alwatr/nginx" \
    org.opencontainers.image.authors="S. Ali Mihandoost <ali.mihandoost@gmail.com> (https://ali.mihandoost.com)"
