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

	onMount(() => {
		gsap.fromTo(
			'.avatar',
			{
				opacity: 0,
				scale: 1.4
			},
			{
				scale: 1,
				opacity: 1,
				duration: 1.3,
				ease: 'power3.inOut'
			}
		);

		window.onmousemove = (e) => {
			if (!component) return;
			const componentRect = component.getBoundingClientRect();
			const componentCenterX = componentRect.left + componentRect.width / 2;
			
			// Calculate mouse position relative to component center
			const mouseX = e.clientX - componentCenterX;
			const maxTilt = 15; // Maximum tilt angle in degrees

			// Calculate tilt based on mouse position relative to center
			const tilt = (mouseX / componentRect.width) * maxTilt * 2;
			
			// Apply smooth constraints
			const constrainedTilt = gsap.utils.clamp(-maxTilt, maxTilt, tilt);
			const rotation = constrainedTilt * 0.7; // Reduce direct mapping for smoother movement

			// Add perspective translation for depth
			const translateX = (mouseX / componentRect.width) * 10;
			
			gsap.timeline({
				defaults: { duration: 0.8, overwrite: 'auto', ease: 'power2.out' }
			})
			.to('.avatar', {
				rotation: rotation,
				x: translateX,
				transformPerspective: 1000, // Add 3D perspective
			}, 0)
			.to('.highlight', {
				opacity: Math.abs(rotation/maxTilt) * 0.4,
				x: translateX * 3,
				filter: `brightness(${1 + (Math.abs(rotation/maxTilt) * 0.3})
			}, 0);
		};
	});
</script>

<style>
	.avatar {
		transform-style: preserve-3d;
		perspective: 1000px;
		transition: transform 0.4s cubic-bezier(0.17, 0.67, 0.35, 0.91);
	}

	.avatar-image {
		transform: translateZ(30px); /* Add depth to image */
	}

	.highlight {
		mix-blend-mode: soft-light;
		transform: translateZ(40px); /* Separate highlight layer */
	}
</style>