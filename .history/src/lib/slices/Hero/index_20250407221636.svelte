<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Scene from './Scene.svelte';
	import { GithubIcon, LinkedinIcon } from 'lucide-svelte';
	//ignore deprecated warning for lucide-svelte?

	export let slice: Content.HeroSlice;
</script>

<section 
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="px-4 md:px-6 pt-8 md:pt-16">

	<div class="mx-auto w-full max-w-7xl">
		<div class="grid min-h-[80vh] grid-cols-1 md:grid-cols-2 relative">
			<!-- 3D Element Container - Increased size -->
			<div class="three-d-container md:absolute md:z-10 flex justify-center items-center h-[50vh] md:h-auto">
				<div class="w-72 h-72 md:w-96 md:h-96 relative">
					<Scene />
				</div>
			</div>
			
			<!-- Content Container -->
			<div class="content-container md:col-start-2 flex flex-col justify-center items-center text-center md:items-end md:text-right mt-8 md:mt-0">
				<h1 class="mb-2 md:mb-6 text-[clamp(1.8rem,5vw,4rem)] leading-none tracking-tighter">
					<span class="block" style="color: #3D5A6C;">
						{slice.primary.full_name}
					</span>
				</h1>
				<div class="mb-6">
					<span class="block text-sm uppercase tracking-[.2em] md:text-xl" style="color: #433A3F;">
						{slice.primary.location_indicator}
					</span>
					<span class="block text-sm uppercase tracking-[.2em] md:text-xl" style="color: #433A3F;">
						{slice.primary.tag_line}
					</span>
				</div>
				
				<div class="social-links flex gap-6 mt-4">
					<a href="https://github.com/KentvTran" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
						<GithubIcon size={24} color="#433A3F" />
					</a>
					<a href="https://www.linkedin.com/in/kent-tran-cs/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
						<LinkedinIcon size={24} color="#433A3F" />
					</a>
				</div>
			</div>
		</div>		
	</div>
</section>

<style>
	.social-links a {
		transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
	}
	
	.social-links a:hover {
		transform: translateY(-2px);
		opacity: 0.8;
	}
	
	@media (min-width: 768px) {
		.three-d-container {
			left: 5%;
			top: 50%;
			transform: translateY(-50%);
			width: 45%;
		}
		
		.content-container {
			padding-right: 10%;
		}
	}
</style>