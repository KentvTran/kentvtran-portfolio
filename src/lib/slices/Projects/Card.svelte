<script lang="ts">
  import { type ImageField, type LinkField, type RichTextField } from '@prismicio/client';
  import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
  import Button from '$lib/components/Button.svelte';
  import clsx from 'clsx';

  export let labels: string[] = [];
  export let title: string;
  export let description: RichTextField;
  export let imageField: ImageField;
  export let githubLink: LinkField | null = null;
  export let gitButtonLabel: string = "test";
  let className: string = '';
  export { className as class };
</script>

<div class={clsx("group relative w-full h-full border border-gray-300 rounded-md flex flex-col", className)}>
  <!-- Card content -->
  <div class="image-container p-3">
    <PrismicImage field={imageField} class="w-full h-auto rounded-sm" />
  </div>

  <div class="card-content p-4 flex flex-col flex-grow">
    <h3 class="text-xl font-bold mb-1">{title}</h3>
    
    {#if labels && labels.length > 0}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each labels as label}
          <span class="tech-label">{label}</span>
        {/each}
      </div>
    {/if}
    
    <div class="text-sm text-gray-600 mb-4 description-content">
      <PrismicRichText field={description} />
    </div>
    
    {#if githubLink}
      <div class="mt-auto px-2 pb-2">
        <Button
          linkField={githubLink}
          label={gitButtonLabel}
          class=""  
        />
      </div>
    {/if}
  </div>
  
  <!-- Outline effect spans -->
  <span class="outline-part outline-top"></span>
  <span class="outline-part outline-right"></span>
  <span class="outline-part outline-bottom"></span>
  <span class="outline-part outline-left"></span>
</div>

<style>
  .group {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .card-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  /* Styling for rich text content */
  .description-content :global(ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }

  .description-content :global(li) {
    margin-bottom: 0.25rem;
  }

  .description-content :global(p) {
    margin-bottom: 0.5rem;
  }

  .tech-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background-color: #3d5a6c;
    color: white;
  }

  /* Outline drawing effect */
  .outline-part {
    position: absolute;
    background-color: #c8d7e0;
    z-index: 5;
    pointer-events: none;
  }

  .outline-top { left: 0; top: 0; height: 2px; width: 0; transition: width 400ms ease; }
  .outline-right { right: 0; top: 0; width: 2px; height: 0; transition: height 400ms ease 400ms; }
  .outline-bottom { bottom: 0; right: 0; height: 2px; width: 0; transition: width 400ms ease 800ms; }
  .outline-left { bottom: 0; left: 0; width: 2px; height: 0; transition: height 400ms ease 1200ms; }

  .group:hover .outline-top { width: 100%; }
  .group:hover .outline-right { height: 100%; }
  .group:hover .outline-bottom { width: 100%; }
  .group:hover .outline-left { height: 100%; }
</style>
