<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.HeroSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<h1 class="mb-2 md:mb-8 text-[clamp(3rem,20vw,13rem)]
	 font-extrabold leading-none 
	 tracking-tighter">
		<span class="block #433A3F">
			{slice.primary.full_name}
		</span>
	</h1>
	<span class="block ">{slice.primary.location_indicator}</span>
	<span class="block">{slice.primary.tag_line}</span>
</section>
