<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import Bounded from '$lib/components/Bounded.svelte';
	
	export let slice: Content.ExperienceSlice;
	
	// Tab state management
	let activeTab = 'experience';
	
	// Tab options
	const tabs = [
		{ id: 'experience', label: 'Experience' },
		{ id: 'education', label: 'Education' },
		{ id: 'skills', label: 'Skills' }
	];
	
	// Function to change active tab
	function setActiveTab(tabId: string): void {
		activeTab = tabId;
	}
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<!-- Tab Navigation -->
	<div>
		<div>
			{#each tabs as tab}
				<button 
					class={activeTab === tab.id ? 'active' : ''} 
					on:click={() => setActiveTab(tab.id)}
					aria-selected={activeTab === tab.id}
					role="tab"
				>
					{tab.label}
				</button>
			{/each}
		</div>
		
		<!-- Tab Content -->
		<div>
			<!-- Experience Tab -->
			{#if activeTab === 'experience'}
				<div role="tabpanel" aria-labelledby="experience-tab">
					{#each slice.primary.role as item}
						<div>
							<h3>{item.title}</h3>
							<div>{item.company}</div>
							<div>{item.time_period}</div>
							<PrismicRichText field={item.description} />
						</div>
					{/each}
				</div>
			{/if}
			
			<!-- Education Tab -->
			{#if activeTab === 'education'}
				<div role="tabpanel" aria-labelledby="education-tab">
					{#each slice.primary.degree as item}
						<div>
							<h3>{item.degree_title}</h3>
							<div>{item.institution}</div>
							<div>{item.edu_time_period}</div>
							<div>{item.edu_description}</div>
						</div>
					{/each}
				</div>
			{/if}
			
			<!-- Skills Tab -->
			{#if activeTab === 'skills'}
				<div role="tabpanel" aria-labelledby="skills-tab">
					<h2>{slice.primary.skills_header}</h2>
					<PrismicRichText field={slice.primary.json_skills} />
				</div>
			{/if}
		</div>
	</div>
</Bounded>