ARG ALPINE_IMAGE=docker.io/library/alpine:3.17
FROM $ALPINE_IMAGE

ARG APK_TESTING
RUN set -ex; \
  if [ "$APK_TESTING" != "1" ]; then \
    echo "Skip alpine edge testing repository"; \
  else \
    echo "Add alpine edge testing repository"; \
    echo 'https://dl-cdn.alpinelinux.org/alpine/edge/testing/' >> /etc/apk/repositories; \
  fi

ARG APK_INSTALL
RUN set -ex; \
  if [ "$APK_INSTALL" != "1" ]; then \
    echo "Skip apk install"; \
  else \
    echo "Add alpine edge testing repository"; \
    apk add --no-cache ${APK_INSTALL}; \
  fi

CMD ["/bin/sh"]
