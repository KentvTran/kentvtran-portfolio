<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Scene from './Scene.svelte';
	import { Github, Linkedin } from 'lucide-svelte';

	export let slice: Content.HeroSlice;
</script>

<section 
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="px-4 md:px-6 pt-8 md:pt-16">

	<div class="mx-auto w-full max-w-7xl">
		<div class="grid min-h-[65vh] grid-cols-1 items-center md:grid-cols-2">
			<div class="relative z-10 row-span-2 row-start-1 -my-10 aspect-[1/1.3] overflow-hidden md:col-span-1 md:col-start-1 md:mt-0">
				<Scene />
			</div>
		
			<div class="col-start-1 md:col-start-2 md:row-start-1 flex flex-col">
				<div class="flex items-start">
					<div class="flex-1">
						<h1 class="mb-2 md:mb-8 text-[clamp(2rem,6vw,5rem)] leading-none tracking-tighter">
							<span class="block" style="color: #3D5A6C;">
								{slice.primary.full_name}
							</span>
						</h1>
						<span class="block text-sm uppercase tracking-[.2em] md:text-2xl" style="color: #433A3F;">
							{slice.primary.location_indicator}
						</span>
						<span class="block text-sm uppercase tracking-[.2em] md:text-2xl" style="color: #433A3F;">
							{slice.primary.tag_line}
						</span>
					</div>
					
					<div class="social-links flex flex-col gap-4 ml-4">
						<a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
							<Github size={24} color="#433A3F" />
						</a>
						<a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
							<Linkedin size={24} color="#433A3F" />
						</a>
					</div>
				</div>
			</div>
		</div>		
	</div>
</section>

<style>
	.social-links {
		margin-top: 0.5rem;
	}
	
	.social-links a {
		transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
	}
	
	.social-links a:hover {
		transform: translateY(-2px);
		opacity: 0.8;
	}
</style>