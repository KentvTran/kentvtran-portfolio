<script lang="ts">
    import { T as Threlte } from '@threlte/core';
    import * as Three from 'three';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';

    // Animation springs
    const wheelRotation = spring(0, { stiffness: 0.2, damping: 0.5 });
    const tilt = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.6 });
    
    // Textures and state
    const texturePaths = ['/aespa-black.png', '/aespa-white.png'];
    const textures: Three.Texture[] = [];
    let currentTexture: Three.Texture;
    let nextTexture: Three.Texture;
    let isAnimating = false;
    
    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    async function ferrisWheelTransition() {
        if (isAnimating || textures.length < 2) return;
        isAnimating = true;
        
        // Set next texture
        nextTexture = textures.find(t => t !== currentTexture) || textures[0];
        
        // Full rotation animation (2π radians)
        const duration = 2000; // 2 seconds for full rotation
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const rotation = progress * Math.PI * 2; // 0 to 2π
            
            wheelRotation.set(rotation);
            
            if (progress < 0.5) {
                // First half of rotation - show current texture
                requestAnimationFrame(animate);
            } else if (progress < 1) {
                // Second half - switch texture at π (180 degrees)
                if (progress > 0.5 && currentTexture !== nextTexture) {
                    currentTexture = nextTexture;
                }
                requestAnimationFrame(animate);
            } else {
                // Animation complete
                wheelRotation.set(0);
                isAnimating = false;
                
                // Schedule next transition
                setTimeout(ferrisWheelTransition, 3000 + Math.random() * 5000);
            }
        };
        
        animate();
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
        
        tilt.set({ x: tiltX, y: tiltY });
    }

    onMount(() => {
        const loader = new Three.TextureLoader();
        texturePaths.forEach(path => textures.push(loader.load(path)));
        if (textures.length) currentTexture = textures[0];
        
        window.addEventListener('mousemove', handleMouseMove);
        setTimeout(ferrisWheelTransition, 3000);
        
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

<!-- Ferris wheel container -->
<Threlte.Group 
    position={[0, 0, 0]}
    rotation={[$tilt.x, $tilt.y, 0]}
    scale={[1.5, 1.5, 1.5]}
>
    <!-- Image that rotates vertically -->
    <Threlte.Group rotation={[$wheelRotation, 0, 0]}>
        <Threlte.Mesh castShadow>
            <Threlte.CircleGeometry args={[1, 64]} />
            <Threlte.MeshStandardMaterial 
                map={currentTexture} 
                transparent={true}
                side={Three.DoubleSide}
            />
        </Threlte.Mesh>
    </Threlte.Group>
</Threlte.Group>