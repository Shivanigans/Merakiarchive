<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { editions } from '$lib/editions.js';
	import { siteName } from '$lib/sites.js';

	// Each cover sits at its own angle, like magazines dropped on a table.
	const tilts = [-3, 4, -1, 2.5, -4, 1.5, -2, 3];

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
		if (issue && editions.some((e) => e.issue === issue)) {
			goto(`/issue-${issue}`, { replaceState: true });
		}
	});
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
	/* With a mouse, the wordmark and its line stay at the top while the covers scroll beneath,
	   so the colour change is always in view. Phones have no hover, so it scrolls away there. */
	@media (hover: hover) and (min-height: 600px) {
		header {
			position: sticky;
			top: env(safe-area-inset-top, 0px);
			z-index: 10;
			padding-block: 24px 20px;
			background: var(--bg);
		}
		/* A short fade so covers slide under the header rather than being cut off by a line. */
		header::after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			top: 100%;
			height: 28px;
			background: linear-gradient(var(--bg), rgba(255, 255, 255, 0));
			pointer-events: none;
		}
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
	/* Each cover is drawn as a loose printed magazine lying on a table: thin paper with a gentle
	   curve of light across it and one corner lifting slightly, casting a soft shadow. */
	.magazine {
		position: relative;
		display: block;
		width: 78%;
		max-width: 270px;
		aspect-ratio: 595 / 842;
		border-radius: 2px;
		box-shadow:
			0 1px 2px rgba(0, 0, 0, 0.1),
			0 8px 18px -8px rgba(0, 0, 0, 0.22);
		transform: rotate(var(--tilt, 0deg));
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}
	.magazine img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: inherit;
	}
	/* The curve: light and shade rolling gently across the sheet. */
	.magazine::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		background: linear-gradient(
			100deg,
			rgba(0, 0, 0, 0.07) 0%,
			rgba(255, 255, 255, 0.14) 22%,
			rgba(255, 255, 255, 0) 42%,
			rgba(0, 0, 0, 0.05) 68%,
			rgba(255, 255, 255, 0.1) 92%,
			rgba(0, 0, 0, 0.04) 100%
		);
	}
	/* The lifted corner: a soft shadow tucked under the bottom right of the sheet. */
	.magazine::after {
		content: '';
		position: absolute;
		z-index: -1;
		right: 6%;
		bottom: 3%;
		width: 55%;
		height: 18%;
		box-shadow: 0 12px 14px rgba(0, 0, 0, 0.22);
		transform: rotate(3deg);
		transition: box-shadow 0.3s ease;
	}
	/* The grey sheet sits on its own layer, above the corner shadow. */
	.empty {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: var(--sheet);
		border-radius: inherit;
		font-size: 13px;
		color: var(--muted);
	}
	/* Hover or keyboard focus: the sheet lifts just off the table. */
	.cover:hover .magazine,
	.cover:focus-visible .magazine {
		transform: rotate(var(--tilt, 0deg)) translateY(-3px);
		box-shadow:
			0 2px 3px rgba(0, 0, 0, 0.1),
			0 12px 22px -8px rgba(0, 0, 0, 0.26);
	}
	.cover:hover .magazine::after,
	.cover:focus-visible .magazine::after {
		box-shadow: 0 15px 16px rgba(0, 0, 0, 0.24);
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
