<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Scene from './Scene.svelte';

	export let slice: Content.HeroSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="px-4 md:px-6 relative min-h-[calc(100vh-100px)]"  <!-- Changed line -->
>
	<div class="mx-auto w-full max-w-7xl">
		<div class="grid min-h-[65vh] grid-cols-1 items-center md:grid-cols-2">
			<!-- Your 3D element container (left side) -->
			<div class="relative z-10 row-span-1 row-start-1 -my-10 aspect-[1/1.3] overflow-hidden md:col-span-1 md:col-start-1 md:mt-0">  <!-- Changed col-start -->
				<Scene />
			</div>
			
			<div class="col-start-1 md:row-start-1 md:col-start-2">  <!-- Adjusted column start -->
				<h1 class="mb-2 md:mb-8 text-[clamp(3rem,20vmin,13rem)] font-extrabold leading-none tracking-tighter text-nowrap">
	
				</h1>
				<span class="job-title block bg-gradient-to-tr from-[#3D5A6C] via-[#433A3F] to-[#3D5A6C] bg-clip-text text-transparent text-2xl font-bold uppercase tracking-[.2em] md:text-4xl opacity-0">  <!-- Your color scheme -->
					{slice.primary.tag_line}
				</span>
			</div>
		</div>
	</div>
</section>

<style>
	@media (min-width: 768px) {
		.three-d-container {
			left: 5%;
			top: 50%;
			transform: translateY(-50%);
			width: 40%;
		}
		
		.content-container {
			padding-right: 10%;
		}
	}
</style>