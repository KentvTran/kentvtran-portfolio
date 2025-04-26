<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { onMount } from 'svelte';

	// Define the type for slice items
	type ExperienceItem = Content.ExperienceSliceDefaultItem & {
		time_period: string;
		company: string;
		title: string;
		description: unknown;
		project_link: { url: string } | null;
		project_name: string;
	};

	export let slice: Content.ExperienceSlice;

	// Explicitly type the items array
	$: items = slice.items as ExperienceItem[];
	
	let activeTab = 'experience';
	
	function setActiveTab(tab: string) {
		activeTab = tab;
	}
	
	onMount(() => {
		activeTab = 'experience';
	});
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
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
					<h2>{slice.primary.heading}</h2>
				{/if}
				
				{#if slice.items && slice.items.length > 0}
					{#each slice.items as item, i}
						<div class="timeline-item">
							<div class="timeline-content">
								<div class="timeline-header">
									{#if item.time_period}
										<div class="time-period">{item.time_period}</div>
									{/if}
									
									{#if item.company}
										<h3>{item.company}</h3>
									{/if}
									
									{#if item.title}
										<div>{item.title}</div>
									{/if}
								</div>
								
								{#if item.description}
									<div>
										<PrismicRichText field={item.description} />
									</div>
								{/if}
								
								<!-- If you have project links or other CTAs -->
								{#if item.project_link && item.project_name}
									<a href={item.project_link} target="_blank" rel="noopener noreferrer">
										{item.project_name}
									</a>
								{/if}
							</div>
						</div>
					{/each}
				{/if}
			</div>
		{:else if activeTab === 'education'}
			<div>
				<!-- Placeholder for Education content -->
				<p>Education content will go here</p>
			</div>
		{:else if activeTab === 'skills'}
			<div>
				<!-- Placeholder for Skills content -->
				<p>Skills content will go here</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.tabs-container {
		display: flex;
		margin-bottom: 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}
	
	.tab-button {
		flex: 1;
		padding: 0.5rem 1rem;
		background: none;
		border: none;
		cursor: pointer;
	}
	
	.tab-button.active {
		background-color: #f0f0f0;
		font-weight: bold;
	}
	
	.tab-content {
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}
	
	.timeline-item {
		margin-bottom: 1.5rem;
	}
	
	.time-period {
		font-size: 0.9rem;
		margin-bottom: 0.25rem;
	}
</style>