import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite'
import pkg from '@soichiro_nitta/motion';
// const {Motion} = pkg;


export default defineConfig({
	plugins: [
		soichiro_nitta/motion(),
		tailwindcss(),
		sveltekit(),
		Icons({
		  compiler: 'svelte',
		  autoInstall: true,
		})],
	server: {
		fs: {
			// Allow access to files from the project root.
			allow: ['..']
		}
	}
});
