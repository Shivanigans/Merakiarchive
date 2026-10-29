<script>
	import { onMount } from 'svelte';

	// The flip-through magazine for one edition: two-page spreads on wide screens, one page at a
	// time on narrow ones, with Prev and Next, a page counter and the arrow keys.
	let { edition } = $props();

	const sources = Array.from(
		{ length: edition.pageCount },
		(_, i) => `/editions/${edition.folder}/pages/${String(i + 1).padStart(3, '0')}.webp`
	);

	let book;
	let images = [];
	let flip = null;
	let current = $state(0);
	let portrait = $state(false);

	// Pages load only as the reader gets near them, so a phone doesn't fetch the whole magazine.
	function loadAround(index) {
		for (let i = index - 2; i <= index + 5; i++) {
			const img = images[i];
			if (img && !img.src) img.src = sources[i];
		}
	}

	// "1 / 60" for a single page, "2–3 / 60" for a spread. The cover and back cover sit alone.
	const counter = $derived.by(() => {
		const total = edition.pageCount;
		const first = current + 1;
		if (portrait || current === 0 || first >= total) return `${first} / ${total}`;
		return `${first}–${first + 1} / ${total}`;
	});

	// The last page is showing, alone or as the right half of a spread.
	const atEnd = $derived(
		(portrait || current === 0 ? current : current + 1) >= edition.pageCount - 1
	);

	onMount(() => {
		let gone = false;
		// page-flip only runs in a browser, so it is loaded once the page is open.
		import('page-flip').then(({ PageFlip }) => {
			if (gone) return;
			const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
			flip = new PageFlip(book, {
				width: 595,
				height: 842,
				size: 'stretch',
				minWidth: 200,
				maxWidth: 700,
				minHeight: 280,
				maxHeight: 990,
				showCover: true,
				usePortrait: true,
				mobileScrollSupport: false,
				maxShadowOpacity: 0.35,
				flippingTime: still ? 1 : 700
			});
			flip.on('init', (e) => {
				current = e.data.page;
				portrait = e.data.mode === 'portrait';
			});
			flip.on('flip', (e) => {
				current = e.data;
				loadAround(e.data);
			});
			flip.on('changeOrientation', (e) => {
				portrait = e.data === 'portrait';
			});
			loadAround(0);
			flip.loadFromHTML(book.querySelectorAll('.page'));
		});

		return () => {
			gone = true;
			flip?.destroy();
		};
	});

	function onkeydown(event) {
		if (!flip || event.altKey || event.ctrlKey || event.metaKey) return;
		if (event.target.closest?.('input, textarea, select, [contenteditable]')) return;
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			flip.flipNext();
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			flip.flipPrev();
		}
	}
</script>

<svelte:window {onkeydown} />

<div class="reader" role="region" aria-label="Magazine pages, use the arrow keys to turn">
	<div class="stage">
		<div class="book" bind:this={book}>
			{#each sources as _, i}
				<div class="page">
					<img bind:this={images[i]} alt="Page {i + 1}" draggable="false" />
				</div>
			{/each}
		</div>
	</div>
	<div class="controls">
		<button onclick={() => flip?.flipPrev()} disabled={current === 0} aria-label="Previous page">
			<span aria-hidden="true">←</span> Prev
		</button>
		<span class="counter" aria-live="polite">{counter}</span>
		<button onclick={() => flip?.flipNext()} disabled={atEnd} aria-label="Next page">
			Next <span aria-hidden="true">→</span>
		</button>
	</div>
</div>

<style>
	/* page-flip sets the book's height from its width, so the width is capped to keep a
	   spread (two A4 pages side by side) within the height of the window. The cap sits on
	   .stage because page-flip sets the book's own width. */
	.stage {
		--fit: clamp(360px, calc(100dvh - 140px), 900px);
		width: min(100%, calc(var(--fit) * 1.413));
		margin: 0 auto;
	}
	/* Narrow or short screens show one page at a time. */
	@media (max-width: 760px), (max-height: 560px) {
		.stage {
			width: min(100%, calc(var(--fit) * 0.707));
		}
	}
	.page {
		background: var(--sheet);
	}
	.page img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		background: #fff;
		user-select: none;
	}

	.controls {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		margin-top: 20px;
	}
	.counter {
		min-width: 8ch;
		text-align: center;
		font-size: 14px;
		font-variant-numeric: tabular-nums;
	}
	button {
		font: inherit;
		font-size: 14px;
		font-weight: 500;
		color: var(--ink);
		background: var(--bg);
		border: 1px solid var(--ink);
		padding: 8px 14px;
		cursor: pointer;
	}
	button:hover:not(:disabled) {
		background: var(--ink);
		color: var(--bg);
	}
	button:disabled {
		color: var(--muted);
		border-color: var(--sheet);
		cursor: default;
	}
</style>
