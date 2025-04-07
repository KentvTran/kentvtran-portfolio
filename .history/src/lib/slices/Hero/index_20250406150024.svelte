<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Scene from './Scene.svelte';
	import { Github, Linkedin } from 'lucide-svelte';

	// Accept the slice prop from Prismic
	export let slice: Content.HeroSlice;
	
	// Explicitly ignore other props that Prismic might pass
	// export let slices = undefined;
	// export let context = undefined;
	// export let index = undefined;
</script>

<section 
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="px-4 md:px-6 py-16 md:py-24 flex items-center min-h-[80vh]">

	<div class="mx-auto w-full max-w-7xl">
		<div class="grid grid-cols-1 items-center md:grid-cols-2 gap-8">
			<div class="relative z-10 aspect-square overflow-hidden flex items-center justify-center">
				<Scene />
			</div>
		
			<div class="flex flex-col">
				<h1 class="mb-2 md:mb-6 text-[clamp(2rem,6vw,5rem)] leading-none tracking-tighter">
					<span class="block" style="color: #3D5A6C;">
						{slice.primary?.full_name || 'Your Name'}
					</span>
				</h1>
				<span class="block text-sm uppercase tracking-[.2em] md:text-xl mb-2" style="color: #433A3F;">
					{slice.primary?.location_indicator || 'Location'}
				</span>
				<span class="block text-sm uppercase tracking-[.2em] md:text-xl mb-8" style="color: #433A3F;">
					{slice.primary?.tag_line || 'Your Tagline'}
				</span>
				
				<div class="flex space-x-4 mt-4">
					<a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
						class="text-gray-700 hover:text-gray-900 transition-colors">
						<Github size={24} />
					</a>
					<a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
						class="text-gray-700 hover:text-gray-900 transition-colors">
						<Linkedin size={24} />
					</a>
				</div>
			</div>
		</div>		
	</div>
</section>