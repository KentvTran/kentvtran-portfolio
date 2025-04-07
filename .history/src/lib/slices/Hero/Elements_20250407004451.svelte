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
    
    // Track if the symbol is flipped
    let isFlipped = false;
    let isSpinning = false;
    
    // Mouse tracking for hover effect
    let mouseX = 0;
    let mouseY = 0;
    
    // Function to toggle between symbols with spinning animation
    function toggleSymbol() {
        isFlipped = !isFlipped;
        
        // Start spinning animation
        isSpinning = true;
        
        // Complete one full rotation
        let startRotation = $rotation.y;
        let targetRotation = startRotation + Math.PI * 2;
        
        // Animate rotation
        const spinInterval = setInterval(() => {
            rotation.set({ 
                x: $rotation.x,
                y: $rotation.y + 0.1
            });
            
            if ($rotation.y >= targetRotation) {
                clearInterval(spinInterval);
                isSpinning = false;
                // Set final rotation to show correct side
                rotation.set({ 
                    x: $rotation.x,
                    y: isFlipped ? Math.PI : 0
                });
            }
        }, 16);
    }

    // Handle mouse movement for hover effect
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
        
        // Apply subtle tilt based on mouse position
        if (!isSpinning) {
            rotation.set({
                x: mouseY * 0.2,
                y: isFlipped ? Math.PI : 0 - mouseX * 0.2
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

<!-- Interactive 3D Symbol -->
<Threlte.Group 
    position={[0, 0, 0]}
    rotation={[$rotation.x, $rotation.y, 0]}
    on:click={toggleSymbol}
    interactive
>
    <!-- Front side (Black symbol) -->
    <Threlte.Mesh position={[0, 0, 0.01]} castShadow>
        <Threlte.CircleGeometry args={[1, 64]} />
        <Threlte.MeshStandardMaterial 
            map={textureBlack} 
            transparent={true}
        />
    </Threlte.Mesh>

    <!-- Back side (White symbol) -->
    <Threlte.Mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]} castShadow>
        <Threlte.CircleGeometry args={[1, 64]} />
        <Threlte.MeshStandardMaterial 
            map={textureWhite} 
            transparent={true}
        />
    </Threlte.Mesh>
</Threlte.Group>