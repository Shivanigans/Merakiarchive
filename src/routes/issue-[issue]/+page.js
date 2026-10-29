import { error } from '@sveltejs/kit';
import { editions } from '$lib/editions.js';

// Editions already published online open there; every other edition gets a page here.
const own = editions.filter((e) => !e.online);

// Build a page for each of them ahead of time, e.g. /issue-08.
export const entries = () => own.map((e) => ({ issue: e.issue }));

export function load({ params }) {
	const i = own.findIndex((e) => e.issue === params.issue);
	if (i === -1) error(404, 'There is no edition with that number in the archive.');
	return { edition: own[i], previous: own[i - 1] ?? null, next: own[i + 1] ?? null };
}
