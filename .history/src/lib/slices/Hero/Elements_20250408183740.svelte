<script lang="ts">
    import { T as Threlte } from '@threlte/core';
    import * as Three from 'three';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';

    // Animation springs
    const scale = spring(1, { stiffness: 0.3, damping: 0.5 });
    const rotation = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.6 });
    const spinProgress = spring(0, { stiffness: 0.2, damping: 0.4 });
    
    // Textures
    const texturePaths = [
        '/aespa-black.png',
        '/aespa-white.png',
        // Add more...
    ];
    const textures: Three.Texture[] = [];
    let currentTexture: Three.Texture;
    let nextTexture: Three.Texture;
    
    // Animation state
    let isAnimating = false;
    
    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    async function yoYoSpinTransition() {
        if (isAnimating || textures.length < 2) return;
        isAnimating = true;
        
        // Set next texture
        const available = textures.filter(t => t !== currentTexture);
        nextTexture = available[Math.floor(Math.random() * available.length)];
        
        // Yo-yo spin animation
        // Phase 1: Spin up (0-0.5)
        for (let p = 0; p <= 0.5; p += 0.05) {
            spinProgress.set(p);
            scale.set(1 + p * 0.3); // Slight scale up
            await new Promise(r => setTimeout(r, 20));
        }
        
        // Swap textures at peak
        currentTexture = nextTexture;
        
        // Phase 2: Spin down (0.5-1)
        for (let p = 0.5; p <= 1; p += 0.05) {
            spinProgress.set(p);
            scale.set(1 + (1 - p) * 0.3); // Scale back down
            await new Promise(r => setTimeout(r, 20));
        }
        
        // Reset
        spinProgress.set(0);
        scale.set(1);
        isAnimating = false;
        
        // Schedule next transition
        setTimeout(yoYoSpinTransition, 3000 + Math.random() * 4000);
    }

    function handleMouseMove(event: MouseEvent) {
        if (isAnimating) return;
        
        const container = document.querySelector('.canvas-container');
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        mouseX = (event.clientX - centerX) / (rect.width / 2);
        mouseY = (event.clientY - centerY) / (rect.height / 2);
        
        const maxTilt = 0.1;
        const tiltX = Math.max(-maxTilt, Math.min(maxTilt, mouseY * 0.2));
        const tiltY = Math.max(-maxTilt, Math.min(maxTilt, -mouseX * 0.2));
        
        rotation.set({
            x: tiltX,
            y: tiltY
        });
    }

    onMount(() => {
        const loader = new Three.TextureLoader();
        texturePaths.forEach(path => textures.push(loader.load(path)));
        if (textures.length) currentTexture = textures[0];
        
        window.addEventListener('mousemove', handleMouseMove);
        setTimeout(yoYoSpinTransition, 3000);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    });
</script>

<Threlte.PerspectiveCamera
    makeDefault
    position={[0, 0, 6]}
    fov={40}
    near={0.1}
    far={1000}
/>

<Threlte.DirectionalLight position={[3, 10, 10]} intensity={1.5} castShadow />
<Threlte.AmbientLight intensity={0.5} />

<!-- Shadow plane (unchanged) -->
<Threlte.Mesh 
    position={[0, -1.5, 0]} 
    rotation={[-Math.PI / 2, 0, 0]} 
    receiveShadow
>
    <Threlte.PlaneGeometry args={[10, 10]} />
    <Threlte.ShadowMaterial opacity={0.02} />
</Threlte.Mesh>

<!-- Image with yo-yo spin effect -->
<Threlte.Group 
    position={[0, 0, 0]}
    rotation={[$rotation.x, $rotation.y, 0]}
    scale={[$scale, $scale, $scale]}
>
    <!-- Main image (visible when not spinning) -->
    <Threlte.Mesh castShadow visible={$spinProgress < 0.1 || $spinProgress > 0.9}>
        <Threlte.CircleGeometry args={[1, 64]} />
        <Threlte.MeshStandardMaterial 
            map={currentTexture} 
            transparent={true}
        />
    </Threlte.Mesh>
    
    <!-- Spinning version (visible during spin) -->
    <Threlte.Mesh castShadow visible={$spinProgress >= 0.1 && $spinProgress <= 0.9}>
        <Threlte.CircleGeometry args={[1, 64]} />
        <Threlte.MeshStandardMaterial 
            map={$spinProgress < 0.5 ? currentTexture : nextTexture}
            transparent={true}
            opacity={1 - Math.abs($spinProgress - 0.5) * 2} 
        />
    </Threlte.Mesh>
</Threlte.Group>