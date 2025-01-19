import fs from "fs";
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();

  const file = formData.get("file");

  if (!file) {
    error(400, "No files received");
  }

  const buffer = Buffer.from(await (file as File).arrayBuffer());
  fs.writeFileSync(`./tmp/files/${(file as File).name}`, buffer);

  return new Response();
};

export const DELETE: RequestHandler = () => {
  const files = fs.readdirSync("./tmp/files/");

  files.forEach((fileName) => {
    fs.rmSync(`./tmp/files/${fileName}`);
  });

  return new Response();
};
