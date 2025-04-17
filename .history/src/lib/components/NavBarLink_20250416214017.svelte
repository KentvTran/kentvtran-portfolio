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
		class="group relative flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-base font-medium transition-all duration-300 ease-in-out"
		{field}
		on:click={onLinkClick}
		aria-current={isActive ? 'page' : undefined}
	>
		<span
			class={`absolute inset-0 z-0 rounded-full transition-all duration-300 ease-in-out 
				${isActive ? 'bg-gray-200' : 'bg-transparent group-hover:bg-gray-100'}`}
		></span>
		<span class="relative z-10 text-slate-800">
			{label}
		</span>
	</PrismicLink>
{:else}
	<PrismicLink
		class="group relative flex items-center justify-center overflow-hidden rounded-full px-5 py-3 text-xl font-medium transition-all duration-300 ease-in-out"
		{field}
		on:click={onLinkClick}
		aria-current={isActive ? 'page' : undefined}
	>
		<span
			class={`absolute inset-0 z-0 rounded-full transition-all duration-300 ease-in-out 
				${isActive ? 'bg-gray-200' : 'bg-transparent group-hover:bg-gray-100'}`}
		></span>
		<span class="relative z-10 text-slate-800">
			{label}
		</span>
	</PrismicLink>
{/if}