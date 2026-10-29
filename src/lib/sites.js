// The name of the site an online copy lives on, for links such as "Read on AnyFlip".
const sites = { 'fliphtml5.com': 'FlipHTML5', 'anyflip.com': 'AnyFlip' };

export function siteName(url) {
	const host = new URL(url).hostname.replace(/^www\./, '');
	return sites[host] ?? host;
}
