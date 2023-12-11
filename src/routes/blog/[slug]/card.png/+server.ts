import Card from './card.svelte';
import type { RequestHandler } from '@sveltejs/kit';
import { componentToImageResponse } from '@ethercorps/sveltekit-og';

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;
	const post = await import(`../../../../content/blog/${slug}/index.md`);
	const { metadata } = post;

	return componentToImageResponse(
		Card,
		{ createdAt: metadata.createdAt, title: metadata.title }
	);
};