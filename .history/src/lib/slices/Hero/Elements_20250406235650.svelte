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
        textureBlack = loader.load('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aespa%20Armageddon%20Symbol%20v3%20%5BBlack%5D%20-%20by%20%40aespa_fonts-8xnUOhDWJvUbTeH4I4NJEdf0I93iqf.png');
        textureWhite = loader.load('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aespa%20Armageddon%20Symbol%20v2%20%5BWhite%5D%20-%20by%20%40aespa_fonts.png-rf7ULwoQcBeG5ek5hBBIY2Fz0U4DLF.jpeg');
    });
</script>

<Threlte.PerspectiveCamera
    makeDefault
    position={[0, 0, 5]}
    fov={30}
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
        <Threlte.CircleGeometry args={[2, 64]} />
        <Threlte.MeshBasicMaterial 
            map={textureBlack} 
            transparent={true}
        />
    </Threlte.Mesh>

    <!-- Back side (White symbol) -->
    <Threlte.Mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
        <Threlte.CircleGeometry args={[2, 64]} />
        <Threlte.MeshBasicMaterial 
            map={textureWhite} 
            transparent={true}
        />
    </Threlte.Mesh>
</Threlte.Group>