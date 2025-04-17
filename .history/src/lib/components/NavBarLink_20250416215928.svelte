<script lang="ts">
	import { page } from '$app/stores';
	import { asLink, type KeyTextField, type LinkField } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';

	export let field: LinkField;
	export let label: KeyTextField;
	export let onLinkClick: (event: MouseEvent) => void;
	export let type: 'desktop' | 'mobile';

	const path = asLink(field);
	$: isActive = path && $page.url.pathname.includes(path);
</script>

{#if type === 'desktop'}
	<PrismicLink
		class="group relative flex items-center justify-center overflow-hidden rounded-full text-[15px] font-medium transition-all duration-300 ease-in-out px-6 py-2.5"
		{field}
		on:click={onLinkClick}
		aria-current={isActive ? 'page' : undefined}
	>
		<span
			class={`absolute inset-0 z-0 rounded-full bg-gray-200 transition-all duration-300 ease-in-out origin-left
				${isActive 
					? 'opacity-100 transform-none' 
					: 'opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0'}`}
		></span>
		<span class="relative z-10 text-slate-800 px-1">
			{label}
		</span>
	</PrismicLink>
{:else}
	<PrismicLink
		class="group relative flex items-center justify-center overflow-hidden rounded-full text-xl font-medium transition-all duration-300 ease-in-out px-8 py-3.5"
		{field}
		on:click={onLinkClick}
		aria-current={isActive ? 'page' : undefined}
	>
		<span
			class={`absolute inset-0 z-0 rounded-full bg-gray-200 transition-all duration-300 ease-in-out origin-left
				${isActive 
					? 'opacity-100 transform-none' 
					: 'opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0'}`}
		></span>
		<span class="relative z-10 text-slate-800 px-1">
			{label}
		</span>
	</PrismicLink>
{/if}