# Publitas 2.0 launch proposal

Proposal landing page from Motion The Agency for the Publitas 2.0 launch.

- Next.js 16 (App Router, static prerender), React 19, TypeScript, Tailwind CSS v4, Motion for scroll reveals
- All copy and figures live in `src/content/proposal.ts`, sourced from the Publitas pitch deck in Figma and the proposal emails
- Sections are server components in `src/components/sections/`; only the nav, hero video controls and reveal wrapper run on the client

## Hero animation

`public/video/rocket-launch.webm` (VP9, 1920 wide, 10s) plus a 1280 mobile cut, H.264 MP4 fallbacks, a poster and an end frame.
Generated in Magnific: flat vector start and end frames in the Publitas blues, animated between them with Kling 2.5 at 1080p.
Scroll scrubs the launch, then the scene pulls back into the sky dome. Re-encode a new render with
`scripts/encode-hero-video.sh <render.mp4> <ffmpeg-with-libvpx>` (keyframe every 2 frames so seeking stays instant).
Reduced-motion visitors get both stages as still frames.

## Run

```bash
pnpm install
pnpm dev
```
