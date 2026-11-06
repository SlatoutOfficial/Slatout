"use client";

import React, { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";

const services = [
  { slug: "business-setup-registration", name: "Business Setup", tint: "#E3EEDC", deep: "#2E5B34", stage: "Start", detail: "Structure, registrations, licences and legal documents" },
  { slug: "technology-ai-solutions", name: "Technology & AI", tint: "#E2E6FF", deep: "#3140A3", stage: "Build", detail: "Websites, software, automation and AI" },
  { slug: "offline-business-launch", name: "Offline Launch", tint: "#F4EAD8", deep: "#6E5320", stage: "Start", detail: "Market research, location strategy and local launch" },
  { slug: "branding-marketing", name: "Branding", tint: "#FBE1E6", deep: "#A1324C", stage: "Build", detail: "Brand strategy, visual identity and offline marketing" },
  { slug: "content-strategy", name: "Content Strategy", tint: "#FFF3CC", deep: "#7A5900", stage: "Build", detail: "Pillars, voice, editorial calendar and briefs" },
  { slug: "digital-marketing", name: "Digital Marketing", tint: "#D8F2EA", deep: "#126B5A", stage: "Grow", detail: "SEO, AI-search visibility, paid ads and analytics" },
  { slug: "ecommerce-marketplace-growth", name: "Marketplaces", tint: "#EDE3FB", deep: "#5C3C9F", stage: "Grow", detail: "Seller onboarding, listings, marketplace SEO and ads" },
  { slug: "programmatic-advertising", name: "Programmatic Ads", tint: "#DDEFFB", deep: "#175C88", stage: "Grow", detail: "Real-time buying across display, video, CTV and audio" },
  { slug: "business-development-outsourcing", name: "BD Outsourcing", tint: "#FFE6D1", deep: "#A2470F", stage: "Grow", detail: "B2B research, lead generation and pipeline" },
  { slug: "finance-tax-compliance", name: "Finance & Tax", tint: "#DDEDEC", deep: "#24555A", stage: "Run", detail: "Accounting, GST, audit, payroll and CFO support" },
];

const wordmarkTop = 14;
const wordmarkBase = 190;
const bandHeight = (wordmarkBase - wordmarkTop) / services.length;
const padServiceName = (name: string) => {
  const upper = name.toUpperCase();
  const left = Math.floor((17 - upper.length) / 2);
  return `${" ".repeat(left)}${upper}${" ".repeat(17)}`.slice(0, 17);
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, start: 0, distance: 0 });
  const holdRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [clock, setClock] = useState("--:--");
  const [cordY, setCordY] = useState(96);
  const [newsletterMessage, setNewsletterMessage] = useState("Practical guides on setting up and growing a business in India.");
  const [tip, setTip] = useState<{ index: number; x: number; y: number } | null>(null);

  const selectService = (index: number) => {
    setActiveIndex(index);
    footerRef.current?.style.setProperty("--au", services[index].deep);
  };

  useEffect(() => {
    const footer = footerRef.current;
    const board = boardRef.current;
    if (!footer || !board) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cycle: number | undefined;
    let startTimer: number | undefined;
    let auraFrame = 0;
    const updateClock = () => setClock(new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata",
    }).format(new Date()));
    updateClock();
    const clockTimer = window.setInterval(updateClock, 20000);
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === board) {
          selectService(0);
          startTimer = window.setTimeout(() => {
            cycle = window.setInterval(() => {
              if (!holdRef.current) setActiveIndex((current) => (current + 1) % services.length);
            }, 3200);
          }, 500);
        }
        entry.target.classList.add(entry.target.classList.contains("wm") ? "lit" : "in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    footer.querySelectorAll(".fade, .wm").forEach((element, index) => {
      if (element.classList.contains("fade")) (element as HTMLElement).style.transitionDelay = `${(index % 3) * 90}ms`;
      revealObserver.observe(element);
    });
    const onPointerMove = (event: PointerEvent) => {
      if (reduceMotion || event.pointerType !== "mouse") return;
      cancelAnimationFrame(auraFrame);
      auraFrame = requestAnimationFrame(() => {
        const bounds = footer.getBoundingClientRect();
        footer.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
        footer.style.setProperty("--my", `${event.clientY - bounds.top}px`);
      });
    };
    footer.addEventListener("pointermove", onPointerMove);
    return () => {
      revealObserver.disconnect();
      footer.removeEventListener("pointermove", onPointerMove);
      window.clearInterval(clockTimer);
      if (cycle) window.clearInterval(cycle);
      if (startTimer) window.clearTimeout(startTimer);
      cancelAnimationFrame(auraFrame);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  const startPull = (event: ReactPointerEvent<HTMLButtonElement>) => {
    dragRef.current = { active: true, start: event.clientY, distance: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    cordRef.current?.classList.add("drag");
  };
  const movePull = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current.active) return;
    const distance = Math.max(0, event.clientY - dragRef.current.start);
    dragRef.current.distance = distance;
    setCordY(96 + Math.min(72, distance * 0.8));
    cordRef.current?.classList.toggle("ready", distance > 46);
  };
  const releasePull = () => {
    if (!dragRef.current.active) return;
    const shouldScroll = dragRef.current.distance > 46 || dragRef.current.distance < 4;
    dragRef.current.active = false;
    cordRef.current?.classList.remove("drag", "ready");
    setCordY(96);
    if (shouldScroll) window.setTimeout(scrollToTop, 180);
  };
  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
      setNewsletterMessage("Please enter a valid email address.");
      input.focus();
      return;
    }
    setNewsletterMessage("Thank you. You are on the list.");
    input.value = "";
  };
  const showWordmarkTip = (index: number, event?: ReactPointerEvent<SVGRectElement>) => {
    holdRef.current = true;
    selectService(index);
    if (!event) return;
    const bounds = event.currentTarget.closest(".wm")?.getBoundingClientRect();
    if (bounds) setTip({ index, x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  };

  return (
    <footer className="site-footer ft" ref={footerRef}>
      <div className="ft-cord" ref={cordRef} style={{ "--y": `${cordY}px` } as React.CSSProperties}>
        <svg aria-hidden="true"><line x1="22" y1="0" x2="22" y2={cordY} /></svg>
        <button className="kb" type="button" aria-label="Back to top" onPointerDown={startPull} onPointerMove={movePull} onPointerUp={releasePull} onPointerCancel={releasePull} onClick={scrollToTop}>&uarr;</button>
        <small>{cordY > 132 ? "Let go" : "Pull to go up"}</small>
      </div>
      <div className="wrap">
        <div className="top">
          <div className="fade"><p className="k">Before you go</p><h2>Where is your business <em>headed</em> next?</h2></div>
          <div className="top-r fade"><p>Pick a destination below, or tell us where you are and we will plan the route with you.</p>
            <div className="acts"><Link className="btn" href="/contact/#enquire">Book a strategy call <i aria-hidden="true">&rarr;</i></Link><Link className="btn btn-g" href="/#plan">Plan my route</Link></div>
          </div>
        </div>

        <section className="brd fade" ref={boardRef} aria-label="Departures: the ten Slatout services" onPointerEnter={() => { holdRef.current = true; }} onPointerLeave={() => { holdRef.current = false; }}>
          <div className="brd-h"><span>Slatout departures &middot; <b>ten destinations</b></span><span className="live">Boarding now</span></div>
          <div className="row">
            <span className="gate" style={{ "--t": services[activeIndex].tint, "--d": services[activeIndex].deep } as React.CSSProperties}>{String(activeIndex + 1).padStart(2, "0")}</span>
            <div className="flaps" aria-live="polite" aria-atomic="true" aria-label={services[activeIndex].name}>{padServiceName(services[activeIndex].name).split("").map((character, index) => <div className="fl go" key={`${activeIndex}-${index}`}><span>{character}</span><i /></div>)}</div>
            <Link className="go-b" href={`/services/${services[activeIndex].slug}/`} aria-label={`Explore ${services[activeIndex].name}`}>Board <span aria-hidden="true">&rarr;</span></Link>
          </div>
          <div className="brd-f"><span>Gate <b>{String(activeIndex + 1).padStart(2, "0")}</b> &middot; <b>{services[activeIndex].stage}</b> &middot; <span>{services[activeIndex].detail}</span></span>
            <div className="dots" aria-label="Choose a service">{services.map((service, index) => <button key={service.slug} type="button" className={index === activeIndex ? "on" : ""} style={{ "--t": service.tint } as React.CSSProperties} aria-label={`Show ${service.name}`} onClick={() => selectService(index)} />)}</div>
          </div>
        </section>

        <div className="cols fade">
          <div><h3>Ten services</h3><ul className="svl">{services.map((service, index) => <li key={service.slug}><Link className={index === activeIndex ? "on" : ""} href={`/services/${service.slug}/`} style={{ "--t": service.tint } as React.CSSProperties} onMouseEnter={() => { holdRef.current = true; selectService(index); }} onMouseLeave={() => { holdRef.current = false; }} onFocus={() => { holdRef.current = true; selectService(index); }} onBlur={() => { holdRef.current = false; }}><i />{service.name}</Link></li>)}</ul></div>
          <div><h3>Company</h3><ul><li><Link href="/about/">About Slatout</Link></li><li><Link href="/work/">Case studies</Link></li><li><Link href="/blogs/">Insights</Link></li><li><Link href="/contact/">Contact</Link></li></ul></div>
          <div><h3>Start here</h3><ul><li><Link href="/#plan">Route planner <span className="ar">&rarr;</span></Link></li><li><Link href="/studio/90-day-plan/">90-day plan</Link></li><li><Link href="/services/">All services</Link></li><li><Link href="/#faq">FAQs</Link></li></ul></div>
          <div><h3>New guides by email</h3>
            <form className="sub" onSubmit={submitNewsletter} noValidate><input type="email" name="email" placeholder="you@company.com" aria-label="Your email" autoComplete="email" /><button type="submit">Subscribe</button></form>
            <p className="sub-n" aria-live="polite">{newsletterMessage}</p>
            <div className="soc" aria-label="Slatout on social media">
              <a href="#" aria-label="LinkedIn (add your link)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.6 4.76 6V21h-4v-5.07c0-1.2-.02-2.76-1.7-2.76-1.7 0-1.95 1.32-1.95 2.68V21h-4V9.75Z" /></svg></a>
              <a href="#" aria-label="Instagram (add your link)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg></a>
              <a href="#" aria-label="X (add your link)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" /></svg></a>
              <a href="#" aria-label="YouTube (add your link)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.3.4-3.8.4-3.8s0-2.5-.4-3.8ZM10 15V9l5.2 3L10 15Z" /></svg></a>
            </div>
          </div>
        </div>
      </div>

      <div className={`wm ${tip ? "focus" : "lit"}`} onMouseLeave={() => { holdRef.current = false; setTip(null); }}>
        <svg viewBox="0 0 1000 196" role="img" aria-label="Slatout wordmark made of ten service colours">
          <defs><clipPath id="footer-wordmark-clip"><text x="4" y={wordmarkBase} textLength="992" lengthAdjust="spacingAndGlyphs" className="wordmark-text">SLATOUT</text></clipPath></defs>
          <text x="4" y={wordmarkBase} textLength="992" lengthAdjust="spacingAndGlyphs" className="wordmark-text" fill="#1C1A18">SLATOUT</text>
          <g clipPath="url(#footer-wordmark-clip)">{services.map((service, index) => <rect key={service.slug} className={`sl ${tip?.index === index ? "on" : ""}`} x="-10" width="1020" y={wordmarkTop + index * bandHeight - 0.4} height={bandHeight + 0.8} fill={service.tint} style={{ transitionDelay: `${index * 70}ms` }} />)}{Array.from({ length: 9 }, (_, index) => <rect key={index} x="-10" width="1020" y={wordmarkTop + (index + 1) * bandHeight - 0.9} height="1.8" fill="#0E0D0C" />)}</g>
          {services.map((service, index) => <a key={service.slug} href={`/services/${service.slug}/`} aria-label={service.name} onPointerEnter={(event) => showWordmarkTip(index, event as unknown as ReactPointerEvent<SVGRectElement>)} onPointerMove={(event) => showWordmarkTip(index, event as unknown as ReactPointerEvent<SVGRectElement>)} onFocus={() => showWordmarkTip(index)} onBlur={() => { holdRef.current = false; setTip(null); }}><rect className="hit" x="0" width="1000" y={wordmarkTop + index * bandHeight} height={bandHeight} /></a>)}
        </svg>
        {tip && <span className="tip on" style={{ left: tip.x, top: tip.y, "--t": services[tip.index].tint, "--d": services[tip.index].deep } as React.CSSProperties}><b>{String(tip.index + 1).padStart(2, "0")}</b><span>{services[tip.index].name}</span></span>}
      </div>

      <div className="wrap"><div className="bar">
        <span>&copy; {new Date().getFullYear()} Slatout. All rights reserved.</span>
        <nav aria-label="Legal"><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link><Link href="/sitemap.xml">Sitemap</Link></nav>
        <span className="clk"><i />India &middot; <span>{clock}</span> IST</span>
        <span className="tg">Build beyond business.</span>
      </div></div>
    </footer>
  );
}
