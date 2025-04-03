<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.HeroSlice;
</script>

<section 
data-slice-type={slice.slice_type}
 data-slice-variation={slice.variation}
 class>
	<h1 class="mb-2 md:mb-8 text-[clamp(3rem,20vw,13rem)] font-extrabold leading-none tracking-tighter">
		<span class="block" style="color: #3D5A6C;">
			{slice.primary.full_name}
		</span>
	</h1>
	<span class="block text-2xl font-bold uppercase tracking-[.2em] md:text-4xl" style="color: #433A3F;">
		{slice.primary.location_indicator}
	</span>
	<span class="block text-2xl font-bold uppercase tracking-[.2em] md:text-4xl" style="color: #433A3F;">
		{slice.primary.tag_line}
	</span>
</section>
