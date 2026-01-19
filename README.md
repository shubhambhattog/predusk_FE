# Predusk Frontend

A modern, responsive personal portfolio website built with **Next.js 16** and **React 19**, showcasing profile information, skills, projects, and work experience.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Theme**: next-themes (dark/light mode support)

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── components/          # Reusable React components
│   └── ui/              # shadcn/ui components
├── hooks/               # Custom React hooks
└── lib/                 # Utility functions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

## 🎨 Features

- **Responsive Design**: Optimized for all screen sizes
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Interactive UI**: Smooth animations and micro-interactions
- **Modern Components**: Built with accessible Radix UI primitives
- **Type-Safe**: Full TypeScript support

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` → Your backend API URL

### Environment Variables for Production

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## 📄 License

MIT © [Shubham Bhattog](https://github.com/shubhambhattog)
