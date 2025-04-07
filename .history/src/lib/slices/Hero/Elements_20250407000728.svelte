<script lang="ts">
    import { T as Threlte } from '@threlte/core';
    import * as Three from 'three';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';

    // Create a spring for smooth rotation
    const rotation = spring({ y: 0 }, {
        stiffness: 0.1,
        damping: 0.6
    });

    // Track if the symbol is flipped
    let isFlipped = false;

    // Function to toggle between symbols
    function toggleSymbol() {
        isFlipped = !isFlipped;
        rotation.set({ y: isFlipped ? Math.PI : 0 });
    }

    // Create textures for both symbols
    let textureBlack: Three.Texture;
    let textureWhite: Three.Texture;
    
    onMount(() => {
        const loader = new Three.TextureLoader();
        // Load images from your static folder
        textureBlack = loader.load('/aespa-black.png');
        textureWhite = loader.load('/static/aespa-white.png');
        // textureGrain = loader.load('/images/aespa-grain.png');
    });
</script>

<Threlte.PerspectiveCamera
    makeDefault
    position={[0, 0, 3.5]}
    fov={25}
    near={0.1}
    far={1000}
/>

<Threlte.DirectionalLight position={[3, 10, 10]} intensity={1.5} />
<Threlte.AmbientLight intensity={0.5} />

<!-- Interactive 3D Symbol -->
<Threlte.Group 
    rotation={[$rotation.y, 0, 0]}
    on:click={toggleSymbol}
    interactive
>
    <!-- Front side (Black symbol) -->
    <Threlte.Mesh position={[0, 0, 0.01]}>
        <Threlte.CircleGeometry args={[1.5, 64]} />
        <Threlte.MeshBasicMaterial 
            map={textureBlack} 
            transparent={true}
        />
    </Threlte.Mesh>

    <!-- Back side (White symbol) -->
    <Threlte.Mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
        <Threlte.CircleGeometry args={[1.5, 64]} />
        <Threlte.MeshBasicMaterial 
            map={textureWhite} 
            transparent={true}
        />
    </Threlte.Mesh>
</Threlte.Group>