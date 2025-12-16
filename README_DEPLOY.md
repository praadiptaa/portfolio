Vercel Deployment Guide

This project is a Next.js app (app directory). Follow the steps below to deploy to Vercel.

Prerequisites
- A Vercel account (https://vercel.com)
- Git repository for this project (recommended)
- Vercel CLI (optional) - install: `npm i -g vercel`

1) Deploy via Vercel Dashboard (recommended)
- Push your repo to GitHub/GitLab/Bitbucket.
- On Vercel dashboard, choose "Import Project" and select your repository.
- Framework Preset: Next.js (should be auto-detected).
- Build Command: `npm run build` (auto)
- Output Directory: (leave empty; Vercel detects Next.js)
- Environment Variables: add any secrets if needed.
- Click Deploy.

2) Deploy via Vercel CLI (quick)
- Login: `vercel login`
- From project folder run: `vercel` and follow prompts.
- For production deploy: `vercel --prod`

3) Notes & recommendations
- Ensure `package.json` has `build` script: `next build` (already present).
- If you use environment variables, set them in the Vercel dashboard or via `vercel env add`.
- For custom domains, add in the Vercel dashboard and follow DNS instructions.
- For CI checks, enable Git integration and set GitHub branch protection as needed.

Troubleshooting
- If build fails on Vercel, check the Build Logs in the dashboard. Common fixes:
  - Missing environment variables
  - Node version mismatch (set via `engines.node` in `package.json` or in Vercel settings)
  - Unsupported dependencies

Optional: GitHub Actions
- For advanced CI, add a GitHub Action that runs `npm ci && npm run build` on pull requests.

If you want, I can:
- Create a simple GitHub Actions workflow for build+lint.
- Run `vercel` locally (you need to approve the interactive steps).
