<script lang="ts">
    import { Canvas, PerspectiveCamera, DirectionalLight, AmbientLight, Mesh, PlaneGeometry, ShadowMaterial, Group, CircleGeometry, MeshStandardMaterial } from '@threlte/core';
    import * as Three from 'three';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';

    const rotation = spring({ x: 0, y: 0 }, {
        stiffness: 0.1, 
        damping: 0.6
    });
    
    let isFlipped = false;
    let isSpinning = false;
    let mouseX = 0;
    let mouseY = 0;
    
    function toggleSymbol() {
        if (isSpinning) return;
        
        isSpinning = true;
        
        let startTime = Date.now();
        let duration = 1000;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const rotationAmount = progress * Math.PI * 2;
            
            rotation.set({ 
                x: $rotation.x,
                y: rotationAmount
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                isFlipped = !isFlipped;
                isSpinning = false;
                
                rotation.set({ 
                    x: $rotation.x,
                    y: isFlipped ? Math.PI : 0
                });
            }
        };
        
        animate();
    }

    function handleMouseMove(event: MouseEvent) {
        if (isSpinning) return;
        
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
        
        if (!isSpinning) {
            rotation.set({
                x: tiltX,
                y: isFlipped ? Math.PI + tiltY : tiltY
            });
        }
    }

    let textureBlack: Three.Texture;
    let textureWhite: Three.Texture;
    
    onMount(() => {
        const loader = new Three.TextureLoader();
        textureBlack = loader.load('/aespa-black.png');
        textureWhite = loader.load('/aespa-white.png');
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    });
</script>

<PerspectiveCamera
    makeDefault
    position={[0, 0, 5]}
    fov={40}
    near={0.1}
    far={1000}
/>

<DirectionalLight position={[3, 10, 10]} intensity={1.5} castShadow />
<AmbientLight intensity={0.5} />

<Mesh 
    position={[0, -1.5, 0]} 
    rotation={[-Math.PI / 2, 0, 0]} 
    receiveShadow
>
    <PlaneGeometry args={[10, 10]} />
    <ShadowMaterial opacity={0.02} />
</Mesh>

<Group 
    position={[0, 0, 0]}
    rotation={[$rotation.x, $rotation.y, 0]}
    scale={[1.5, 1.5, 1.5]}
    on:click={toggleSymbol}
    interactive
>
    <Mesh interactive position={[0, 0, 0.01]} castShadow>
        <CircleGeometry args={[1, 64]} />
        <MeshStandardMaterial 
            map={textureBlack} 
            transparent={true}
        />
    </Mesh>

    <Mesh interactive position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]} castShadow>
        <CircleGeometry args={[1, 64]} />
        <MeshStandardMaterial 
            map={textureWhite} 
            transparent={true}
        />
    </Mesh>
</Group> 