# Kassy Surprise

A static website that can be deployed with GitHub Pages.

## Deploy with GitHub Pages

1. Push the `main` branch to GitHub.
2. In the repository, open **Settings > Pages** and set the build and deployment source to **GitHub Actions**.
3. The workflow deploys the site on each push to `main`. You can also start it from the **Actions** tab with **Run workflow**.

The site uses relative paths for its stylesheet, scripts, and video, so it works both on a GitHub Pages project URL and on a custom domain. The 56 MB video uses `preload="none"` to avoid downloading it before playback is requested where the browser supports that hint. Keep the published site under GitHub Pages' 1 GB site limit.
