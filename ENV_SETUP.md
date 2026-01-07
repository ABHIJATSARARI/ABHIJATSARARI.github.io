# Environment Variables Setup

## Local Development

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_ADMIN_USER=your_username
NEXT_PUBLIC_ADMIN_PASS=your_secure_password
```

> **Note:** `.env.local` is gitignored and won't be committed.

---

## GitHub Pages Deployment

Since GitHub Pages serves **static files**, environment variables must be set **at build time** via GitHub Actions.

### Step 1: Add Secrets to GitHub

1. Go to your repo on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:
   - Name: `ADMIN_USER` → Value: `your_username`
   - Name: `ADMIN_PASS` → Value: `your_secure_password`

### Step 2: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build with environment variables
        env:
          NEXT_PUBLIC_ADMIN_USER: ${{ secrets.ADMIN_USER }}
          NEXT_PUBLIC_ADMIN_PASS: ${{ secrets.ADMIN_PASS }}
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 3: Configure Next.js for Static Export

Add to `next.config.ts`:

```ts
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name', // Your GitHub repo name
  images: {
    unoptimized: true,
  },
};
```

### Step 4: Enable GitHub Pages

1. Go to repo **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Push to `main` branch to trigger deployment

---

## Security Notes

⚠️ **Important:** `NEXT_PUBLIC_*` variables are **embedded in the JavaScript bundle**. They provide basic protection but are NOT truly secret. Anyone can view them in browser DevTools.

For production admin panels, consider:
- Server-side authentication (Vercel, Netlify Functions)
- OAuth providers (GitHub, Google)
- Database-backed sessions

---

## Quick Reference

| Environment | Where to Set | When Applied |
|-------------|--------------|--------------|
| Local Dev | `.env.local` file | `npm run dev` |
| GitHub Pages | GitHub Secrets | Build time |
| Vercel | Project Settings → Environment Variables | Build time |
| Netlify | Site Settings → Environment Variables | Build time |
