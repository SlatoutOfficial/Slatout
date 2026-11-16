# Slatout Agency - AI Agent Instructions

When working on this project, please adhere strictly to the following design system, architectural constraints, and brand guidelines to ensure consistency across the codebase.

## 1. Theming & Layout Constraints
- **Mixed Theme Layout:** The website utilizes a strict mixed-theme approach. 
  - **Dark Mode:** ONLY the `Header` (Navbar), `Hero` section, and `Footer` should be in dark mode (backgrounds like `#0D0D0D` or similar deep blacks).
  - **Light Mode:** All other body content sections (e.g., Services, About, Trust, Process) MUST use a clean, light theme background (pure white `#FFFFFF` or light grays like `#F5F5F5` / `#F9F9FB`).
- **Brand Colors:** The primary brand accent color is **Orange (`#F26522`)**. Do NOT use blue (`#2563EB` or `#38BDF8`) or green unless specifically requested. Use the orange for CTAs, active states, bullet points, and hover highlights.

## 2. Design Aesthetics (Apple/Stripe Inspired)
- **Glassmorphism & Depth:** Utilize subtle drop shadows (e.g., `shadow-[0_8px_40px_rgba(0,0,0,0.04)]`), borders (`border-gray-100` for light, `border-white/5` for dark), and backdrop blurs to create a premium, layered feel.
- **Typography:** Ensure clean typography with generous line heights and tracking. Use high-contrast text (`text-gray-900` for headings in light sections, `text-white` for dark sections).
- **Icons:** Always use `lucide-react` for iconography. Maintain consistent stroke widths and sizing.

## 3. Animations & Interactions
- **Micro-Animations:** The site is heavily motion-driven. Rely on the custom `Motion.tsx` components (e.g., `<FadeUp>`, `<StaggerContainer>`, `<StaggerChild>`, `<WordRevealHeading>`) to handle entrance animations. Do NOT introduce new animation libraries unless necessary.
- **Hover Effects:** Interactive elements (buttons, feature cards, links) must have distinct, smooth transition hover states (e.g., subtle scaling `-translate-y-1`, shadow elevation, or background tinting).

## 4. Code & Architecture Standards
- **Framework:** Next.js (App Router), React, Tailwind CSS.
- **Performance:** For 3D/WebGL or heavy interactive components (like the `ServiceCube` or `4D Particle Simulations`), prioritize high-performance, garbage-free JavaScript. Use `dynamic` imports with `ssr: false` for canvas elements to avoid hydration mismatches.
- **Consistency:** When modifying an existing component, always review its current imports and preserve existing custom UI systems (like `<PrimaryCta>`, `<SecondaryCta>`, `<TextCta>`) rather than building raw HTML elements from scratch.

By following these instructions, you will maintain the premium, cinematic quality of the Slatout Agency website.
