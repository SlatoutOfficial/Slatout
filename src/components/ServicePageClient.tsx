"use client";

import React, { useEffect } from "react";

interface ServiceData {
  slug: string;
  title: string;
  attr: string;
  scripts: string[];
  html: string;
}

export default function ServicePageClient({ service }: { service: ServiceData }) {
  // Extract classes, styles, and data-scope from service.attr
  const classMatch = service.attr.match(/class="([^"]+)"/);
  const scopeMatch = service.attr.match(/data-scope="([^"]+)"/);
  const styleMatch = service.attr.match(/style="([^"]+)"/);

  const wrapperClass = classMatch ? classMatch[1] : "svc-page r-room";
  const dataScope = scopeMatch ? scopeMatch[1] : undefined;
  const serviceHtml = service.html.replace(
    /<header class="site-header"[\s\S]*?<\/header>/,
    "",
  );

  const styleObj: Record<string, string> = {};
  if (styleMatch) {
    styleMatch[1].split(";").forEach((pair) => {
      const idx = pair.indexOf(":");
      if (idx > -1) {
        const k = pair.slice(0, idx).trim();
        const v = pair.slice(idx + 1).trim();
        if (k && v) styleObj[k] = v;
      }
    });
  }

  useEffect(() => {
    // 1. Update document title
    if (service.title) {
      document.title = service.title.replace(/&amp;/g, "&");
    }

    // 2. Set navigation helper
    (window as any).__nav = (url: string) => {
      window.location.href = url;
    };

    // 3. Update body classes & inline styles
    const classes = wrapperClass.split(" ").filter(Boolean);
    classes.forEach((c) => document.body.classList.add(c));

    if (dataScope) {
      document.body.setAttribute("data-scope", dataScope);
    }

    Object.entries(styleObj).forEach(([k, v]) => {
      document.body.style.setProperty(k, v);
    });

    // 4. Load & execute interactive scripts in sequence
    let isMounted = true;
    const scriptUrls = (service.scripts || []).map((s) => `/scripts/${s}`);

    async function initScripts() {
      for (const url of scriptUrls) {
        if (!isMounted) break;
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const code = await res.text();
          if (isMounted) {
            try {
              const fn = new Function(code);
              fn();
            } catch (err) {
              console.warn(`[SLATOUT] Script notice for ${url}:`, err);
            }
          }
        } catch (e) {
          console.error(`[SLATOUT] Failed to fetch script ${url}:`, e);
        }
      }
    }

    const timer = setTimeout(() => {
      initScripts();
    }, 50);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      classes.forEach((c) => document.body.classList.remove(c));
      if (dataScope) {
        document.body.removeAttribute("data-scope");
      }
      Object.keys(styleObj).forEach((k) => {
        document.body.style.removeProperty(k);
      });
    };
  }, [service.slug, service.attr, service.title, wrapperClass, dataScope]);

  // Smooth scroll click handler for hash links
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href) return;
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = decodeURIComponent(href.slice(1));
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
        if (
          target.tabIndex < 0 &&
          !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(target.tagName)
        ) {
          target.setAttribute("tabindex", "-1");
        }
        target.focus({ preventScroll: true });
      }
    }
  };

  return (
    <div
      className={`service-page-shell ${wrapperClass}`}
      data-scope={dataScope}
      style={styleObj as React.CSSProperties}
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: serviceHtml }}
    />
  );
}
