# Kent Tran’s Portfolio

A personal site built with SvelteKit, TailwindCSS and Prismic, featuring a Resend-powered contact form and deployed on Vercel.

## What’s Inside

- **SvelteKit** UI Framework
- **Threlte (Three.js)** simple 3D scenes  
- **Prismic** content management  
- **TailwindCSS** CSS stuff  
- **Contact API** using Resend  
- **Zero-config deploy** on Vercel  

## Getting Started

1. **Clone & install**  
   ```bash
   git clone https://github.com/kentvtran/kentvtran-portfolio.git
   cd kentvtran-portfolio
   npm install
````

2. **Environment**
   Create a `.env` file at the root:

   ```
   RESEND_API_KEY=your_api_key_here
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

## Fonts & Colors

I picked fonts and palettes with these tools:

* Font pairing: [https://fontjoy.com](https://fontjoy.com)
* Palette generator: [https://coolors.co](https://coolors.co)

Fonts (via `@fontsource`):

* Londrina Solid
* Poly


## Contact Form

In `src/routes/api/contact/+server.ts`:

```ts
import { env } from '$env/dynamic/private';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export const POST = async ({ request }) => {
  // handle form data, send email…
};
```

Make sure `RESEND_API_KEY` is set in Vercel for production.

## Deployment

* Adapter: `@sveltejs/adapter-vercel`
* Push to GitHub and Vercel builds automatically
* Add any env vars in Vercel dashboard under Settings → Environment Variables

## Links

* Live site: [https://kentvtran.vercel.app](https://kentvtran.dev)
* SvelteKit docs: [https://kit.svelte.dev](https://kit.svelte.dev)
* Prismic docs: [https://prismic.io/docs](https://prismic.io/docs)
* Three.js: [https://threejs.org](https://threejs.org)

```

