import fs from 'fs';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();

	const inputFile = formData.get('file');

	if (!inputFile) {
		error(400, 'No files received');
	}

	const fileName = (inputFile as File).name;
	const outputFile = Bun.file(`./tmp/files/${fileName}`);

	if (await outputFile.exists()) {
		error(400, 'File already exists');
	}

	const buffer = Buffer.from(await (inputFile as File).arrayBuffer());
	outputFile.write(buffer);

	const db = await getDb();
	const row = db
		.query("INSERT INTO files (name, link) VALUES ($name, $link)")
		.run({
			$name: fileName,
			$link: '',
		});
	const id = row.lastInsertRowid;
	db.prepare('UPDATE files SET link = $link WHERE id = $id').run({
		$id: id,
		$link: `/api/files/${id}`,
	})
	db.close();

	return new Response();
};

export const DELETE: RequestHandler = async () => {
	const files = fs.readdirSync('./tmp/files/');

	files.forEach((fileName) => {
		Bun.file(`./tmp/files/${fileName}`).delete();
	});

	const db = await getDb();
	db.prepare("DELETE FROM files").run();
	db.close();

	return new Response();
};
