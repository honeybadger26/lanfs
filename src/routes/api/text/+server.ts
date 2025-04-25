import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const contents = body.text;

	const db = await getDb();
	db
		.prepare("INSERT INTO text (contents) VALUES ($contents)")
		.run({ $contents: contents });
	db.close();

	return new Response();
};

export const DELETE: RequestHandler = async () => {
	const db = await getDb();
	db.prepare("DELETE FROM text").run();
	db.close();

	return new Response();
};
