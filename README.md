# Portfolio Website

## Deploying To GitHub Pages (Vite)

This project is deployed with GitHub Actions using the workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

### Required setup

1. Go to your repository settings.
2. Open Pages.
3. Set Source to GitHub Actions.
4. Keep only the Vite Pages workflow active for this repository.

### Why this matters

Vite development uses `/src/main.jsx` in `index.html`, but production must serve built files from `dist`.
If GitHub Pages publishes source files instead of `dist`, the browser requests JSX directly and fails with a strict MIME type error.

### Typical MIME error

`Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/jsx".`

### If deployment looks broken

1. Confirm the latest workflow run for [Deploy Vite site to GitHub Pages](.github/workflows/deploy.yml) succeeded.
2. Confirm Pages is set to GitHub Actions (not Deploy from branch).
3. Re-run the deployment workflow from the Actions tab.
