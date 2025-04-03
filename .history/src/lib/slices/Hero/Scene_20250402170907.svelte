<script lang="ts">
    import {T as Threlte} from "@threlte/core";
	import Elements from "./Elements.svelte";
</script>

<Canvas shadows>
    <Elements>

    </Elements>
</Canvas>

<script>
    import { Canvas } from '@threlte/core'
    import Scene from './Scene.svelte'
  </script>
  
  <Canvas>
    <Scene />
  </Canvas>
  