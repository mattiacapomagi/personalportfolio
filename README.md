# Mattia Capomagi — Personal Portfolio

A multidisciplinary design portfolio showcasing work in Editorial Design, Typography, Motion Graphics, and 3D Modeling. Built with **SvelteKit** and **Vite**, featuring smooth scrolling and a minimalist aesthetic.

## ⚖️ Legal & Copyright

**&copy; 2025 Mattia Capomagi. All Rights Reserved.**

This software, source code, designs, and all accompanying content are the exclusive intellectual property of **Mattia Capomagi**.

**STRICTLY PROHIBITED:**

- Unauthorized copying, modification, distribution, or use of this code, in whole or in part.
- Using any part of this repository for commercial or non-commercial projects without explicit written permission.
- Claiming this work as your own.

This repository is for **portfolio demonstration purposes only**. No open-source license is granted.

## 🧰 Creative Coding Tools

A suite of browser-based graphic processing tools built with **Canvas API** and **WebGL**.

| Tool          | Status                                                      | Description                                                                                                                                                       |
| :------------ | :---------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BRICKLAB**  | ![Status](https://img.shields.io/badge/v1.0-Active-success) | Brutalist mosaic generator. Transforms images into vector-ready brick layouts with custom density and colors.                                                     |
| **ASCII-fy**  | ![Status](https://img.shields.io/badge/v1.1-Active-success) | High-performance Image-to-ASCII converter. Features high-density charsets, Sobel edge detection, transparency, and color modes.                                   |
| **DITHERING** | ![Status](https://img.shields.io/badge/v1.2-Active-success) | Professional Dithering Studio. Includes 16+ algorithms (Floyd-Steinberg, Atkinson, Bayer, etc.), custom palette management, and retro presets (C64, NES, Pico-8). |

---

## 🛠️ Tech Stack & Layout

This portfolio is engineered for performance and visual precision.

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Static Adapter)
- **Styling**: Vanilla CSS with Custom Properties (Variables) for easy theming (e.g., `--color-bg`, `--font-mono`).
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/) for inertial scrolling experience.
- **Asset Optimization**: Custom shell scripts for `ffmpeg` video compression and image resizing.
- **Structure**:
  - `/src/lib/data/projects.js`: Centralized data source for all projects.
  - `/src/routes/projects/[slug]`: Dynamic routing for project detail pages.
  - `/src/lib/components`: Reusable UI components (`ProjectRow`, `ImageCarousel`).

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
