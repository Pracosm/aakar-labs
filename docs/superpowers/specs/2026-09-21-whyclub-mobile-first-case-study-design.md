# WhyClub mobile-first case study redesign

Date: 2026-09-21
Status: Approved direction, ready for implementation planning

## Goal

Redesign the WhyClub homepage card and `/work/whyclub` case study so they match the current WhyClub storefront.

The new case study must explain the full work in plain English. It must give the mobile experience and graphic design equal importance. The mobile layout must feel polished enough to inform a future native app without making the website behave like an unfamiliar app.

## Evidence

The current local case study and the live WhyClub store were reviewed at desktop and 532 × 894 mobile viewports.

The live store now uses:

- large editorial product photography;
- white and soft neutral backgrounds;
- compact uppercase labels;
- a swipe-first mobile hero;
- a familiar bottom navigation;
- category-led visual storytelling;
- restrained product grids.

The current case study still uses older campaign visuals, a neon-heavy dark system, a text-heavy mobile section bar, and scroll reveals that can leave large blank areas before content appears.

Reference captures are stored in `.qa/whyclub-redesign/`:

- `02-live-home.png`
- `03-live-category-desktop.png`
- `04-live-products-desktop.png`
- `05-live-mobile-hero.png`
- `06-live-mobile-next.png`
- `07-current-mobile-hero.png`
- `08-current-mobile-interfaces.png`

Accepted live-store screenshots will be copied into the public WhyClub case-study asset folder during implementation. The case study will not hotlink remote images.

## Homepage card

The WhyClub card will use the same information structure as the Folding Company card.

### Mobile

- Use a 4:3 project image with a soft gradient into the content surface.
- Show the category label, title, short description, and three metadata items.
- Show the metadata icons on mobile instead of hiding them.
- Use the same visual spacing and icon treatment as the Folding Company card.
- Use one full-width primary action for the case study.
- Center the secondary live-store action.
- Keep the scope concise: brand, UX/UI, frontend, backend, and visual production.

### Desktop

- Use a two-column image and information layout.
- Keep the image full height.
- Match the Folding Company card's title rhythm, metadata row, primary action, and secondary action.
- Keep WhyClub's neutral cream, black, and muted green palette.

## Case-study information architecture

### 1. Hero — A fashion store built for the drop

- Use current live-store imagery rather than the old handheld mockup.
- Show the project title and summary within the first mobile viewport.
- Include project type, date, and live status.
- Keep the hero direct. Do not animate every child separately.

Approved summary:

> We designed the brand, the mobile experience, the storefront, and the systems behind every order.

### 2. Overview — One studio, every layer

Explain the work in five plain categories:

- Brand direction
- UX/UI design
- Frontend development
- Backend and operations
- Product images, campaign graphics, and mockups

This section will use a compact grid instead of long paragraphs.

### 3. Graphic system — A clear system for a loud brand

- Use large campaign and category images.
- Explain the type, colour, product graphics, photography, and mockup system.
- Keep each explanation to two or three short sentences.
- Use captions to connect each image to the design decision it shows.

### 4. Mobile spotlight — Mobile comes first

This is the primary section.

- Show current mobile hero and category screenshots in tall device frames.
- Explain the swipeable hero, product discovery, category navigation, persistent cart access, and touch targets.
- Explain which patterns can move into a future native app.
- Keep navigation familiar: icons with labels, clear active state, and expected back behavior.
- Do not hide actions behind gestures alone.

### 5. Responsive system — One store, shaped for each screen

- Compare the mobile experience with the wide desktop hero.
- Show the updated desktop category scene and product grid.
- Explain why the desktop layout is wide and editorial while mobile is direct and sequential.

### 6. Build — From campaign image to checkout

Explain the delivered system:

- storefront interface;
- reusable frontend components;
- checkout flow;
- backend and admin operations;
- product and visual-content workflow.

Do not claim performance, conversion, sales, or operational results without evidence.

### 7. Closing action

- Use one simple closing statement.
- Link to the live WhyClub store.
- Offer a secondary link back to selected work.

## Mobile navigation

The case study will use a floating bottom section bar on mobile. It will take visual cues from iOS 26 Liquid Glass without copying Apple's controls.

Items:

1. Overview
2. Brand
3. Mobile
4. Build

Rules:

- Use icons and visible text labels.
- Keep every target at least 44 × 44 pixels.
- Respect the bottom safe area.
- Use a translucent neutral surface, a light border, restrained saturation, and a maximum blur of 18px.
- Keep the active state visible through shape and text weight, not colour alone.
- Use normal anchor links so navigation remains familiar and accessible.
- On desktop, replace the bottom bar with a simple sticky horizontal section index.
- Do not use magnetic cursor motion.

## Visual system

Primary colours:

- Canvas: `#F6F6F5`
- Surface: `#FFFFFF`
- Ink: `#111111`
- Secondary text: `#686862`
- Muted green: sampled from the live product photography and existing WhyClub card

Use solid surfaces behind long text. Reserve glass for navigation and small floating controls.

Typography:

- Keep Space Grotesk for large display headings.
- Keep IBM Plex Sans for body copy.
- Keep Roboto Mono for metadata and section labels.
- Use short lines and normal sentence case for explanations.

## Motion

Purpose:

- show section order;
- connect the homepage card to the case-study route;
- keep large visual changes from feeling abrupt.

Rules:

- Use transform and opacity only for section reveals.
- Reveal containers once. Do not animate both a container and all its children.
- Use 12–16px travel for section reveals.
- Use 300–450ms strong ease-out timing for large editorial blocks.
- Use 150–220ms transitions for hover and press feedback.
- Keep image hover scaling between 1.01 and 1.02 and enable it only for fine pointers.
- Remove the long neon marquee.
- Keep the existing cream panel-to-route expansion, adjusted only if the new hero colour changes.
- Under reduced motion, remove positional movement and keep short opacity changes only.

## Components

The redesign will remain inside the existing MDX route.

Planned component responsibilities:

- `WhyClubCaseStudy`: root motion and active-section lifecycle.
- `WhyClubCaseStudyHero`: mobile-first hero and project summary.
- `WhyClubSectionNav`: responsive glass mobile bar and desktop section index.
- `WhyClubProjectMeta`: compact project scope and metadata.
- `WhyClubGraphicSystem`: campaign, type, colour, and visual-production story.
- `WhyClubMobileExperience`: mobile screenshots and app-ready UX explanation.
- `WhyClubResponsiveSystem`: desktop and mobile comparison.
- `WhyClubBuildSystem`: design and engineering deliverables.
- `WhyClubCaseStudyCta`: live-store closing action.

Small image and caption helpers can remain local to `WhyClubCaseStudy.tsx`. No new animation dependency will be added.

## Content rules

- Use active voice.
- Use short sentences.
- Define technical terms when they first appear.
- Avoid phrases such as “seamless,” “revolutionary,” “world-class,” and “end-to-end” unless the sentence names the actual work.
- State what Aakar Labs designed or built.
- Keep each body paragraph under 75 characters per line where layout permits.
- Use captions to explain why an image matters.

## Accessibility

- Keep the existing skip link and semantic heading order.
- Use real anchor links for section navigation.
- Provide accurate alternative text for screenshots and campaign images.
- Treat decorative device frames and glass effects as hidden from assistive technology.
- Keep text contrast compliant over its immediate background.
- Do not place long text directly on photography.
- Respect `prefers-reduced-motion`.
- Keep all mobile controls clear of safe areas.

## Testing and acceptance

Automated checks:

- Add source regression tests for card parity, mobile metadata icons, screenshot assets, semantic section navigation, reduced-motion handling, and removal of the old marquee.
- Run `npm test`.
- Run `npm run lint`.
- Run `npm run build`.
- Run `git diff --check`.

Browser checks:

- Review the homepage card and case study at 532 × 894.
- Review at a narrow 390 × 844 mobile viewport.
- Review desktop at approximately 1440px wide.
- Confirm the hero title and summary appear in the first mobile viewport.
- Confirm the bottom glass bar does not cover actions or captions.
- Confirm all screenshots load before accepting captures.
- Confirm reduced motion removes positional movement.
- Confirm there is no horizontal overflow.

Physical-device Safari or Android behavior will not be claimed without a device test.

## Out of scope

- Redesigning or deploying the live WhyClub storefront.
- Building a native iOS or Android app.
- Changing WhyClub checkout or backend behavior.
- Publishing, committing, pushing, or deploying without separate authorization.
