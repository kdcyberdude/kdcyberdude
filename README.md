# kdcyberdude.com

Personal site for **Karandeep Singh** — applied ML research & engineering.
LearningBench flagship, first-principles experiment scoper, shipped systems.

## Quick start

```bash
npm install
npm run dev      # local: http://localhost:5173
npm run build    # production bundle → dist/
npm run preview  # preview the dist/ build
```

## Edit content

All copy, metrics, projects, and links live in one file:

`src/data/content.ts`

## Deploy (Netlify + Namecheap)

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import from Git** → pick the repo.
   - Build command: `npm run build`
   - Publish directory: `dist`
   (`netlify.toml` already sets this.)
3. In Netlify → Domain management → Add custom domain (your Namecheap domain).
4. In Namecheap → Domain List → Manage → Advanced DNS, set:

| Type  | Host | Value                         | TTL  |
|-------|------|-------------------------------|------|
| A     | `@`  | `75.2.60.5` (Netlify load balancer) | Automatic |
| CNAME | `www`| `<your-site>.netlify.app`     | Automatic |

Netlify will also show the exact records once you add the domain — prefer those if they differ.

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · Framer Motion · Canvas 2D
