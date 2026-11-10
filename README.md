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

`npm run build` exports static files to `out/`. `npm start` serves that directory with a dependency-free local Node.js preview server; it does not run `next start`. Rebuild after changing source files. Node.js 22 is used in GitHub Actions.

## Deploy to GitHub Pages

The repository includes `.github/workflows/pages.yml`. It builds and deploys only when you manually run it, so pushing source changes alone does not publish a site.

1. Open [repository Pages settings](https://github.com/HughOzean/PlayBridge/settings/pages). Under **Build and deployment → Source**, select **GitHub Actions**.
2. Open [Actions](https://github.com/HughOzean/PlayBridge/actions), select **Deploy to GitHub Pages**, then **Run workflow** on `main`.
3. After both build and deploy jobs succeed, use the deployment URL shown by the workflow. For the default project-site configuration, the expected URL is `https://hughozean.github.io/PlayBridge/`; this is not a claim that the site is already live.
4. To publish future changes, push them and run the workflow again. No third-party deployment token is needed; the workflow uses GitHub's built-in token and Pages permissions.

The workflow reads the base path from `actions/configure-pages`. Default project sites use `/PlayBridge`; user sites or custom domains can use an empty path. The same build-time value prefixes Next.js assets, the hero image and favicon. Rebuild after changing the deployment path. Images are served as existing local WebP files without the server-side Next.js image optimizer. `.nojekyll` is included for static hosting.

The repository was verified as public on November 9, 2026. The Pages API reports a workflow-based site at `https://hughozean.github.io/PlayBridge/`. Repository visibility was not changed by the APK upload task. See [GitHub Pages availability and workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

To build and preview the default project subpath locally:

```bash
NEXT_PUBLIC_BASE_PATH=/PlayBridge npm run build
npm start -- --base-path /PlayBridge --port 3101
# Open http://127.0.0.1:3101/PlayBridge/
```

For a root/custom-domain build, run `npm run build` without `NEXT_PUBLIC_BASE_PATH`, then `npm start`. The preview's `--base-path` must match the path used at build time; it does not rewrite the exported files. To use another static host, upload the **contents** of `out/` at the matching mount path. Do not upload source files or expect a Node.js server on GitHub Pages.

The draft `noindex, follow` remains intentional. Deployability does not mark the product release or compatibility claims as verified. Live Pages delivery, custom-domain behavior and Google indexation require separate checks after deployment.

## Content and interactions

- Bilingual product page: English at `/` (`lang="en"`), Simplified Chinese at `/zh/` (`lang="zh-CN"`). With the project base path these become `/PlayBridge/` and `/PlayBridge/zh/`. Each has localized metadata and accessible labels, using shared page markup and verified release data.
- Header language links preserve the current section hash and include the build-time base path. Switching languages uses a full navigation between localized root layouts.
- The navigation includes section 04, “Setup” / “连接流程” (`#setup`). The current section is marked with a green background, white text and `aria-current="location"` as the user scrolls or follows anchor links.
- Responsive navigation with mobile toggle and anchor links.
- The hero uses an AI-generated photorealistic scene of a parked car, served as a local WebP with responsive Next.js Image layout and no runtime image optimization. It is visibly labeled as AI-generated, not a product screenshot or evidence of compatibility. Image provenance and prompt are recorded in `previews/image-generation.md`.
- The interactive receiver diagram remains a CSS/SVG concept illustration.
- APK release metadata and pinned download links are maintained in `src/data/release.json`; binary files are hosted in GitHub Releases rather than committed to the website source.
- The user supplied `PlayBridge-0.2.9-arm64-release.apk` for distribution. Binary verification records are under `docs/releases/`; metadata and signature checks do not establish device compatibility or real-vehicle testing.
- The real-vehicle testing FAQ and dated compatibility notice were removed at the user's request. Historical verification records remain in the release documentation; removal does not establish tested compatibility.

## Before public deployment

1. Confirm product wording, installation target, minimum Android version, receiver requirements and real-device test results.
2. Confirm a real domain. Then add metadataBase, canonical, Open Graph URL, robots and sitemap using that domain. No domain is invented here.
3. This draft currently emits `noindex, follow` through `src/components/LocaleLayout.tsx`. Remove the noindex only when public content and release status are ready; validate HTML and GSC after deployment.
4. For every APK update, verify the binary, version, signer, architecture, minimum SDK, size and SHA-256. Upload a versioned Release asset and matching checksum, verify anonymous download bytes, then update `src/data/release.json` and the verification record. Keep the exact version pinned so displayed details match the downloaded binary. Do not overwrite old version assets.
5. Add a GitHub link only after repository ownership, dependency licenses and release scope are confirmed. No open-source license is selected for the product.
6. Publish privacy details only after actual permissions, data collection and support tooling are confirmed.

This repository uses a manually triggered Pages deployment workflow. The APK upload task does not trigger website deployment. No third-party tracking or data collection is configured in the website; this says nothing about the Android app's behavior.

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

## Static export verification (November 7, 2026)

- TypeScript check passed. Production static export passed both without a base path and with `NEXT_PUBLIC_BASE_PATH=/PlayBridge`.
- Both exports passed file checks for all 12 HTML-referenced assets, one H1, six FAQs, valid anchors, the image alt/caption, draft noindex, `.nojekyll`, a static 404 page and absence of the runtime image optimizer endpoint.
- Mounted the subpath export locally at `/PlayBridge/`: homepage and all 12 referenced assets returned HTTP 200; a missing route and an incorrectly root-addressed image returned HTTP 404. The temporary preview was then stopped.
- GitHub Pages API returned 404; account plan was not disclosed by the user API. Pages deployment and the live URL remain unverified. The manual deployment workflow has not been run. No repository visibility change was made.
- Browser interaction checks were not rerun for this export change; prior browser QA limitations still apply.

## APK distribution verification (November 9, 2026)

- Published experimental prerelease [v0.2.9](https://github.com/HughOzean/PlayBridge/releases/tag/v0.2.9) with the original APK and `.sha256` asset. Android 12/API 31 minimum, ARM64 only, version code 20, 382,236 bytes. Official Google `apksigner` signature verification passed; see `docs/releases/0.2.9-verification.md` for certificate details and limitations.
- Anonymous HTTP downloads of both assets succeeded. The downloaded APK was byte-for-byte identical to the supplied file; its SHA-256 matched both the local record and uploaded checksum.
- Navigation, hero entry and download card now lead to the APK; FAQ and compatibility requirements read from verified release metadata. Binary distribution does not establish availability of Android app source code.
- `npm run typecheck` and `NEXT_PUBLIC_BASE_PATH=/PlayBridge npm run build` passed. Exported HTML checks confirmed the APK/checksum URLs, metadata, SHA-256, one H1, valid anchors, image prefix and preserved draft noindex; old empty-download copy is absent.
- Browser checks passed at the default desktop viewport and 390px mobile width: download card displayed, checksum details expanded, mobile menu exposed the download anchor and closed after selection. Screenshot: `previews/apk-download-mobile.png`. Full device/vehicle testing and APK installation or upgrades remain unverified.
- The temporary local preview was stopped. Website deployment was not triggered; run the existing manual Pages workflow after this source update.

## Chinese homepage verification (November 9, 2026)

- Localized the default homepage to Simplified Chinese: navigation, content, receiver diagram, FAQ, download/install instructions, footer, accessible names and image alternative text. Brand and technical identifiers retain their original names.
- Set document language to `zh-CN` and localized title/description. Added native Chinese font fallbacks, natural heading spacing and more readable mobile labels without external font downloads.
- `npm run typecheck` and `NEXT_PUBLIC_BASE_PATH=/PlayBridge npm run build` passed. Exported HTML checks passed for Chinese metadata/content/accessible labels, one H1, valid anchors, image base path, unchanged APK/checksum links and SHA-256, and preserved draft noindex. Checked that the previous English UI phrases are absent.
- Browser creation and reconnection both timed out, so Chinese desktop/mobile visual layout and interaction checks remain unverified in this update. The earlier English UI check does not substitute for this check. Temporary preview stopped; Pages deployment not triggered.

## Bilingual navigation verification (November 10, 2026)

- Restored English at `/`, moved Chinese to `/zh/`, with separate static root layouts emitting the correct `en` / `zh-CN` HTML language and localized metadata. Both pages use the same `Home` component. The root URL now serves English rather than redirecting to Chinese; the header exposes both language versions.
- Removed the real-vehicle test FAQ and dated compatibility notice from both languages at the user's request. Each FAQ now has five entries. Added section 04 `#setup` and its “Setup” / “连接流程” navigation entry.
- Added a shared bilingual header with a persistent language selector and active-section indication. Language links include the deployment base path and retain the current section hash after hydration. Scroll/resize listeners and a header resize observer update the green/white indicator and `aria-current="location"`.
- `NEXT_PUBLIC_BASE_PATH=/PlayBridge npm run build` and `npm run typecheck` passed. Both localized pages and all 13 HTML-referenced resources per page returned HTTP 200 under the project base path. HTML checks confirmed language, H1, five FAQs, valid section anchors, language URLs, unchanged APK/checksum URLs, removed notices and preserved noindex.
- Executed 23 pure Node mocked-component checks for the actual header code: top/no active section, all six section positions, bottom/download, click selection/settling/timeouts, manual scroll cancellation, menu closing/Escape, resize offsets, direct hash navigation, language links and effect cleanup. These checks simulate DOM geometry and events; they do not verify browser rendering or layout.
- Browser inventory timed out and native browser access reported missing Computer Use permissions. Desktop/mobile visual and real-browser interaction verification remains pending. Temporary local preview stopped; no Pages deployment was triggered.
