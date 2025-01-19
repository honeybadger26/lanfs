import fs from "fs";
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const id = Date.now().toString();
  fs.writeFileSync(`./tmp/text/${id}`, body.text);
  return new Response();
};

export const DELETE: RequestHandler = () => {
  const files = fs.readdirSync("./tmp/text/");
  files.forEach((fileName) => {
    fs.rmSync(`./tmp/text/${fileName}`);
  });

  return new Response();
};
