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
		{ opacity: 0, scale: 1.4 },
		{ scale: 1, opacity: 1, duration: 1.3, ease: 'power3.inOut' }
	  );
	  gsap.fromTo('.cd-case',
		{ opacity: 0, scale: 1.2 },
		{ scale: 1, opacity: 1, duration: 1.5, ease: 'power3.inOut' }
	  );
  
	  window.onmousemove = (e) => {
		if (!component) return;
		const rect = component.getBoundingClientRect();
		const pctX = (e.clientX - (rect.left + rect.width/2)) / (rect.width/2);
		const dist = 1 - Math.abs(pctX);
  
		gsap.timeline({ defaults: { duration: 0.5, overwrite: 'auto', ease: 'power3.out' } })
		  .to('.avatar',    { rotation: gsap.utils.clamp(-10,10,15*pctX) }, 0)
		  .to('.highlight', { opacity: (dist-0.7)*0.7, x: -8+16*pctX }, 0)
		  .to('.case-reflection', { opacity: (dist-0.5)*0.5, x: -5+10*pctX }, 0);
	  };
	});
  </script>
  
  <div class={clsx('relative h-full w-full', className)} bind:this={component}>
	<!-- CD Case Container with explicit sizing -->
	<div class="cd-case w-64 md:w-80 lg:w-96 relative aspect-square opacity-0 shadow-xl">
	  <div class="absolute inset-0 border-2 border-slate-800 bg-slate-100/10 backdrop-blur-[2px]">
		<!-- corner notches -->
		<div class="absolute top-2 left-2 h-3 w-3 border-r border-b border-slate-800"></div>
		<div class="absolute top-2 right-2 h-3 w-3 border-l border-b border-slate-800"></div>
		<div class="absolute bottom-2 left-2 h-3 w-3 border-r border-t border-slate-800"></div>
		<div class="absolute bottom-2 right-2 h-3 w-3 border-l border-t border-slate-800"></div>
		<!-- spine -->
		<div class="absolute left-0 top-0 bottom-0 w-[10px] bg-slate-200/20 border-r border-slate-800"></div>
		<!-- static reflection -->
		<div class="case-reflection absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 pointer-events-none"></div>
	  </div>
  
	  <!-- Avatar inside CD case fills more of it -->
	  <div class="avatar absolute inset-[10%] overflow-hidden rounded-full border-2 border-slate-700 opacity-0 shadow-inner">
		<PrismicImage
		  field={image}
		  class="h-full w-full object-cover"
		  imgixParams={{ q: 90 }}
		/>
		<div class="highlight absolute inset-0 w-full scale-110 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 pointer-events-none backdrop-blur-[1px]"></div>
	  </div>
	</div>
  </div>
  
  <style>
	.avatar { perspective: 500px; perspective-origin: 150% 150%; }
	.highlight { mix-blend-mode: overlay; }
  
	/* Static perspective on the case */
	.cd-case { perspective: 800px; perspective-origin: 50% 50%; }
	.case-reflection { mix-blend-mode: overlay; }
  </style>
  