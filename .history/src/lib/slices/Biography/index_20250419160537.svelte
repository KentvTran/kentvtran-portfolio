<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	export let slice: Content.BiographySlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
		<h1>
			{slice.primary.heading}
		</h1>

		<div class="col-start-1">
			<PrismicRichText field={slice.primary.description} />
		</div>
	
		<PrismicImage field={slice.primary.avatar} class="avatar-iamage h-full w-full object-fill" imgixParams={{ fit: 'crop', w: 500, h: 500 }} />
	</div>
</section>
