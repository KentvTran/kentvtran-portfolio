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
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* Contain the 3D element to prevent it from overflowing */
		overflow: hidden;
		/* Add a subtle indicator that the element is interactive */
		cursor: pointer;
	}
</style>