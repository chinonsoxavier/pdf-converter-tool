# PDF Converter Tool (PDFNest)

**Full-featured, browser-first PDF toolkit** — merge, split, extract, delete pages, e-sign, and more. Built for speed and privacy with client-side processing where possible.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)

---

## Overview

A modern web app for everyday PDF workflows. Users can upload documents, rearrange pages with drag-and-drop, run common transformations, and download results — with a clean dashboard-style UI and dark mode support.

### Core tools

| Tool | Description |
|------|-------------|
| **Merge PDF** | Combine multiple PDFs with drag-and-drop page ordering |
| **Split PDF** | Split by page range, fixed size, or custom selection |
| **Extract pages** | Pull specific pages into a new document |
| **Delete pages** | Remove unwanted pages from a PDF |
| **E-signature** | Add electronic signatures to documents |
| **History** | Recent operations and downloads |

Additional UX includes cloud pickers (Google Drive / Dropbox), progress feedback, and responsive layouts for converter and dashboard views.

---

## Tech stack

- **Build:** Vite 7 + React 19 + TypeScript
- **PDF:** `pdf-lib`, `react-pdf`, `pdfjs-dist`, `@react-pdf/renderer`, `jspdf`
- **UI:** Tailwind CSS 4, Radix UI primitives, Lucide icons
- **State:** Zustand + Immer
- **DnD:** `@hello-pangea/dnd`
- **Routing:** React Router 7
- **Extras:** Motion (animations), Notistack (toasts), file-saver / downloadjs

---

## Getting started

### Prerequisites

- Node.js 18+

### Install & run

```bash
git clone https://github.com/chinonsoxavier/pdf-converter-tool.git
cd pdf-converter-tool
npm install
npm run dev
```

Open the local URL shown in the terminal (typically `http://localhost:5173`).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

---

## Project structure

```
src/
  App.tsx                 # Root app & routing
  components/
    tools/                # Merge, split, extract, delete, e-sign, layouts
    landing/              # Marketing / tools grid sections
    layout/               # Header, footer, sidebars, dashboard chrome
    ui/                   # Shared primitives (button, dialog, tabs, etc.)
  ...
```

---

## Highlights for employers / reviewers

- **Client-side PDF pipelines** using `pdf-lib` and related libraries
- **Complex UI patterns:** multi-step tool layouts, draggable page grids, modals, sidebars
- **Product polish:** landing sections, premium CTA, history, theme toggle, responsive design
- **Solid frontend architecture:** feature folders, reusable layout components, typed state

---

## Author

**Chinonso Xavier**  
Full-stack engineer · [GitHub](https://github.com/chinonsoxavier) · [Portfolio](https://chinonsoxavier.vercel.app/)

---

## License

Private / project-specific. Reach out if you need clarification on usage.
