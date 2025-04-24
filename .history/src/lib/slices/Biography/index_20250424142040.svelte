<script lang="ts">
	import { onMount } from 'svelte';
	import type { Content } from '@prismicio/client';
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import gsap from 'gsap';

	export let slice: Content.BiographySlice;

	onMount(() => {
		// Entrance animation
		gsap.fromTo('.cd',
			{ opacity: 0, scale: 1.4 },
			{ 
				opacity: 1,
				scale: 1,
				duration: 1.3,
				ease: 'power3.inOut'
			}
		);

		// Continuous rotation
		gsap.to('.cd', {
			rotation: 360,
			duration: 8,
			repeat: -1,
			ease: 'none',
			transformOrigin: 'center'
		});
	});
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
		<Heading size="lg" class="col-start-1 title-headline">
			{slice.primary.heading}
		</Heading>

		<!-- Biography -->
		<div class="col-start-1 prose prose-xl">
			<PrismicRichText field={slice.primary.description} />
		</div>

		<!-- CD Player Container -->
		<div class="cd-player-container row-start-1 max-w-sm md:col-start-2 md:row-end-3">
			<div class="cd-player">
				<div class="cd">
					<PrismicImage
						field={slice.primary.avatar}
						class="cd-image"
						imgixParams={{ q: 90 }}
					/>
					<div class="cd-hole" />
					<div class="cd-reflect" />
				</div>
				<div class="cd-player-controls">
					<div class="cd-player-led" />
					<div class="cd-player-slot" />
				</div>
			</div>
		</div>
	</div>
</Bounded>

<style>
	.cd-player-container {
		position: relative;
		max-width: 300px;
		margin: 0 auto;
	}

	.cd-player {
		background: #2a2a2a;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 10px 30px rgba(0,0,0,0.3);
		position: relative;
	}

	.cd {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
		border-radius: 50%;
		overflow: hidden;
		background: #111;
	}

	.cd-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: relative;
		z-index: 1;
	}

	.cd-hole {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 12%;
		height: 12%;
		background: linear-gradient(45deg, #909090, #e0e0e0);
		border-radius: 50%;
		z-index: 2;
		box-shadow: 0 0 8px rgba(0,0,0,0.3);
	}

	.cd-reflect {
		position: absolute;
		top: -10%;
		right: -10%;
		width: 60%;
		height: 60%;
		background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.15));
		border-radius: 50%;
		z-index: 2;
		pointer-events: none;
	}

	.cd-player-controls {
		position: relative;
		margin-top: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.cd-player-led {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #00ff00;
		box-shadow: 0 0 8px #00ff0080;
	}

	.cd-player-slot {
		height: 4px;
		flex-grow: 1;
		background: linear-gradient(to right, #3a3a3a, #4a4a4a);
		border-radius: 2px;
	}

	@media (max-width: 768px) {
		.cd-player {
			padding: 1rem;
		}
	}
</style>