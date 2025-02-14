# LANFS

A file and text transfer tool for use over your local network

## Getting started

At the root of this project create the directories that will store the files and
text

```bash
mkdir -p tmp/files tmp/text
```

Install dependencies

```bash
bun install
```

Start the development server...

```bash
bun run dev --open
```

...or the production build

```bash
bun --bun run build
bun ./build/index.js
```

## To do

- Sort text/files by upload date?
- Wrap only link part of text in anchor tag
- Refresh when change to dir detected (maybe using sockets?)
