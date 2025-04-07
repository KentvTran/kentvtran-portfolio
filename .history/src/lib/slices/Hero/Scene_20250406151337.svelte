<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Elements from './Elements.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let mounted = false;
	
	onMount(() => {
		mounted = true;
		console.log("Scene component mounted");
	});
</script>

<div class="w-full h-full aspect-square">
	{#if browser && mounted}
		<Canvas 
			shadows
			dpr={[1, 2]}
		>
			<Elements />
		</Canvas>
	{:else}
		<!-- Placeholder for SSR -->
		<div class="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
			<div class="text-white">Loading...</div>
		</div>
	{/if}
</div>
