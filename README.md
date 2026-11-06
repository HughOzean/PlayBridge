# PlayBridge

Local product landing page based on the November 5, 2026 Feishu discussion.

## Stack

Matches `/Users/haiyang/Documents/GitHub/airmirror/airmirror.app`: Next.js 15.5.26 (App Router), React 19, TypeScript and Tailwind CSS 4. Only dependencies used by this project are included. No AirMirror content, secrets, analytics or deployment configuration were copied.

## Run

```bash
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3101
```

Open http://localhost:3101.

```bash
npm run typecheck
npm run build
npm start -- --hostname 127.0.0.1 --port 3101
```

## Content and interactions

- English product page: concept, capabilities, interactive receiver diagram, compatibility notes, setup overview and native accordion FAQ.
- Responsive navigation with mobile toggle and anchor links.
- The hero uses an AI-generated photorealistic scene of a parked car, served locally with responsive Next.js Image optimization. It is visibly labeled as AI-generated, not a product screenshot or evidence of compatibility. Image provenance and prompt are recorded in `previews/image-generation.md`.
- The interactive receiver diagram remains a CSS/SVG concept illustration.
- APK distribution intentionally empty: no APK, fake download, signup form or source repository link.
- The group shared `PlayBridge-0.2.9-arm64-release.apk`; binary metadata and compatibility have not been independently verified. It is not included in this project.
- Developer reported no real-vehicle testing as of November 5, 2026. Copy preserves that dated status.

## Before public deployment

1. Confirm product wording, installation target, minimum Android version, receiver requirements and real-device test results.
2. Confirm a real domain. Then add metadataBase, canonical, Open Graph URL, robots and sitemap using that domain. No domain is invented here.
3. This local draft currently emits `noindex, follow` in `src/app/layout.tsx`. Remove the noindex only when public content and release status are ready; validate HTML and GSC after deployment.
4. To add an APK, verify the binary, version, signer, architecture, minimum SDK, size and SHA-256. Replace the empty release area in `src/components/Home.tsx` with verified release information and a real link.
5. Add a GitHub link only after repository ownership, dependency licenses and release scope are confirmed. No open-source license is selected for the product.
6. Publish privacy details only after actual permissions, data collection and support tooling are confirmed.

No site was deployed and no third-party tracking or data collection is configured.

## Verification (November 6, 2026)

- `npm run build`: passed; homepage statically generated.
- `npm run typecheck`: passed.
- Local production server: HTTP 200.
- Rendered HTML checks: one H1, six FAQs, all section anchors resolve, APK placeholder present, no APK download links, draft noindex present.
- Desktop/mobile visual QA and live interaction checks remain unverified: the computer-use browser surface timed out twice. Responsive CSS, mobile menu state and receiver toggle are implemented, but these checks do not replace browser QA.

## Hero image update verification (November 6, 2026)

- Added `public/images/playbridge-parked-scene.webp`: AI-generated photorealistic parked-car concept scene, 1122 × 1402 pixels, 222,706 bytes. Prompt and provenance: `previews/image-generation.md`.
- Replaced the hero device illustration with a responsive `next/image` card, reserved image space, priority loading, descriptive alt text and a visible AI-generated scene caption.
- `npm run typecheck` and `npm run build`: passed; homepage remains statically generated.
- Local production preview, original WebP and Next.js optimized image endpoint: HTTP 200.
- Rendered HTML checks passed: one H1, valid section anchors, hero image with alt text, AI caption and draft noindex.
- Inspected the generated image itself. Desktop/mobile browser layout and live interactions remain unverified because both browser creation and browser state retrieval timed out during this update.
