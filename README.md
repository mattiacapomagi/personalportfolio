# Mattia Capomagi — Personal Portfolio

A multidisciplinary design portfolio showcasing work in Editorial Design, Typography, Motion Graphics, and 3D Modeling. Built with **SvelteKit** and **Vite**, featuring smooth scrolling and a minimalist aesthetic.

## 📂 Project Index & Credits

All projects showcased are intellectual property of their respective authors and clients.

| Project                          | Client / Context            | Category               | Year    |
| :------------------------------- | :-------------------------- | :--------------------- | :------ |
| **INTO Mag**                     | RUFA x Mag to Mag           | Editorial Design       | 2024    |
| **Italian Excellence Posters**   | Treccani Emporium x RUFA    | Poster Design          | 2025    |
| **Coppedè: Enciclopedia Urbana** | RUFA                        | Editorial Design       | 2025    |
| **Naturamatic**                  | RUFA                        | Editorial Design       | 2024/25 |
| **DOTTIE**                       | RUFA                        | Type Design            | 2025    |
| **What a MAG! Zine**             | Mag to Mag                  | Editorial Design       | 2024    |
| **UTOPIA Cover Redesign**        | RUFA                        | Brand/Editorial Design | 2024/25 |
| **Kinetic Type Tarantino**       | RUFA                        | Motion Design          | 2024/25 |
| **UTE Limited Edition**          | RUFA x Jungle Juice Brewing | Packaging Design       | 2024/25 |
| **Inception Intro Sequence**     | RUFA                        | 3D Modeling + Motion   | 2025    |

&copy; **Mattia Capomagi** & **RUFA (Rome University of Fine Arts)** where applicable. All rights reserved.

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
