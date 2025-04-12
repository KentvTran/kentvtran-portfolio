<script>
	import { PrismicPreview } from '@prismicio/svelte/kit';
	// import "@fontsource/pt-serif";
	// import '@fontsource/londrina-sketch';
	// import '@fontsource-variable/roboto';
	import '@fontsource/londrina-solid';
	import { page } from '$app/stores';
	import { repositoryName } from '$lib/prismicio';
	import "../app.css";
</script>

<svelte:head>
	<title>{$page.data.title}</title>
	{#if $page.data.meta_description}
		<meta name="description" content={$page.data.meta_description} />
	{/if}
	{#if $page.data.meta_title}
		<meta name="og:title" content={$page.data.meta_title} />
	{/if}
	{#if $page.data.meta_image}
		<meta name="og:image" content={$page.data.meta_image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>

<header>Header</header>

<main>
	<slot />
</main>

<div class="background-gradient absolute inset-0 -z-50 max-h-screen" />
<div
	class="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-8 mix-blend-soft-light"
></div>

<Footer />
<PrismicPreview {repositoryName} />