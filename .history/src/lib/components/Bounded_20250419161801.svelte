<script lang="ts">
	// import clsx from 'clsx';
	export let tag = 'section';
</script>

<svelte:element
	this={tag}
	{...$$restProps}
	class= sda
	<div class="mx-auto w-full max-w-7xl"><slot /></div>
</svelte:element>