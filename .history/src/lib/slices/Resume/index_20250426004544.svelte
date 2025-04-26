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
  		{item.title}
		{item.company}
  		{item.time_period}
  	<PrismicRichText field={item.description} />
{/each}

	<!--Education-->
	{slice.primary.education_header}

	{#each slice.primary.degree as item}
	{item.degree_title}
	{item.edu_time_period}
	{item.edu_description}
{/each}

<!--Education-->

</Bounded>

