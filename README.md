# Massada Utility Contractors Website

A professional, production-quality one-page website for **Massada Utility Contractors, LLC** — a utility and infrastructure construction company based in Springfield, Missouri.

## Overview

Built with clean, modern HTML5, CSS3, and vanilla JavaScript. Features a fixed global backdrop using authentic Massada field photography (`photo.work/2.jpeg`), dark industrial overlays, and crisp typography tailored for an American infrastructure contractor.

- **Company:** Massada Utility Contractors, LLC
- **Location:** Springfield, Missouri
- **Founded:** 2011
- **Industry:** Utility & Infrastructure Construction
- **Phone:** (417) 647-5021
- **Email:** admin@massada.company

## Key Design & Architecture Highlights

- **Global Background Layer:** Dedicated sticky background (`site-background` with `photo.work/2.jpeg`) paired with a multi-stop navy/industrial gradient overlay (`site-overlay`) for continuous visual brand identity.
- **Semi-Transparent Frosted Sections:** Glassmorphic content containers with `backdrop-filter: blur(14px)` and high contrast ratios ensuring readability while keeping real field photography subtly visible.
- **Authentic Photography First:** Prioritizes real Vermeer directional drill rigs, vacuum excavation units, fiber reel transport, morning tailgate safety briefings, and executive portraits from `photo.*`.
- **Zero Frameworks / No Build Step:** Pure standard static files ready for instant deployment.

## File Structure

```
massada/
├── index.html          # Semantic HTML5 markup with JSON-LD schema
├── styles.css          # Industrial design system and responsive styles
├── script.js           # Navigation, scroll animations, and gallery lightbox
├── README.md           # Documentation and deployment guide
├── photo.ceo/          # CEO portrait
├── photo.crew/         # Team photos and safety field assets
├── photo.logo/         # Brand logo assets
└── photo.work/         # High-resolution field and equipment photography
```

## Deployment

Deployable instantly to any static host:

- **Netlify:** Drag and drop the root folder to your Netlify dashboard
- **Vercel:** Run `vercel deploy` or connect to your Git repository
- **GitHub Pages:** Push to `main` and enable GitHub Pages in repository settings
- **Traditional Web Host / Apache / Nginx:** Upload all files directly via SFTP/FTP

## License

© 2026 Massada Utility Contractors, LLC. All rights reserved.
