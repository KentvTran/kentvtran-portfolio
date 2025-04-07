<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Elements from './Elements.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let mounted = false;
	let error = null;
	
	onMount(() => {
		try {
			mounted = true;
			console.log("Scene component mounted");
		} catch (e) {
			error = e;
			console.error("Error mounting Scene:", e);
		}
	});
</script>

<div class="w-full h-full aspect-square bg-gray-800 rounded-full relative">
	{#if error}
		<div class="absolute inset-0 flex items-center justify-center text-red-500">
			Error loading 3D element
		</div>
	{:else if browser && mounted}
		<div class="w-full h-full">
			<Canvas 
				shadows
				dpr={[1, 2]}
			>
				<Elements />
			</Canvas>
		</div>
	{:else}
		<!-- Placeholder for SSR -->
		<div class="absolute inset-0 flex items-center justify-center text-white">
			Loading 3D element...
		</div>
	{/if}
</div>