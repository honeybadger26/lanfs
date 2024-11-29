import fs from 'fs';
import mime from 'mime';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const fileName = (await params).filename;
  const contentType = mime.getType(fileName);

  if (!contentType) {
    return new Response("Could not get MIME type", { status: 500 });
  }

  const buffer = fs.readFileSync(`./tmp/files/${fileName}`);
  const headers = new Headers();
  headers.append("Content-Disposition", `attachment; filename="${fileName}"`);
  headers.append("Content-Type", contentType);

  return new Response(buffer, { headers });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const fileName = (await params).filename;
  fs.rmSync(`./tmp/files/${fileName}`);
  return new Response();
}
