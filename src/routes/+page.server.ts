import { getDb } from '$lib/server/db.js';

type TextList = {
	id: number;
	contents: string;
}[];

type FileList = {
	id: number;
	name: string;
	link: string;
}[];

export async function load({ depends }) {
	depends('app:load-text-files');

	const db = await getDb();
	const texts = db.query("SELECT * FROM text ORDER BY id ASC").all() as TextList;
	const files = db.query("SELECT * FROM files ORDER BY id ASC").all() as FileList;
	db.close();

	return { texts, files };
}
