import { page } from "$app/stores"
import { asLink, type KeyTextField, type LinkField } from "@prismicio/client"
import { PrismicLink } from "@prismicio/svelte"
import { onMount } from "svelte"

export let field: LinkField
export let label: KeyTextField
export let onLinkClick: (event: MouseEvent) => void
export let type: "desktop" | "mobile"
export let isLast = false
// Properly type the updateCursorPosition function
export let updateCursorPosition: ((left: number, width: number, opacity?: number) => void) | undefined = undefined

// We'll use a div wrapper instead of binding directly to PrismicLink
let linkWrapper: HTMLDivElement

const path = asLink(field)
$: isActive =
  path &&
  (path === "/"
    ? $page.url.pathname === path // Exact match for home
    : $page.url.pathname.startsWith(path)) // Partial match for other pages

function handleMouseEnter() {
  if (type === "desktop" && updateCursorPosition && linkWrapper) {
    const rect = linkWrapper.getBoundingClientRect()
    const parentRect = linkWrapper.parentElement?.getBoundingClientRect() || { left: 0 }
    const relativeLeft = rect.left - parentRect.left

    updateCursorPosition(relativeLeft, rect.width)
  }
}

onMount(() => {
  // If this is the active link on initial load, we'll handle it in the parent component
})
