<script lang="ts">
    import type { Content } from '@prismicio/client';

    export let settings: Content.SettingsDocument;

    let open = false

    function onLinkClick(){
        open = false
    }
</script>

<header> 
    <nav>
        <div class="flex-col justify-between rounded-b-lg 
        bg-slate-50 px-4 py-2 md:m4 md:flex-row 
        md:items-center md:rounded-xl">
            <div>
            <a href="/" aria-label="Homepage"
            class="text-xl font-extrabold tracking-tighter text-slate-900">{settings.data.name}</a>

            <button aria-expanded={open} aria-label="Open Menu" class="block-p-2 text-2xl text-slate-800 md:hidden"
            on:click={() => open = true}>
                {open}
            </button>

            </div>
        </div>
    </nav>
</header>