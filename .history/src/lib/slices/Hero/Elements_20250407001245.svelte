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