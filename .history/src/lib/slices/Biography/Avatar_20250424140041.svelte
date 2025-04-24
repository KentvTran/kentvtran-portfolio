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
				opacity: (distFromCenterX - 0.8) * 0.5,
				x: -5 + 10 * componentPercent.x,
			}, 0);
		};
	}); // Added missing closing
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
		mix-blend-mode: soft-light;
	}
</style>