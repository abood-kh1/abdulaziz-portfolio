# Abdulaziz Al-Khazendar — Backend Developer Portfolio

Personal engineering portfolio. Concept: **"Systems behind the interface."**
React + TypeScript + Vite + Tailwind CSS v4 + React Router.

## Run

```bash
npm install
npm run dev      # local dev
npm run build    # production build → dist/
npm run preview  # serve the production build (SPA fallback included)
```

## Links

- GitHub: https://github.com/abood-kh1
- LinkedIn: https://www.linkedin.com/in/abdulaziz-khazendar-526285375
- WhatsApp: https://wa.me/970567581412
- Email: set `LINKS.email` in `src/data/content.ts` when available (hidden if undefined)

## Content map

| Section | Source |
|---|---|
| Hero / About | `src/components/Hero.tsx`, `About.tsx` |
| Services | `src/components/Services.tsx` |
| Featured projects | `src/components/FeaturedProjects.tsx` + `src/data/projects.ts` |
| Other projects, skills, journey, links | `src/data/content.ts` |
| Case-study template | `src/pages/ProjectDetail.tsx` |
| Image component | `src/components/ProjectImage.tsx` (browser frame, `object-contain`, lazy-load) |
| Profile photo | `src/assets/abdulaziz.jpg` / `src/assets/profile/abdulaziz.jpg` |

## Add / edit projects

1. Drop screenshots in `src/assets/projects/<slug>/`
2. Import them and extend the `projects` array in `src/data/projects.ts`
3. Case-study routes (`/projects/<slug>`) render automatically, including gallery + prev/next nav.

NCRP `technologies` is intentionally empty — displays as "Tech stack — to be confirmed." until confirmed.
