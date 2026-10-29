<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { pushState, replaceState } from '$app/navigation';
	import { editions } from '$lib/editions.js';
	import Reader from '$lib/Reader.svelte';

	// Each cover sits at its own angle, like magazines dropped on a table.
	const tilts = [-7, 14, -1, 9, -5, 4, -11];

	// The wordmark takes the colour of the cover under the mouse or keyboard focus.
	let markColour = $state(null);

	function enter(event, colour) {
		// A tap on a phone counts as a pointer too; keep the wordmark black there.
		if (event.pointerType === 'touch') return;
		markColour = colour;
	}

	function focus(event, colour) {
		// Only keyboard focus, not the focus a tap or click leaves behind.
		if (event.currentTarget.matches(':focus-visible')) markColour = colour;
	}

	function leave() {
		markColour = null;
	}

	// An edition opens in the reader from a cover click (kept in the browser history, so Back
	// closes it) or from a shared link such as /#issue-08.
	let linked = $state(null);
	const openIssue = $derived(page.state.issue ?? linked);
	const opened = $derived(editions.find((e) => e.issue === openIssue && !e.online));
	let returnFocus = null;

	onMount(() => {
		// Also when a link is pasted into a tab that already has the archive open.
		const readHash = () => (linked = location.hash.match(/^#issue-(\w+)$/)?.[1] ?? null);
		readHash();
		addEventListener('hashchange', readHash);
		return () => removeEventListener('hashchange', readHash);
	});

	function openReader(event, e) {
		// Let ctrl- or cmd-click open a new tab as usual.
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();
		pushState(`#issue-${e.issue}`, { issue: e.issue });
	}

	function closeReader() {
		returnFocus = document.querySelector(`a.cover[href="#issue-${openIssue}"]`);
		if (page.state.issue) history.back();
		else {
			linked = null;
			replaceState(page.url.pathname, {});
		}
	}

	// Once the reader has gone, put keyboard focus back on the cover it was opened from.
	$effect(() => {
		if (!opened && returnFocus) {
			returnFocus.focus({ preventScroll: true });
			returnFocus = null;
		}
	});

	// The name of the site an online copy lives on, for the note under its cover.
	const sites = { 'fliphtml5.com': 'FlipHTML5', 'anyflip.com': 'AnyFlip' };
	function siteName(url) {
		const host = new URL(url).hostname.replace(/^www\./, '');
		return sites[host] ?? host;
	}
</script>

<svelte:head>
	<title>Meraki archive</title>
	<meta
		name="description"
		content="An unofficial archive of Meraki, the student-run magazine of NIFT Hyderabad, from 2021 to the present."
	/>
</svelte:head>

<header class="wrap">
	<h1 style:color={markColour}>MERAKI</h1>
	<p>An unofficial archive for meraki, nift hyd student-run magazine from 2021 - present</p>
</header>

<main class="archive wrap" id="archive">
	<ul class="covers">
		{#each editions as e, i (e.folder)}
			<!-- An edition already published online opens there, in a new tab, instead of the reader. -->
			{@const external = Boolean(e.online)}
			<li>
				<a
					class="cover"
					href={external ? e.online : `#issue-${e.issue}`}
					target={external ? '_blank' : undefined}
					rel={external ? 'noopener' : undefined}
					aria-label={external
						? `Read Meraki issue ${e.issue}, ${e.published}, on ${siteName(e.online)} (opens in a new tab)`
						: `Open Meraki issue ${e.issue}, ${e.published}`}
					style:--tilt="{tilts[i % tilts.length]}deg"
					onpointerenter={(event) => enter(event, e.colour)}
					onpointerleave={leave}
					onclick={external ? undefined : (event) => openReader(event, e)}
					onfocus={(event) => focus(event, e.colour)}
					onblur={leave}
				>
					{#if e.cover}
						<img class="sheet" src={e.cover} alt="" loading="lazy" />
					{:else}
						<span class="sheet empty">cover coming soon</span>
					{/if}
					<span class="details">
						<span class="row"><span>Issue {e.issue}</span><span>{e.published}</span></span>
						<span class="line">{e.theme}</span>
						{#if external}
							<span class="note">Read on {siteName(e.online)} ↗</span>
						{/if}
						{#if e.format === 'print'}
							<span class="tag">Print edition, Spectrum</span>
						{/if}
					</span>
				</a>
			</li>
		{/each}
	</ul>
</main>

{#if opened}
	{#key opened.issue}
		<Reader edition={opened} onclose={closeReader} />
	{/key}
{/if}

<style>
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		text-align: center;
		padding-block: 44px 0;
	}
	h1 {
		margin: 0;
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(56px, 9vw, 88px);
		line-height: 1;
		letter-spacing: 0.04em;
		padding-top: 0.12em;
		color: var(--ink);
		transition: color 0.45s ease;
	}
	header p {
		margin: 0;
		font-size: 14px;
		max-width: 60ch;
	}

	.archive {
		padding-block: clamp(80px, 12vw, 150px) 140px;
	}
	.covers {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 120px 64px;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	@media (max-width: 900px) {
		.covers {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 72px 32px;
		}
	}
	@media (max-width: 480px) {
		.covers {
			grid-template-columns: minmax(0, 1fr);
			gap: 64px;
		}
	}

	.cover {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 36px;
		text-decoration: none;
		min-width: 0;
	}
	.cover:focus-visible {
		outline: none;
	}
	.sheet {
		width: 78%;
		max-width: 270px;
		aspect-ratio: 3 / 4.1;
		display: block;
		object-fit: cover;
		background: var(--sheet);
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.12),
			0 6px 14px rgba(0, 0, 0, 0.08);
		transform: rotate(var(--tilt, 0deg));
		transition:
			transform 0.35s ease,
			box-shadow 0.35s ease;
	}
	.empty {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		color: var(--muted);
	}
	.cover:hover .sheet,
	.cover:focus-visible .sheet {
		transform: rotate(0deg) scale(1.03);
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
	}
	.cover:focus-visible .sheet {
		outline: 2px solid var(--ink);
		outline-offset: 6px;
	}

	.details {
		width: 78%;
		max-width: 270px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.row {
		display: flex;
		justify-content: space-between;
		gap: 8px;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
		font-variant-numeric: tabular-nums;
	}
	.line {
		font-size: 20px;
		font-weight: 500;
		line-height: 1.25;
	}
	.note {
		font-size: 13px;
		color: var(--muted);
	}
	.cover:hover .note,
	.cover:focus-visible .note {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.tag {
		align-self: flex-start;
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted);
		border: 1px solid var(--muted);
		padding: 3px 7px;
	}

	/* Less motion asked for: covers lie straight and nothing fades or lifts. */
	@media (prefers-reduced-motion: reduce) {
		h1,
		.sheet {
			transition: none;
		}
		.sheet,
		.cover:hover .sheet,
		.cover:focus-visible .sheet {
			transform: none;
		}
	}
</style>
