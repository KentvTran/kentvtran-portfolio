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
  // Only update the cursor position for hover effects, not for active state
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
  // Only hide the hover cursor, not the active indicator
  if (cursorEl) {
    gsap.to(cursorEl, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    })
  }
}

// Function to handle active link highlighting on page load
onMount(() => {
  // We don't need to set cursor position on mount anymore
  // as each active link will have its own indicator
})
