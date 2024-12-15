import fs from "fs";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  fs.rmSync(`./tmp/text/${id}`);
  return new Response();
}
