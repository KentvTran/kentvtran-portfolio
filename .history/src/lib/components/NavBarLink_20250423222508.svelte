<script lang="ts">
	import { page } from '$app/stores';
	import { asLink, type KeyTextField, type LinkField } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import { onMount } from 'svelte';

	export let field: LinkField;
	export let label: KeyTextField;
	export let onLinkClick: (event: MouseEvent) => void;
	export let type: 'desktop' | 'mobile';
	export let isLast = false;
	export let updateCursorPosition = undefined;

	let linkEl: HTMLElement;

	const path = asLink(field);
	$: isActive = path && (
		path === '/' 
			? $page.url.pathname === path  // Exact match for home
			: $page.url.pathname.startsWith(path) // Partial match for other pages
	);

	function handleMouseEnter() {
		if (type === 'desktop' && updateCursorPosition && linkEl) {
			const rect = linkEl.getBoundingClientRect();
			updateCursorPosition(linkEl.offsetLeft, rect.width);
		}
	}

	onMount(() => {
		// If this is the active link on initial load, we'll handle it in the parent component
	});
</script>

{#if type === 'desktop'}
	<div class="flex items-center">
		<PrismicLink
			bind:this={linkEl}
			class="group relative flex items-center justify-center overflow-hidden text-[15px] font-medium transition-all duration-300 ease-in-out px-5 py-2.5 z-10"
			{field}
			on:click={onLinkClick}
			on:mouseenter={handleMouseEnter}
			aria-current={isActive ? 'page' : undefined}
		>
			<span class="relative z-10 text-slate-800 px-1">
				{label}
			</span>
		</PrismicLink>
		
		{#if !isLast}
			<span class="text-2xl font-thin leading-[0] text-slate-300 mx-1 z-10" aria-hidden="true">
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