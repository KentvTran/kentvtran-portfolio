<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { onMount } from 'svelte';

	export let slice: Content.ExperienceSlice;
	
	// Tab state management
	let activeTab = 'experience';
	
	// Function to change active tab
	function setActiveTab(tab: string) {
		activeTab = tab;
	}
	
	// Ensure experience tab is active by default
	onMount(() => {
		activeTab = 'experience';
	});
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="experience-section">
	<!-- Tab navigation -->
	<div class="tabs-container">
		<button 
			class="tab-button {activeTab === 'experience' ? 'active' : ''}" 
			on:click={() => setActiveTab('experience')}
		>
			Work
		</button>
		<button 
			class="tab-button {activeTab === 'education' ? 'active' : ''}" 
			on:click={() => setActiveTab('education')}
		>
			Education
		</button>
		<button 
			class="tab-button {activeTab === 'skills' ? 'active' : ''}" 
			on:click={() => setActiveTab('skills')}
		>
			Skills
		</button>
	</div>
	
	<!-- Tab content -->
	<div class="tab-content">
		<!-- Experience Tab -->
		{#if activeTab === 'experience'}
			<div class="timeline">
				{#if slice.primary && slice.primary.heading}
					<h2 class="section-heading">{slice.primary.heading}</h2>
				{/if}
				
				{#if slice.items && slice.items.length > 0}
					{#each slice.items as item, i}
						<div class="timeline-item">
							<div class="timeline-icon">
								<!-- Placeholder for company logo -->
								<div class="company-logo">
									<!-- If you have logo field in Prismic, you can add it here -->
								</div>
							</div>
							
							<div class="timeline-content">
								<div class="timeline-header">
									{#if item.time_period}
										<div class="time-period">{item.time_period}</div>
									{/if}
									
									{#if item.company}
										<h3 class="company-name">{item.company}</h3>
									{/if}
									
									{#if item.title}
										<div class="job-title">{item.title}</div>
									{/if}
								</div>
								
								{#if item.description}
									<div class="job-description">
										<PrismicRichText field={item.description} />
									</div>
								{/if}
								
								<!-- If you have project links or other CTAs -->
								{#if item.project_link && item.project_name}
									<a href={item.project_link} class="project-link" target="_blank" rel="noopener noreferrer">
										{item.project_name}
									</a>
								{/if}
							</div>
						</div>
					{/each}
				{/if}
			</div>
		{:else if activeTab === 'education'}
			<div class="timeline">
				<!-- Placeholder for Education content -->
				<p>Education content will go here</p>
			</div>
		{:else if activeTab === 'skills'}
			<div class="skills-container">
				<!-- Placeholder for Skills content -->
				<p>Skills content will go here</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.experience-section {
		padding: 2rem 0;
		max-width: 800px;
		margin: 0 auto;
	}
	
	.tabs-container {
		display: flex;
		margin-bottom: 1.5rem;
		border-radius: 8px;
		overflow: hidden;
		background-color: #1a1f2e;
	}
	
	.tab-button {
		flex: 1;
		padding: 0.75rem 1rem;
		background-color: #1a1f2e;
		color: #8892b0;
		border: none;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.3s ease;
	}
	
	.tab-button.active {
		background-color: #2d3748;
		color: #e2e8f0;
	}
	
	.tab-content {
		background-color: #111827;
		border-radius: 8px;
		padding: 1.5rem;
		min-height: 300px;
	}
	
	.timeline {
		position: relative;
	}
	
	.timeline::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 30px;
		width: 2px;
		background-color: #2d3748;
	}
	
	.timeline-item {
		display: flex;
		margin-bottom: 2rem;
		position: relative;
	}
	
	.timeline-icon {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: #1a1f2e;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		border: 2px solid #2d3748;
		overflow: hidden;
	}
	
	.company-logo {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #e2e8f0;
		font-weight: bold;
	}
	
	.timeline-content {
		flex: 1;
		padding-left: 1.5rem;
		color: #e2e8f0;
	}
	
	.timeline-header {
		margin-bottom: 0.75rem;
	}
	
	.time-period {
		font-size: 0.875rem;
		color: #8892b0;
		margin-bottom: 0.25rem;
	}
	
	.company-name {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 0.25rem 0;
	}
	
	.job-title {
		font-size: 1rem;
		color: #a0aec0;
		margin-bottom: 0.5rem;
	}
	
	.job-description {
		margin-bottom: 1rem;
	}
	
	.job-description :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
	}
	
	.job-description :global(li) {
		margin-bottom: 0.5rem;
		line-height: 1.5;
	}
	
	.project-link {
		display: inline-flex;
		align-items: center;
		padding: 0.375rem 0.75rem;
		background-color: #2d3748;
		color: #e2e8f0;
		border-radius: 4px;
		font-size: 0.875rem;
		text-decoration: none;
		transition: background-color 0.2s ease;
	}
	
	.project-link:hover {
		background-color: #4a5568;
	}
	
	.section-heading {
		margin-bottom: 1.5rem;
		font-size: 1.5rem;
		font-weight: 600;
		color: #e2e8f0;
	}
</style>