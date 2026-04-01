# Baby Voice Generator — Frontend

Next.js 14 App Router frontend for the Baby Voice Generator backend.

## Prerequisites

- Node.js 18+
- The FastAPI backend running at `http://localhost:8000`

## Setup

```bash
cd frontend
npm install
```

## Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Upload a video file — starts a new job |
| `/jobs` | List all jobs with status badges |
| `/jobs/[id]` | Job detail: run pipeline, download output files |
| `/tts` | Generate TTS audio and browse past requests |

## Configuration

The API base URL is set in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Change this if your backend runs on a different host/port.

## Build for production

```bash
npm run build
npm start
```
