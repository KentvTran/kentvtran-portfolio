<script lang="ts">
	import { onMount } from 'svelte';
	import { type ImageField } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import clsx from 'clsx';
	import gsap from 'gsap';

	export let image: ImageField;
	let className: string = '';
	export { className as class };

	let component: HTMLElement;
	let isDragging = false;
	let startX = 0;
	let rotation = 0;
	let velocity = 0;
	let lastX = 0;
	let lastTime = 0;
	
	const sensitivity = 0.3; // Reduced sensitivity
	const friction = 0.88; // Slightly longer spin decay
	const maxSpin = 20; // Reduced maximum rotation speed

	onMount(() => {
		gsap.fromTo('.avatar', 
			{ opacity: 0, scale: 1.4 },
			{ scale: 1, opacity: 1, duration: 1.3, ease: 'power3.inOut' }
		);

		const handleMouseDown = (e: MouseEvent) => {
			isDragging = true;
			startX = e.clientX;
			lastX = e.clientX;
			lastTime = Date.now();
			component.style.cursor = 'grabbing';
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;
			
			const deltaX = e.clientX - lastX;
			const now = Date.now();
			const dt = now - lastTime;
			
			// Modified velocity calculation with direction correction
			velocity = (deltaX / dt) * 80 * sensitivity; // Reduced multiplier
			velocity = gsap.utils.clamp(-maxSpin, maxSpin, velocity);
			
			rotation += velocity; // Now matches mouse direction
			
			updateRotation();
			
			lastX = e.clientX;
			lastTime = now;
		};

		// Keep other functions (handleMouseUp, handleTouch*, startInertia) the same...

		const updateRotation = () => {
			gsap.timeline({ defaults: { overwrite: 'auto' }})
				.to('.avatar', {
					rotation: rotation,
					ease: 'power2.out',
					duration: 0.1
				})
				.to('.highlight', {
					x: rotation * 0.2, // Reduced highlight movement
					opacity: gsap.utils.clamp(0, 0.25, Math.abs(velocity/60)), // Reduced opacity
					duration: 0.2
				}, 0);
		};

		// Keep event listeners and cleanup the same...
	});
</script>

<div 
	class={clsx('relative h-full w-full', className)} 
	bind:this={component}
	style="cursor: grab; user-select: none;"
>
	<div class="avatar aspect-square overflow-hidden rounded-full border-2 border-slate-700 opacity-0 shadow-xl">
		<PrismicImage
			field={image}
			class="avatar-image h-full w-full object-fill pointer-events-none"
			imgixParams={{ q: 90 }}
		/>
		<div
			class="highlight absolute inset-0 w-full scale-105 bg-gradient-to-tr from-transparent via-white/70 to-transparent opacity-0 pointer-events-none"
		></div>
	</div>
</div>

<style>
	.avatar {
		transform-style: preserve-3d;
		transition: transform 0.1s linear;
	}
	.avatar-image {
		transform: translateZ(20px);
	}
	.highlight {
		mix-blend-mode: soft-light;
		transform: translateZ(30px);
	}
</style>