import fs from 'fs';

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("file");

  if (!file) {
    return new Response("No files received", { status: 400 });
  }

  const buffer = Buffer.from(await (file as File).arrayBuffer());
  fs.writeFileSync(`./tmp/files/${(file as File).name}`, buffer);

  return new Response();
}

export async function DELETE() {
  const files = fs.readdirSync("./tmp/files/");

  files.forEach((fileName) => {
    fs.rmSync(`./tmp/files/${fileName}`);
  })

  return new Response();
}
