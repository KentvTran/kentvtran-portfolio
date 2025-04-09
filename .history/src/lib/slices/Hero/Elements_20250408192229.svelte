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
        // '/aepsa-grain.png',
        // '/aespa-green.png',
        // '/aespa-pink.png',
        
    ];
    const textures: Three.Texture[] = [];
    let currentTexture: Three.Texture;
    let nextTexture: Three.Texture;
    
    // Animation state
    let isAnimating = false;

    async function spinYoYoTransition() {
        if (isAnimating || textures.length < 2) return;
        isAnimating = true;
        
        // Set next texture
        const available = textures.filter(t => t !== currentTexture);
        nextTexture = available[Math.floor(Math.random() * available.length)];
        
        // Animation parameters
        const spinUpDuration = 100; // ms
        const spinDownDuration = 500; // ms
        const peakScale = 1.2;
        
        // Spin up (0 to π)
        const startTime = Date.now();
        while (Date.now() - startTime < spinUpDuration) {
            const progress = (Date.now() - startTime) / spinUpDuration;
            spinRotation.set(progress * Math.PI);
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
        
        // Schedule next transition
        setTimeout(spinYoYoTransition, 3000 + Math.random() * 4000);
    }

    function handleMouseMove(event: MouseEvent) {
        if (isAnimating) return;
        
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
        setTimeout(spinYoYoTransition, 3000);
        
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

<!-- Light positioned to cast centered shadow -->
<Threlte.DirectionalLight 
    position={[0, 10, 10]}  <!-- Centered light position -->
    intensity={1.5} 
    castShadow
    shadow-mapSize-width={2048}
    shadow-mapSize-height={2048}
    shadow-camera-near={0.1}
    shadow-camera-far={20}
/>
<Threlte.AmbientLight intensity={0.5} />

<!-- Centered shadow plane -->
<Threlte.Mesh 
    position={[0, -1.499, 0]}  <!-- X=0 centers it, Y=-1.499 makes flush -->
    rotation={[-Math.PI / 2, 0, 0]} 
    receiveShadow
>
    <Threlte.PlaneGeometry args={[10, 10]} />
    <Threlte.ShadowMaterial opacity={0.02} />
</Threlte.Mesh>

<!-- Image with proper yo-yo spin -->
<Threlte.Group 
    position={[0, 0, 0]}
    rotation={[$tiltRotation.x, $tiltRotation.y, $spinRotation]}
    scale={[$scale, $scale, $scale]}
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