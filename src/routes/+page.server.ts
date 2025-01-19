import fs from 'node:fs';

export function load({ depends }) {
	depends('app:load-text-files');

	const textFileNames = fs.readdirSync('./tmp/text/');
	const texts = textFileNames.map((fileName) => {
		// Adding an empty string will convert Buffer to string
		const contents = '' + fs.readFileSync(`./tmp/text/${fileName}`);
		return {
			id: fileName,
			isLink: /^(https?:\/\/[^\s]+)$/.test(contents),
			contents
		};
	});

	const fileNames = fs.readdirSync('./tmp/files/');
	const files = fileNames.map((fileName) => {
		return {
			name: fileName,
			link: `/api/files/${fileName}`
		};
	});

	return { texts, files };
}
