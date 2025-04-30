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
	<div class="grid gap-x-8 gap-y-6">
		<Heading size="md" class="text-[#3D5A6C] font-bold mb-5">
			{slice.primary.header}
		</Heading>

		<!-- Tab Navigation -->
		<div class="w-full">
			<div class="flex border border-slate-200 rounded-lg overflow-hidden mb-5">
				{#each tabs as tab}
					<button 
						class="flex-1 py-2.5 px-5 text-base md:text-lg font-medium transition-all duration-300 text-[#433A3F] hover:text-[#3D5A6C] {activeTab === tab.id ? 'border-b-2 border-[#3D5A6C] text-[#3D5A6C] font-semibold' : ''}" 
						on:click={() => setActiveTab(tab.id)}
						aria-selected={activeTab === tab.id}
						role="tab"
					>
						{tab.label}
					</button>
				{/each}
			</div>
			
			<!-- Tab Content -->
			<div class="py-3 w-full">
				<!-- Experience Tab -->
				{#if activeTab === 'experience'}
					<div role="tabpanel" aria-labelledby="experience-tab" class="prose prose-sm md:prose-base max-w-none">
						{#each slice.primary.role as item}
							<div class="mb-9">
								<div class="pt-1">
									<div class="text-sm md:text-base text-[#433A3F] mb-1">{item.time_period}</div>
									<h3 class="text-xl md:text-2xl font-semibold text-[#3D5A6C] mb-1">{item.company}</h3>
									<div class="text-lg md:text-xl text-[#433A3F] mb-2.5">{item.title}</div>
									<div class="mt-2.5">
										<PrismicRichText field={item.description} />
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
				
				<!-- Education Tab -->
				{#if activeTab === 'education'}
					<div role="tabpanel" aria-labelledby="education-tab" class="prose prose-sm md:prose-base max-w-none">
						{#each slice.primary.degree as item}
							<div class="mb-9">
								<div class="pt-1">
									<div class="text-sm md:text-base text-[#433A3F] mb-1">{item.edu_time_period}</div>
									<h3 class="text-xl md:text-2xl font-semibold text-[#3D5A6C] mb-1">{item.institution}</h3>
									<div class="text-lg md:text-xl text-[#433A3F] mb-2.5">{item.degree_title}</div>
									<div class="mt-2.5 prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:mb-2">
										{item.edu_description}
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
				
				<!-- Skills Tab -->
				{#if activeTab === 'skills'}
					<div 
						role="tabpanel" 
						aria-labelledby="skills-tab" 
						class="prose prose-sm md:prose-base max-w-none"
					>
						<div class="whitespace-pre-wrap font-mono text-xs md:text-sm p-4 rounded-md">
							<PrismicRichText field={slice.primary.json_skills} />
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</Bounded>

<style>
	/* Override prose styles for specific elements */
	:global(.prose h3) {
		margin-top: 0;
		margin-bottom: 0.25rem;
	}
	
	:global(.prose ul) {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		padding-left: 1.25rem;
	}
	
	:global(.prose li) {
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
	}
	
	:global(.prose p) {
		margin-top: 0.5rem;
		margin-bottom: 0.75rem;
	}
	
	:global(.prose-sm p) {
		font-size: 0.875rem;
		line-height: 1.5;
	}
	
	:global(.prose-base p) {
		font-size: 1rem;
		line-height: 1.6;
	}
	
	@media (min-width: 768px) {
		:global(.prose-base p) {
			font-size: 1.125rem;
		}
	}
</style>