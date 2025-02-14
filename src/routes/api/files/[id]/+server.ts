import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';

export const GET: RequestHandler = async ({ params }) => {
	const db = await getDb();
	const { name: fileName } = db
		.query("SELECT name FROM files WHERE id = $id")
		.get({ $id: params.id }) as { name: string };
	db.close();

	const file = Bun.file(`./tmp/files/${fileName}`);
	const contentType = file.type;

	if (!contentType) {
		error(500, 'Could not get MIME type');
	}

	const buffer = await file.arrayBuffer();
	const headers = new Headers();
	headers.append('Content-Disposition', `attachment; filename="${fileName}"`);
	headers.append('Content-Type', contentType);

	return new Response(buffer, { headers });
};

export const DELETE: RequestHandler = async ({ params }) => {
	const db = await getDb();
	const { name: fileName } = db
		.query("SELECT name FROM files WHERE id = $id")
		.get({ $id: params.id }) as { name: string };

	Bun.file(`./tmp/files/${fileName}`).delete();

	db.prepare("DELETE FROM files WHERE id = $id").run({ $id: params.id });
	db.close();
	return new Response();
};
