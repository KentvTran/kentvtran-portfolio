<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Scene from './Scene.svelte';

	export let slice: Content.HeroSlice;
</script>

<section 
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="px-4 md:px-6 pt-8 md:pt-16 relative min-h-screen"> <!-- Added relative and min-h-screen -->

	<!-- Gradient background for hero section -->
	<div class="hero-gradient absolute inset-0 -z-50" />

	<div class="mx-auto w-full max-w-7xl relative z-10"> <!-- Added relative z-10 -->
		<div class="grid min-h-[80vh] grid-cols-1 md:grid-cols-2">
			<!-- 3D Element Container -->
			<div class="three-d-container md:absolute md:z-10 flex justify-center items-center h-[40vh] md:h-auto">
				<div class="w-110 h-110 md:w-[32rem] md:h-[32rem] relative">	
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
			</div>
		</div>		
	</div>
</section>

<style>
	.hero-gradient {
		background: radial-gradient(
			circle at right top,
			#E6E6E6 0%,
			rgba(230, 230, 230, 0.9) 50%,
			rgba(67, 58, 63, 0.7) 90%,
			#433A3F 100%
		);
	}

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