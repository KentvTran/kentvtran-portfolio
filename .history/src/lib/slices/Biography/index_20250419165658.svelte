<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	export let slice: Content.BiographySlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
		<Heading size="xl" class="col-start-1">
			{slice.primary.heading}
		</Heading>

		<!-- Biography -->
		<div class="col-start-1 prose prose-invert">
			<PrismicRichText field={slice.primary.description} />
		</div>
	
		<PrismicImage field={slice.primary.avatar} class="avatar-iamage h-full w-full object-fill"
		 imgixParams={{ fit: 'crop', w: 500, h: 500 }} />
	</div>
</Bounded>
