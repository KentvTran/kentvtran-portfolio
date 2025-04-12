<script lang="ts">
    import type{ Content } from "@prismicio/client";

    export let settings:Content.SettingsDocument;
    </script>

<footer class="text-slate-600">
    <div class="container">
        <div class="name">
            <a href="/" class="text-xl font-extrabold 
            tracking-tighter text-slate-100 transition-color 
            duration-150 hover:text-yellow-400">
            {settings.data.name}
            </a>
            <span class="hidden text-5xl font-extralight leading-[0] 
            text-slate-400 sm:inline">/</span>
            <p classtext-sm.text-slate-300
            © {new Date().getFullYear()} {settings.data.name}
        </div>

        <nav class="navigation"> Profile </nav>

        <div class="socials">Linkedin</div>
    </div>
    </footer>