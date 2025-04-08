<script lang="ts">
    import { T as Threlte } from '@threlte/core';
    import * as Three from 'three';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';

    // Create springs for smooth animation with adjusted parameters for better spinning
    const rotation = spring({ x: 0, y: 0, z: 0 }, {
        stiffness: 0.1, 
        damping: 0.6
    });
    
    // Track if the symbol is flipped
    let isFlipped = false;
    let isSpinning = false;
    
    // Mouse tracking for hover effect
    let mouseX = 0;
    let mouseY = 0;
    
    // Function to toggle between symbols with enhanced spinning animation
    function toggleSymbol() {
        if (isSpinning) return; // Prevent multiple clicks during animation
        
        isSpinning = true;
        
        // Animate a full rotation with more spins
        let startTime = Date.now();
        let duration = 1500; // 1.5 seconds for full animation
        const spins = 2; // Number of full rotations
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Calculate rotation based on progress (0 to 1) with easing
            // Using easeOutCubic for a more natural deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const rotationAmount = eased * Math.PI * 2 * spins;
            
            // Add some z-axis rotation for a more dynamic effect
            const zRotation = Math.sin(progress * Math.PI) * 0.5;
            
            rotation.set({ 
                x: $rotation.x,
                y: rotationAmount,
                z: zRotation
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete
                isFlipped = !isFlipped;
                isSpinning = false;
                
                // Set final rotation to show correct side
                rotation.set({ 
                    x: $rotation.x,
                    y: isFlipped ? Math.PI : 0,
                    z: 0
                });
            }
        };
        
        animate();
    }

    // Handle mouse movement for hover effect with limited angle
    function handleMouseMove(event) {
        if (isSpinning) return;
        
        // Get container dimensions
        const container = document.querySelector('.canvas-container');
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        
        // Calculate mouse position relative to container center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate normalized values (-1 to 1)
        mouseX = (event.clientX - centerX) / (rect.width / 2);
        mouseY = (event.clientY - centerY) / (rect.height / 2);
        
        // Apply subtle tilt based on mouse position with limits
        // Limit the tilt to a maximum of 0.1 radians (about 5.7 degrees)
        const maxTilt = 0.1;
        const tiltX = Math.max(-maxTilt, Math.min(maxTilt, mouseY * 0.2));
        const tiltY = Math.max(-maxTilt, Math.min(maxTilt, -mouseX * 0.2));
        
        if (!isSpinning) {
            rotation.set({
                x: tiltX,
                y: isFlipped ? Math.PI + tiltY : tiltY,
                z: 0
            });
        }
    }

    // Create textures for both symbols
    let textureBlack: Three.Texture;
    let textureWhite: Three.Texture;
    
    onMount(() => {
        const loader = new Three.TextureLoader();
        // Load images from your static folder
        textureBlack = loader.load('/aespa-black.png');
        textureWhite = loader.load('/aespa-white.png');
        
        // Add mouse move listener for the hover effect
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    });
    
    // Add cursor style to indicate interactivity
    let cursorStyle = "cursor-pointer";
</script>

<Threlte.PerspectiveCamera
    makeDefault
    position={[0, 0, 8]}
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
    <Threlte.ShadowMaterial opacity={0.2} />
</Threlte.Mesh>

<!-- Interactive 3D Symbol with enhanced size -->
<Threlte.Group 
    position={[0, 0, 0]}
    rotation={[$rotation.x, $rotation.y, $rotation.z]}
    on:click={toggleSymbol}
    interactive
    class={cursorStyle}
>
    <!-- Front side (Black symbol) - Increased size by 20% -->
    <Threlte.Mesh position={[0, 0, 0.01]} castShadow scale={1.2}>
        <Threlte.CircleGeometry args={[1, 64]} />
        <Threlte.MeshStandardMaterial 
            map={textureBlack} 
            transparent={true}
        />
    </Threlte.Mesh>

    <!-- Back side (White symbol) - Increased size by 20% -->
    <Threlte.Mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]} castShadow scale={1.2}>
        <Threlte.CircleGeometry args={[1, 64]} />
        <Threlte.MeshStandardMaterial 
            map={textureWhite} 
            transparent={true}
        />
    </Threlte.Mesh>
</Threlte.Group>

<style>
    .cursor-pointer {
        cursor: pointer;
    }
</style>