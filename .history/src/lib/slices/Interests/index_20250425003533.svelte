<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { PrismicRichText } from '@prismicio/svelte';
	export let slice: Content.InterestsSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
  <div class="grid gap-x-8 gap-y-6 md:grid-cols-[1fr,2fr]">
    <!-- wrap everything in col-start-2 -->
    <div class="col-start-2 space-y-6">
      <Heading size="lg" class="title-headline">
        {slice.primary.heading}
      </Heading>
      <div class="prose prose-xl">
        <PrismicRichText field={slice.primary.interests_text} />
      </div>
    </div>
  </div>
</Bounded>
