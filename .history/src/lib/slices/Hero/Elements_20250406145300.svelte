<script lang="ts">
    import { T as Threlte } from '@threlte/core';
    import * as Three from 'three';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import { browser } from '$app/environment';

    // Create a spring for rotation animation
    const rotation = spring({ x: 0, y: 0, z: 0 }, {
        stiffness: 0.1,
        damping: 0.25
    });

    let isSpinning = false;
    let spinTimeout;
    let mounted = false;
    let error = null;

    onMount(() => {
        try {
            mounted = true;
            console.log("Elements component mounted");
        } catch (e) {
            error = e;
            console.error("Error mounting Elements:", e);
        }
    });

    function handleClick() {
        try {
            // Clear any existing timeout
            if (spinTimeout) clearTimeout(spinTimeout);
            
            // Start spinning
            isSpinning = true;
            console.log("Spinning started");
            
            // Rotate 360 degrees (2π radians)
            rotation.update($rotation => ({
                x: $rotation.x,
                y: $rotation.y,
                z: $rotation.z + Math.PI * 2
            }));
            
            // Stop spinning after animation completes
            spinTimeout = setTimeout(() => {
                isSpinning = false;
                console.log("Spinning stopped");
            }, 1500);
        } catch (e) {
            console.error("Error in handleClick:", e);
        }
    }
</script>

{#if browser && mounted && !error}
    <Threlte.PerspectiveCamera
        makeDefault
        position={[0, 0, 5]}
        fov={50}
        near={0.1}
        far={1000}
    />

    <!-- Simplified scene for debugging -->
    <!-- Dark background circle -->
    <Threlte.Mesh position={[0, 0, -0.1]}>
        <Threlte.CircleGeometry args={[2, 64]} />
        <Threlte.MeshBasicMaterial color="#1a2a2f" />
    </Threlte.Mesh>

    <!-- Simple circular pattern instead of complex curves -->
    <Threlte.Group 
        rotation={$rotation}
        on:click={handleClick}
        on:pointerover={() => document.body.style.cursor = 'pointer'}
        on:pointerout={() => document.body.style.cursor = 'default'}
    >
        <!-- Outer circle -->
        <Threlte.Mesh position={[0, 0, 0.1]}>
            <Threlte.RingGeometry args={[1.7, 1.9, 64]} />
            <Threlte.MeshBasicMaterial color="#ffffff" />
        </Threlte.Mesh>
        
        <!-- Inner pattern - simplified to a star shape -->
        {#each Array(5) as _, i}
            {@const angle = (i / 5) * Math.PI * 2}
            {@const nextAngle = ((i + 1) / 5) * Math.PI * 2}
            
            <Threlte.Mesh position={[0, 0, 0.1]}>
                <Threlte.BufferGeometry>
                    <Threlte.Float32BufferAttribute 
                        attach="attributes-position"
                        args={[new Float32Array([
                            0, 0, 0,
                            Math.cos(angle) * 1.7, Math.sin(angle) * 1.7, 0,
                            Math.cos(nextAngle) * 1.7, Math.sin(nextAngle) * 1.7, 0
                        ]), 3]}
                    />
                </Threlte.BufferGeometry>
                <Threlte.MeshBasicMaterial color="#ffffff" side={Three.DoubleSide} />
            </Threlte.Mesh>
        {/each}
        
        <!-- Add dots at vertices for glow effect -->
        {#each Array(5) as _, i}
            {@const angle = (i / 5) * Math.PI * 2}
            <Threlte.Mesh position={[Math.cos(angle) * 1.7, Math.sin(angle) * 1.7, 0.1]}>
                <Threlte.SphereGeometry args={[0.1, 16, 16]} />
                <Threlte.MeshBasicMaterial color="#ffffff" />
            </Threlte.Mesh>
        {/each}
    </Threlte.Group>

    <!-- Add ambient light to ensure everything is visible -->
    <Threlte.AmbientLight intensity={0.5} />

    <!-- Add point light for extra glow effect -->
    <Threlte.PointLight position={[0, 0, 2]} intensity={1} color="#ffffff" />
{/if}