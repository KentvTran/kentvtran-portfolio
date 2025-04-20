<script lang="ts">
	import { type Content } from '@prismicio/client';
	import NavBarLink from './NavBarLink.svelte';

	import IconMenu from '~icons/ic/baseline-menu';
	import IconClose from '~icons/ic/baseline-close';

	export let settings: Content.SettingsDocument;

	let open = false;

	function onLinkClick() {
		open = false;
	}
</script>

<header class="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4 relative">
	<nav>
		<!-- Mobile Top Bar -->
		<div class="flex items-center justify-between px-4 py-3 bg-white shadow md:hidden rounded-[32px] w-full border border-gray-100">
			<!-- Name on left -->
			<div class="text-xl font-bold text-slate-900">
				{settings.data.name}
			</div>

			<!-- Hamburger on right -->
			<button
				aria-expanded={open}
				aria-label="Open Menu"
				class="p-2 text-2xl text-slate-800 rounded-full hover:bg-gray-100"
				on:click={() => (open = true)}
			>
				<IconMenu />
			</button>
		</div>

		<!-- Mobile Nav Overlay -->
		<div
			class={`fixed inset-0 z-50 flex flex-col items-end gap-6 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden
			${open ? 'translate-x-0' : 'translate-x-full'}`}
		>
			<!-- Close button -->
			<button
				aria-expanded={open}
				aria-label="Close Menu"
				class="absolute top-4 right-4 p-2 text-2xl text-slate-800 rounded-full hover:bg-gray-100"
				on:click={() => (open = false)}
			>
				<IconClose />
			</button>

			<!-- Nav items -->
			<ul class="w-full flex flex-col items-end space-y-4">
				{#each settings.data.nav_item as { label, link }, i}
					<li class="w-full">
						<NavBarLink
							field={link}
							{label}
							{onLinkClick}
							type="mobile"
							isLast={i === settings.data.nav_item.length - 1}
						/>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Desktop Nav -->
		<div class="relative z-50 hidden md:block">
			<div class="flex items-center justify-between bg-white rounded-[32px] py-1.5 px-6 shadow-sm border border-gray-100">
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
	</nav>
</header>
