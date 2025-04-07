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

    onMount(() => {
        mounted = true;
        console.log("Elements component mounted");
    });

    function handleClick() {
        console.log("Element clicked, starting spin animation");
        
        // Clear any existing timeout
        if (spinTimeout) clearTimeout(spinTimeout);
        
        // Start spinning
        isSpinning = true;
        
        // Rotate 360 degrees (2π radians)
        rotation.update($rotation => ({
            x: $rotation.x,
            y: $rotation.y,
            z: $rotation.z + Math.PI * 2
        }));
        
        // Stop spinning after animation completes
        spinTimeout = setTimeout(() => {
            isSpinning = false;
        }, 1500);
    }
    
    // Create points for the flower pattern
    function createFlowerPattern() {
        if (!browser) return [];
        
        const segments = [];
        const petalCount = 5;
        
        // Create outer circle
        const outerCirclePoints = [];
        for (let i = 0; i <= 64; i++) {
            const angle = (i / 64) * Math.PI * 2;
            outerCirclePoints.push(new Three.Vector3(
                Math.cos(angle) * 1.8,
                Math.sin(angle) * 1.8,
                0
            ));
        }
        segments.push(outerCirclePoints);
        
        // Create petal curves
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            const nextAngle = ((i + 1) / petalCount) * Math.PI * 2;
            
            const petalPoints = [];
            for (let j = 0; j <= 20; j++) {
                const t = j / 20;
                const x = (1 - t) * (1 - t) * Math.cos(angle) * 1.8 + 
                          2 * (1 - t) * t * Math.cos(angle + 0.2) * 0.9 + 
                          t * t * Math.cos(nextAngle - 0.2) * 0.9;
                          
                const y = (1 - t) * (1 - t) * Math.sin(angle) * 1.8 + 
                          2 * (1 - t) * t * Math.sin(angle + 0.2) * 0.9 + 
                          t * t * Math.sin(nextAngle - 0.2) * 0.9;
                          
                petalPoints.push(new Three.Vector3(x, y, 0));
            }
            segments.push(petalPoints);
            
            // Add inner loops
            const loopPoints = [];
            for (let j = 0; j <= 20; j++) {
                const t = j / 20;
                const x = (1 - t) * (1 - t) * Math.cos(angle) * 1.2 + 
                          2 * (1 - t) * t * Math.cos(angle + 0.5) * 0.5 + 
                          t * t * Math.cos(nextAngle - 0.5) * 0.5;
                          
                const y = (1 - t) * (1 - t) * Math.sin(angle) * 1.2 + 
                          2 * (1 - t) * t * Math.sin(angle + 0.5) * 0.5 + 
                          t * t * Math.sin(nextAngle - 0.5) * 0.5;
                          
                loopPoints.push(new Three.Vector3(x, y, 0));
            }
            segments.push(loopPoints);
            
            // Add connecting lines
            const oppositeIndex = (i + Math.floor(petalCount/2)) % petalCount;
            const oppositeAngle = (oppositeIndex / petalCount) * Math.PI * 2;
            
            const connectPoints = [];
            for (let j = 0; j <= 20; j++) {
                const t = j / 20;
                const x = (1 - t) * Math.cos(angle) * 1.8 + t * Math.cos(oppositeAngle) * 0.8;
                const y = (1 - t) * Math.sin(angle) * 1.8 + t * Math.sin(oppositeAngle) * 0.8;
                connectPoints.push(new Three.Vector3(x, y, 0));
            }
            segments.push(connectPoints);
        }
        
        return segments;
    }
</script>

{#if browser && mounted}
    <!-- Dark background circle -->
    <Threlte.Mesh position={[0, 0, -0.1]}>
        <Threlte.CircleGeometry args={[2, 64]} />
        <Threlte.MeshBasicMaterial color="#1a2a2f" />
    </Threlte.Mesh>

    <!-- Group for the flower pattern -->
    <Threlte.Group 
        rotation={$rotation}
        on:click={handleClick}
        on:pointerover={() => document.body.style.cursor = 'pointer'}
        on:pointerout={() => document.body.style.cursor = 'default'}
    >
        <!-- Create the glowing lines -->
        {#each createFlowerPattern() as points}
            <Threlte.Line>
                <Threlte.BufferGeometry setFromPoints={points} />
                <Threlte.LineBasicMaterial 
                    color="#ffffff" 
                    linewidth={2}
                />
            </Threlte.Line>
            
            <!-- Add glow effect with wider, less opaque line -->
            <Threlte.Line>
                <Threlte.BufferGeometry setFromPoints={points} />
                <Threlte.LineBasicMaterial 
                    color="#ffffff" 
                    transparent={true}
                    opacity={0.3}
                    linewidth={4}
                />
            </Threlte.Line>
        {/each}
        
        <!-- Add small dots at key points for extra glow effect -->
        {#each Array(10) as _, i}
            {@const angle = (i / 5) * Math.PI}
            <Threlte.Mesh position={[Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0.1]}>
                <Threlte.SphereGeometry args={[0.05, 16, 16]} />
                <Threlte.MeshBasicMaterial color="#ffffff" />
            </Threlte.Mesh>
        {/each}
    </Threlte.Group>

    <!-- Add ambient light to ensure everything is visible -->
    <Threlte.AmbientLight intensity={0.5} />

    <!-- Add point light for extra glow effect -->
    <Threlte.PointLight position={[0, 0, 2]} intensity={1} color="#ffffff" />

    <!-- Add camera -->
    <Threlte.PerspectiveCamera
        makeDefault
        position={[0, 0, 5]}
        fov={50}
        near={0.1}
        far={1000}
    />
{/if}