<script lang="ts">
    import { T as Threlte } from '@threlte/core';
    import * as Three from 'three';
</script>

<Threlte.PerspectiveCamera
    makeDefault
    position={[0,0,25]}
    aspect={[1]}
    fov={30}
    near={1}
    far={40}
/>

<T.Mesh> 
    <T.BoxGeometry />
    
</T.Mesh>


