import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from "fs";

export const GET: RequestHandler = ({ params }) => {
  const fileName = params.filename;
  const contentType = Bun.file(fileName).type;

  if (!contentType) {
    error(500, "Could not get MIME type");
  }

  const buffer = fs.readFileSync(`./tmp/files/${fileName}`);
  const headers = new Headers();
  headers.append("Content-Disposition", `attachment; filename="${fileName}"`);
  headers.append("Content-Type", contentType);

  return new Response(buffer, { headers });
}

export const DELETE: RequestHandler = ({ params }) => {
  fs.rmSync(`./tmp/files/${params.filename}`);
  return new Response();
}
