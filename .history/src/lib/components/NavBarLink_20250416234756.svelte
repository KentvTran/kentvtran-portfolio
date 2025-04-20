<script lang="ts">
	import { page } from '$app/stores';
	import { asLink, type KeyTextField, type LinkField } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';

	export let field: LinkField;
	export let label: KeyTextField;
	export let onLinkClick: (event: MouseEvent) => void;
	export let type: 'desktop' | 'mobile';
	export let isLast = false;

	const path = asLink(field);
	$: isActive = path && $page.url.pathname.includes(path);
</script>

{#if type === 'desktop'}
	<div class="flex items-center">
		<PrismicLink
			class="group relative flex items-center justify-center overflow-hidden text-[15px] font-medium transition-all duration-300 ease-in-out px-5 py-2.5"
			{field}
			on:click={onLinkClick}
			aria-current={isActive ? 'page' : undefined}
		>
			<span
				class={`absolute inset-0 z-0 rounded-full bg-gray-200 transition-all duration-300 ease-in-out origin-bottom
					${isActive 
						? 'opacity-100 transform-none' 
						: 'opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0'}`}
			></span>
			<span class="relative z-10 text-slate-800 px-1">
				{label}
			</span>
		</PrismicLink>
		
		{#if !isLast}
			<span class="text-2xl font-thin leading-[0] text-slate-300 mx-1" aria-hidden="true">
				|
			</span>
		{/if}
	</div>
{:else}
	<div class="flex items-center">
		<PrismicLink
		class="group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900"
		{field}
		on:click={onLinkClick}
		aria-current={isActive ? 'page' : undefined}
	>
		<span
			class={`absolute inset-0 z-0 h-full rounded bg-[#3D5A6C] transition-transform duration-300 ease-in-out group-hover:translate-y-0 ${isActive ? 'translate-y-6' : 'translate-y-16'}`}
		></span>
	
		<span class="relative">
			{label}
		</span>
	</PrismicLink>
	</div>
{/if}