import fs from "fs";
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = ({ params }) => {
  fs.rmSync(`./tmp/text/${params.id}`);
  return new Response();
};
