<script lang="ts">
    import type{ Content } from "@prismicio/client";

    export let settings:Content.SettingsDocument;
    </script>

<footer class="text-slate-600">
    <div class="container mx-auto flex mt-20 flex-col items-center justify-between gap-6 py-8 sm:flex-row">
        <div class="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
            <a href="/" class="text-xl font-extrabold 
            tracking-tighter text-slate-100 transition-color 
            duration-150 hover:text-yellow-400">
            {settings.data.name}
            </a>
            <span class="hidden text-5xl font-extralight leading-[0] 
            text-slate-400 sm:inline">/</span>
            <p class ="text-sm.text-slate-300">
                © {new Date().getFullYear()} {settings.data.name}
            </p>
        </div>

        <nav class="navigation" aria-label="Footer Navigation"> 
        <ul class="flex items-center gap-1">
            {#each settings.data.nav_item as {link, label}, index}
            
        </ul>    
        </nav>

        <div class="socials">Linkedin</div>
    </div>
    </footer>