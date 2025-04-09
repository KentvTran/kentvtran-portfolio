<script lang="ts">
    import { T as Threlte } from '@threlte/core';
    import * as Three from 'three';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';

    // Animation controls
    const spinRotation = spring(0, { stiffness: 0.3, damping: 0.5 });
    const tiltRotation = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.6 });
    const scale = spring(1, { stiffness: 0.3, damping: 0.5 });
    
    // Textures
    const texturePaths = [
        '/aespa-black.png',
        '/aespa-white.png',
    ];
    const textures: Three.Texture[] = [];
    let currentTexture: Three.Texture;
    let nextTexture: Three.Texture;
    
    // Drag tracking
    let isDragging = false;
    let dragStartX = 0;
    let dragStartTime = 0;
    let lastDragX = 0;
    let velocity = 0;
    let isAnimating = false;

    function startDrag(event: MouseEvent) {
        isDragging = true;
        dragStartX = event.clientX;
        lastDragX = event.clientX;
        dragStartTime = Date.now();
        event.preventDefault();
    }

    function trackDrag(event: MouseEvent) {
        if (!isDragging) return;
        
        const currentX = event.clientX;
        const deltaX = currentX - lastDragX;
        lastDragX = currentX;
        
        // Apply temporary rotation during drag
        spinRotation.set($spinRotation + deltaX * 0.01);
    }

    function endDrag(event: MouseEvent) {
        if (!isDragging) return;
        isDragging = false;
        
        // Calculate throw velocity
        const dragDuration = Date.now() - dragStartTime;
        const totalDragX = event.clientX - dragStartX;
        velocity = totalDragX / Math.max(dragDuration, 50); // Prevent division by zero
        
        // Only trigger spin if velocity exceeds threshold
        if (Math.abs(velocity) > 0.5) {
            spinYoYoTransition(Math.abs(velocity));
        } else {
            // Return to original position if throw was too weak
            spinRotation.set(0);
        }
    }

    async function spinYoYoTransition(speedMultiplier = 1) {
        if (isAnimating || textures.length < 2) return;
        isAnimating = true;
        
        // Set next texture
        const available = textures.filter(t => t !== currentTexture);
        nextTexture = available[Math.floor(Math.random() * available.length)];
        
        // Adjust duration based on throw velocity
        const baseDuration = 800;
        const adjustedDuration = baseDuration / Math.min(Math.max(speedMultiplier, 0.5), 3);
        const spinUpDuration = adjustedDuration * 0.2;
        const spinDownDuration = adjustedDuration * 0.8;
        const peakScale = 1.2;
        
        // Spin up (current position to π)
        const startRotation = $spinRotation % (Math.PI * 2);
        const startTime = Date.now();
        
        while (Date.now() - startTime < spinUpDuration) {
            const progress = (Date.now() - startTime) / spinUpDuration;
            const rotationProgress = startRotation + (Math.PI - startRotation) * progress;
            spinRotation.set(rotationProgress);
            scale.set(1 + (peakScale - 1) * progress);
            await new Promise(r => requestAnimationFrame(r));
        }
        
        // Swap textures at peak rotation
        currentTexture = nextTexture;
        
        // Spin down (π to 2π)
        const downStart = Date.now();
        while (Date.now() - downStart < spinDownDuration) {
            const progress = (Date.now() - downStart) / spinDownDuration;
            spinRotation.set(Math.PI + progress * Math.PI);
            scale.set(peakScale - (peakScale - 1) * progress);
            await new Promise(r => requestAnimationFrame(r));
        }
        
        // Reset
        spinRotation.set(0);
        scale.set(1);
        isAnimating = false;
    }

    function handleMouseMove(event: MouseEvent) {
        if (isAnimating || isDragging) return;
        
        const container = document.querySelector('.canvas-container');
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = (event.clientX - centerX) / (rect.width / 2);
        const mouseY = (event.clientY - centerY) / (rect.height / 2);
        
        const maxTilt = 0.1;
        const tiltX = Math.max(-maxTilt, Math.min(maxTilt, mouseY * 0.2));
        const tiltY = Math.max(-maxTilt, Math.min(maxTilt, -mouseX * 0.2));
        
        tiltRotation.set({ x: tiltX, y: tiltY });
    }

    onMount(() => {
        const loader = new Three.TextureLoader();
        texturePaths.forEach(path => textures.push(loader.load(path)));
        if (textures.length) currentTexture = textures[0];
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    });
</script>

<Threlte.PerspectiveCamera
    makeDefault
    position={[0, 0, 4]}
    fov={40}
    near={0.1}
    far={1000}
/>

<Threlte.DirectionalLight position={[3, 10, 10]} intensity={1.5} castShadow />
<Threlte.AmbientLight intensity={0.5} />

<!-- Shadow plane -->
<Threlte.Mesh 
    position={[0, -1.5, 0]} 
    rotation={[-Math.PI / 2, 0, 0]} 
    receiveShadow
>
    <Threlte.PlaneGeometry args={[10, 10]} />
    <Threlte.ShadowMaterial opacity={0.02} />
</Threlte.Mesh>

<!-- Interactive image with throw-to-spin -->
<Threlte.Group 
    position={[0, 0, 0]}
    rotation={[$tiltRotation.x, $tiltRotation.y, $spinRotation]}
    scale={[$scale, $scale, $scale]}
    on:mousedown={startDrag}
    on:mousemove={trackDrag}
    on:mouseup={endDrag}
    on:mouseleave={endDrag}
    interactive
>
    <Threlte.Mesh castShadow>
        <Threlte.CircleGeometry args={[1, 64]} />
        <Threlte.MeshStandardMaterial 
            map={currentTexture} 
            transparent={true}
            side={Three.DoubleSide}
        />
    </Threlte.Mesh>
</Threlte.Group>

<style>
    [data-threlte-group] {
        cursor: grab;
    }
    [data-threlte-group]:active {
        cursor: grabbing;
    }
</style>