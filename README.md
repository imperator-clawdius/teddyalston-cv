# Teddy Alston Portfolio

Static GitHub Pages portfolio for [teddyalston.com](https://teddyalston.com).

The hiring surface positions Teddy for forward-deployed engineering, AI
deployment, agent-infrastructure, and enterprise tooling roles.

## Information architecture

The homepage deliberately leads with three systems:

1. Trident Protocol
2. Argos Vendor Command
3. TraceReady

The extended repository and product inventory remains available in
`catalog.html`, but it does not compete with the flagship hiring narrative.

## Content sources

- `content/short-resume.txt`
- `content/long-resume.txt`
- `content/github-repo-map.md`
- `Teddy-Alston-CV.pdf`

## Local preview

Serve the repository root with any static web server and open `index.html`.

## Verification

Requires Node.js 22+ and Python 3 on PATH:

```sh
npm ci
npx playwright install chromium
npm test
```

The browser suite starts its own loopback-only server on port 8791. It checks
local links/assets, cross-page fragments, PDF downloads, responsive content,
font-loading failure, mobile navigation, and keyboard skip links. GitHub Actions
runs these checks on pushes and pull requests. There is no runtime npm dependency
or build step for the deployed static site.

External destinations are reviewed separately: local tests do not prove that
third-party services remain available. See `VERIFICATION.md` for the latest
evidence and remaining limitations.

## Deployment

The default branch deploys through GitHub Pages. `CNAME` maps the deployment to
`teddyalston.com`.

See `DESIGN.md` before changing the homepage hierarchy or visual system.
