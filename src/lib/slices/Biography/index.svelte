<script lang="ts">
	import { type Content, isFilled } from '@prismicio/client';
	import { PrismicLink, PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import Button from '$lib/components/Button.svelte';

	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import Avatar from './Avatar.svelte';

	// import IconGithub from '~icons/fa-brands/github';
	// import IconLinkedin from '~icons/fa-brands/linkedin';
	export let slice: Content.BiographySlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">

		<!-- <h1 class="text-7xl font-bold mb-6">{slice.primary.heading}</h1> -->
		
		<Heading size="lg" class="col-start-1 title-headline" >
			{slice.primary.heading}
		</Heading>

		<!-- Biography -->
		<div class="col-start-1 prose prose-xl">
			<PrismicRichText field={slice.primary.description} />
		</div>
	
		<!-- Buttons -->
		<div class="flex items-center gap-4">
			<!-- Resume -->
			<Button linkField={slice.primary.button_link} label={slice.primary.button_label} />

			<!-- Socials -->
			<div class="socials">
				<SocialLinks 
					githubLink={slice.primary.github_link}
					linkedinLink={slice.primary.linkedin_link}
				/>
			</div>
</div>

		<!-- Avatar -->
		<Avatar image={slice.primary.avatar} class="row-start-1 max-w-sm md:col-start-2 md:row-end-3" />
	</div>
</Bounded>