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
		gsap.fromTo('.avatar',
			{
				opacity: 0,
				y: 100,
				skewX: 10
			},
			{
				opacity: 1,
				y: 0,
				skewX: 0,
				duration: 1.2,
				ease: 'power4.out'
			}
		);

		window.onmousemove = (e) => {
			if (!component) return;
			const rect = component.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			
			const angleX = (e.clientY - centerY) / 30;
			const angleY = (e.clientX - centerX) / 30;
			const translateZ = Math.abs(e.clientX - centerX) / 20;

			gsap.to('.avatar', {
				rotationX: gsap.utils.clamp(-5, 5, angleX),
				rotationY: gsap.utils.clamp(-5, 5, angleY),
				translateZ: translateZ,
				duration: 1.5,
				ease: 'power2.out'
			});

			gsap.to('.geometric-overlay', {
				x: (e.clientX - centerX) / 15,
				y: (e.clientY - centerY) / 15,
				rotation: (e.clientX - centerX) / 20,
				duration: 1.2,
				ease: 'power2.out'
			});
		};
	});
</script>

<div class={clsx('relative h-full w-full', className)} bind:this={component}>
	<div class="avatar aspect-square overflow-hidden rounded-none border-2 border-slate-700 opacity-0 shadow-xl">
		<PrismicImage
			field={image}
			class="avatar-image h-full w-full object-cover"
			imgixParams={{ q: 90 }}
		/>
		<div class="geometric-overlay absolute inset-0 mix-blend-overlay">
			<div class="absolute h-full w-[2px] bg-white/30" style="left: 33.33%"></div>
			<div class="absolute h-full w-[2px] bg-white/30" style="left: 66.66%"></div>
			<div class="absolute w-full h-[2px] bg-white/30" style="top: 33.33%"></div>
			<div class="absolute w-full h-[2px] bg-white/30" style="top: 66.66%"></div>
		</div>
	</div>
</div>

<style>
	.avatar {
		transform-style: preserve-3d;
		transition: transform 0.4s ease-out;
	}
	.geometric-overlay {
		transform-origin: center center;
		background: linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 50%, transparent 52%);
	}
	.avatar-image {
		transform: translateZ(20px);
	}
</style>