<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import Bounded from '$lib/components/Bounded.svelte';
	export let slice: Content.ExperienceSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	
	{slice.primary.heading}

	{#each slice.primary.role as item}
  <!-- Render content for item -->
  {item.title}
  {item.time_period}
  <PrismicRichText field={item.description} />

{/each}
</Bounded>

