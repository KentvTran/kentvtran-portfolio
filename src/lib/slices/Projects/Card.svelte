<script lang="ts">
  import { type ImageField, type LinkField } from '@prismicio/client';
  import { PrismicImage, PrismicLink } from '@prismicio/svelte';
  import clsx from 'clsx';
  import IconGithub from '~icons/fa-brands/github';

  export let labels: string[] = [];
  export let title: string;
  export let subtitle: string;
  export let imageField: ImageField;
  export let githubLink: LinkField | null = null;
  let className: string = '';
  export { className as class };
</script>

<div class={clsx("group relative w-full h-full", className)}>
  <div class="iso relative -z-10 group-hover:rotate-0 after:shadow-bgBlend after:w-full after:h-full after:absolute after:top-0 after:left-0 dark:after:mix-blend-normal after:mix-blend-color">
    <PrismicImage field={imageField} class="rounded-sm w-full h-auto" />
  </div>

  <div class="card-content">
    {#if labels && labels.length > 0}
      <div class="card-labels">
        {#each labels as label}
          <span class="card-label">{label}</span>
        {/each}
      </div>
    {/if}
    <h3 class="card-title">{title}</h3>
    <p class="card-subtitle">{subtitle}</p>
    
    {#if githubLink}
      <div class="mt-4">
        <PrismicLink field={githubLink} class="github-button">
          <IconGithub class="mr-2" />
          GitHub
        </PrismicLink>
      </div>
    {/if}
  </div>
</div>

<style>
  .group {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 0.25rem;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .group:hover {
    transform: translateY(-0.5em);
    box-shadow: 0 1em 2em rgba(0, 0, 0, 0.1);
  }

  .iso {
    position: relative;
    width: 100%;
    overflow: hidden;
    transition: all 0.5s ease;
  }

  .group:hover .iso {
    transform: rotate(0);
  }

  .card-content {
    position: relative;
    z-index: 10;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .card-labels {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .card-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background-color: var(--primary-color, #3b82f6);
    color: var(--primary-foreground, white);
  }

  .card-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--foreground, #111827);
  }

  .card-subtitle {
    font-size: 0.875rem;
    color: var(--muted-foreground, #6b7280);
    flex-grow: 1;
  }

  .github-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    background-color: var(--primary-color, #3b82f6);
    color: var(--primary-foreground, white);
    transition: background-color 0.2s ease-in-out;
    text-decoration: none;
  }

  .github-button:hover {
    background-color: var(--primary-color-hover, #2563eb);
  }

  :global(.dark) .card-title {
    color: var(--foreground-dark, #f9fafb);
  }

  :global(.dark) .card-subtitle {
    color: var(--muted-foreground-dark, #9ca3af);
  }
</style>
