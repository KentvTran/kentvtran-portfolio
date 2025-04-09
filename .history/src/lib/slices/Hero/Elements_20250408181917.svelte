<script lang="ts">
    import * as Three from 'three';
    import { onMount, onDestroy } from 'svelte';
    import { spring } from 'svelte/motion';
    
    // Import Threlte components
    import {
        PerspectiveCamera,
        DirectionalLight,
        AmbientLight,
        Mesh,
        Group,
        PlaneGeometry,
        ShadowMaterial,
        CircleGeometry,
        MeshStandardMaterial
    } from '@threlte/core';

    // Create springs for smooth animation
    const rotation = spring({ x: 0, y: 0 }, {
        stiffness: 0.1, 
        damping: 0.6
    });
    
    // Image URLs to cycle through
    const imageUrls = [
        '/aespa-black.png',
        '/aespa-white.png',
        // Add more images as needed
        '/image3.png',
        '/image4.png'
    ];
    
    // Current image index
    let currentImageIndex = 0;
    let isAnimating = false;
    
    // Textures
    let currentTexture: Three.Texture;
    let nextTexture: Three.Texture;
    let textureLoader: Three.TextureLoader;
    
    // Animation control
    let animationInterval: NodeJS.Timeout;
    const changeInterval = 3000; // Change image every 3 seconds
    
    // Mouse tracking for hover effect
    let mouseX = 0;
    let mouseY = 0;
    
    // Function to change to next image with animation
    function changeImage() {
        if (isAnimating) return;
        
        isAnimating = true;
        const nextIndex = (currentImageIndex + 1) % imageUrls.length;
        
        // Load next texture
        nextTexture = textureLoader.load(imageUrls[nextIndex]);
        
        // Animate a half rotation (180 degrees)
        let startTime = Date.now();
        let duration = 1000; // 1 second for half rotation
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Animate to 90 degrees (halfway point)
            if (progress < 0.5) {
                const rotationAmount = progress * Math.PI;
                rotation.set({ 
                    x: $rotation.x,
                    y: rotationAmount
                });
                requestAnimationFrame(animate);
            } 
            // Switch texture at halfway point
            else if (progress < 0.51 && progress >= 0.5) {
                currentTexture = nextTexture;
                currentImageIndex = nextIndex;
                requestAnimationFrame(animate);
            }
            // Complete rotation to 180 degrees
            else {
                const rotationAmount = progress * Math.PI;
                rotation.set({ 
                    x: $rotation.x,
                    y: rotationAmount
                });
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Reset rotation to 0 (but keep the new texture)
                    rotation.set({ 
                        x: $rotation.x,
                        y: 0
                    });
                    isAnimating = false;
                }
            }
        };
        
        animate();
    }

    // Handle mouse movement for hover effect
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
        textureLoader = new Three.TextureLoader();
        currentTexture = textureLoader.load(imageUrls[0]);
        
        // Start automatic image cycling
        animationInterval = setInterval(changeImage, changeInterval);
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            clearInterval(animationInterval);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    });
</script>

<PerspectiveCamera
    makeDefault
    position={[0, 0, 6]}
    fov={40}
    near={0.1}
    far={1000}
/>

<DirectionalLight position={[3, 10, 10]} intensity={1.5} castShadow />
<AmbientLight intensity={0.5} />

<!-- Shadow plane -->
<Mesh 
    position={[0, -1.5, 0]} 
    rotation={[-Math.PI / 2, 0, 0]} 
    receiveShadow
>
    <PlaneGeometry args={[10, 10]} />
    <ShadowMaterial opacity={0.02} />
</Mesh>

<!-- Rotating image display -->
<Group 
    position={[0, 0, 0]}
    rotation={[$rotation.x, $rotation.y, 0]}
    scale={[1.5, 1.5, 1.5]}
>
    <Mesh castShadow>
        <CircleGeometry args={[1, 64]} />
        <MeshStandardMaterial 
            map={currentTexture} 
            transparent={true}
        />
    </Mesh>
</Group>