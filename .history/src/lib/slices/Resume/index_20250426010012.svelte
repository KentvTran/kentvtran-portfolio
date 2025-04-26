<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import Bounded from '$lib/components/Bounded.svelte';
	export let slice: Content.ExperienceSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<!-- Tab Navigation -->
	<div class="tabs-container">
		<div class="tabs">
			{#each tabs as tab}
				<button 
					class="tab-button {activeTab === tab.id ? 'active' : ''}" 
					on:click={() => setActiveTab(tab.id)}
					aria-selected={activeTab === tab.id}
					role="tab"
				>
					{tab.label}
				</button>
			{/each}
		</div>
		
		<!-- Tab Content -->
		<div class="tab-content">
			<!-- Experience Tab -->
			{#if activeTab === 'experience'}
				<div class="tab-panel" role="tabpanel" aria-labelledby="experience-tab">
					<h2 class="tab-header">{slice.primary.experience_header}</h2>
					<div class="timeline">
						{#each slice.primary.role as item}
							<div class="timeline-item">
								<div class="timeline-header">
									<h3 class="title">{item.title}</h3>
									<div class="company">{item.company}</div>
									<div class="time-period">{item.time_period}</div>
								</div>
								<div class="description">
									<PrismicRichText field={item.description} />
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
			
			<!-- Education Tab -->
			{#if activeTab === 'education'}
				<div class="tab-panel" role="tabpanel" aria-labelledby="education-tab">
					<h2 class="tab-header">{slice.primary.education_header}</h2>
					<div class="timeline">
						{#each slice.primary.degree as item}
							<div class="timeline-item">
								<div class="timeline-header">
									<h3 class="title">{item.degree_title}</h3>
									<div class="institution">{item.institution}</div>
									<div class="time-period">{item.edu_time_period}</div>
								</div>
								<div class="description">
									{item.edu_description}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
			
			<!-- Skills Tab -->
			{#if activeTab === 'skills'}
				<div class="tab-panel" role="tabpanel" aria-labelledby="skills-tab">
					<h2 class="tab-header">{slice.primary.skills_header}</h2>
					<div class="skills-content">
						<PrismicRichText field={slice.primary.json_skills} />
					</div>
				</div>
			{/if}
		</div>
	</div>
</Bounded>

<style>
	.tabs-container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}
	
	.tabs {
		display: flex;
		border-bottom: 1px solid #e2e8f0;
		margin-bottom: 1.5rem;
		overflow-x: auto;
	}
	
	.tab-button {
		padding: 0.75rem 1.5rem;
		background: transparent;
		border: none;
		border-bottom: 2px solid transparent;
		font-weight: 500;
		color: #64748b;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.tab-button:hover {
		color: #1e293b;
	}
	
	.tab-button.active {
		color: #0f172a;
		border-bottom: 2px solid #0f172a;
	}
	
	.tab-content {
		padding: 1rem 0;
	}
	
	.tab-header {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
	}
	
	.timeline {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	
	.timeline-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	
	.timeline-header {
		margin-bottom: 0.5rem;
	}
	
	.title {
		font-weight: 600;
		font-size: 1.125rem;
		margin: 0;
	}
	
	.company, .institution {
		font-weight: 500;
		color: #64748b;
	}
	
	.time-period {
		font-size: 0.875rem;
		color: #94a3b8;
		margin-top: 0.25rem;
	}
	
	.description {
		color: #475569;
	}
	
	.skills-content {
		display: grid;
		gap: 1rem;
	}
	
	/* Responsive styles */
	@media (max-width: 640px) {
		.tabs {
			flex-wrap: wrap;
		}
		
		.tab-button {
			padding: 0.5rem 1rem;
			flex-grow: 1;
			text-align: center;
		}
	}
</style>