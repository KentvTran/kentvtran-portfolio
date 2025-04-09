<script lang="ts">
    import { T as Threlte } from '@threlte/core';
    import * as Three from 'three';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';

    // Animation springs
    const imageRotation = spring(0, { stiffness: 0.3, damping: 0.5 });
    const bounceHeight = spring(0, { stiffness: 0.4, damping: 0.3 });
    const tilt = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.6 });
    
    // Textures
    const texturePaths = [
        '/aespa-black.png',
        '/aespa-white.png',
        // Add more...
    ];
    const textures: Three.Texture[] = [];
    let currentTexture: Three.Texture;
    
    // Animation state
    let isAnimating = false;
    
    // Mouse tracking for hover effect
    let mouseX = 0;
    let mouseY = 0;

    async function yoYoTransition() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Upward motion with spin
        bounceHeight.set(0.5);
        imageRotation.set(Math.PI * 4); // Spin twice
        
        await new Promise(r => setTimeout(r, 400));
        
        // Change texture at peak
        const available = textures.filter(t => t !== currentTexture);
        if (available.length) currentTexture = available[Math.floor(Math.random() * available.length)];
        
        // Downward motion with reverse spin
        bounceHeight.set(0);
        imageRotation.set(0);
        
        await new Promise(r => setTimeout(r, 600));
        
        isAnimating = false;
        
        // Schedule next transition
        setTimeout(yoYoTransition, 3000 + Math.random() * 4000);
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
        tilt.set({
            x: Math.max(-maxTilt, Math.min(maxTilt, mouseY * 0.2)),
            y: Math.max(-maxTilt, Math.min(maxTilt, -mouseX * 0.2))
        });
    }

    onMount(() => {
        const loader = new Three.TextureLoader();
        texturePaths.forEach(path => textures.push(loader.load(path)));
        if (textures.length) currentTexture = textures[0];
        
        window.addEventListener('mousemove', handleMouseMove);
        setTimeout(yoYoTransition, 3000);
        
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

<!-- Shadow plane (stays static) -->
<Threlte.Mesh 
    position={[0, -1.5, 0]} 
    rotation={[-Math.PI / 2, 0, 0]} 
    receiveShadow
>
    <Threlte.PlaneGeometry args={[10, 10]} />
    <Threlte.ShadowMaterial opacity={0.02} />
</Threlte.Mesh>

<!-- Main container with tilt -->
<Threlte.Group 
    position={[0, 0, 0]}
    rotation={[$tilt.x, $tilt.y, 0]}
    scale={[1.5, 1.5, 1.5]}
>
    <!-- Image with yo-yo animation -->
    <Threlte.Group position={[0, $bounceHeight, 0]}>
        <Threlte.Mesh castShadow rotation-z={$imageRotation}>
            <Threlte.CircleGeometry args={[1, 64]} />
            <Threlte.MeshStandardMaterial 
                map={currentTexture} 
                transparent={true}
            />
        </Threlte.Mesh>
    </Threlte.Group>
    
    <!-- Invisible shadow caster (doesn't rotate) -->
    <Threlte.Mesh visible={false} position={[0, 0, 0]}>
        <Threlte.CircleGeometry args={[1, 64]} />
    </Threlte.Mesh>
</Threlte.Group>