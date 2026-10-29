<script>
	let { children } = $props();
</script>

<nav class="wrap" aria-label="Main">
	<a href="/#archive">Archive</a>
	<a href="/about">About</a>
</nav>

{@render children()}

<style>
	:global {
		:root {
			--bg: #ffffff;
			--ink: #111111;
			--muted: #5f5f5f;
			--sheet: #d9d9d9;
			--display: 'Josefin Sans', 'Futura', 'Century Gothic', sans-serif;
			--body: 'Geist', system-ui, -apple-system, 'Segoe UI', sans-serif;
		}
		* {
			box-sizing: border-box;
		}
		body {
			margin: 0;
			background: var(--bg);
			color: var(--ink);
			font-family: var(--body);
		}
		a {
			color: inherit;
		}
		:focus-visible {
			outline: 2px solid var(--ink);
			outline-offset: 4px;
		}
		.wrap {
			max-width: 1200px;
			margin: 0 auto;
			padding-left: max(16px, env(safe-area-inset-left, 0px));
			padding-right: max(16px, env(safe-area-inset-right, 0px));
		}
	}

	nav {
		display: flex;
		justify-content: flex-end;
		gap: clamp(32px, 6vw, 72px);
		padding-block: 36px 0;
	}
	nav a {
		font-family: var(--display);
		font-size: 21px;
		text-decoration: none;
	}
	nav a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
</style>
