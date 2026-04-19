#!/usr/bin/env bash

bun --prefer-offline --verbose build --minify --target=bun cli.ts --outfile=ffs
