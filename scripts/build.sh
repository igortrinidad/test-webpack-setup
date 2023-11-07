#!/bin/sh

npm run build:tailwind

npm run build:webpack

timestamp_placeholder=$(date +'%Y%m%d%H%M%S')

sed -i "s|/styles/output.css|/styles/output.css?$timestamp_placeholder|g" ./dist/index.html

sed -i "s|main.js|main.js?$timestamp_placeholder|g" ./dist/index.html
