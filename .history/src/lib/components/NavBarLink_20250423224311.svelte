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
	// Properly type the updateCursorPosition function
	export let updateCursorPosition: ((left: number, width: number, opacity?: number) => void) | undefined = undefined;
	export let activePagePosition: { left: number, width: number } | undefined = undefined;

	// We'll use a div wrapper instead of binding directly to PrismicLink
	let linkWrapper: HTMLDivElement;

	const path = asLink(field);
	$: isActive = path && (
		path === '/' 
			? $page.url.pathname === path  // Exact match for home
			: $page.url.pathname.startsWith(path) // Partial match for other pages
	);

	function handleMouseEnter() {
		if (type === 'desktop' && updateCursorPosition && linkWrapper) {
			const rect = linkWrapper.getBoundingClientRect();
			const parentRect = linkWrapper.parentElement?.getBoundingClientRect() || { left: 0 };
			const relativeLeft = rect.left - parentRect.left;
			
			updateCursorPosition(relativeLeft, rect.width);
		}
	}

	// Update active page position when this link becomes active
	$: if (isActive && linkWrapper && activePagePosition) {
		const rect = linkWrapper.getBoundingClientRect();
		const parentRect = linkWrapper.parentElement?.getBoundingClientRect() || { left: 0 };
		const relativeLeft = rect.left - parentRect.left;
		
		// Only update if there's a significant change to avoid unnecessary updates
		if (Math.abs(activePagePosition.left - relativeLeft) > 1 || 
			Math.abs(activePagePosition.width - rect.width) > 1) {
			activePagePosition.left = relativeLeft;
			activePagePosition.width = rect.width;
		}
	}

	onMount(() => {
		// If this is the active link on initial load, we'll handle it in the parent component
		if (isActive && linkWrapper) {
			// Just to ensure we have the correct dimensions in case of window resize
			const handleResize = () => {
				if (isActive && linkWrapper && activePagePosition) {
					const rect = linkWrapper.getBoundingClientRect();
					const parentRect = linkWrapper.parentElement?.getBoundingClientRect() || { left: 0 };
					const relativeLeft = rect.left - parentRect.left;
					
					activePagePosition.left = relativeLeft;
					activePagePosition.width = rect.width;
					
					// Update cursor position if this is the active page
					if (updateCursorPosition) {
						updateCursorPosition(relativeLeft, rect.width);
					}
				}
			};
			
			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	});
</script>

{#if type === 'desktop'}
	<div 
		bind:this={linkWrapper} 
		class="flex items-center"
		on:mouseenter={handleMouseEnter}
		role="none" 
		aria-hidden="false"
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