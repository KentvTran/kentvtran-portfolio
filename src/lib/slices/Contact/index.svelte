<script lang="ts">
	import { type Content, isFilled } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import Bounded from '$lib/components/Bounded.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';

	export let slice: Content.ContactSlice;
	
	let name = '';
	let email = '';
	let message = '';
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let errorMessage = '';
	
	// Form handling function with proper type annotation
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		
		if (isSubmitting) return;
		
		isSubmitting = true;
		submitStatus = 'idle';
		
		try {
			const formData = new FormData();
			formData.append('name', name);
			formData.append('email', email);
			formData.append('message', message);
			
			const response = await fetch('/api/contact', {
				method: 'POST',
				body: formData
			});
			
			const result = await response.json();
			
			if (result.success) {
				submitStatus = 'success';
				// Reset form
				name = '';
				email = '';
				message = '';
			} else {
				submitStatus = 'error';
				errorMessage = result.error || 'Failed to send message. Please try again.';
			}
		} catch (error) {
			submitStatus = 'error';
			errorMessage = 'An unexpected error occurred. Please try again.';
			console.error('Form submission error:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<h1 class="text-4xl font-bold mb-6">contact me.</h1>

	{#if submitStatus === 'success'}
		<div class="p-4 bg-green-50 border border-green-500 text-green-700 rounded mb-6">
			<p>Thank you for your message! I'll get back to you soon.</p>
		</div>
	{:else}
		<form on:submit={handleSubmit}>
			<div class="flex flex-col sm:flex-row gap-4 mb-4">
				<input 
					type="text" 
					placeholder="Name" 
					class="p-3 border border-gray-700 rounded bg-transparent w-full"
					required
					bind:value={name}
				/>
				
				<input 
					type="email" 
					placeholder="Email" 
					class="p-3 border border-gray-700 rounded bg-transparent w-full"
					required
					bind:value={email}
				/>
			</div>
			
			<div class="mb-4">
				<textarea 
					placeholder="Feedback on the site? Opportunities? Movie/Shows/Books recommendations? General Questions? Reach Out!"  
					class="p-3 border border-gray-700 rounded bg-transparent w-full h-32"
					required
					bind:value={message}
				></textarea>
			</div>
			
			{#if submitStatus === 'error'}
				<div class="p-3 bg-red-50 border border-red-500 text-red-700 rounded mb-4">
					<p>{errorMessage}</p>
				</div>
			{/if}
			
			<button 
				type="submit" 
				class="w-full p-3 bg-white text-black rounded flex justify-center items-center"
				disabled={isSubmitting}
			>
				{#if isSubmitting}
					Sending...
				{:else}
					Send Message 
					<span class="ml-2">→</span>
				{/if}
			</button>
		</form>
	{/if}

	<!-- Socials -->
	<div class="socials mt-8">
		<SocialLinks 
			githubLink={slice.primary.github_link}
			linkedinLink={slice.primary.linkedin_link}
		/>
	</div>
</Bounded>