<script lang="ts">
	import { type ImageField } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import clsx from 'clsx';
  
	export let image: ImageField;
	export let memeImage: ImageField | null = null;
	let className: string = '';
	export { className as class };
  
	let showMeme = false;
	$: currentImage = showMeme && memeImage ? memeImage : image;
  
	function toggleAvatar() {
		showMeme = !showMeme;
	}
</script>
  
<div class={clsx('relative', className)}>
	<button 
		class="relative w-full max-w-sm border-2 border-black rounded-lg 
		overflow-hidden shadow-[7px_6px_0px_black] 
		hover:shadow-none hover:translate-x-[3px] 
		hover:translate-y-[3px] transition-all"

		on:click={toggleAvatar}
	>
		<PrismicImage
			field={currentImage}
			class="w-full aspect-square object-cover"
		/>
	</button>
</div>