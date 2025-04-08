<script>
    import { useLoader } from '@threlte/core'
    import { TextureLoader } from 'three'
    import { useFrame } from '@threlte/core'
    import { tweened } from 'svelte/motion'
  
    export let textureBlackUrl = '/black.png';
    export let textureWhiteUrl = '/white.png';
  
    const textureBlack = useLoader(TextureLoader, textureBlackUrl)
    const textureWhite = useLoader(TextureLoader, textureWhiteUrl)
  
    const rotation = tweened(
      { x: 0, y: 0, z: 0 },
      {
        duration: 800,
        easing: (x) => (1 - (1 - x) * (1 - x))
      }
    );
  
    let isBlack = true;
  
    function toggleSymbol() {
      isBlack = !isBlack;
  
      rotation.set({
        x: isBlack ? 0 : Math.PI,
        y: isBlack ? 0 : Math.PI,
        z: isBlack ? 0 : Math.PI
      });
    }
  
    useFrame(() => {
      // Optional: Add continuous subtle rotation if desired
      // $rotation.y += 0.001;
    })
  </script>
  
  <Threlte.Group 
      position={[0, 0, 0]}
      rotation={[$rotation.x, $rotation.y, $rotation.z]}
      on:click={toggleSymbol}
      interactive
  >
      <!-- Front side (Black symbol) -->
      <Threlte.Mesh position={[0, 0, 0.01]} castShadow>
          <Threlte.CircleGeometry args={[1.5, 64]} />
          <Threlte.MeshStandardMaterial 
              map={$textureBlack} 
              transparent={true}
          />
      </Threlte.Mesh>
  
      <!-- Back side (White symbol) -->
      <Threlte.Mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]} castShadow>
          <Threlte.CircleGeometry args={[1.5, 64]} />
          <Threlte.MeshStandardMaterial 
              map={$textureWhite} 
              transparent={true}
          />
      </Threlte.Mesh>
  </Threlte.Group>