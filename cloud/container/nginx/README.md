# Alwatr Accelerated Web Server

High performance Accelerated NGINX optimized for serve static content like CDN.

## Usage

The right way of using the alwatr nginx is behind kubernetes ingress or simple edge reverse-proxy, then don't config edge stuff like gzip compression, ssl, etc or even config domain or multiple websites.

```Dockerfile
FROM ghcr.io/alimd/nginx:1
```
