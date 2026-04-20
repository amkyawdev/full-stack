# Movie Editor - Next.js 14 Application

A professional Movie Editor Web Application built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Video Editing Core**
  - 5 Resolution options: 480p, 720p, 1080p, 1440p, 4K
  - 5 Color presets: Vivid, Vintage, Cinematic, Black & White, Warm
  - 5 Movie Transform Animations (IN/OUT): Fade, Slide, Zoom, Rotate, Blur
  - 5 Text Animations: Typewriter, Bounce, Glow Pulse, Float, Shake
  - 5 Title Animations: Fade In, Slide From Left, Zoom In, Typewriter, Glow Reveal

- **Subtitle Editor**
  - 5 Font sizes: 16, 20, 24, 28, 32px
  - 5 Font colors: White, Yellow, Green, Red, Cyan
  - 5 Font families: Arial, Montserrat, Poppins, Roboto, Open Sans
  - 5 Background options

- **UI Components**
  - Draggable Docker Panels with collapse/expand
  - Desktop Menu Bar with keyboard shortcuts
  - Mobile Bottom Navigation (TikTok/Instagram style)
  - Smooth text animations everywhere

- **Converter System**
  - Compare Original vs Edited view
  - Export to MP4, WEBM, MOV
  - Progress tracking

## Tech Stack

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + Framer Motion
- Icons: Lucide React + React Icons (CDN)
- Backend: Next.js API Routes + Python FastAPI
- Video Processing: FFmpeg (server-side)
- State Management: Zustand + React Query
- Container: Docker + docker-compose

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Project Structure

```
movie-editor/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/        # React components
│   │   ├── ui/          # UI components
│   │   ├── animations/   # Animation components
│   │   └── docker/      # Docker panel components
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand stores
│   ├── lib/             # Utilities
│   └── types/           # TypeScript types
├── backend-python/      # Python FastAPI backend
├── docker/              # Docker configuration
└── public/              # Static files
```

## API Endpoints

- `POST /api/video/upload` - Upload video
- `POST /api/video/resize` - Change resolution
- `POST /api/video/color` - Apply color grading
- `POST /api/video/animation` - Apply animation
- `POST /api/video/subtitle` - Burn subtitles
- `POST /api/video/export` - Export video

## License

MIT