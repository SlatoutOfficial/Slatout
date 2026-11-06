"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Star, UserRound } from "lucide-react";
import { useReducedMotion } from "framer-motion";

type ServiceKey = "setup" | "tech" | "offline" | "brand" | "content" | "digital" | "market" | "prog" | "bd" | "fin";

type Review = {
  name: string;
  role: string;
  business: string;
  industry: string;
  services: ServiceKey[];
  rating: number;
  quote: string;
  highlight: string;
  cameWith: string;
  leftWith: string;
};

const serviceInfo: Record<ServiceKey, { slug: string; label: string; tint: string; deep: string }> = {
  setup: { slug: "business-setup-registration", label: "Business Setup", tint: "#E3EEDC", deep: "#2E5B34" },
  tech: { slug: "technology-ai-solutions", label: "Technology & AI", tint: "#E2E6FF", deep: "#3140A3" },
  offline: { slug: "offline-business-launch", label: "Offline Launch", tint: "#F4EAD8", deep: "#6E5320" },
  brand: { slug: "branding-marketing", label: "Branding", tint: "#FBE1E6", deep: "#A1324C" },
  content: { slug: "content-strategy", label: "Content Strategy", tint: "#FFF3CC", deep: "#7A5900" },
  digital: { slug: "digital-marketing", label: "Digital Marketing", tint: "#D8F2EA", deep: "#126B5A" },
  market: { slug: "ecommerce-marketplace-growth", label: "Marketplaces", tint: "#EDE3FB", deep: "#5C3C9F" },
  prog: { slug: "programmatic-advertising", label: "Programmatic Ads", tint: "#DDEFFB", deep: "#175C88" },
  bd: { slug: "business-development-outsourcing", label: "BD Outsourcing", tint: "#FFE6D1", deep: "#A2470F" },
  fin: { slug: "finance-tax-compliance", label: "Finance & Tax", tint: "#DDEDEC", deep: "#24555A" },
};

// Placeholder stories only. Replace with real reviews approved for publication.
const reviews: Review[] = [
  {
    name: "Meera Nambiar", role: "Founder", business: "Packaged-food startup", industry: "Food & beverage",
    services: ["setup", "brand", "market"], rating: 5,
    quote: "I used to chase five different vendors for one launch. Now there is one team, one plan, and I always know what happens next.",
    highlight: "one team, one plan", cameWith: "A product ready to sell, but no company, brand or sales channel.",
    leftWith: "A registered business, a brand identity and a live online store.",
  },
  {
    name: "Arjun Deshpande", role: "Owner", business: "Multi-clinic healthcare practice", industry: "Healthcare",
    services: ["offline", "digital"], rating: 5,
    quote: "The opening felt organised instead of chaotic, and the enquiries started arriving before we had even cut the ribbon.",
    highlight: "organised instead of chaotic", cameWith: "A new location opening in six weeks with nothing ready.",
    leftWith: "A launch plan, local marketing and a steady stream of enquiries.",
  },
  {
    name: "Kavya Reddy", role: "Director", business: "B2B manufacturing company", industry: "Manufacturing",
    services: ["bd", "content"], rating: 5,
    quote: "Our sales team now spends its time in conversations, not on research. The pipeline finally looks like something we can plan around.",
    highlight: "conversations, not on research", cameWith: "Prospecting that happened in bursts, whenever the team had time.",
    leftWith: "A target-account list, weekly outreach and a tracked pipeline.",
  },
  {
    name: "Rohan Malhotra", role: "Co-founder", business: "SaaS startup", industry: "Software",
    services: ["tech", "brand", "prog"], rating: 5,
    quote: "They asked about the business problem before they mentioned a single tool. That one habit saved us months.",
    highlight: "business problem before they mentioned a single tool", cameWith: "A product idea, a long feature list and no clear order of work.",
    leftWith: "A scoped build, a matching brand and campaigns ready to go.",
  },
  {
    name: "Farhan Qureshi", role: "Owner", business: "Retail brand, three stores", industry: "Retail",
    services: ["offline", "brand", "fin"], rating: 5,
    quote: "Accounts, branding and store openings used to sit in different inboxes. Having them in one place changed how calmly I run the business.",
    highlight: "in one place", cameWith: "Three stores, three sets of paperwork and no common brand.",
    leftWith: "A consistent brand, clean books and a compliance calendar.",
  },
  {
    name: "Ananya Bhattacharya", role: "Founder", business: "Professional services firm", industry: "Professional services",
    services: ["fin", "setup"], rating: 5,
    quote: "Clear scope, clear timelines and no surprises. I did not have to learn the rules, I just had to answer their questions.",
    highlight: "no surprises", cameWith: "A growing practice with an informal structure and untidy filings.",
    leftWith: "The right entity, registrations in order and monthly finance routines.",
  },
];

function Avatar({ review, size }: { review: Review; size: number }) {
  const service = serviceInfo[review.services[0]];
  return (
    <span className="rv-av" style={{ "--w": `${size}px`, "--t": service.tint, "--d": service.deep } as React.CSSProperties} aria-hidden="true">
      <UserRound />
    </span>
  );
}

function ReviewCard({ review, index, active, onSelect }: { review: Review; index: number; active: boolean; onSelect: (index: number, userAction: boolean) => void }) {
  const highlightedAt = review.quote.indexOf(review.highlight);
  return (
    <article
      className={`rv-slide${active ? " on" : ""}`}
      id={`review-slide-${index}`}
      role="tabpanel"
      aria-labelledby={`review-tab-${index}`}
      aria-label={`Review ${index + 1} of ${reviews.length}`}
      aria-hidden={!active}
      onClick={(event) => {
        if (!active) {
          event.preventDefault();
          onSelect(index, true);
        }
      }}
    >
      <dl className="rv-project">
        <div><dt>Industry</dt><dd>{review.industry}</dd></div>
        <div><dt>Services used</dt><dd className="rv-chips">
          {review.services.map((key) => {
            const service = serviceInfo[key];
            return <a className="rv-chip" key={key} href={`/services/${service.slug}/`} tabIndex={active ? 0 : -1} style={{ "--t": service.tint, "--d": service.deep } as React.CSSProperties}><i />{service.label}</a>;
          })}
        </dd></div>
        <div><dt>Came with</dt><dd>{review.cameWith}</dd></div>
        <div className="rv-result"><dt>Left with</dt><dd>{review.leftWith}</dd></div>
      </dl>
      <div className="rv-details">
        <div className="rv-person">
          <Avatar review={review} size={58} />
          <div className="rv-name"><b>{review.name}</b><span>{review.role}, {review.business}</span></div>
          <span className="rv-permission"><Check aria-hidden="true" />Shown with permission</span>
        </div>
        <div className="rv-rating" role="img" aria-label={`${review.rating} out of 5`}>
          <span className="rv-stars">{Array.from({ length: 5 }, (_, star) => <Star className={star < review.rating ? "" : "off"} key={star} aria-hidden="true" />)}</span>
          <b>{review.rating}.0</b>
        </div>
        <blockquote className="rv-quote">
          “{highlightedAt >= 0 ? <>{review.quote.slice(0, highlightedAt)}<mark>{review.highlight}</mark>{review.quote.slice(highlightedAt + review.highlight.length)}</> : review.quote}”
        </blockquote>
      </div>
    </article>
  );
}

export default function ClientReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);
  const [trackAnimating, setTrackAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const selectReview = (index: number, userAction = false) => {
    const next = (index + reviews.length) % reviews.length;
    if (next === activeIndex) return;
    setActiveIndex(next);
    setTrackAnimating(true);
    if (userAction) {
      setPlaying(false);
      setProgressKey((key) => key + 1);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, order) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        if (entry.target === viewport) setStarted(true);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    section.querySelectorAll(".rv-fade").forEach((element, index) => {
      (element as HTMLElement).style.transitionDelay = `${(index % 3) * 80}ms`;
      revealObserver.observe(element);
    });

    const measure = () => {
      const firstSlide = track.firstElementChild as HTMLElement | null;
      if (!firstSlide) return;
      setTrackOffset((viewport.clientWidth - firstSlide.offsetWidth) / 2 - activeIndex * (firstSlide.offsetWidth + 28));
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    if (track.firstElementChild) resizeObserver.observe(track.firstElementChild);
    measure();

    return () => {
      revealObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [activeIndex]);

  const handleAnimationEnd = () => {
    if (playing && !paused && !reduceMotion) {
      setProgressKey((key) => key + 1);
      setTrackAnimating(true);
      setActiveIndex((index) => (index + 1) % reviews.length);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let next = -1;
    if (event.key === "ArrowRight") next = activeIndex + 1;
    else if (event.key === "ArrowLeft") next = activeIndex - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = reviews.length - 1;
    if (next < 0) return;
    event.preventDefault();
    selectReview(next, true);
    document.getElementById(`review-tab-${(next + reviews.length) % reviews.length}`)?.focus();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
  };
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) > 60) selectReview(activeIndex + (distance < 0 ? 1 : -1), true);
  };

  const activeNumber = (activeIndex + 1).toString().padStart(2, "0");
  const totalNumber = reviews.length.toString().padStart(2, "0");
  const autoplay = playing && started && !reduceMotion;

  return (
    <section className="rv" id="clients" aria-labelledby="rv-heading" ref={sectionRef}>
      <div className="rv-wrap">
        <header className="rv-heading rv-fade">
          <p className="rv-kicker">Client reviews</p>
          <h2 id="rv-heading">What our clients say</h2>
          <p>Founders and business owners on working with one team across setup, build, growth and finance, with one plan and one point of contact.</p>
          <span className="rv-sample">Sample content · replace with real, permitted reviews</span>
        </header>

        <div className="rv-tabs rv-fade" role="tablist" aria-label="Choose a review" onKeyDown={handleKeyDown}>
          {reviews.map((review, index) => (
            <button
              className="rv-tab"
              id={`review-tab-${index}`}
              key={review.name}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={`review-slide-${index}`}
              aria-label={`${review.role}, ${review.business}`}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => selectReview(index, true)}
            >
              <Avatar review={review} size={52} />
            </button>
          ))}
        </div>

        <div
          className={`rv-viewport rv-fade${paused ? " hold" : ""}`}
          ref={viewportRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client reviews"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { swipeStart.current = null; }}
        >
          <div
            className={`rv-track${trackAnimating && !reduceMotion ? " go" : ""}`}
            ref={trackRef}
            style={{ transform: `translateX(${trackOffset}px)` }}
            onTransitionEnd={(event) => { if (event.propertyName === "transform") setTrackAnimating(false); }}
          >
            {reviews.map((review, index) => <ReviewCard key={review.name} review={review} index={index} active={index === activeIndex} onSelect={selectReview} />)}
          </div>
        </div>

        <div className="rv-controls rv-fade">
          <div className="rv-control-row">
            <button className="rv-arrow" type="button" aria-label="Previous review" onClick={() => selectReview(activeIndex - 1, true)}><ArrowLeft aria-hidden="true" /></button>
            <span className="rv-count" aria-hidden="true"><b>{activeNumber}</b> / {totalNumber}</span>
            <button className="rv-arrow" type="button" aria-label="Next review" onClick={() => selectReview(activeIndex + 1, true)}><ArrowRight aria-hidden="true" /></button>
          </div>
          <div className={`rv-progress${paused ? " paused" : ""}`} aria-hidden="true">
            <i key={progressKey} className={autoplay ? "run" : ""} onAnimationEnd={handleAnimationEnd} />
          </div>
        </div>
      </div>
    </section>
  );
}
