# LANFS

A file and text transfer tool for use over your local network

## Getting started

At the root of this project, create the directories that will store the files
and text

```bash
mkdir -p tmp/files
```

Install dependencies

```bash
bun install
```

Start the development server

```bash
bun --bun run dev --open
```

## Production

Build for production

```bash
./scripts/build.sh
```

Start the production server on port 8889

```bash
PORT=8889 bun ./build/index.js
```

## To do

- Refresh when change to dir detected (maybe using sockets?)
