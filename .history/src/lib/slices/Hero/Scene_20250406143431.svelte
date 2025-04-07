<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Elements from './Elements.svelte';
</script>

<div class="w-full h-full aspect-square">
	<Canvas 
		shadows
		dpr={[1, 2]} 
		linear
	>
		<Elements />
	</Canvas>
</div>