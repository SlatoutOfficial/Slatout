# Slatout Agency UI Quality & Validation Checklist

This checklist is used to evaluate the visual and technical quality of new features, pages, or components before merging code or deploying to production.

---

## 1. Visual Quality & Typography Checks

*   [ ] **Alabaster Palette Consistency**: Verify that the page/section backdrop is exactly `#FAF8F5`. Double-check that no legacy cool gray colors (`#F5F5F5` or `#EFEFEF`) remain in the styles.
*   [ ] **Type Scale Hierarchy**: Verify headings use the global components (`.type-hero`, `.type-section`, `.type-card-title`). Confirm text color uses `#1A1A24` (Deep Charcoal) for readability and contrast.
*   [ ] **Signature Placement**: Ensure any elements using `.font-signature` (Caveat font) are annotations and do not contain critical user actions.
*   [ ] **Horizontal Alignment**: Ensure page content aligns exactly with the floating navbar boundaries (`max-w-[1280px]` or `max-w-[1440px]`).
*   [ ] **Icon Consistency**: Verify all icons use `lucide-react`, are centered, and have a consistent stroke weight (`stroke-[2]` or `stroke-[2.25]`).

---

## 2. Desktop & Interaction Quality Checks

*   [ ] **Navbar Popover Centering**: Hover over Services, Case Studies, and Insights dropdown triggers. Ensure the popovers open exactly centered relative to the navbar container and do not shift off-screen on smaller desktop monitors.
*   [ ] **Flicker-Free Hover Bridge**: Verify that moving the mouse quickly from trigger to popover does not cause the dropdown to close or flicker (close delay set to ~180ms).
*   [ ] **CTA Hover States**: Verify primary buttons slide up text on hover and rotate their arrow badge 45 degrees. Verify all secondary/text link lines expand smoothly.
*   [ ] **Active Route Highlight**: Click different nav links and verify the background active pill (`bg-[#F26522]/10`) transitions between them using a spring animation.

---

## 3. Responsive Quality Checks (Tablet & Mobile)

*   [ ] **Tablet Breakpoints (768px - 1024px)**: Check for layout wrapping. Ensure 3-column grids collapse gracefully into 2-columns (or stack) without clipping text.
*   [ ] **Mobile Navigation Drawer**: Open the mobile menu. Ensure the accordion chevrons rotate smoothly when tapped, nested links display clearly, and the primary CTA is pinned to the bottom of the drawer.
*   [ ] **Scrollable Panels**: Verify that horizontal lists on mobile scroll smoothly using swipe gestures and hide scrollbars (`scrollbar-none`).
*   [ ] **Header Padding Offset**: Verify that section headings are not hidden behind the fixed floating header (use padding tops of at least `pt-24` or `pt-28`).

---

## 4. Technical & Browser Quality Checks

*   [ ] **Safari Glassmorphism**: Test backdrop-filter blur effects in Safari. Confirm the CSS rule includes the `-webkit-backdrop-filter` prefix.
*   [ ] **Auto-Playing Media**: Verify all background videos have `muted`, `loop`, and `playsInline` attributes. Test that they load and play automatically on iOS and Android browsers without showing default video controls.
*   [ ] **Framer Motion spring performance**: Verify spring animations do not cause layout thrashing on low-end mobile devices. Ensure `useReducedMotion` is implemented for translation transforms.
*   [ ] **Heavy Component Lazy Loading**: Ensure heavy WebGL, Canvas, or three-dimensional models (such as `HeroShader` or `ServiceCube`) are loaded dynamically in Next.js using `dynamic(() => import(...), { ssr: false })` to keep page load times fast.

---

## 5. SEO & Accessibility Validation

*   [ ] **Semantic Structure**: Check that there is exactly one `<h1>` tag on the page, with section headings logically ordered (`<h2>`, `<h3>`).
*   [ ] **Image Optimization**: Ensure all image elements use the Next.js `<Image />` component with descriptive `alt` tags.
*   [ ] **Aria Labelling**: Check that any icon-only buttons (such as navigation close triggers or hamburger toggles) have descriptive `aria-label` tags.
*   [ ] **Text Contrast**: Verify that all body text copy complies with WCAG AA contrast ratios (no text copy lighter than `#60606A` against the `#FAF8F5` background).
