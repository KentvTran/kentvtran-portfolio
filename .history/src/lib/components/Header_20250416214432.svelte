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
	<nav class="flex justify-center">
		<div class="flex flex-col justify-between rounded-[30px] bg-white px-3 py-2 w-full md:w-auto md:flex-row md:items-center shadow-sm border border-gray-100">
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
			<ul
				class={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white rounded-[30px] transition-transform duration-300 ease-in-out md:hidden ${open ? 'translate-x-0' : 'translate-x-[100%]'}`}
			>
				<li class="absolute top-4 right-4">
					<button
						aria-expanded={open}
						aria-label="Close Menu"
						class="block p-2 text-2xl text-slate-800 rounded-full hover:bg-gray-100"
						on:click={() => (open = false)}
					>
						<IconClose />
					</button>
				</li>
				{#each settings.data.nav_item as { label, link }}
					<li>
						<NavBarLink field={link} {label} {onLinkClick} type="mobile" />
					</li>
				{/each}
			</ul>

			<!-- Desktop Nav -->
			<div class="relative z-50 hidden md:flex md:items-center">
				<div class="flex items-center justify-between bg-white rounded-[30px] px-2 py-1.5 space-x-1">
					{#each settings.data.nav_item as { label, link }, index}
						<NavBarLink field={link} {label} {onLinkClick} type="desktop" />
					{/each}
				</div>
			</div>
		</div>
	</nav>
</header>