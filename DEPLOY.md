# Deployment

## Vercel for Origin

This repository is configured with Vercel for Origin integration.

**Automatic Deployments:**
- Pushes to `main` branch trigger automatic production deployments
- Preview deployments are created for pull requests

**Manual Deployment:**
- Vercel CLI can be used for manual deployments
- Run `vercel` to deploy to preview
- Run `vercel --prod` to deploy to production

**Configuration:**
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`
- Dev command: `npm run dev`

**Environment Variables:**
- `OPENAI_API_KEY`: Optional, enables real AI features (falls back to demo mode without it)

---

Last updated: 2026-09-11
Vercel for Origin integration confirmed active.
