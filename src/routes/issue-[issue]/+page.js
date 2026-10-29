import { error } from '@sveltejs/kit';
import { editions } from '$lib/editions.js';

// Build a page for every edition ahead of time, e.g. /issue-08.
export const entries = () => editions.map((e) => ({ issue: e.issue }));

export function load({ params }) {
	const i = editions.findIndex((e) => e.issue === params.issue);
	if (i === -1) error(404, 'There is no edition with that number in the archive.');
	return { edition: editions[i], previous: editions[i - 1] ?? null, next: editions[i + 1] ?? null };
}
