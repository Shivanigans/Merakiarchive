import adapter from '@sveltejs/adapter-static';

// adapter-static turns the site into plain HTML files, which Vercel serves as they are.
export default {
	kit: {
		adapter: adapter(),
		prerender: {
			// #issue-03 links open an edition in the reader, so no element carries that id.
			handleMissingId: ({ id, message }) => {
				if (!id.startsWith('issue-')) throw new Error(message);
			}
		}
	}
};
