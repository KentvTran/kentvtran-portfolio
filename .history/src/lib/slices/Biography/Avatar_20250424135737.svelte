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

			const componentPercent = {
				x: (e.clientX - componentCenterX) / componentRect.width / 2
			};

			const distFromCenterX = 1 - Math.abs(componentPercent.x);

			gsap.timeline({
				defaults: { duration: 0.5, overwrite: 'auto', ease: 'power3.out' }
			})
			.to('.avatar', {
				rotation: gsap.utils.clamp(-10, 10, 15 * componentPercent.x)
			}, 0)
			.to('.highlight', {
				opacity: (distFromCenterX - 0.85) * 0.4,  // Increased opacity multiplier
				x: -4 + 8 * componentPercent.x,            // Slightly more movement
			}, 0);
		};
	});
</script>

<div class={clsx('relative h-full w-full', className)} bind:this={component}>
	<div class="avatar aspect-square overflow-hidden rounded-full border-2 border-slate-700 opacity-0 shadow-xl">
		<PrismicImage
			field={image}
			class="avatar-image h-full w-full object-fill"
			imgixParams={{ q: 90 }}
		/>
		<div
			class="highlight absolute inset-0 w-full scale-103 bg-gradient-to-t from-transparent via-white/25 to-transparent opacity-0 pointer-events-none backdrop-blur-[0.3px]"
		></div>
	</div>
</div>

<style>
	.avatar {
		perspective: 500px;
		perspective-origin: 150% 150%;
	}
	.highlight {
		mix-blend-mode: soft-light;  /* Changed back to soft-light for better visibility */
	}
</style>