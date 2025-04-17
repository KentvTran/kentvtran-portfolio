<script lang="ts">
	import { page } from '$app/stores';
	import { asLink, type KeyTextField, type LinkField } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import { onMount, afterUpdate } from 'svelte';
	import { spring } from 'svelte/motion';
	import IconMenu from '~icons/ic/baseline-menu';
	import IconClose from '~icons/ic/baseline-close';
  
	export let settings: { data: { nav_item: Array<{ label: KeyTextField; link: LinkField }> } };
  
	let open = false;
	let navContainer;
	let navItems = [];
	let highlightElement;
	let activeIndex = 0;
	let hoveredIndex = null;
	
	// Spring animation for smooth movement
	const highlightPosition = spring({ x: 0, width: 0 }, {
	  stiffness: 0.1,
	  damping: 0.7
	});
	
	function onLinkClick() {
	  open = false;
	}
	
	// Update active index based on current path
	$: {
	  if ($page) {
		const currentPath = $page.url.pathname;
		const newActiveIndex = settings.data.nav_item.findIndex(item => {
		  const path = asLink(item.link);
		  return path && currentPath.includes(path);
		});
		
		if (newActiveIndex !== -1) {
		  activeIndex = newActiveIndex;
		  updateHighlightPosition(activeIndex);
		}
	  }
	}
	
	// Update highlight position based on active or hovered item
	function updateHighlightPosition(index) {
	  if (!navItems.length || index === undefined || index === null) return;
	  
	  const item = navItems[index];
	  if (!item) return;
	  
	  const rect = item.getBoundingClientRect();
	  const containerRect = navContainer.getBoundingClientRect();
	  
	  highlightPosition.set({
		x: rect.left - containerRect.left,
		width: rect.width
	  });
	}
	
	function handleMouseEnter(index) {
	  hoveredIndex = index;
	  updateHighlightPosition(index);
	}
	
	function handleMouseLeave() {
	  hoveredIndex = null;
	  updateHighlightPosition(activeIndex);
	}
	
	onMount(() => {
	  // Initialize highlight position after DOM is ready
	  updateHighlightPosition(activeIndex);
	});
	
	afterUpdate(() => {
	  // Update references to DOM elements after they're rendered
	  if (navContainer) {
		navItems = Array.from(navContainer.querySelectorAll('.nav-item'));
		updateHighlightPosition(hoveredIndex !== null ? hoveredIndex : activeIndex);
	  }
	});
  </script>
  
  <header class="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4 relative">
	<nav class="flex justify-center">
	  <div class="flex flex-col justify-between rounded-[32px] bg-white px-4 py-2.5 w-full md:w-auto md:flex-row md:items-center shadow-sm border border-gray-100">
		<div class="flex items-center justify-between md:hidden">
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
		  class={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white rounded-[32px] transition-all duration-300 ease-in-out md:hidden ${open ? 'opacity-100 visible' : 'opacity-0 invisible translate-y-4'}`}
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
			  <div class="relative">
				<PrismicLink
				  class="group flex items-center justify-center text-xl font-medium px-8 py-3.5"
				  field={link}
				  on:click={onLinkClick}
				  aria-current={index === activeIndex ? 'page' : undefined}
				>
				  <span class="relative z-10 text-slate-800 px-1">
					{label}
				  </span>
				</PrismicLink>
				{#if index === activeIndex}
				  <div class="absolute inset-0 rounded-full bg-gray-200 -z-10"></div>
				{/if}
			  </div>
			{/each}
		  </div>
		</div>
  
		<!-- Desktop Nav -->
		<div class="relative z-50 hidden md:block">
		  <div 
			bind:this={navContainer}
			class="relative flex items-center justify-between bg-white rounded-[32px] py-1.5 space-x-2"
			on:mouseleave={handleMouseLeave}
		  >
			<!-- Sliding highlight element -->
			<div 
			  bind:this={highlightElement}
			  class="absolute rounded-full bg-gray-200 transition-all duration-300 ease-in-out z-0"
			  style="left: {$highlightPosition.x}px; width: {$highlightPosition.width}px; height: 85%;"
			></div>
			
			{#each settings.data.nav_item as { label, link }, index}
			  <div 
				class="nav-item relative z-10"
				on:mouseenter={() => handleMouseEnter(index)}
			  >
				<PrismicLink
				  class="flex items-center justify-center text-[15px] font-medium transition-all duration-300 ease-in-out px-6 py-2.5"
				  field={link}
				  on:click={onLinkClick}
				  aria-current={index === activeIndex ? 'page' : undefined}
				>
				  <span class="relative z-10 text-slate-800 px-1">
					{label}
				  </span>
				</PrismicLink>
			  </div>
			{/each}
		  </div>
		</div>
	  </div>
	</nav>
  </header>