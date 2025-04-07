<script lang="ts">
    import { T as Threlte } from '@threlte/core';
    import * as Three from 'three';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';

    // Create a spring for rotation animation
    const rotation = spring({ x: 0, y: 0, z: 0 }, {
        stiffness: 0.1,
        damping: 0.25
    });

    let group;
    let isSpinning = false;
    let spinTimeout;

    // Create the flower-like pattern with curves
    function createFlowerPattern() {
        const curves = [];
        const segments = 64;
        
        // Create outer circle
        const outerCircle = new Three.EllipseCurve(
            0, 0,             // Center x, y
            1.8, 1.8,         // X radius, Y radius
            0, 2 * Math.PI,   // Start angle, end angle
            false,            // Clockwise
            0                 // Rotation
        );
        curves.push(outerCircle);
        
        // Create inner flower petals
        const petalCount = 5;
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            const nextAngle = ((i + 1) / petalCount) * Math.PI * 2;
            
            // Create petal curves
            const petal1 = new Three.CubicBezierCurve3(
                new Three.Vector3(Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, 0),
                new Three.Vector3(Math.cos(angle) * 0.2, Math.sin(angle) * 0.2, 0),
                new Three.Vector3(0, 0, 0),
                new Three.Vector3(Math.cos(nextAngle) * 0.8, Math.sin(nextAngle) * 0.8, 0)
            );
            
            // Convert 3D curve to 2D points for visualization
            const points = petal1.getPoints(segments);
            const geometry = new Three.BufferGeometry().setFromPoints(points);
            
            curves.push(petal1);
        }
        
        // Create connecting curves
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            const oppositeAngle = ((i + Math.floor(petalCount/2)) % petalCount / petalCount) * Math.PI * 2;
            
            // Create connecting curve
            const connector = new Three.CubicBezierCurve3(
                new Three.Vector3(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0),
                new Three.Vector3(Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0),
                new Three.Vector3(Math.cos(oppositeAngle) * 1.2, Math.sin(oppositeAngle) * 1.2, 0),
                new Three.Vector3(Math.cos(oppositeAngle) * 0.8, Math.sin(oppositeAngle) * 0.8, 0)
            );
            
            curves.push(connector);
        }
        
        return curves;
    }

    function handleClick() {
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
</script>

<Threlte.PerspectiveCamera
    makeDefault
    position={[0, 0, 5]}
    fov={50}
    near={0.1}
    far={1000}
/>

<!-- Dark background circle -->
<Threlte.Mesh position={[0, 0, -0.1]}>
    <Threlte.CircleGeometry args={[2, 64]} />
    <Threlte.MeshBasicMaterial color="#1a2a2f" />
</Threlte.Mesh>

<!-- Group for the flower pattern -->
<Threlte.Group 
    bind:ref={group}
    rotation={$rotation}
    on:click={handleClick}
    on:pointerover={() => document.body.style.cursor = 'pointer'}
    on:pointerout={() => document.body.style.cursor = 'default'}
>
    <!-- Create the glowing lines -->
    {#each createFlowerPattern() as curve, i}
        {@const points = curve.getPoints ? curve.getPoints(64) : curve.getSpacedPoints(64)}
        <Threlte.Line>
            <Threlte.BufferGeometry setFromPoints={points} />
            <Threlte.LineBasicMaterial 
                color="#ffffff" 
                linewidth={3}
            />
        </Threlte.Line>
        
        <!-- Add glow effect with wider, less opaque line -->
        <Threlte.Line>
            <Threlte.BufferGeometry setFromPoints={points} />
            <Threlte.LineBasicMaterial 
                color="#ffffff" 
                linewidth={6}
                transparent={true}
                opacity={0.3}
            />
        </Threlte.Line>
    {/each}
    
    <!-- Add small dots at connection points for extra glow effect -->
    {#each Array(10) as _, i}
        {@const angle = (i / 5) * Math.PI}
        <Threlte.Mesh position={[Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0]}>
            <Threlte.SphereGeometry args={[0.05, 16, 16]} />
            <Threlte.MeshBasicMaterial color="#ffffff" />
        </Threlte.Mesh>
    {/each}
</Threlte.Group>

<!-- Add ambient light to ensure everything is visible -->
<Threlte.AmbientLight intensity={0.5} />

<!-- Add point light for extra glow effect -->
<Threlte.PointLight position={[0, 0, 2]} intensity={1} color="#ffffff" />