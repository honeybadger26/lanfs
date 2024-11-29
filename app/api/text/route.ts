import fs from 'fs';

export async function POST(request: Request) {
  const body = await request.json();
  const id = Date.now().toString();

  fs.writeFileSync(`./tmp/text/${id}`, body.text);

  return new Response();
}

export async function DELETE() {
  const files = fs.readdirSync("./tmp/text/");

  files.forEach((fileName) => {
    fs.rmSync(`./tmp/text/${fileName}`);
  })

  return new Response();
}
