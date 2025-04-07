<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Elements from './Elements.svelte';
</script>

<div class="canvas-container">
	<Canvas shadows>
		<Elements />
	</Canvas>
</div>

<style>
	.canvas-container {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
</style>