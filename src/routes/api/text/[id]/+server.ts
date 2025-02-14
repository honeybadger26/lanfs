import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';

export const DELETE: RequestHandler = async ({ params }) => {
	const db = await getDb();
	db.prepare("DELETE FROM text WHERE id = $id").run({ $id: params.id });
	db.close();
	return new Response();
};
