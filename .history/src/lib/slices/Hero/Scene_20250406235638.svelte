<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Elements from './Elements.svelte';
</script>

<div class="canvas-container">
	<Canvas shadows>
		<Elements />
	</Canvas>
	<div class="click-hint">Click to flip</div>
</div>

<style>
	.canvas-container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.click-hint {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.8rem;
		color: #433A3F;
		opacity: 0.7;
		pointer-events: none;
	}
</style>