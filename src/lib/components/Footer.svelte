<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import { type Content, isFilled } from '@prismicio/client';
	import { PrismicLink, PrismicImage } from '@prismicio/svelte';
	import IconGithub from '~icons/fa-brands/github';
	import IconLinkedin from '~icons/fa-brands/linkedin';

	export let settings: Content.SettingsDocument;
</script>

<Bounded as="footer" class="text-[#433A3F]">
	<div class="container mx-auto flex mt-20 flex-col items-center justify-between gap-6 py-8 sm:flex-row">
		<div class="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
			<a
				href="/"
				class="text-xl font-medium tracking-tighter text-[#433A3F] transition-color duration-150 hover:text-[#3D5A6C]"
			>
				<!-- <PrismicImage field={settings.data.logo} /> -->
                {settings.data.name}
			</a>
			<span
				class="hidden text-2xl font-extralight leading-[0] text-[#433A3F] sm:inline"
				aria-hidden="true"
			>
				|
			</span>
			<p class="text-sm text-[#433A3F]">
				© {new Date().getFullYear()}
			</p>
		</div>

	
		<!-- Site Map -->
		<nav class="navigation" aria-label="Footer Navigation">
			<ul class="flex items-center gap-1">
				{#each settings.data.nav_item as { link, label }, index}
					<li>
						<PrismicLink
							field={link}
							class="block px-3 py-1 text-base font-medium text-[#433A3F] transition-colors duration-150 hover:text-[#3D5A6C]"
						>
							{label}
						</PrismicLink>
					</li>
					{#if index < settings.data.nav_item.length - 1}
						<span
							class="text-2xl font-thin leading-[0] text-[#433A3F]"
							aria-hidden="true"
						>
							|
						</span>
					{/if}
				{/each}
			</ul>
		</nav>

		<!-- Socials -->
		<div class="socials inline-flex justify-center sm:justify-end">
			{#if isFilled.link(settings.data.github_link)}
				<PrismicLink
					field={settings.data.github_link}
					target="_blank"
					rel="noopener noreferrer"
					class="p-2 text-2xl text-[#433A3F] transform transition-all duration-150 hover:scale-125 hover:text-[#3D5A6C]"
					aria-label="GitHub"
				>
					<IconGithub />
				</PrismicLink>
			{/if}
			{#if isFilled.link(settings.data.linkedin_link)}
				<PrismicLink
					field={settings.data.linkedin_link}
					target="_blank"
					rel="noopener noreferrer"
					class="p-2 text-2xl text-[#433A3F] transform transition-all duration-150 hover:scale-125 hover:text-[#3D5A6C]"
					aria-label="LinkedIn"
				>
					<IconLinkedin />
				</PrismicLink>
			{/if}
		</div>
	</div>
</Bounded>