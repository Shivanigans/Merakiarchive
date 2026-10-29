<script>
	import Book from '$lib/Book.svelte';

	// One edition: its name, the flip-through magazine, then its details and credits.
	let { data } = $props();
	const { edition, previous, next } = $derived(data);
	const ready = $derived(edition.status === 'ready' && edition.pageCount > 0);
	// Editions we know of but haven't found yet still carry '[Theme or tagline]'.
	const isKnown = (e) => !e.theme.startsWith('[');
	const known = $derived(isKnown(edition));
	const nameOf = (e) => (isKnown(e) ? e.theme : 'Not added yet');
</script>

<svelte:head>
	<title>{known ? `${edition.theme}, Meraki issue ${edition.issue}` : `Meraki issue ${edition.issue}`}</title>
	<meta
		name="description"
		content="Meraki issue {edition.issue}{known ? `, ${edition.theme}` : ''}, from NIFT Hyderabad's student magazine archive."
	/>
</svelte:head>

<main class="wrap">
	<a class="back" href="/#archive"><span aria-hidden="true">←</span> All editions</a>

	<header>
		{#if known}
			<p class="eyebrow">Issue {edition.issue}, {edition.published}</p>
			<h1 style:color={edition.colour}>{edition.theme}</h1>
		{:else}
			<p class="eyebrow">Not yet in the archive</p>
			<h1 style:color={edition.colour}>Issue {edition.issue}</h1>
		{/if}
		{#if edition.format === 'print'}
			<span class="tag">Print edition, Spectrum</span>
		{/if}
	</header>

	{#key edition.issue}
		{#if ready}
			<Book {edition} />
		{:else}
			<div class="empty">Pages not added yet</div>
		{/if}
	{/key}

	<div class="about">
		<section aria-labelledby="details">
			<h2 id="details">Details</h2>
			<dl>
				<div><dt>Issue</dt><dd>{edition.issue}</dd></div>
				{#if known}
					<div><dt>Published</dt><dd>{edition.published}</dd></div>
					<div><dt>Theme</dt><dd>{edition.theme}</dd></div>
				{/if}
				{#if edition.format}
					<div>
						<dt>Format</dt>
						<dd>{edition.format === 'print' ? 'Print edition, Spectrum' : 'Online'}</dd>
					</div>
				{/if}
				{#if edition.pageCount}
					<div><dt>Pages</dt><dd>{edition.pageCount}</dd></div>
				{/if}
			</dl>
			{#if edition.pdf}
				<a class="download" href={edition.pdf} download>Download PDF</a>
			{/if}
		</section>

		{#if edition.credits.length}
			<section aria-labelledby="credits">
				<h2 id="credits">Credits</h2>
				<dl>
					{#each edition.credits as c}
						<div><dt>{c.role}</dt><dd>{c.names.join(', ')}</dd></div>
					{/each}
				</dl>
			</section>
		{/if}
	</div>

	{#if previous || next}
		<nav class="neighbours" aria-label="Other editions">
			{#if previous}
				<a class="prev" href="/issue-{previous.issue}">
					<span class="label"><span aria-hidden="true">←</span> Issue {previous.issue}</span>
					<span class="name">{nameOf(previous)}</span>
				</a>
			{/if}
			{#if next}
				<a class="next" href="/issue-{next.issue}">
					<span class="label">Issue {next.issue} <span aria-hidden="true">→</span></span>
					<span class="name">{nameOf(next)}</span>
				</a>
			{/if}
		</nav>
	{/if}
</main>

<style>
	main {
		padding-block: 40px 120px;
	}
	.back {
		font-size: 14px;
		text-decoration: none;
		color: var(--muted);
	}
	.back:hover {
		color: var(--ink);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		text-align: center;
		margin: 40px 0 48px;
	}
	.eyebrow {
		margin: 0;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}
	h1 {
		margin: 0;
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(40px, 7vw, 72px);
		line-height: 1;
		padding-top: 0.12em;
		text-wrap: balance;
	}
	.tag {
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted);
		border: 1px solid var(--muted);
		padding: 3px 7px;
	}

	.empty {
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 420px;
		aspect-ratio: 595 / 842;
		margin: 0 auto;
		background: var(--sheet);
		color: var(--muted);
		font-size: 15px;
	}

	.about {
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
		gap: 48px 64px;
		max-width: 1000px;
		margin: 80px auto 0;
	}
	@media (max-width: 760px) {
		.about {
			grid-template-columns: minmax(0, 1fr);
		}
	}
	h2 {
		margin: 0 0 20px;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}
	dl {
		margin: 0;
		display: grid;
		gap: 12px;
	}
	dl div {
		display: grid;
		grid-template-columns: 130px minmax(0, 1fr);
		gap: 16px;
	}
	@media (max-width: 480px) {
		dl div {
			grid-template-columns: minmax(0, 1fr);
			gap: 2px;
		}
	}
	dt {
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
		padding-top: 2px;
	}
	dd {
		margin: 0;
		font-size: 15px;
		line-height: 1.5;
	}
	.download {
		display: inline-block;
		margin-top: 28px;
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
		border: 1px solid var(--ink);
		padding: 8px 14px;
	}
	.download:hover {
		background: var(--ink);
		color: var(--bg);
	}

	.neighbours {
		display: flex;
		justify-content: space-between;
		gap: 24px;
		max-width: 1000px;
		margin: 96px auto 0;
		padding-top: 28px;
		border-top: 1px solid var(--sheet);
	}
	.neighbours a {
		display: flex;
		flex-direction: column;
		gap: 4px;
		text-decoration: none;
		min-width: 0;
	}
	.neighbours .next {
		margin-left: auto;
		text-align: right;
	}
	.label {
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.name {
		font-size: 18px;
		font-weight: 500;
	}
	.neighbours a:hover .name {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
