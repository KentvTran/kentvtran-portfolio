<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import Bounded from '$lib/components/Bounded.svelte';
	export let slice: Content.ExperienceSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	
	<!-- Experience -->
	{slice.primary.experience_header}

	{#each slice.primary.role as item}
  	<!-- Render content for item -->
  		{item.title}
		{item.company}
  		{item.time_period}
  	<PrismicRichText field={item.description} />
{/each}
</Bounded>

