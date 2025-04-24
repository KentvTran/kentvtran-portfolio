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
	
	// Adjusted parameters for better movement
	const sensitivity = 0.5;
	const friction = 0.92;
	const maxSpin = 30;

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

			// Calculate rotation based on direct mouse movement
			const moveDelta = e.clientX - startX;
			rotation = moveDelta * sensitivity;
			
			// Calculate velocity for inertia
			velocity = (deltaX / dt) * 100 * sensitivity;
			velocity = gsap.utils.clamp(-maxSpin, maxSpin, velocity);
			
			updateRotation();
			
			lastX = e.clientX;
			lastTime = now;
		};

		const handleMouseUp = () => {
			isDragging = false;
			component.style.cursor = 'grab';
			startInertia();
		};

		const handleTouchStart = (e: TouchEvent) => {
			isDragging = true;
			startX = e.touches[0].clientX;
			lastX = e.touches[0].clientX;
			lastTime = Date.now();
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (!isDragging) return;
			const touch = e.touches[0];
			handleMouseMove(touch as unknown as MouseEvent);
		};

		const startInertia = () => {
			const animate = () => {
				if (!isDragging && Math.abs(velocity) > 0.1) {
					rotation += velocity;
					velocity *= friction;
					updateRotation();
					requestAnimationFrame(animate);
				}
			};
			requestAnimationFrame(animate);
		};

		const updateRotation = () => {
			gsap.to('.avatar', {
				rotation: rotation,
				duration: 0.1,
				ease: 'none'
			});
			
			gsap.to('.highlight', {
				x: rotation * 0.2,
				opacity: gsap.utils.clamp(0, 0.3, Math.abs(velocity/50)),
				duration: 0.2
			});
		};

		// Add event listeners
		component.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
		component.addEventListener('touchstart', handleTouchStart);
		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchend', handleMouseUp);

		return () => {
			// Cleanup
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', handleMouseUp);
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