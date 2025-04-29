<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	
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

	<Heading size="lg" class="col-start-1 title-headline" >
		{slice.primary.header}
	</Heading>

	<!-- Tab Navigation -->
	<div class="experience-container">
		<div class="tabs-container">
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
				<div role="tabpanel" aria-labelledby="experience-tab">
					{#each slice.primary.role as item}
						<div class="experience-item">
							<div class="experience-details">
								<div class="time-period">{item.time_period}</div>
								<h3 class="company-name">{item.company}</h3>
								<div class="job-title">{item.title}</div>
								<div class="description">
									<PrismicRichText field={item.description} />
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
			
			<!-- Education Tab -->
			{#if activeTab === 'education'}
				<div role="tabpanel" aria-labelledby="education-tab">
					{#each slice.primary.degree as item}
						<div class="experience-item">
							<div class="experience-details">
								<div class="time-period">{item.edu_time_period}</div>
								<h3 class="company-name">{item.institution}</h3>
								<div class="job-title">{item.degree_title}</div>
								<div class="description">{item.edu_description}</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
			
			<!-- Skills Tab -->
			{#if activeTab === 'skills'}
				<div role="tabpanel" aria-labelledby="skills-tab" class="skills-container">
					<PrismicRichText field={slice.primary.json_skills} />
				</div>
			{/if}
		</div>
	</div>
</Bounded>

<style>
	.experience-container {
		width: 100%; /* Full width of parent */
	}

	.tabs-container {
		display: flex;
		margin-bottom: 24px;
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid #e2e8f0;
		width: 100%; /* Full width */
	}

	.tab-button {
		flex: 1;
		padding: 12px 24px;
		border: none;
		background-color: transparent;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.tab-button.active {
		border-bottom: 2px solid currentColor;
	}

	.tab-content {
		padding: 16px;
		border-radius: 8px;
		width: 100%; /* Full width */
	}

	.experience-item {
		margin-bottom: 48px;
		position: relative;
	}

	.experience-details {
		padding-top: 4px;
	}

	.time-period {
		font-size: 14px;
		margin-bottom: 4px;
	}

	.company-name {
		font-size: 18px;
		font-weight: 600;
		margin: 0 0 4px 0;
	}

	.job-title {
		font-size: 16px;
		margin-bottom: 12px;
	}

	.description {
		margin-top: 12px;
	}

	.description :global(ul) {
		padding-left: 20px;
		margin-top: 8px;
	}

	.description :global(li) {
		margin-bottom: 8px;
	}

	.skills-container {
		padding: 16px;
	}
</style>