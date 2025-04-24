<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { type Content } from '@prismicio/client';
	import NavBarLink from './NavBarLink.svelte';
	import IconMenu from '~icons/ic/baseline-menu';
	import IconClose from '~icons/ic/baseline-close';

	export let settings: Content.SettingsDocument;

	let open = false;
	let cursorEl: HTMLDivElement;
	let navContainer: HTMLDivElement;

	// the current-page spot
	let defaultPosition = { left: 0, width: 0 };
	// the cursor position 
	let currentPosition = { left: 0, width: 0, opacity: 0 };

	function onLinkClick() {
		open = false;
	}

	function updateCursorPosition(left: number, width: number, opacity: number = 1) {
		currentPosition = { left, width, opacity };
	}

	// on mouse leave, snap back to the “true” current-page
	function resetCursor() {
		updateCursorPosition(defaultPosition.left, defaultPosition.width, 1);
	}

	// find the link with aria-current="page" and store it
	function recomputeDefault() {
		if (!navContainer) return;
		const active = navContainer.querySelector('[aria-current="page"]') as HTMLElement | null;
		if (!active) return;
		const rect = active.getBoundingClientRect();
		const parentRect = navContainer.getBoundingClientRect();
		const left = rect.left - parentRect.left;
		defaultPosition = { left, width: rect.width };
		// immediately show it
		updateCursorPosition(left, rect.width, 1);
	}

	onMount(() => {
		// initial compute after DOM layout
		setTimeout(recomputeDefault, 100);
	});

	afterNavigate(() => {
		// re-calc on route change
		setTimeout(recomputeDefault, 0);
	});
</script>

<header class="sticky top-0 z-50 mx-auto max-w-7xl relative">
	<nav class="flex justify-center">
		<div class="flex flex-col justify-between rounded-[32px] bg-white px-4 py-2 w-full md:w-auto md:flex-row md:items-center shadow-sm border border-gray-100">
			
			<!-- Mobile toggle -->
			<div class="flex items-center justify-between w-full md:hidden">
				<a href="/" aria-label="Homepage" class="text-xl font-extrabold text-slate-800">
					{settings.data.name}
				</a>
				<button
					aria-expanded={open}
					aria-label="Open Menu"
					class="block p-2 text-2xl text-slate-800 rounded-full hover:bg-gray-100"
					on:click={() => (open = true)}
				>
					<IconMenu />
				</button>
			</div>
			
			<!-- Mobile Nav -->
			<div
				class={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white rounded-[32px] transition-all duration-300 ease-in-out md:hidden ${
					open ? 'opacity-100 visible' : 'opacity-0 invisible translate-y-4'
				}`}
			>
				<div class="absolute top-4 right-4">
					<button
						aria-expanded={open}
						aria-label="Close Menu"
						class="block p-2 text-2xl text-slate-800 rounded-full hover:bg-gray-100"
						on:click={() => (open = false)}
					>
						<IconClose />
					</button>
				</div>
				<div class="flex flex-col items-center space-y-6">
					{#each settings.data.nav_item as { label, link }}
						<NavBarLink 
							field={link} 
							{label} 
							{onLinkClick} 
							type="mobile"
						/>
					{/each}
				</div>
			</div>

			<!-- Desktop Nav -->
			<div class="relative z-50 hidden md:block">
				<div
					bind:this={navContainer}
					class="flex items-center justify-between bg-white rounded-[32px] py-px   relative"
					on:mouseleave={resetCursor}
					role="navigation"
					aria-label="Main navigation"
				>
					<!-- Shaded Div with Slide Effect -->
					<div
						bind:this={cursorEl}
						 class="absolute z-0 -inset-y-px rounded-full bg-gray-200 pointer-events-none transition-all duration-300 ease-in-out"

						style="
							left: {currentPosition.left}px;
							width: {currentPosition.width}px;
							opacity: {currentPosition.opacity};
						"
						aria-hidden="true"
					></div>

					{#each settings.data.nav_item as { label, link }}
						<NavBarLink 
							field={link} 
							{label} 
							{onLinkClick} 
							type="desktop"
							{updateCursorPosition}
						/>
					{/each}
				</div>
			</div>
		</div>
	</nav>
</header>
