<script>
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { repositoryName } from '$lib/prismicio';
	
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	import '@fontsource/poly';
	import '@fontsource/londrina-solid';
	import "../app.css";

	export let data;
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

<div class="min-h-screen w-full overflow-x-visible">
	<Header settings={data.settings} />
	<main>
		<slot />
	</main>
	
	<!-- Full-page gradient background -->
	<div class="background-gradient absolute inset-0 -z-50 w-full min-h-full" />
	
	<!-- Noise texture -->
	<div
	class="pointer-events-none absolute inset-0 -z-40 w-full min-h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"
	/>
	
	<Footer settings={data.settings} />
	
	<PrismicPreview {repositoryName} />
</div>
