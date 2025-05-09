<script lang="ts">
  import { writable, type Writable } from 'svelte/store';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { type Content } from '@prismicio/client';

  // Define proper types for our card objects
  interface Card {
    id: number;
    text: string;
  }

  // Define proper types for interests with default empty array
  export let interests: string[] = [];

  // Create card data from interests
  $: initialCards = interests ? interests.map((interest, index) => ({
    id: index + 1,
    text: interest
  })) : [];

  // Create a properly typed writable store for our cards
  const cardsStore: Writable<Card[]> = writable([]);
  
  // Update cardsStore when initialCards change
  $: {
    if (initialCards.length > 0) {
      cardsStore.set([...initialCards]);
    }
  }

  // Get the current cards from the store
  $: cards = $cardsStore;
  
  // Define type for card states
  interface CardState {
    x: number;
    rotate: number;
    isDragging: boolean;
  }
  
  // Track card positions and states
  let cardStates: Record<number, CardState> = {};
  
  // Initialize card states
  $: {
    cards.forEach(card => {
      if (!cardStates[card.id]) {
        cardStates[card.id] = {
          x: 0,
          rotate: 0,
          isDragging: false
        };
      }
    });
  }

  // Determine if a card is at the front (top of the stack)
  $: topCardId = cards.length > 0 ? cards[cards.length - 1].id : null;

  // Track drag state
  let dragStartX = 0;
  let dragStartY = 0;
  
  function handleMouseDown(e: MouseEvent | TouchEvent, cardId: number) {
    // Only allow dragging the top card
    if (cardId !== topCardId) return;
    
    cardStates[cardId].isDragging = true;
    dragStartX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX || 0;
    dragStartY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY || 0;
  }

  function handleMouseMove(e: MouseEvent | TouchEvent) {
    // Find the card that's being dragged
    const draggingCardId = Object.keys(cardStates).find(id => 
      cardStates[Number(id)].isDragging
    );
    
    if (!draggingCardId) return;
    
    const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX || 0;
    const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY || 0;
    
    const deltaX = clientX - dragStartX;
    
    // Update position and rotation
    cardStates[Number(draggingCardId)].x = deltaX;
    cardStates[Number(draggingCardId)].rotate = deltaX * 0.1; // Rotate based on drag distance
  }

  function handleMouseUp() {
    // Find the card that's being dragged
    const draggingCardId = Object.keys(cardStates).find(id => 
      cardStates[Number(id)].isDragging
    );
    
    if (!draggingCardId) return;
    
    const position = cardStates[Number(draggingCardId)].x;
    
    // If dragged far enough, remove the card
    if (Math.abs(position) > 100) {
      // Remove card from store
      cardsStore.update(cards => cards.filter(card => card.id !== Number(draggingCardId)));
      
      // Clean up card state
      setTimeout(() => {
        delete cardStates[Number(draggingCardId)];
      }, 300);
    } else {
      // Reset position and rotation
      cardStates[Number(draggingCardId)].x = 0;
      cardStates[Number(draggingCardId)].rotate = 0;
    }
    
    // Reset dragging state
    cardStates[Number(draggingCardId)].isDragging = false;
  }
  
  // Function to handle keyboard navigation
  function handleKeyDown(e: KeyboardEvent, card: Card, isTop: boolean) {
    if (!isTop) return;
    
    if (e.key === 'ArrowLeft') {
      // Swipe left
      cardStates[card.id].x = -150;
      handleMouseUp();
    } else if (e.key === 'ArrowRight') {
      // Swipe right
      cardStates[card.id].x = 150;
      handleMouseUp();
    } else if (e.key === 'Enter' || e.key === ' ') {
      // Activate card (no specific action for now)
      e.preventDefault();
    }
  }
</script>

<svelte:window 
  on:mousemove={handleMouseMove} 
  on:mouseup={handleMouseUp} 
  on:touchmove={handleMouseMove} 
  on:touchend={handleMouseUp} 
/>

<div 
  class="grid h-[500px] w-full place-items-center bg-transparent border-2 border-[#FBFBFB] rounded-lg"
>
  {#if cards.length > 0}
    {#each cards as card (card.id)}
      {@const isTop = card.id === topCardId}
      {@const state = cardStates[card.id] || { x: 0, rotate: 0 }}
      {@const baseRotate = isTop ? 0 : (card.id % 2 ? 6 : -6)}
      
      <div 
        class="card"
        role="button"
        tabindex={isTop ? 0 : -1}
        aria-label={`Interest card: ${card.text}`}
        style="
          transform: translateX({state.x}px) rotate({state.rotate + baseRotate}deg) scale({isTop ? 1 : 0.98});
          z-index: {card.id};
          opacity: {Math.max(0, Math.min(1, 1 - Math.abs(state.x) / 300))};
          box-shadow: {isTop ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)' : 'none'};
        "
        on:mousedown={(e) => handleMouseDown(e, card.id)}
        on:touchstart={(e) => handleMouseDown(e, card.id)}
        on:keydown={(e) => handleKeyDown(e, card, isTop)}
        in:fly={{ y: 50, duration: 300, easing: cubicOut }}
        out:fly={{ x: state.x > 0 ? 1000 : -1000, duration: 300, easing: cubicOut }}
      >
        <p>{card.text}</p>
      </div>
    {/each}
  {:else}
    <div class="empty-state">No cards left</div>
  {/if}
</div>

<style>
  .card {
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
    grid-row: 1;
    grid-column: 1;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    position: absolute;
    cursor: grab;
    user-select: none;
    touch-action: none;
    will-change: transform, opacity;
  }

  .card:active {
    cursor: grabbing;
  }

  .empty-state {
    font-size: 1.25rem;
    color: #666;
  }
</style>