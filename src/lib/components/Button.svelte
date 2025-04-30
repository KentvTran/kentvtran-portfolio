<script lang="ts">
	import { type KeyTextField, type LinkField } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';

	export let linkField: LinkField;
	export let label: KeyTextField;
	let className: string = '';
	export { className as class };
</script>

<PrismicLink
	field={linkField}
	class={`
		rounded-lg        /* less extreme rounding */
		border-2 border-dashed border-black
		bg-white
		px-8 py-2         /* wider and shorter for a more rectangular feel */
		font-semibold uppercase text-black
		transition-all duration-300

		hover:translate-x-[-4px] hover:translate-y-[-4px]
		hover:rounded-md   /* slightly more rounded on hover */
		hover:shadow-[4px_4px_0px_black]

		active:translate-x-[0px] active:translate-y-[0px]
		active:rounded-lg  /* back to original rounding on click */
		active:shadow-none

		${className}
	`}
>
	<span class="relative flex items-center justify-center gap-2">
		{label}
	</span>
</PrismicLink>
