<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import Card from './Card.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	
	export let slice: Content.ProjectsSlice;
	
	// Helper function to safely extract text from Prismic rich text
	function getTextFromRichText(field: any): string {
		if (!field || !Array.isArray(field) || field.length === 0) {
			return '';
		}
		
		try {
			if (field[0] && typeof field[0].text === 'string') {
				return field[0].text;
			}
			
			// Try to extract from spans or children if needed
			if (field[0] && field[0].spans && field[0].spans[0] && typeof field[0].spans[0].text === 'string') {
				return field[0].spans[0].text;
			}
			
			if (field[0] && field[0].children && field[0].children[0] && typeof field[0].children[0].text === 'string') {
				return field[0].children[0].text;
			}
		} catch (e) {
			console.error('Error extracting text from rich text field:', e);
		}
		
		return '';
	}
	
	// Helper function to extract labels from tech stack
	function getTechLabels(techStack: any): string[] {
		const techText = getTextFromRichText(techStack);
		return techText ? techText.split(',').map((tech: string) => tech.trim()).filter(Boolean) : [];
	}
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="mb-8">
		{#if slice.primary.header}
			<h2 class="text-2xl font-bold mb-6">{slice.primary.header}</h2>
		{/if}
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
		{#each slice.primary.projects as project, index}
			<div class="project-card">
				<Card 
					title={project.name || ''}
					subtitle={getTextFromRichText(project.description)}
					labels={getTechLabels(project.tech_stack)}
					imageField={project.project_picture}
					githubLink={project.github}
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
