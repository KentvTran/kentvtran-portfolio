<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	import { type Content } from '@prismicio/client';
	import NavBarLink from './NavBarLink.svelte';

	import IconMenu from '~icons/ic/baseline-menu';
	import IconClose from '~icons/ic/baseline-close';

	export let settings: Content.SettingsDocument;

	let open = false;

	let cursorEl: HTMLDivElement;
	let navContainer: HTMLDivElement;
	let activePosition = { left: 0, width: 0, opacity: 0 };
	let activePagePosition = { left: 0, width: 0 }; // Store active page position
	
	function onLinkClick() {
		open = false;
	}

	// Function to update cursor position with proper typing
	function updateCursorPosition(left: number, width: number, opacity: number = 1) {
		activePosition = { left, width, opacity };
		if (cursorEl) {
			gsap.to(cursorEl, {
				left,
				width,
				duration: 0.5, // Increased duration for smoother animation
				opacity,
				ease: "power3.out" // Changed to power3 for smoother easing
			});
		}
	}

	// Function to reset cursor on mouse leave - now returns to active page position
	function resetCursor() {
		// Instead of hiding, transition back to active page position
		updateCursorPosition(activePagePosition.left, activePagePosition.width, 1);
	}

	// Function to handle active link highlighting on page load
	onMount(() => {
		// Set a small delay to ensure DOM is fully rendered
		setTimeout(() => {
			const activeLink = navContainer?.querySelector('[aria-current="page"]') as HTMLElement | null;
			if (activeLink) {
				const rect = activeLink.getBoundingClientRect();
				const parentRect = navContainer.getBoundingClientRect();
				const relativeLeft = rect.left - parentRect.left;
				
				// Store the active page position for later use
				activePagePosition = { left: relativeLeft, width: rect.width };
				
				// Set initial position with animation
				gsap.set(cursorEl, { opacity: 0 }); // Start invisible
				gsap.to(cursorEl, {
					left: relativeLeft,
					width: rect.width,
					opacity: 1,
					duration: 0.6,
					ease: "power3.out",
					delay: 0.1 // Small delay for smoother initial appearance
				});
				
				// Update active position state
				activePosition = { left: relativeLeft, width: rect.width, opacity: 1 };
			}
		}, 100);
	});
</script>

<header class="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4 relative">
	<nav class="flex justify-center">
		<div class="flex flex-col justify-between rounded-[32px] bg-white px-4 py-2 w-full md:w-auto md:flex-row md:items-center shadow-sm border border-gray-100">
			
			<!-- MOBILE TOGGLE ROW -->
			<div class="flex items-center justify-between w-full md:hidden">
				<!-- Your name on the left -->
				<a
					href="/"
					aria-label="Homepage"
					class="text-xl font-extrabold text-slate-800"
				>
					{settings.data.name}
				</a>
	
				<!-- Hamburger on the right -->
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
					{#each settings.data.nav_item as { label, link }, index}
						<NavBarLink 
							field={link} 
							{label} 
							{onLinkClick} 
							type="mobile" 
							isLast={index === settings.data.nav_item.length - 1} 
						/>
					{/each}
				</div>
			</div>

			<!-- Desktop Nav -->
			<div class="relative z-50 hidden md:block">
				<div 
					bind:this={navContainer}
					class="flex items-center justify-between bg-white rounded-[32px] py-0.5 relative"
					on:mouseleave={resetCursor}
					role="navigation"
					aria-label="Main navigation"
				>
					<!-- Animated cursor element -->
					<div 
						bind:this={cursorEl}
						class="absolute z-0 h-12 rounded-full bg-gray-200 pointer-events-none transition-all duration-500"
						style="opacity: {activePosition.opacity}; left: {activePosition.left}px; width: {activePosition.width}px;"
						aria-hidden="true"
					></div>
					
					{#each settings.data.nav_item as { label, link }, index}
						<NavBarLink 
							field={link} 
							{label} 
							{onLinkClick} 
							type="desktop" 
							isLast={index === settings.data.nav_item.length - 1}
							{updateCursorPosition}
							{activePagePosition}
						/>
					{/each}
				</div>
			</div>
		</div>
	</nav>
</header>