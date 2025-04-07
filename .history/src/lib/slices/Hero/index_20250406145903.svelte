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

    let isSpinning = false;
    let spinTimeout;

    // Create the flower pattern curves
    function createFlowerPattern() {
        const curves = [];
        
        // Create outer circle
        const outerCircle = new Three.EllipseCurve(
            0, 0,             // Center x, y
            1.8, 1.8,         // X radius, Y radius
            0, 2 * Math.PI,   // Start angle, end angle
            false,            // Clockwise
            0                 // Rotation
        );
        
        // Get points from the curve
        const outerPoints = outerCircle.getPoints(100);
        curves.push(outerPoints);
        
        // Create inner flower pattern
        // Main petal curves
        const petalCount = 5;
        for (let i = 0; i < petalCount; i++) {
            const startAngle = (i / petalCount) * Math.PI * 2;
            const endAngle = ((i + 1) / petalCount) * Math.PI * 2;
            const midAngle = (startAngle + endAngle) / 2;
            
            const startX = Math.cos(startAngle) * 1.8;
            const startY = Math.sin(startAngle) * 1.8;
            
            const endX = Math.cos(endAngle) * 1.8;
            const endY = Math.sin(endAngle) * 1.8;
            
            const controlX1 = Math.cos(startAngle) * 0.9;
            const controlY1 = Math.sin(startAngle) * 0.9;
            
            const controlX2 = Math.cos(endAngle) * 0.9;
            const controlY2 = Math.sin(endAngle) * 0.9;
            
            // Create a bezier curve for each petal
            const curve = new Three.CubicBezierCurve(
                new Three.Vector2(startX, startY),
                new Three.Vector2(controlX1, controlY1),
                new Three.Vector2(controlX2, controlY2),
                new Three.Vector2(endX, endY)
            );
            
            const points = curve.getPoints(50);
            curves.push(points);
        }
        
        // Create inner loops
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            const nextAngle = ((i + 1) / petalCount) * Math.PI * 2;
            
            const startX = Math.cos(angle) * 1.2;
            const startY = Math.sin(angle) * 1.2;
            
            const endX = Math.cos(nextAngle) * 1.2;
            const endY = Math.sin(nextAngle) * 1.2;
            
            // Control points for the inner curve
            const controlX1 = Math.cos(angle + 0.3) * 0.6;
            const controlY1 = Math.sin(angle + 0.3) * 0.6;
            
            const controlX2 = Math.cos(nextAngle - 0.3) * 0.6;
            const controlY2 = Math.sin(nextAngle - 0.3) * 0.6;
            
            // Create a bezier curve for each inner loop
            const curve = new Three.CubicBezierCurve(
                new Three.Vector2(startX, startY),
                new Three.Vector2(controlX1, controlY1),
                new Three.Vector2(controlX2, controlY2),
                new Three.Vector2(endX, endY)
            );
            
            const points = curve.getPoints(50);
            curves.push(points);
        }
        
        // Create connecting curves
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            const oppositeIndex = (i + Math.floor(petalCount/2)) % petalCount;
            const oppositeAngle = (oppositeIndex / petalCount) * Math.PI * 2;
            
            const startX = Math.cos(angle) * 1.8;
            const startY = Math.sin(angle) * 1.8;
            
            const endX = Math.cos(oppositeAngle) * 0.8;
            const endY = Math.sin(oppositeAngle) * 0.8;
            
            // Control points for the connecting curve
            const controlX1 = Math.cos(angle) * 1.0;
            const controlY1 = Math.sin(angle) * 1.0;
            
            const controlX2 = Math.cos(oppositeAngle) * 1.4;
            const controlY2 = Math.sin(oppositeAngle) * 1.4;
            
            // Create a bezier curve for each connection
            const curve = new Three.CubicBezierCurve(
                new Three.Vector2(startX, startY),
                new Three.Vector2(controlX1, controlY1),
                new Three.Vector2(controlX2, controlY2),
                new Three.Vector2(endX, endY)
            );
            
            const points = curve.getPoints(50);
            curves.push(points);
        }
        
        return curves;
    }

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
    
    // Create the pattern once
    const flowerPatternCurves = createFlowerPattern();
</script>

<!-- Dark background circle -->
<Threlte.Mesh positio