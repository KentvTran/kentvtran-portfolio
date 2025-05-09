<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import Card from './Card.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	
	export let slice: Content.ProjectsSlice;
	
	// Helper function to extract labels from tech stack
	function getTechLabels(techStack: any): string[] {
		if (!techStack || !Array.isArray(techStack) || techStack.length === 0) {
			return [];
		}
		
		try {
			// Process all elements in the tech stack array
			const techText = techStack.map(item => {
				if (typeof item.text === 'string') {
					return item.text;
				}
				
				// Try to extract from children if needed
				if (item.children && Array.isArray(item.children)) {
					return item.children
						.map((child: any) => typeof child.text === 'string' ? child.text : '')
						.filter(Boolean)
						.join(' ');
				}
				
				return '';
			}).filter(Boolean).join('');
			
			return techText ? techText.split(',').map((tech: string) => tech.trim()).filter(Boolean) : [];
		} catch (e) {
			console.error('Error extracting tech labels:', e);
			return [];
		}
	}
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="mb-8">
		{#if slice.primary.header}
			<h2 class="text-2xl font-bold mb-6">{slice.primary.header}</h2>
		{/if}
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each slice.primary.projects as project, index}
			<div class="project-card">
				<Card 
					title={project.name || ''}
					description={project.description}
					labels={getTechLabels(project.tech_stack)}
					imageField={project.project_picture}
					githubLink={project.github_button}
					gitButtonLabel={project.git_button_label || "Test"}
					class="h-full"
				/> 
			</div>
		{/each}
	</div>
</Bounded>

<style>
	.project-card {
		height: 100%;
	}
</style>
