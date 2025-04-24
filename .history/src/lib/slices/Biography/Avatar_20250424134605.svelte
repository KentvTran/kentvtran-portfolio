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
	
	const sensitivity = 0.4; // Reduced sensitivity
	const friction = 0.92; // Longer spin decay
	const returnDuration = 1.5; // Duration for return animation

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
			
			const now = Date.now();
			const dt = now - lastTime;
			const deltaX = e.clientX - lastX;

			// Calculate velocity and rotation
			velocity = (deltaX / dt) * 80 * sensitivity;
			rotation += velocity;
			
			updateRotation();
			
			lastX = e.clientX;
			lastTime = now;
		};

		const handleMouseUp = () => {
			isDragging = false;
			component.style.cursor = 'grab';
			returnToCenter();
		};

		const returnToCenter = () => {
			// Calculate remaining rotation to nearest 360
			const currentRotation = rotation % 360;
			let targetRotation = 360 - currentRotation;
			
			// Always spin at least 180 degrees in the movement direction
			if (Math.abs(targetRotation) > 180) {
				targetRotation = targetRotation - (360 * Math.sign(targetRotation));
			}

			// Add full rotation in the direction of movement
			targetRotation += 360 * Math.sign(velocity);

			gsap.to('.avatar', {
				rotation: `+=${targetRotation}`,
				duration: returnDuration,
				ease: 'expo.out',
				onComplete: () => {
					// Reset to center position
					gsap.to('.avatar', {
						rotation: 0,
						duration: 0.5,
						ease: 'elastic.out(1, 0.3)'
					});
					rotation = 0;
				}
			});
		};

		// Keep touch handlers and other logic the same...

		const updateRotation = () => {
			gsap.set('.avatar', { rotation: rotation });
			gsap.to('.highlight', {
				x: rotation * 0.2,
				opacity: gsap.utils.clamp(0, 0.25, Math.abs(velocity/60)),
				duration: 0.2
			});
		};

		// Add event listeners
		component.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
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
		will-change: transform;
	}
	.avatar-image {
		transform: translateZ(20px);
	}
	.highlight {
		mix-blend-mode: soft-light;
		transform: translateZ(30px);
	}
</style>