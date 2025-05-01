# LANFS

A file and text transfer tool for use over your local network

## Getting started

At the root of this project create the directories that will store the files and
text

```bash
mkdir -p tmp/files
```

Install dependencies

```bash
bun install
```

Start the development server...

```bash
bun --bun run dev --open
```

...or the production build

```bash
./scripts/build.sh
```

## To do

- Refresh when change to dir detected (maybe using sockets?)
