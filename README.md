# Kent Tran’s Portfolio

A personal site built with SvelteKit, TailwindCSS and Prismic, featuring a Resend-powered contact form and deployed on Vercel.

## What’s Inside

- **SvelteKit** UI framework  
- **Threlte (Three.js)** simple 3D scenes  
- **Prismic** content management  
- **TailwindCSS** utility-first styling  
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
   Create a `.env` file in the project root with your Resend API key:

   ```env
   RESEND_API_KEY=your_api_key_here
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

4. **Build & preview**

   ```bash
   npm run build
   npm run preview
   ```

## Fonts & Colors

I picked my fonts and color palette using these tools:

* Font pairing: [https://fontjoy.com](https://fontjoy.com)
* Palette generator: [https://coolors.co](https://coolors.co)

Installed fonts (via `@fontsource`):

* Londrina Solid
* Poly

Tailwind custom colors (in `tailwind.config.js`):

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        slateblue: '#3D5A6C',
        snow:     '#FBFBFB',
        mist:     '#C8D7E0'
      }
    }
  }
};
```

## Contact Form

Implementation in `src/routes/api/contact/+server.ts`:

```ts
import { env } from '$env/dynamic/private';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export const POST = async ({ request }) => {
  // parse form data, send email…
};
```

Make sure `RESEND_API_KEY` is set in your Vercel project’s Environment Variables for production.

## Deployment

* Adapter: `@sveltejs/adapter-vercel`
* Push to GitHub; Vercel will build and deploy automatically
* Add any other env vars under **Settings → Environment Variables** in the Vercel dashboard

## Links

* Live site: [https://kentvtran.vercel.app](https://kentvtran.vercel.app)
* SvelteKit docs: [https://kit.svelte.dev](https://kit.svelte.dev)
* Prismic docs: [https://prismic.io/docs](https://prismic.io/docs)
* Three.js: [https://threejs.org](https://threejs.org)