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
		<div class="flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:mx-auto md:max-w-[33%] md:flex-row md:items-center md:rounded-xl">
			<div class="flex items-center justify-between">
				<button
					aria-expanded={open}
					aria-label="Open Menu"
					class="block p-2 text-2xl text-slate-800 md:hidden"
					on:click={() => (open = true)}
				>
					<IconMenu />
				</button>
			</div>
			<!-- Mobile Nav -->
			<ul
				class={`fixed inset-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden ${open ? 'translate-x-0' : 'translate-x-[100%]'}`}
			>
				<li>
					<button
						aria-expanded={open}
						aria-label="Close Menu"
						class="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden"
						on:click={() => (open = false)}
					>
						<IconClose />
					</button>
				</li>
				{#each settings.data.nav_item as { label, link }}
					<li class="first:mt-8">
						<NavBarLink field={link} {label} {onLinkClick} type="mobile" />
					</li>
				{/each}
			</ul>

			<!-- Desktop Nav -->
			<ul class="relative z-50 hidden flex-row items-center gap-4 bg-transparent py-0 md:flex">
				{#each settings.data.nav_item as { label, link }, index}
					<li class="flex items-center">
						<NavBarLink field={link} {label} {onLinkClick} type="desktop" />
						{#if index < settings.data.nav_item.length - 1}
							<div class="h-6 w-px bg-slate-300 mx-2"></div>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</header>