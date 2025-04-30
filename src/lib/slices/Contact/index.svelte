<script lang="ts">
	import { type Content, isFilled } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import Bounded from '$lib/components/Bounded.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	// import IconGithub from '~icons/fa-brands/github';
	// import IconLinkedin from '~icons/fa-brands/linkedin';

	export let slice: Content.ContactSlice;
	
	// Form handling function with proper type annotation
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		// Form submission logic would go here
	}
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<h1 class="text-4xl font-bold mb-6">contact me.</h1>

	<form on:submit={handleSubmit}>
		<div class="flex flex-col sm:flex-row gap-4 mb-4">
			<input 
				type="text" 
				placeholder="Name" 
				class="p-3 border border-gray-700 rounded bg-transparent w-full"
				required
			/>
			
			<input 
				type="email" 
				placeholder="Email" 
				class="p-3 border border-gray-700 rounded bg-transparent w-full"
				required
			/>
		</div>
		
		<!-- "Feel free to provide feedback on website, reach out with any opportunities or even book/movie/show recommendations or any other questions!" -->
		<div class="mb-4">
			<textarea 
				placeholder="Feedback on the site? Opportunities? Movie/Shows/Books recommendations? General Questions? Reach Out!"  
				class="p-3 border border-gray-700 rounded bg-transparent w-full h-32"
				required
			></textarea>
		</div>
		
		<button 
			type="submit" 
			class="w-full p-3 bg-white text-black rounded flex justify-center items-center"
		>
			Send Message 
			<span class="ml-2">→</span>
		</button>
		
		<!-- placeholder for future privacy policy? -->
		<!-- <p class="mt-2 text-sm">By submitting this form, I agree to the privacy policy.</p> -->
	</form>

				<!-- Socials -->
				<div class="socials">
					<SocialLinks 
						githubLink={slice.primary.github_link}
						linkedinLink={slice.primary.linkedin_link}
					/>
				</div>

	<!-- <div class="socials inline-flex justify-center sm:justify-end mt-6">
		{#if isFilled.link(slice.primary.github_link)}
			<PrismicLink
				field={slice.primary.github_link}
				class="p-2 text-2xl transform transition-all duration-150 hover:scale-125"
				aria-label="GitHub"
			>
				<IconGithub />
			</PrismicLink>
		{/if}
		{#if isFilled.link(slice.primary.linkedin_link)}
			<PrismicLink
				field={slice.primary.linkedin_link}
				class="p-2 text-2xl transform transition-all duration-150 hover:scale-125"
				aria-label="LinkedIn"
			>
				<IconLinkedin />
			</PrismicLink>
		{/if}
	</div> -->
</Bounded>