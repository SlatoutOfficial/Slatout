# Slatout Agency Design System & Guidelines

This document defines the visual system, typography, colors, layout rules, and design tokens for the Slatout digital portfolio. It serves as a persistent guide to ensure visual excellence, premium polish, and brand consistency.

---

## 1. Visual Direction & Design Philosophy

Slatout is built upon a **Warm Editorial Minimalist** aesthetic (referred to as the **Alabaster System**). This direction blends the clean structure of high-end Swiss print layout design with modern interactive micro-animations.

*   **Aesthetic Identity**: Sophisticated, editorial, light, warm, and highly tactile.
*   **Avoid**: Hard, high-contrast black-and-white grids, generic cold SaaS blues, and overused Tailwind grey cards.
*   **Signature Elements**: Warm alabaster backgrounds, rich typography with tight tracking, subtle orange primary CTA accents, custom liquid-glass card surfaces, and snappy, spring-based scroll reveals.

---

## 2. Typography & Fonts

Typography is the core of Slatout's editorial feel. It uses native system sans-serif font fallbacks (inter, system-ui) optimized for high readability, paired with a custom casual script font for humanistic touches.

### Core Fonts
1.  **System Sans-Serif**: Used for all main editorial copy, headings, and interface labels. High legibility, neutral-warm posture.
2.  **Signature Script (Caveat)**: Loaded via `@import` from Google Fonts and bound to `.font-signature`. Used exclusively for secondary visual annotations, team signatures, or hand-drawn highlight notes.

### Typography Hierarchy (Tailwind Layer Components)
These classes are defined globally in `src/app/globals.css`:

*   **`.type-hero`**: Used for page-level headers.
    *   *Styling*: `font-medium leading-[1.08] tracking-[-0.03em]`
*   **`.type-section`**: Used for section headers.
    *   *Styling*: `font-medium leading-[1.1] tracking-[-0.03em]`
*   **`.type-card-title`**: Used for card titles and component headers.
    *   *Styling*: `font-semibold tracking-tight leading-snug`
*   **`.type-nav`**: Used for navigation triggers.
    *   *Styling*: `font-medium`
*   **`.type-button`**: Used for button triggers and interactive controls.
    *   *Styling*: `font-medium`
*   **`.type-body`**: Used for regular descriptive paragraphs.
    *   *Styling*: `font-normal leading-relaxed text-gray-600`
*   **`.type-caption`**: Used for tags, micro-labels, and small footer texts.
    *   *Styling*: `font-normal text-xs`
*   **`.type-label`**: Used for uppercase section identifiers.
    *   *Styling*: `font-semibold uppercase tracking-wide text-xs`

---

## 3. Color System

Slatout uses a warm, custom-tailored color palette. Do not inject saturated primary colors outside this range.

### Neutral Palette (Alabaster Warmth)
*   **Primary Background**: `#FAF8F5` (Warm Alabaster). This is the default background for all pages, sections, and body elements.
*   **Secondary Surface Background**: `rgba(255, 255, 255, 0.75)` (Frosted White, with `backdrop-blur`).
*   **Muted Panel Background**: `rgba(244, 241, 237, 0.5)` or `rgba(240, 238, 233, 0.3)`.
*   **Text colors**:
    *   Primary Headings: `#1A1A24` (Deep Charcoal, softer than pure black).
    *   Body text: `#4D4D54` or `#60606A` (Warm Charcoal/Gray).
    *   Disabled/Placeholder text: `#9A9A9F` (Muted Gray).

### Accent Colors
*   **Primary Accent**: `#F26522` (Slatout Orange) — Used for primary CTA buttons, progress bars, active link states, and interactive hover highlights.
*   **Hover Accent**: `#FE7004` (Slightly lighter, vibrant orange).
*   **Background Tint**: `#F26522/10` (Light orange wash, used for active navigation pill backgrounds).

### Custom Gradient Options (Icon Backdrops)
Gradients are used strictly inside small icon containers or badge backdrops to denote products or services:
*   `from-orange-500 to-amber-400`
*   `from-rose-500 to-orange-400`
*   `from-amber-500 to-yellow-400`
*   `from-red-500 to-rose-400`
*   `from-orange-500 to-pink-500`
*   `from-purple-500 to-indigo-400`
*   `from-indigo-500 to-cyan-400`
*   `from-emerald-500 to-teal-400`

---

## 4. Layout, Spacing & Container Widths

Consistent vertical and horizontal grids prevent visual fatigue and maintain the premium layout.

### Container Constraints
*   **Desktop Max Width**: `max-w-[1280px]` (standard header/navbar content width) or `max-w-[1440px]` (standard full page section limits).
*   **Outer Layout Margins**: `px-4 sm:px-6 lg:px-8` (responsively scales margins for mobile, tablet, and desktop).

### Vertical Spacing Scale
*   **Section Gaps**: `py-16 sm:py-24` (creates breathing room between sections).
*   **Hero Section Top Padding**: `pt-28 sm:pt-36` (accommodates the sticky floating header).
*   **Component Gaps**: `gap-3` (small card items) | `gap-6` (regular grids) | `gap-10` (section header to content gaps).

---

## 5. UI Elements & Components

### Buttons & Interactive Controls (CTA System)
Centralized in `src/components/CtaSystem.tsx`. **Do not write inline Tailwind styles for buttons.**
*   **Primary CTA**: Rounded pill (`rounded-full`) with `#F26522` background. Contains a unique dual-sliding text effect on hover and a circular white arrow badge that rotates 45 degrees.
*   **Secondary CTA**: Rounded pill (`rounded-full`) with a thin border (`border-gray-300`) and a static right arrow. Inverted variant (`dark`) for dark/gradient backdrops.
*   **Text CTA**: Inline link with an animated growing underline (`scale-x-0` to `scale-x-100` on hover) and an arrow icon.
*   **Card CTA**: Smaller version of the Text CTA for card footers.

### Card Surfaces
Cards must avoid generic solid gray boxes. Use one of these two options:
1.  **Warm Neutral Card**: White or light cream background (`bg-white` or `bg-white/60`), thin border (`border-gray-150/70`), and soft, flat shadows (`shadow-[0_8px_30px_rgba(0,0,0,0.03)]`).
2.  **Liquid-Glass Card**: Defined in `globals.css` (`.liquid-glass`). It features a subtle semi-transparent white background, a `backdrop-blur-md` blur effect, and a 1px border gradient mimicking physical glass reflections.

### Border Radius Constants
*   **Floating Navbar Pill**: `rounded-full`.
*   **Cards and Dynamic Panels**: `rounded-2xl` (1rem / 16px) or `rounded-3xl` (1.5rem / 24px) for softer, premium shapes.
*   **CTA Buttons**: `rounded-full` (pill shape).
*   **Icon Containers**: `rounded-xl` (0.75rem / 12px).

---

## 6. Icons & Media

*   **Icons**: Rendered exclusively via `lucide-react`. Ensure icons use a consistent stroke weight (`stroke-[2]` or `stroke-[2.25]`).
*   **Image Aspect Ratios**: Use clean ratios for grids: `aspect-square`, `aspect-[3/2]`, or `aspect-[4/3]`.
*   **Video Placeholders**: Featured case studies use high-definition auto-playing, muted, looped inline videos (`playsInline`) with rounded corners and scale transforms on card hover.

---

## 7. Animation & Interaction Principles

Micro-interactions are snappy, responsive, and GPU-accelerated.

### Transition Timings & Curves
These timing curves are centralized in `globals.css`:
*   **Standard Snappy**: `transition-colors duration-250` or `duration-300`.
*   **Cubic Ease Out (Expo)**: `ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`) for card entrances, panel opens, and button scale transforms.
*   **Custom Fluid**: `ease-custom` (`cubic-bezier(0.25, 0.1, 0.25, 1)`) for hover reveals and submenus.

### Scroll Reveal Guidelines (Framer Motion)
Centralized in `src/components/Motion.tsx`. Wrap elements in:
*   `FadeUp`: Animates opacity (`0` to `1`) and translates vertical coordinates (`y: 8px` to `y: 0`).
*   `StaggerContainer` + `StaggerChild`: Delays card entrance transitions sequentially across grids.
*   `CountUp`: Automatically animates numerical metrics using springs (`damping: 40`, `stiffness: 150`) when scrolled into view.

---

## 8. Accessibility & Semantics

*   **HTML Elements**: Always use appropriate tags (`<header>`, `<main>`, `<section>`, `<nav>`, `<aside>`, `<footer>`).
*   **Aria Labels**: Any button without a text label (such as the mobile hamburger toggle) must have an explicit `aria-label`.
*   **Keyboard Controls**: Trigger states should handle mouse and touch events uniformly.
*   **Contrast**: Keep text readable against the alabaster background; body copy should be no lighter than `#60606A` (Tailwind `text-gray-600`).
