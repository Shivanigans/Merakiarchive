import adapter from '@sveltejs/adapter-static';

// adapter-static turns the site into plain HTML files, which Vercel serves as they are.
export default {
	kit: {
		adapter: adapter()
	}
};
