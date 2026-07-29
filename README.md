# sadam-khan-portfolio

Personal portfolio of Sadam Khan, full-stack engineer focused on AI systems and
LLM-powered products.

**Live:** https://portfolio-v2-fawn-nine.vercel.app

## Stack

- Next.js 16 (App Router, static generation) + React 19 + TypeScript
- Tailwind CSS 4 with a small design-token layer (`app/globals.css`)
- Motion for scroll reveals and route transitions
- Resend for contact-form delivery
- Deployed on Vercel

## Structure

```
app/            routes: home, /work, /work/[slug], /about, api/contact
components/     layout, ui, work, contact, motion primitives
content/        typed content layer: projects, experience, site copy
content-assets/ original full-res screenshots (not served)
public/         optimized images, brand assets, OG image
```

All project and bio content lives in `content/` as typed data. Adding a project
is a single entry in `content/projects.ts`.

## Development

```bash
npm install
npm run dev
```

Contact form requires env vars (see Vercel project settings):

- `RESEND_API_KEY` (required for delivery)
- `CONTACT_TO_EMAIL` (optional, defaults to the address in `content/site.ts`)

## History

The pre-2026 site is preserved at the `v2-legacy` tag.
