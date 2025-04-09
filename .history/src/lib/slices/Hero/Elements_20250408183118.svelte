<script lang="ts">
    import { T as Threlte } from '@threlte/core';
    import * as Three from 'three';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';

    // Create springs for smooth animation
    const rotation = spring({ x: 0, y: 0 }, {
        stiffness: 0.1, 
        damping: 0.6
    });
    
    // Track current image and animation state
    let currentTexture: Three.Texture;
    let isAnimating = false;
    
    // Mouse tracking for hover effect
    let mouseX = 0;
    let mouseY = 0;
    
    // Available textures
    const texturePaths = [
        '/aespa-black.png',
        '/aespa-white.png',
        // Add more image paths here as needed
    ];
    const textures: Three.Texture[] = [];
    let textureLoader: Three.TextureLoader;
    
    // Function to transition to a random texture
    function transitionToRandomTexture() {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Animate a half rotation (180 degrees)
        let startTime = Date.now();
        let duration = 1000; // 1 second for half rotation
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Animate to 90% of half rotation before switching texture
            const rotationAmount = progress * Math.PI;
            
            rotation.set({ 
                x: $rotation.x,
                y: rotationAmount
            });
            
            if (progress < 0.9) {
                requestAnimationFrame(animate);
            } else {
                // Switch to random texture (excluding current one)
                const availableTextures = textures.filter(t => t !== currentTexture);
                if (availableTextures.length > 0) {
                    currentTexture = availableTextures[Math.floor(Math.random() * availableTextures.length)];
                }
                
                // Complete the animation
                rotation.set({ 
                    x: $rotation.x,
                    y: Math.PI
                });
                
                // Start return animation
                const returnStartTime = Date.now();
                const returnDuration = 1000;
                
                const returnAnimate = () => {
                    const returnElapsed = Date.now() - returnStartTime;
                    const returnProgress = Math.min(returnElapsed / returnDuration, 1);
                    
                    const returnRotation = Math.PI - (returnProgress * Math.PI);
                    
                    rotation.set({ 
                        x: $rotation.x,
                        y: returnRotation
                    });
                    
                    if (returnProgress < 1) {
                        requestAnimationFrame(returnAnimate);
                    } else {
                        isAnimating = false;
                        
                        // Schedule next random transition (between 3-8 seconds)
                        const nextDelay = 3000 + Math.random() * 5000;
                        setTimeout(transitionToRandomTexture, nextDelay);
                    }
                };
                
                returnAnimate();
            }
        };
        
        animate();
    }

    // Handle mouse movement for hover effect with limited angle
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
            y: $rotation.y + tiltY
        });
    }

    onMount(() => {
        textureLoader = new Three.TextureLoader();
        
        // Load all textures
        texturePaths.forEach(path => {
            const texture = textureLoader.load(path);
            textures.push(texture);
        });
        
        // Set initial texture
        if (textures.length > 0) {
            currentTexture = textures[0];
        }
        
        window.addEventListener('mousemove', handleMouseMove);
        
        // Start the automatic transitions
        const initialDelay = 3000; // Start first transition after 3 seconds
        setTimeout(transitionToRandomTexture, initialDelay);
        
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

<!-- Add a plane for shadow casting -->
<Threlte.Mesh 
    position={[0, -1.5, 0]} 
    rotation={[-Math.PI / 2, 0, 0]} 
    receiveShadow
>
    <Threlte.PlaneGeometry args={[10, 10]} />
    <Threlte.ShadowMaterial opacity={0.02} />
</Threlte.Mesh>

<!-- 3D Symbol with automatic transitions -->
<Threlte.Group 
    position={[0, 0, 0]}
    rotation={[$rotation.x, $rotation.y, 0]}
    scale={[1.5, 1.5, 1.5]}
>
    <Threlte.Mesh castShadow>
        <Threlte.CircleGeometry args={[1, 64]} />
        <Threlte.MeshStandardMaterial 
            map={currentTexture} 
            transparent={true}
        />
    </Threlte.Mesh>
</Threlte.Group>