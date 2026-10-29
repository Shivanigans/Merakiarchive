<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { editions } from '$lib/editions.js';

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

	// Old links to the overlay reader (/#issue-08) now go to the edition's own page.
	onMount(() => {
		const issue = location.hash.match(/^#issue-(\w+)$/)?.[1];
		if (issue && editions.some((e) => e.issue === issue && !e.online)) {
			goto(`/issue-${issue}`, { replaceState: true });
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
			<!-- An edition already published online opens there, in a new tab, instead of its own page. -->
			{@const external = Boolean(e.online)}
			<li>
				<a
					class="cover"
					href={external ? e.online : `/issue-${e.issue}`}
					target={external ? '_blank' : undefined}
					rel={external ? 'noopener' : undefined}
					aria-label={external
						? `Read Meraki issue ${e.issue}, ${e.published}, on ${siteName(e.online)} (opens in a new tab)`
						: `Open Meraki issue ${e.issue}, ${e.published}`}
					style:--tilt="{tilts[i % tilts.length]}deg"
					onpointerenter={(event) => enter(event, e.colour)}
					onpointerleave={leave}
					onfocus={(event) => focus(event, e.colour)}
					onblur={leave}
				>
					<span class="magazine">
						{#if e.cover}
							<img src={e.cover} alt="" loading="lazy" />
						{:else}
							<span class="empty">cover coming soon</span>
						{/if}
					</span>
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
	/* Each cover is drawn as a printed magazine: A4 in shape, bound on the left, with a few
	   millimetres of page edges showing on the right and bottom, and a soft sheen. */
	.magazine {
		--paper: #fbfaf6;
		--paper-edge: #dedbd2;
		position: relative;
		display: block;
		width: 78%;
		max-width: 270px;
		aspect-ratio: 595 / 842;
		background: var(--sheet);
		border-radius: 1px 3px 3px 1px;
		box-shadow:
			1px 1px 0 var(--paper),
			2px 2px 0 var(--paper-edge),
			3px 3px 0 var(--paper),
			4px 4px 0 var(--paper-edge),
			5px 5px 0 var(--paper),
			6px 8px 14px rgba(0, 0, 0, 0.16),
			0 22px 30px -14px rgba(0, 0, 0, 0.3);
		transform: rotate(var(--tilt, 0deg));
		transform-origin: 50% 60%;
		transition:
			transform 0.4s ease,
			box-shadow 0.4s ease;
	}
	.magazine img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: inherit;
	}
	/* The spine: a crease and shadow where the cover folds round the binding. */
	.magazine::before,
	.magazine::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
	}
	.magazine::before {
		background: linear-gradient(
			90deg,
			rgba(0, 0, 0, 0.32) 0,
			rgba(0, 0, 0, 0.1) 1.4%,
			rgba(255, 255, 255, 0.22) 2.4%,
			rgba(0, 0, 0, 0.14) 3.6%,
			rgba(0, 0, 0, 0) 7%
		);
	}
	/* Light catching the coated paper. */
	.magazine::after {
		background: linear-gradient(
			115deg,
			rgba(255, 255, 255, 0.2) 0%,
			rgba(255, 255, 255, 0) 32%,
			rgba(255, 255, 255, 0) 68%,
			rgba(0, 0, 0, 0.08) 100%
		);
	}
	.empty {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		font-size: 13px;
		color: var(--muted);
	}
	/* Picked up: the magazine straightens, lifts, and its cover swings open a little. */
	.cover:hover .magazine,
	.cover:focus-visible .magazine {
		transform: perspective(1100px) translateY(-6px) rotateY(-9deg);
		transform-origin: 0% 50%;
		box-shadow:
			1px 1px 0 var(--paper),
			2px 2px 0 var(--paper-edge),
			3px 3px 0 var(--paper),
			4px 4px 0 var(--paper-edge),
			5px 5px 0 var(--paper),
			14px 18px 26px rgba(0, 0, 0, 0.2),
			0 34px 40px -18px rgba(0, 0, 0, 0.35);
	}
	.cover:focus-visible .magazine {
		outline: 2px solid var(--ink);
		outline-offset: 10px;
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
		.magazine {
			transition: none;
		}
		.magazine,
		.cover:hover .magazine,
		.cover:focus-visible .magazine {
			transform: none;
		}
	}
</style>
