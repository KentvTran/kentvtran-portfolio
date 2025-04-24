import { onMount } from "svelte"
import { gsap } from "gsap"

import { type Content } from "@prismicio/client"
import NavBarLink from "./NavBarLink.svelte"

import IconMenu from "~icons/ic/baseline-menu"
import IconClose from "~icons/ic/baseline-close"

export let settings: Content.SettingsDocument

let open = false

let cursorEl: HTMLDivElement
let navContainer: HTMLDivElement
let activePosition = { left: 0, width: 0, opacity: 0 }

function onLinkClick() {
  open = false
}

// Function to update cursor position with proper typing
function updateCursorPosition(left: number, width: number, opacity: number = 1) {
  activePosition = { left, width, opacity }
  if (cursorEl) {
    gsap.to(cursorEl, {
      left,
      width,
      duration: 0.4,
      opacity,
      ease: "power2.out",
    })
  }
}

// Function to reset cursor on mouse leave
function resetCursor() {
  // Find the active link again
  const activeLink = navContainer?.querySelector('[aria-current="page"]') as HTMLElement | null
  if (activeLink) {
    const rect = activeLink.getBoundingClientRect()
    const parentRect = navContainer.getBoundingClientRect()
    const relativeLeft = rect.left - parentRect.left

    // Animate back to the active link position with full opacity
    updateCursorPosition(relativeLeft, rect.width, 1)
  } else {
    // If no active link is found, hide the cursor
    updateCursorPosition(activePosition.left, activePosition.width, 0)
  }
}

// Function to handle active link highlighting on page load
onMount(() => {
  // Set a small delay to ensure DOM is fully rendered
  setTimeout(() => {
    const activeLink = navContainer?.querySelector('[aria-current="page"]') as HTMLElement | null
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect()
      // Use getBoundingClientRect for position instead of offsetLeft
      const parentRect = navContainer.getBoundingClientRect()
      const relativeLeft = activeLink.getBoundingClientRect().left - parentRect.left

      updateCursorPosition(relativeLeft, rect.width, 1)
    }
  }, 100)
})
