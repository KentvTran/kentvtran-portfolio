<script lang="ts">
  import type { LinkField } from '@prismicio/client';
  import { PrismicLink } from '@prismicio/svelte';
  import { isFilled } from '@prismicio/client';

  export let githubLink: LinkField ;
  export let linkedinLink: LinkField;

  // Filter only the links that are filled
  $: socialLinks = [
    { href: githubLink,    label: 'GitHub'    },
    { href: linkedinLink,  label: 'LinkedIn'  }
  ].filter(link => isFilled.link(link.href));
</script>

<div class="social-links-container my-4">
  {#each socialLinks as link}
    <PrismicLink
      field={link.href}
      class="flip-link relative block overflow-hidden whitespace-nowrap text-xl font-bold uppercase mr-4 mb-2"
      aria-label={link.label}
    >
      <div class="original">
        {#each link.label.split('') as letter, i}
          <span class="letter" style="--index:{i}">{letter}</span>
        {/each}
      </div>
      <div class="hover-text">
        {#each link.label.split('') as letter, i}
          <span class="letter" style="--index:{i}">{letter}</span>
        {/each}
      </div>
    </PrismicLink>
  {/each}
</div>

<style>
  :global(.social-links-container) {
    display: flex;
    flex-wrap: wrap;
  }

  :global(.flip-link) {
    position: relative;
    display: block;
    overflow: hidden;
    cursor: pointer;
    color: #433A3F;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
  }

  :global(.flip-link .original .letter),
  :global(.flip-link .hover-text .letter) {
    display: inline-block;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: calc(var(--index) * 25ms);
  }

  :global(.flip-link .hover-text) {
    position: absolute;
    inset: 0;
  }

  :global(.flip-link .hover-text .letter) {
    transform: translateY(100%);
  }

  :global(.flip-link:hover .original .letter) {
    transform: translateY(-100%);
  }

  :global(.flip-link:hover .hover-text .letter) {
    transform: translateY(0);
  }

  :global(.flip-link:hover) {
    color: #3D5A6C;
  }
</style>
