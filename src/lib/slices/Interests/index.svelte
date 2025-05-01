<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	export let slice: Content.InterestsSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
		<Heading size="lg" class="col-start-1 title-headline" >
			{slice.primary.heading}
		</Heading>

		<!-- Biography -->
		<div class="col-start-1 prose prose-xl">
			{#each slice.primary.list_of_interests as item}
			{item.interest_1}
			{item.interest_2}
			{item.interest_3}
			{item.interest_4}
			{item.interest_5}
			{item.interest_6}
			{/each}

		</div>
	</div>
</Bounded>


<!-- <PrismicRichText field={slice.primary.interests_text} /> -->