#!/bin/bash
set -e

if [ -d "build" ]; then
  echo "Deleting old build..."
  rm -rf build
fi

echo "Creating production build..."
bun --bun run build

clear
echo "Starting server..."
PORT=8889 bun ./build/index.js
