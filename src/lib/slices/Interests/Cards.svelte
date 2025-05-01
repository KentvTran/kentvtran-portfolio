<script lang="ts">
    import { spring } from 'svelte/motion';
    import { fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import type { Content } from '@prismicio/client';
  
    // Use Prismic's generated type for the list items
  export let interestsArray: Content.InterestsSliceDefaultPrimaryListOfInterestsItem[] = [];

// Rest of the component remains the same
$: cards = interestsArray.map((item, idx) => {
  const texts = [
    item.interest_1,
    item.interest_2,
    item.interest_3,
    item.interest_4,
    item.interest_5,
    item.interest_6
  ].filter(Boolean) as string[];
  
  return { id: idx, text: texts.join(' • ') };
});
    
  
    let currentIndex = cards.length - 1;
    let dragging = false;
    let startX = 0;
    let currentX = 0;
    let cardWidth = 0;
  
    const position = spring({ x: 0, rotate: 0 }, {
      stiffness: 0.1,
      damping: 0.4
    });
  
    function dragStart(e: MouseEvent | TouchEvent) {
      if (currentIndex < 0) return;
      dragging = true;
      startX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      cardWidth = (e.currentTarget as HTMLElement).offsetWidth;
    }
  
    function dragMove(e: MouseEvent | TouchEvent) {
      if (!dragging) return;
      const clientX = 'clientX' in e
        ? e.clientX
        : (e.touches?.[0].clientX ?? startX);
      currentX = clientX - startX;
      position.set({ x: currentX, rotate: currentX * 0.1 });
    }
  
    function dragEnd() {
      if (!dragging) return;
      dragging = false;
  
      if (Math.abs(currentX) > cardWidth * 0.4) {
        // fly off
        position.set({
          x: currentX > 0 ? cardWidth * 1.5 : -cardWidth * 1.5,
          rotate: currentX > 0 ? 30 : -30
        });
        setTimeout(() => {
          currentIndex = Math.max(-1, currentIndex - 1);
          position.set({ x: 0, rotate: 0 });
          currentX = 0;
        }, 300);
      } else {
        // spring back
        position.set({ x: 0, rotate: 0 });
        currentX = 0;
      }
    }
  </script>
  
  <div 
   class="grid h-[500px] w-full place-items-center bg-white"
   
  >
    {#each cards as card, i}
      {#if i <= currentIndex}
        <div 
          class="card {i === currentIndex ? 'front' : ''}"
          style="
            transform: {i === currentIndex
              ? `translateX(${$position.x}px) rotate(${$position.rotate}deg)`
              : `rotate(${i % 2 ? 6 : -6}deg) scale(0.98)`};
            z-index: {cards.length - i};
          "
          on:mousedown={i === currentIndex ? dragStart : undefined}
          on:mousemove={i === currentIndex ? dragMove : undefined}
          on:mouseup={i === currentIndex ? dragEnd : undefined}
          on:mouseleave={i === currentIndex ? dragEnd : undefined}
          on:touchstart={i === currentIndex ? dragStart : undefined}
          on:touchmove={i === currentIndex ? dragMove : undefined}
          on:touchend={i === currentIndex ? dragEnd : undefined}
          role="button"
          tabindex={i === currentIndex ? 0 : -1}
          aria-label={`Interest card: ${card.text}`}
        >
          <p>{card.text}</p>
        </div>
      {/if}
    {/each}
  </div>
  
  <style>
    .card {
      position: absolute;
      height: 24rem;
      width: 18rem;
      border: 2px solid black;
      background-color: white;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      text-align: center;
      font-size: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                  0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: 0.125s transform;
      grid-row: 1;
      grid-column: 1;
    }
    .front {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5),
                  0 8px 10px -6px rgba(0, 0, 0, 0.5);
      cursor: grab;
    }
    .front:active { cursor: grabbing; }
  </style>
  