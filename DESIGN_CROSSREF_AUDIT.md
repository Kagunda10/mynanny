# Design Cross-Reference Audit

## Summary
- Total missing items: 25+
- Critical gaps: Missing application flow interactions, complete redesign of Join page, missing navigation features in Guides.
- Minor deviations: Dozens of typography, color, and padding differences.

## Page 1: Homepage

### Missing Sections
- **Animated Scroll Cue**: The design includes a bouncing scroll cue (`<div class="w-6 h-10 border-2..."><div class="w-1 h-2 bg-primary rounded-full animate-bounce"></div></div>`) below the Hero section. This is completely missing from the built `page.tsx`.

### Missing Elements
- **Hero CTA Buttons mismatch**: The design has NO primary and secondary call-to-action buttons in the Hero text area. The built codebase `hero.tsx` *added* two buttons: "Get Matched Free" and "View Pricing".
- **HireSteps Icons**: The design specifies background color `bg-green-500` for the final step number. The build uses `bg-verified-green`.

### Copy Differences
- **Hero H1 Color rules**: `DESIGN.md` explicitly says for hero sections: "the first word of the H1 should be colored in #F23B72". The build does not implement this rule; the entire text is the same color except for the highlighted word "trust".
- **Nav "Join as Nanny" Button**: Design has `Join as Nanny` with an arrow icon. Built `nav.tsx` desktop has `<PrimaryButton>Find a Nanny</PrimaryButton>`. 

### Style Deviations
- **Animations in Hero Cards**: Design uses simple Tailwind `animate-bounce` on the "Mary W." card and `animate-pulse` on the "Police Clearance" card. The build uses a custom `ParallaxBlob` Framer Motion component.
- **Vetting Pipeline Connecting Line**: The design uses `w-full` for the drawing line. The built code uses `origin-left animate-[draw_2s_ease_forwards]`.
- **AppCTA Phone Mockup Animation**: Design uses `group-hover:translate-y-0 transition-transform duration-700` for a reveal effect on hover. The built code simply hardcodes `-mb-10 translate-y-10` with no hover transition.
- **HireSteps Card Styling**: Design hardcodes different opacities for the last card (`bg-white/10 backdrop-blur-lg border border-white/20`). Built code loops over the steps and applies the same class (`bg-white/5 backdrop-blur-md border border-white/10`) to all.

### Missing Animations/Interactions
- App CTA phone mockup group hover reveal effect is not implemented.
- The bouncing Scroll Cue animation is entirely missing.

### Missing Images
- Images match perfectly via `lh3.googleusercontent.com` URLs.

### Data/Content Differences
- None observed.

## Page 2: About

### Missing Sections
- None.

### Missing Elements
- **Clash Display Font**: The design uses a custom typography font `Clash Display` for the large "2019" text in the Origin section and the large numbers in the Impact Band section. The build does not import or use this font, relying entirely on `Plus Jakarta Sans`.

### Copy Differences
- None.

### Style Deviations
- **Mission Slab Colors**: The design uses `text-primary-fixed` and `bg-primary-fixed` for the "Our North Star" elements (quote icon, lines, text). The built code uses `text-primary-fixed-dim` and `bg-primary-fixed-dim`.
- **Timeline Card Hover**: The design uses custom `double-bezel-outer:hover` CSS to trigger a `translateY(-4px)` lift and a stronger shadow on the timeline cards. The built timeline cards (`double-bezel`) don't have this hover interaction implemented.

### Missing Animations/Interactions
- **Timeline Drag-to-Scroll**: The design includes a Javascript-powered drag-to-scroll interaction (`mousedown`, `mousemove`, `mouseup`) for the horizontal timeline. The built code uses a native `flex overflow-x-auto snap-x` container without mouse dragging logic.

### Missing Images
- Images match perfectly.

### Data/Content Differences
- None.

## Page 3: Why MyNanny

### Missing Sections
- None.

### Missing Elements
- **Hero Abstract Decoration**: The design includes a background decoration layer (`<div class="absolute top-0 right-0 -z-0 opacity-20 md:opacity-100">`) in the Hero section. This is entirely omitted in the built code.

### Copy Differences
- **Safety Features Icons**: 
  - Design SOS icon is `emergency_share`, built code uses `sos`.
  - Design Legal Support icon is `contract`, built code uses `gavel`.
  - Design Counseling icon is `psychology_alt`, built code uses `psychology`.

### Style Deviations
- **Comparison Card Hover**: The design includes `transform hover:scale-[1.02] transition-transform duration-500` on the "MyNanny Way" comparison card. The built codebase omits this hover effect.
- **Vetting Bento Grid Styling**: The design uses a mix of `bg-white/10 backdrop-blur-xl` for large cards and `bg-white/5` with `hover:bg-white/10 transition-colors` for small cards. The built code simplifies this and just uses `bg-white/5` for all (except the primary colored one) without backdrop blur or hover effects.

### Missing Animations/Interactions
- **Card Lift Hover Effect**: The design has custom JS that adds a `translateY(-8px)` lift on hover to all elements with the `.double-bezel` class. The built code does not replicate this global micro-interaction.

### Missing Images
- **WRONG IMAGE USED**: In the Safety Features section, the built codebase incorrectly re-uses the App Dashboard mobile mockup image (`...ZVD3ppR8h8zidTjx...`) instead of the correct image specified in the design (A professional Kenyan nanny reading a book to two children - `...EIZxkMWF8Ykrb...`).

### Data/Content Differences
- None.

## Page 4: Services

### Missing Sections
- None.

### Missing Elements
- **"Slide to Reveal" Badge**: The Before/After image slider in the design includes a floating label (`<div class="... animate-nudge">Slide to Reveal</div>`) which nudges back and forth to prompt the user. This is completely missing from the built code.

### Copy Differences
- **Pricing Calculator Total Context**: The design shows a disclaimer (`*Pricing may vary based on specific home size and requirements`) under the total. The built code replaces this with a dynamic formula readout (e.g., `Full Day Nanny × 3 days`).
- **Pricing Table Notes**:
  - *Standard Day Nanny*: Design has "Includes light housekeeping", built code has "Includes lunch break".
  - *Deep Cleaning (1BR)*: Design has "All equipment provided", built code has "Products included".
  - *Elderly Companion*: Design has "12-hour coverage", built code has "8-hour shift".
  - *Post-Construction*: Design has "Intensive debris removal", built code has "Min 500 sq ft".

### Style Deviations
- **Tabbed Navigation Styles**: The design uses text tabs with a primary-colored bottom border underline for the active state (`.tab-active::after`). The built code replaces this design with filled pill-shaped buttons (`bg-primary text-white rounded-full`).
- **Before/After Slider Handle**: The design implements a custom CSS handle (`content: '↔'`) for the slider. The built code replaces this with a Material Symbol icon (`drag_indicator`) inside a white circle.
- **Added Elements**: The built code adds "Before" and "After" pill badges to the slider image, which were not present in the original design HTML. The built code also adds a footer paragraph to the Pricing Table ("Rates effective July 2026...") which is not in the design HTML.

### Missing Animations/Interactions
- The `animate-nudge` CSS animation for the "Slide to Reveal" text is missing since the text itself was omitted.

### Missing Images
- Images match perfectly.

### Data/Content Differences
- None.

## Page 5: Join
*Note: This page has massive structural and content deviations from the provided HTML design. The built codebase implemented an entirely different set of sections.*

### Missing Sections
- **Hero Profile Preview Card**: The design includes a right-column profile card ("Mary Wanjiku") showcasing earnings, ratings, and verifications. This is missing.
- **Earnings Comparison Slab**: The design has a section comparing take-home pay (60% Traditional Bureau vs 92% MyNanny). This entire section is missing.
- **Zig-Zag Values**: The design features a zig-zag layout detailing "Safety", "Fair Pay", and "Respect" with large images. This is completely missing.
- **Onboarding Process (5 Steps)**: The design has a horizontal 5-step onboarding guide. This is missing.
- **SOS Feature Pulse**: The design features a large, interactive SOS button pulse demonstration. This is entirely missing.
- **FAQ Section**: The design includes an accordion FAQ section for workers. This is missing.

### Missing Elements
- **Hero Avatars**: The design hero includes 3 overlapping worker avatars and a "2,400+ Nannies" statistic. The built code hero is a simple centered text block.

### Added Sections (Not in Design)
- **Benefits Grid**: The built code adds a 6-item grid of benefits that replaces the Zig-Zag values.
- **Earnings Calculator**: The built code adds an interactive earnings calculator with a slider for years of experience. This was not in the design HTML.
- **Application Form**: The built code includes a full inline application form with inputs and CV upload. The design only had a "Start your application" CTA button linking out.

### Copy Differences
- Everything is different because the sections are entirely different.

### Style Deviations
- The entire page structure does not align with the provided design.

### Missing Animations/Interactions
- The SOS Pulse animation (`sos-pulse` and `pulse-ring` keyframes) is missing because the section is omitted.

### Missing Images
- All images from the design for this page are missing, because the sections containing them were not built.

## Page 6: Guides

### Missing Sections
- **Newsletter Slab**: The design includes a dark "Plum Slab" at the bottom for newsletter signup (`One useful email a month.`). This is missing from the built code.
- **Pagination**: The design includes a pagination component below the article grid. This is completely missing.
- **Floating Action Button (FAB)**: The design includes a fixed bottom-right help FAB. This is completely missing.

### Missing Elements
- **Inline Search Bar**: The design features a large search input (`Search guides...`) in the Hero header. This is missing from the built code.
- **Article Authors**: The design includes author names, avatars, and roles for the featured article and every grid article (e.g. `Wanjiku Maina`). The built code completely removed the concept of authors.
- **Breadcrumbs**: The design hero includes breadcrumbs (`Home > Guides`). The built code omits this.

### Copy Differences
- **Category Filters**: The design uses `All Guides`, `Hiring guides`, `Pricing`, `Worker resources`, `Home care`. The built code uses `All`, `Legal`, `Maintenance`, `Interviews`, `Guides`.

### Style Deviations
- **Hero Layout**: The design hero is left-aligned with breadcrumbs and the search bar. The built code hero is center-aligned.
- **Featured Article Link**: The design has "Read full guide" in primary color. The built code has "Read More" in brand-pink.

### Missing Animations/Interactions
- The FAB tooltip hover interaction is missing.

### Missing Images
- **Author Avatars**: All 6 author portrait images from the design are missing because the author elements were removed from the cards.

### Data/Content Differences
- The built codebase replaces the design's mock article data with completely different mock article data (though the featured image `https://images.unsplash.com/...` instead of the Google user content image used in the design).

## Page 7: Article

### Missing Sections
- **Author Bio Card**: The design features a large "About Sarah Wanjiku" bio card at the end of the article. This section is missing.
- **Previous/Next Links**: The design has a "Prev/Next Split" block linking to other articles. This section is missing.

### Missing Elements
- **Scroll Progress Bar**: The design features a fixed top `scroll-progress` bar that fills as the user scrolls. This is missing.
- **Social Share Buttons**: The design includes buttons to share via WhatsApp, Link copy, and Email in the header. These are completely missing from the built code.
- **Sidebar Author Bio**: The design features a small author bio in the sidebar. This was omitted from the built code.
- **Mid-Article CTA**: The design features a highly-styled CTA component ("Ready to hire?") injected in the middle of the article prose. The built code uses a standard markdown block and lacks this section.

### Copy Differences
- **Breadcrumbs**: The design uses `Home > Guides > Hiring > What does a nanny cost...`. The built code uses `Guides > Guides > Nanny Costs in Nairobi...`.
- **Author**: The design uses `Sarah Wanjiku`. The built code uses `MyNanny Editorial`.

### Style Deviations
- **Sidebar CTA**: The design uses `bg-inverse-surface` (dark background) with a blurred primary highlight effect. The built code uses `double-bezel` with `bg-brand-pink/5` (light pink background).

### Missing Animations/Interactions
- The Javascript scroll progress bar listener and its corresponding CSS transformations are omitted.
- The `animate-rise-in` entrance animations applied to all major blocks in the design are missing in the built code (the page loads statically without Framer Motion or CSS animations).

### Missing Images
- The main hero image URL does not match the design.
- The author (Sarah Wanjiku) avatars are missing because the author sections were removed.

## Design System Deviations
(Compared `DESIGN.md` specification against `src/app/globals.css` implementation)

1. **Background Color:** `DESIGN.md` explicitly specifies `#F5F4F8` (a soft grey-lavender) as the background under "Surface Strategy", but `globals.css` uses `--color-surface` (`#fff7ff`) for the `body` background.
2. **Double-Bezel Border Color:** `DESIGN.md` specifies `#ECEAF1` for all structural borders and the outer ring of double-bezel cards. `globals.css` uses `color-mix(in srgb, var(--color-outline-variant) 30%, transparent)` which evaluates to a reddish tint (since outline-variant is `#e3bdc1`).
3. **Missing Specific Color Variables:** `globals.css` is missing some specific colors mentioned in the typography and component sections of `DESIGN.md`:
   - `Ink-500` (`#7A7385`) for secondary body text
   - Teal (`#19BCCB`) for input field focus states
   - Checkmark category chip background (`#FFF1F6`)
4. **Button Components:** `globals.css` does not include specific button component classes that match the detailed descriptions in `DESIGN.md` (e.g., the primary button with the nested 36px white circle and pink arrow icon).
