<script lang="ts">
    import { T as Threlte } from '@threlte/core';
    import * as Three from 'three';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';

    const rotation = spring({ y: 0 }, {
        stiffness: 0.1,
        damping: 0.6
    });

    let isFlipped = false;
    let texturesLoaded = false;

    function toggleSymbol() {
        if (!texturesLoaded) return;
        isFlipped = !isFlipped;
        rotation.set({ y: isFlipped ? Math.PI : 0 });
    }

    let textureBlack: Three.Texture;
    let textureWhite: Three.Texture;
    
    onMount(async () => {
        const loader = new Three.TextureLoader();
        try {
            textureBlack = await loader.loadAsync('/aespa-black.png');
            textureWhite = await loader.loadAsync('/aespa-white.png');
            texturesLoaded = true;
        } catch (error) {
            console.error('Failed to load textures:', error);
        }
    });
</script>

<!-- Rest of your component remains the same -->

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