<!-- will update later so cards have descriptions  -->
<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import Cards from './Cards.svelte';
	
	export let slice: Content.InterestsSlice;
	
	// Extract interests from the slice data with safe fallbacks
	let interestsList: string[] = [];
	
	// Process the interests from the slice data
	$: {
		interestsList = [];
		if (slice?.primary?.list_of_interests && slice.primary.list_of_interests.length > 0) {
			const interestItem = slice.primary.list_of_interests[0];
			if (interestItem) {
				// Only add interests that exist
				if (interestItem.interest_1) interestsList.push(interestItem.interest_1);
				if (interestItem.interest_2) interestsList.push(interestItem.interest_2);
				if (interestItem.interest_3) interestsList.push(interestItem.interest_3);
				if (interestItem.interest_4) interestsList.push(interestItem.interest_4);
				if (interestItem.interest_5) interestsList.push(interestItem.interest_5);
				if (interestItem.interest_6) interestsList.push(interestItem.interest_6);
			}
		}
	}
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
		<Heading size="lg" class="col-start-1 title-headline">
			{slice?.primary?.heading || 'Interests'}
		</Heading>

		<!-- Cards Component -->
		<div class="col-span-full md:col-span-2 mt-8">
			<Cards interests={interestsList} />
		</div>
	</div>
</Bounded>