<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Scene from './Scene.svelte';

	export let slice: Content.HeroSlice;
</script>
<section 
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="px-4 md:px-6"
>
	<div class="mx-auto w-full max-w-7xl">
		<div class="grid min-h-[65vh] grid-cols-1 items-center md:grid-cols-2">
			<!-- 3D Element Container (left side as desired) -->
			<div class="relative z-10 row-span-1 row-start-1 -my-10 aspect-[1/1.3] overflow-hidden md:col-span-1 md:col-start-1">
				<div class="w-110 h-110 md:w-[32rem] md:h-[32rem] relative">
					<Scene />
				</div>
			</div>
			
			<!-- Content Container (right side) -->
			<div class="col-start-1 md:row-start-1 md:col-start-2 flex flex-col justify-center items-center md:items-end md:text-right">
				<h1
					class="mb-2 md:mb-8 text-[clamp(3rem,20vmin,13rem)] font-extrabold leading-none tracking-tighter text-nowrap"
					aria-label={slice.primary.full_name}
				>
					{slice.primary.full_name}
				</h1>
				<div class="mb-6">
					<span
						class="block text-sm uppercase tracking-[.2em] md:text-xl"
						style="color: #433A3F;"
					>
						{slice.primary.location_indicator}
					</span>
					<span
						class="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-transparent text-2xl font-bold uppercase tracking-[.2em] md:text-4xl"
					>
						{slice.primary.tag_line}
					</span>
				</div>
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