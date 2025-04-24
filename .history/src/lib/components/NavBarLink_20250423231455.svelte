<script lang="ts">
	import { page } from '$app/stores';
	import { asLink, type KeyTextField, type LinkField } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import { onMount } from 'svelte';

	export let field: LinkField;
	export let label: KeyTextField;
	export let onLinkClick: (event: MouseEvent) => void;
	export let type: 'desktop' | 'mobile';
	export let updateCursorPosition: ((left: number, width: number, opacity?: number) => void) | undefined = undefined;

	let linkWrapper: HTMLDivElement;

	const path = asLink(field);
	$: isActive = path && (
		path === '/' 
			? $page.url.pathname === path
			: $page.url.pathname.startsWith(path)
	);

	function handleMouseEnter() {
		if (type === 'desktop' && updateCursorPosition && linkWrapper) {
			const rect = linkWrapper.getBoundingClientRect();
			const parentRect = linkWrapper.parentElement?.getBoundingClientRect() || { left: 0 };
			const relativeLeft = rect.left - parentRect.left;
			
			updateCursorPosition(relativeLeft, rect.width);
		}
	}
</script>

{#if type === 'desktop'}
	<div 
		bind:this={linkWrapper} 
		class="flex items-center"
		on:mouseenter={handleMouseEnter}
		role="presentation"
	>
		<PrismicLink
			class="group relative flex items-center justify-center overflow-hidden text-[15px] font-medium transition-all duration-300 ease-in-out px-6 py-3 z-10 w-full"
			{field}
			on:click={onLinkClick}
			aria-current={isActive ? 'page' : undefined}
		>
			<span class="relative z-10 text-slate-800">
				{label}
			</span>
		</PrismicLink>
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