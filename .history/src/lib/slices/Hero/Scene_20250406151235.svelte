<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	
	let mounted = false;
	
	// Create a spring for rotation animation
	const rotation = spring(0, {
		stiffness: 0.1,
		damping: 0.25
	});
	
	let isSpinning = false;
	let spinTimeout;
	
	function handleClick() {
		console.log("Element clicked, starting spin animation");
		
		// Clear any existing timeout
		if (spinTimeout) clearTimeout(spinTimeout);
		
		// Start spinning
		isSpinning = true;
		
		// Rotate 360 degrees
		rotation.update(value => value + 360);
		
		// Stop spinning after animation completes
		spinTimeout = setTimeout(() => {
			isSpinning = false;
		}, 1500);
	}
	
	onMount(() => {
		mounted = true;
		console.log("Scene component mounted");
	});
</script>

<div class="w-full h-full aspect-square flex items-center justify-center">
	<svg 
		viewBox="0 0 200 200" 
		class="w-full h-full cursor-pointer"
		on:click={handleClick}
		style="transform: rotate({$rotation}deg); transition: transform 0.5s ease-out;"
	>
		<!-- Dark background circle -->
		<circle cx="100" cy="100" r="95" fill="#1a2a2f" />
		
		<!-- Outer circle -->
		<circle cx="100" cy="100" r="90" fill="none" stroke="white" stroke-width="2" />
		
		<!-- Flower pattern -->
		<!-- Petals -->
		<path d="M100,10 C60,60 40,60 10,100 C40,140 60,140 100,190 C140,140 160,140 190,100 C160,60 140,60 100,10" 
			fill="none" stroke="white" stroke-width="2" />
		
		<!-- Inner loops -->
		<path d="M70,70 C90,90 110,90 130,70 C110,50 90,50 70,70" 
			fill="none" stroke="white" stroke-width="2" />
		<path d="M70,130 C90,110 110,110 130,130 C110,150 90,150 70,130" 
			fill="none" stroke="white" stroke-width="2" />
		
		<!-- Connecting lines -->
		<path d="M10,100 C40,80 60,120 100,100" 
			fill="none" stroke="white" stroke-width="2" />
		<path d="M100,100 C140,120 160,80 190,100" 
			fill="none" stroke="white" stroke-width="2" />
		<path d="M100,10 C80,40 120,60 100,100" 
			fill="none" stroke="white" stroke-width="2" />
		<path d="M100,100 C80,140 120,160 100,190" 
			fill="none" stroke="white" stroke-width="2" />
		
		<!-- Glow effect using duplicate paths with lower opacity and wider stroke -->
		<circle cx="100" cy="100" r="90" fill="none" stroke="white" stroke-width="4" stroke-opacity="0.3" />
		<path d="M100,10 C60,60 40,60 10,100 C40,140 60,140 100,190 C140,140 160,140 190,100 C160,60 140,60 100,10" 
			fill="none" stroke="white" stroke-width="4" stroke-opacity="0.3" />
		<path d="M70,70 C90,90 110,90 130,70 C110,50 90,50 70,70" 
			fill="none" stroke="white" stroke-width="4" stroke-opacity="0.3" />
		<path d="M70,130 C90,110 110,110 130,130 C110,150 90,150 70,130" 
			fill="none" stroke="white" stroke-width="4" stroke-opacity="0.3" />
		<path d="M10,100 C40,80 60,120 100,100" 
			fill="none" stroke="white" stroke-width="4" stroke-opacity="0.3" />
		<path d="M100,100 C140,120 160,80 190,100" 
			fill="none" stroke="white" stroke-width="4" stroke-opacity="0.3" />
		<path d="M100,10 C80,40 120,60 100,100" 
			fill="none" stroke="white" stroke-width="4" stroke-opacity="0.3" />
		<path d="M100,100 C80,140 120,160 100,190" 
			fill="none" stroke="white" stroke-width="4" stroke-opacity="0.3" />
		
		<!-- Small dots at key points -->
		<circle cx="10" cy="100" r="3" fill="white" />
		<circle cx="190" cy="100" r="3" fill="white" />
		<circle cx="100" cy="10" r="3" fill="white" />
		<circle cx="100" cy="190" r="3" fill="white" />
		<circle cx="70" cy="70" r="3" fill="white" />
		<circle cx="130" cy="70" r="3" fill="white" />
		<circle cx="70" cy="130" r="3" fill="white" />
		<circle cx="130" cy="130" r="3" fill="white" />
	</svg>
</div>