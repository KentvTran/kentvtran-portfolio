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
	let activePosition = { left: 0, width: 0 };
	function onLinkClick() {
		open = false;
	}
</script>

<header class="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4 relative">
	<nav class="flex justify-center">
		<div class="flex flex-col justify-between rounded-[32px] bg-white px-4 py-2.5 w-full md:w-auto md:flex-row md:items-center shadow-sm border border-gray-100">
			
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
				<div class="flex items-center justify-between bg-white rounded-[32px] py-1.5">
					{#each settings.data.nav_item as { label, link }, index}
						<NavBarLink 
							field={link} 
							{label} 
							{onLinkClick} 
							type="desktop" 
							isLast={index === settings.data.nav_item.length - 1} 
						/>
					{/each}
				</div>
			</div>
		</div>
	</nav>
</header>