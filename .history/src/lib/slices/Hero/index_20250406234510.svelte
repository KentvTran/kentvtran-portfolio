<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Scene from './Scene.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let slice: Content.HeroSlice;
	
	let mounted = false;
	
	onMount(() => {
		mounted = true;
	});
</script>

<section 
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="px-4 md:px-6 py-8 md:py-16">

	<div class="mx-auto w-full max-w-7xl">
		<div class="grid min-h-[80vh] grid-cols-1 items-center md:grid-cols-2 gap-8">
			<!-- 3D Scene on the left -->
			<div class="relative z-10 aspect-square overflow-hidden md:col-span-1">
				<Scene />
				{#if mounted}
					<div class="absolute bottom-4 left-4 text-xs text-gray-500" transition:fade>
						Click to animate
					</div>
				{/if}
			</div>
		
			<!-- Content on the right -->
			<div class="flex flex-col justify-center h-full">
				<div class="space-y-6">
					<h1 class="text-[clamp(2rem,6vw,5rem)] leading-none tracking-tighter">
						<span class="block" style="color: #3D5A6C;">
							{slice.primary.full_name}
						</span>
					</h1>
					
					<div class="space-y-2">
						<span class="block text-sm uppercase tracking-[.2em] md:text-xl" style="color: #433A3F;">
							{slice.primary.location_indicator}
						</span>
						<span class="block text-sm uppercase tracking-[.2em] md:text-xl" style="color: #433A3F;">
							{slice.primary.tag_line}
						</span>
					</div>
					
					<!-- Social Media Icons -->
					<div class="flex space-x-4 mt-8">
						<a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" class="social-icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700 hover:text-gray-900 transition-colors">
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
								<rect x="2" y="9" width="4" height="12"></rect>
								<circle cx="4" cy="4" r="2"></circle>
							</svg>
						</a>
						<a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="social-icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700 hover:text-gray-900 transition-colors">
								<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>		
	</div>
</section>

<style>
	section {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
	
	.social-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.2s;
	}
	
	.social-icon:hover {
		transform: translateY(-2px);
	}
</style>