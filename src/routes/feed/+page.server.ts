import type { PageServerLoad } from './$types';

import { fail, redirect, type Actions } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { FEED_AUTHORIZATION } from '$env/static/private';

const generateUUID = (): string => {
	const hexDigits = '0123456789abcdef';
	const sections = [8, 4, 4, 4, 12]; // Number of characters in each section
	let uuid = '';

	for (const section of sections) {
		for (let i = 0; i < section; i++) {
			uuid += hexDigits[Math.floor(Math.random() * 16)];
		}
		if (section !== 12) {
			uuid += '-';
		}
	}

	return uuid;
};

const getFileExtension = (fileName: string): string => (fileName.match(/\.[0-9a-z]+$/i) || [''])[0].toLowerCase();


export const load = (async ({ locals }) => {
	try {
		const { results: entries } = await locals.D1.prepare(
			`SELECT * FROM entries ORDER BY id DESC`
		).all();
		const { results: replies } = await locals.D1.prepare(`SELECT * FROM replies`).all();
		return {
			entries,
			replies
		};
	} catch (error) {
		console.error(error);
	}
	return {
		entries: [],
		replies: []
	};
}) satisfies PageServerLoad;

export const actions = {
	addEntry: async ({ locals, request, platform }) => {
		const data = await request.formData();
		const content = data.get('content');
		const files = data.getAll('files') as File[];
		const authorization = data.get('authorization');
		const entryId = new Date().getTime();

		if (!dev && authorization !== FEED_AUTHORIZATION) {
			return fail(400, { content, unauthorized: true });
		}

		const filesMetadata = files.map(file => ({
			name: `${new Date().getTime()}/${generateUUID()}.${getFileExtension(file.name)}`,
			type: file.type,
			size: file.size,
			lastModified: file.lastModified,
		}));

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			await platform?.env?.R2.put(filesMetadata[i].name, file.stream(), {
				httpMetadata: {
					contentType: file.type,
				},
			});
		}

		try {
			const result = await locals.D1.prepare(`INSERT INTO entries (id, content, files) VALUES (?1, ?2, ?3)`)
				.bind(`${entryId}`, content, JSON.stringify(filesMetadata))
				.run();
			console.log({ result });
		} catch (error) {
			console.error(error);
		}
	},
	addReply: async ({ locals, request }) => {
		const data = await request.formData();
		const entryId = data.get('entry');
		const content = data.get('content');

		if (content?.length && content.length > 300) {
			return fail(400, { content, tooLong: true });
		}

		try {
			const result = await locals.D1.prepare(
				`INSERT INTO replies (id, entryId, content) VALUES (?1, ?2, ?3)`
			)
				.bind(`${new Date().getTime()}`, entryId, content)
				.run();
			console.log({ result });
			throw redirect(303, `/feed/${entryId}`);
		} catch (error) {
			console.error(error);
		}
	}
} satisfies Actions;
