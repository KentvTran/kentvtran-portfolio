<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.HeroSlice;
</script>

<section 
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="px-4 md:px-6 pt-8 md:pt-16">

	<div class="mx-auto w-full max-w-7xl">
		<div class="grid min-h-[65vh]">
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
	</div>
</section>
