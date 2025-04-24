<script lang="ts">
	// ... keep script section the same until the timeline ...
	
	gsap.timeline({
		defaults: { duration: 0.5, overwrite: 'auto', ease: 'power3.out' }
	}).to(
		'.avatar',
		{
			rotation: gsap.utils.clamp(-10, 10, 15 * componentPercent.x)
		},
		0
	).to(
		'.highlight',
		{
			opacity: (distFromCenterX - 0.8) * 0.5, // Reduced opacity calculation
			x: -5 + 10 * componentPercent.x, // Reduced movement range
		},
		0
	);
</script>

<div class={clsx('relative h-full w-full', className)} bind:this={component}>
	<div class="avatar aspect-square overflow-hidden rounded-full border-2 border-slate-700 opacity-0 shadow-xl">
		<PrismicImage
			field={image}
			class="avatar-image h-full w-full object-fill"
			imgixParams={{ q: 90 }}
		/>
		<div
			class="highlight absolute inset-0 w-full scale-105 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 pointer-events-none"
		></div>
	</div>
</div>

<style>
	.avatar {
		perspective: 500px;
		perspective-origin: 150% 150%;
	}
	.highlight {
		mix-blend-mode: soft-light; /* Softer blending */
	}
</style>