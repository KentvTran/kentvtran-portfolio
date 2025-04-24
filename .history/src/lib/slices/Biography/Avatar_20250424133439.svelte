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
	
	const sensitivity = 0.5; // Adjust rotation speed (0.1-1)
	const friction = 0.85; // Spin decay (0-1)
	const maxSpin = 25; // Maximum rotation per frame

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
			
			// Calculate velocity
			velocity = (deltaX / dt) * 100 * sensitivity;
			velocity = gsap.utils.clamp(-maxSpin, maxSpin, velocity);
			
			rotation += velocity;
			
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
			handleMouseMove(e.touches[0]);
		};

		const startInertia = () => {
			const animate = () => {
				if (!isDragging && Math.abs(velocity) > 0.1) {
					velocity *= friction;
					rotation += velocity;
					updateRotation();
					requestAnimationFrame(animate);
				}
			};
			requestAnimationFrame(animate);
		};

		const updateRotation = () => {
			gsap.timeline({ defaults: { overwrite: 'auto' }})
				.to('.avatar', {
					rotation: rotation,
					ease: 'power2.out',
					duration: 0.1
				})
				.to('.highlight', {
					x: rotation * 0.3,
					opacity: gsap.utils.clamp(0, 0.3, Math.abs(velocity/50)),
					duration: 0.2
				}, 0);
		};

		// Event listeners
		component.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
		component.addEventListener('touchstart', handleTouchStart);
		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchend', handleMouseUp);

		return () => {
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
			class="highlight absolute inset-0 w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 pointer-events-none"
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