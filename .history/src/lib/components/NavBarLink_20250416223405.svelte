<script lang="ts">
	import { page } from '$app/stores';
	import { asLink, type KeyTextField, type LinkField } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import { onMount, afterUpdate } from 'svelte';
	import { gsap } from 'gsap';
	import IconMenu from '~icons/ic/baseline-menu';
	import IconClose from '~icons/ic/baseline-close';
  
	export let settings: {
	  data: { nav_item: Array<{ label: KeyTextField; link: LinkField }> };
	};
  
	let open = false;
	let navContainer!: HTMLElement;
	let highlightElement!: HTMLElement;
	let navItems: HTMLElement[] = [];
  
	let activeIndex = 0;
	let isHovering = false;
  
	function onLinkClick(): void {
	  open = false;
	}
  
	function moveHighlightToItem(index: number): void {
	  if (!navItems.length) return;
	  const item = navItems[index];
	  if (!item) return;
  
	  const rect = item.getBoundingClientRect();
	  const containerRect = navContainer.getBoundingClientRect();
  
	  gsap.to(highlightElement, {
		x: rect.left - containerRect.left,
		width: rect.width,
		duration: 0.5,
		ease: 'power2.out'
	  });
	}
  
	function handleMouseEnter(index: number): void {
	  isHovering = true;
	  moveHighlightToItem(index);
	}
  
	function handleMouseLeave(): void {
	  isHovering = false;
	  moveHighlightToItem(activeIndex);
	}
  
	$: {
	  const currentPath = $page.url.pathname;
	  const newActiveIndex = settings.data.nav_item.findIndex(item => {
		const path = asLink(item.link);
		return path && currentPath.includes(path);
	  });
	  if (newActiveIndex !== -1) {
		activeIndex = newActiveIndex;
		if (!isHovering) moveHighlightToItem(activeIndex);
	  }
	}
  
	onMount((): void => {
	  const item = navItems[activeIndex];
	  if (item) {
		const rect = item.getBoundingClientRect();
		const containerRect = navContainer.getBoundingClientRect();
		gsap.set(highlightElement, {
		  x: rect.left - containerRect.left,
		  width: rect.width,
		  height: '85%',
		  top: '7.5%'
		});
	  }
	});
  
	afterUpdate((): void => {
	  navItems = Array.from(navContainer.querySelectorAll<HTMLElement>('.nav-item'));
	  if (!isHovering) moveHighlightToItem(activeIndex);
	});
  </script>
  
  <header class="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4 relative">
	<nav class="flex justify-center">
	  <!-- wrapper for both mobile & desktop nav -->
	  <div class="flex flex-col justify-between rounded-[32px] bg-white px-4 py-2.5 w-full md:w-auto md:flex-row md:items-center shadow-sm border border-gray-100">
  
		<!-- Mobile toggle button -->
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
		  class={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white rounded-[32px]
				  transition-all duration-300 ease-in-out md:hidden
				  ${open ? 'opacity-100 visible' : 'opacity-0 invisible translate-y-4'}`}
		>
		  <button
			aria-expanded={open}
			aria-label="Close Menu"
			class="absolute top-4 right-4 p-2 text-2xl text-slate-800 rounded-full hover:bg-gray-100"
			on:click={() => (open = false)}
		  >
			<IconClose />
		  </button>
  
		  <div class="flex flex-col items-center space-y-6">
			{#each settings.data.nav_item as { label, link }, index}
			  <div class="relative">
				<PrismicLink
				  class="group flex items-center justify-center text-xl font-medium px-8 py-3.5"
				  field={link}
				  on:click={onLinkClick}
				  aria-current={index === activeIndex ? 'page' : undefined}
				>
				  <span class="relative z-10 text-slate-800 px-1">{label}</span>
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
			class="relative flex items-center justify-between bg-white rounded-[32px] py-1.5"
			on:mouseleave={handleMouseLeave}
			role="navigation"
			aria-label="Primary desktop navigation"
		  >
			<!-- Sliding highlight element -->
			<div bind:this={highlightElement} class="absolute rounded-full bg-gray-200 z-0"></div>
  
			{#each settings.data.nav_item as { label, link }, index}
			  <div
				class="nav-item relative z-10 flex items-center"
				on:mouseenter={() => handleMouseEnter(index)}
			  >
				<PrismicLink
				  class="flex items-center justify-center text-[15px] font-medium transition-all duration-300 ease-in-out px-5 py-2.5"
				  field={link}
				  on:click={onLinkClick}
				  aria-current={index === activeIndex ? 'page' : undefined}
				>
				  <span class="relative z-10 text-slate-800 px-1">{label}</span>
				</PrismicLink>
  
				{#if index < settings.data.nav_item.length - 1}
				  <span
					class="text-2xl font-thin leading-[0] text-slate-300 mx-1 z-10"
					aria-hidden="true"
				  >
					|
				  </span>
				{/if}
			  </div>
			{/each}
		  </div>
		</div>
  
	  </div>
	</nav>
  </header>
  