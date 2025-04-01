<script>
	import { SliceSimulator } from '@slicemachine/adapter-sveltekit/simulator';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
</script>

<SliceSimulator let:slices background="#FBFBFB"> <!--#FBFBFB-->
	<SliceZone {slices} {components}/> 
</SliceSimulator>
