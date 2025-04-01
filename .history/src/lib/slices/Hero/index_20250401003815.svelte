<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.HeroSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<h1 class= "mb-2 md:mb-8 text-[clamp(3rem,20vim,13rem)}
	 font extrabold leading-none 
	 tracking-tighter text-nowrap">
		<span class="block text-slate-300">
			{slice.primary.full_name}
		</span>
	</h1>
	<span>{slice.primary.tag_line}</span>
	<span>{slice.primary.location_indicator}</span>
</section>
