# Slatout Agency UI Development & Implementation Rules

This document outlines strict implementation rules for developers building or modifying components on the Slatout website. All code changes must align with these rules to keep the codebase clean, performant, and visually consistent.

---

## 1. Core Architecture Guidelines

### Next.js & React Structure
*   **App Router Standard**: Follow Next.js App Router patterns. Keep pages server-rendered by default, and isolate client-side interactions to dedicated client components (using the `"use client"` directive).
*   **Keep Client Components Lightweight**: Only apply `"use client"` when component rendering requires React hooks (`useState`, `useEffect`, `useRef`), Framer Motion animations, or routing features (like `usePathname`).
*   **Reuse Existing Components**:
    *   Do not create new button HTML tags or custom styled anchors. Use `PrimaryCta`, `SecondaryCta`, `TextCta`, or `CardCta` from `src/components/CtaSystem.tsx`.
    *   Do not write custom motion wrapper divs. Import and wrap your elements in components from `src/components/Motion.tsx` (`FadeUp`, `ScaleIn`, `StaggerContainer`, `CountUp`).

---

## 2. Styling Rules & Token Enforcement

### Color Standard
*   **No Random Colors**: Do not inject custom hex codes or inline styling colors. All elements must follow Slatout's core color definitions:
    *   Main background is `#FAF8F5`.
    *   Heading text is deep charcoal `#1A1A24`.
    *   Brand accent color is orange `#F26522` (hover `#FE7004`).
*   **Strict Tailwind Usage**: Avoid writing custom background utility colors inside component files (such as `bg-red-500` or `bg-blue-600`) unless they are part of the defined service/product color mappings.

### Typography Consistency
*   **Never Hardcode Font Weights or Sizes**: Use the typography component classes defined in `globals.css` (`.type-hero`, `.type-section`, `.type-card-title`, `.type-body`, etc.) rather than manually repeating Tailwind sizing elements (like `text-5xl font-extrabold tracking-tight`).
*   **Signature Font Constraint**: Limit `.font-signature` (Caveat) to short visual embellishments or annotations. Never use it for buttons, navigation links, or standard paragraphs.

### Shadows & Borders
*   **Shadows**: Use soft, light grey shadows for white cards: `shadow-[0_8px_30px_rgba(0,0,0,0.03)]`. Avoid Tailwind's dark, heavy default shadows.
*   **Borders**: Use thin, light borders for card edges or dividers: `border-gray-150/70` or `border-gray-200/50`.
*   **Border Radii**:
    *   Buttons: `rounded-full`
    *   Cards/Panels: `rounded-2xl` (16px) or `rounded-3xl` (24px)
    *   Do not use arbitrary border-radius classes like `rounded-lg` or `rounded-md` on major cards.

---

## 3. Layout & Visual Composition Rules

### Avoid Card Grid Fatigue
*   **Varied Visual Grids**: Do not use repetitive 3-column or 4-column card layouts across every section of the page. Mix structures to maintain visual interest:
    *   Use asymmetric layouts (e.g., split 60/40 blocks).
    *   Implement vertical scrolling stacks with sticky sidebar details.
    *   Use interactive components (like the `ServiceCube` and carousel models) to display complex details.
*   **Symmetry and Proportions**: Ensure container margins are consistently set using responsive padding: `px-4 sm:px-6 lg:px-8` and section vertical spacing remains uniform (`py-16 sm:py-24`).

### Intentional Responsive Design
*   **Mobile Layouts**: Do not simply stack every grid item vertically on mobile. Make mobile wraps clean and compact:
    *   Use overflow touch sliders (`flex overflow-x-auto scrollbar-none snap-x`) for horizontal scrolling carousels on mobile instead of long, vertical card stacks.
    *   Hide complex desktop WebGL/heavy canvas elements on mobile devices to optimize memory and battery usage.
*   **Flexible Text Wrap**: Add hyphen support (`break-words`) or clamp headings to prevent layout issues on narrower screens.

---

## 4. Interaction, Animation & Transitions

*   **Subtle & Purposeful**: Animations must be used sparingly to draw attention to hierarchy, not to distract. Keep transitions smooth and fast.
*   **Timing Curves**: All transitions must use the custom easing classes:
    *   Snappy changes: `duration-250` or `duration-300`.
    *   Entrances & slides: `ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`).
    *   Interactive reveals: `ease-custom` (`cubic-bezier(0.25, 0.1, 0.25, 1)`).
*   **Reduced Motion**: Always respect system preferences for animations. Utilize Framer Motion's `useReducedMotion()` hook to disable physical translations (`y` and `x` offsets) for users who prefer reduced motion.

---

## 5. Performance & Quality Control

*   **HTML Semantics**: Maintain clean markup. Avoid using generic `div` trees; write descriptive HTML5 components (`<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`).
*   **Icons**: Standardize on `lucide-react`. Do not import custom SVG raw markup for standard icons, and keep sizes uniform (typically `size={18}` or `size={20}`).
*   **Assets & Media**:
    *   Always utilize Next.js `<Image />` component with correct width, height, and alt tags.
    *   Auto-playing videos must always be marked as `muted`, `loop`, and `playsInline` to ensure background loading support in all mobile browsers.
