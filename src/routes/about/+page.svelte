<svelte:head>
	<title>About the Meraki archive</title>
</svelte:head>

<main class="wrap">
	<h1>About</h1>

	<section aria-labelledby="backstory">
		<h2 id="backstory">Backstory</h2>
		<p>
			Meraki is the student-run magazine of NIFT Hyderabad. Since 2021, each edition has brought
			together the writing, illustration, photography and design of students across the campus.
		</p>
		<p>
			The magazine has never had a place of its own online. It does not have a page on the college
			website, and its editions have been shared in different places over the years, some on
			reading sites and some only in print.
		</p>
		<p>
			This archive gathers those editions in one place, so that the work of every Meraki team can
			still be found and read. It is maintained independently and will grow as more editions are
			found.
		</p>
	</section>

	<section aria-labelledby="declaration">
		<h2 id="declaration">Declaration</h2>
		<p>
			This is a non-commercial archive made to document the work of the Meraki team at NIFT
			Hyderabad. All writing, artwork and photographs belong to their creators. For corrections
			or removals, write to singhshivani11240@gmail[dot]com.
		</p>
	</section>
</main>

<style>
	main {
		max-width: 720px;
		padding-block: 64px 140px;
	}
	h1 {
		margin: 0 0 48px;
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(40px, 6vw, 56px);
		line-height: 1;
		padding-top: 0.12em;
	}
	h2 {
		margin: 0 0 8px;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}
	section + section {
		margin-top: 40px;
	}
	p + p {
		margin-top: 1em;
	}
	p {
		margin: 0;
		font-size: 17px;
		line-height: 1.6;
	}
</style>
