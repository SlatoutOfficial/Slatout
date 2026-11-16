"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Star, UserRound } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { REVIEW_SERVICE_OPTIONS, type ClientReview, type ReviewServiceKey } from "@/data/client-reviews";

type Review = ClientReview;
const serviceInfo = Object.fromEntries(REVIEW_SERVICE_OPTIONS.map((service) => [service.key, service])) as Record<ReviewServiceKey, (typeof REVIEW_SERVICE_OPTIONS)[number]>;

function Avatar({ review, size }: { review: Review; size: number }) {
  const service = serviceInfo[review.services[0]];
  return (
    <span className="rv-av" style={{ "--w": `${size}px`, "--t": service.tint, "--d": service.deep } as React.CSSProperties} aria-hidden="true">
      <UserRound />
    </span>
  );
}

function ReviewCard({ review, index, total, active, clone, onSelect }: { review: Review; index: number; total: number; active: boolean; clone: boolean; onSelect: (index: number, userAction: boolean) => void }) {
  const highlightedAt = review.highlight ? review.quote.indexOf(review.highlight) : -1;
  return (
    <article
      className={`rv-slide${active ? " on" : ""}`}
      id={`review-slide-${clone ? `clone-${index}` : index}`}
      role="tabpanel"
      aria-labelledby={clone ? undefined : `review-tab-${index}`}
      aria-label={`Review ${index + 1} of ${total}`}
      aria-hidden={clone || !active}
      onClick={(event) => {
        if (!active || clone) {
          if ((event.target as HTMLElement).closest("a")) event.preventDefault();
          onSelect(index, true);
        }
      }}
    >
      <dl className="rv-project">
        <div><dt>Industry</dt><dd>{review.industry}</dd></div>
        <div><dt>Services used</dt><dd className="rv-chips">
          {review.services.map((key) => {
            const service = serviceInfo[key];
            return <a className="rv-chip" key={key} href={`/services/${service.slug}/`} tabIndex={active && !clone ? 0 : -1} style={{ "--t": service.tint, "--d": service.deep } as React.CSSProperties}><i />{service.label}</a>;
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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);
  const [trackAnimating, setTrackAnimating] = useState(false);
  const [trackIndex, setTrackIndex] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    fetch("/api/client-reviews", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load client reviews.");
        const data = await response.json();
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const selectReview = (index: number, userAction = false) => {
    if (!reviews.length) return;
    const next = (index + reviews.length) % reviews.length;
    if (next === activeIndex) return;
    setActiveIndex(next);
    setTrackIndex(next + 1);
    setTrackAnimating(!reduceMotion);
    if (userAction) {
      setPlaying(false);
      setProgressKey((key) => key + 1);
    }
  };

  const moveReview = useCallback((direction: -1 | 1, userAction = false) => {
    if (reviews.length < 2) return;
    const wrapsForward = direction > 0 && activeIndex === reviews.length - 1;
    const wrapsBackward = direction < 0 && activeIndex === 0;
    const next = (activeIndex + direction + reviews.length) % reviews.length;
    setActiveIndex(next);
    setTrackIndex(reduceMotion ? next + 1 : wrapsForward ? reviews.length + 1 : wrapsBackward ? 0 : next + 1);
    setTrackAnimating(!reduceMotion);
    if (userAction) {
      setPlaying(false);
      setProgressKey((key) => key + 1);
    }
  }, [activeIndex, reduceMotion, reviews.length]);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section) return;

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
      if (!viewport || !track) return;
      const firstSlide = track.firstElementChild as HTMLElement | null;
      if (!firstSlide) return;
      setTrackOffset((viewport.clientWidth - firstSlide.offsetWidth) / 2 - trackIndex * (firstSlide.offsetWidth + 28));
    };
    const resizeObserver = new ResizeObserver(measure);
    if (viewport) resizeObserver.observe(viewport);
    if (track?.firstElementChild) resizeObserver.observe(track.firstElementChild);
    measure();

    return () => {
      revealObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [trackIndex, reviews.length]);

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
    if (Math.abs(distance) > 60) moveReview(distance < 0 ? 1 : -1, true);
  };

  const activeNumber = (activeIndex + 1).toString().padStart(2, "0");
  const totalNumber = reviews.length.toString().padStart(2, "0");
  const autoplay = reviews.length > 1 && playing && started && !reduceMotion;

  useEffect(() => {
    if (!autoplay || paused) return;
    const timer = window.setTimeout(() => {
      setProgressKey((key) => key + 1);
      moveReview(1);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [autoplay, paused, activeIndex, moveReview]);

  const pauseCarousel = () => {
    setPaused(true);
    setProgressKey((key) => key + 1);
  };
  const resumeCarousel = () => {
    setPaused(false);
    setProgressKey((key) => key + 1);
  };

  if (!reviews.length) return (
    <section className="rv" id="clients" aria-labelledby="rv-heading" ref={sectionRef}>
      <div className="rv-wrap">
        <header className="rv-heading rv-fade">
          <p className="rv-kicker">Client reviews</p>
          <h2 id="rv-heading">What our clients say</h2>
          <p>Founders and business owners on working with one team across setup, build, growth and finance, with one plan and one point of contact.</p>
        </header>
        <div className="rv-empty rv-fade" role="status">
          {loading ? <span>Loading client reviews…</span> : <><strong>No client reviews yet.</strong><span>Check back soon for stories from our clients.</span></>}
        </div>
      </div>
    </section>
  );

  return (
    <section className="rv" id="clients" aria-labelledby="rv-heading" ref={sectionRef}>
      <div className="rv-wrap">
        <header className="rv-heading rv-fade">
          <p className="rv-kicker">Client reviews</p>
          <h2 id="rv-heading">What our clients say</h2>
          <p>Founders and business owners on working with one team across setup, build, growth and finance, with one plan and one point of contact.</p>
          {/* <span className="rv-sample">Sample content · replace with real, permitted reviews</span> */}
        </header>

        <div className="rv-tabs rv-fade" role="tablist" aria-label="Choose a review" onKeyDown={handleKeyDown}>
          {reviews.map((review, index) => (
            <button
              className="rv-tab"
              id={`review-tab-${index}`}
              key={review.id}
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
          onPointerEnter={pauseCarousel}
          onPointerLeave={resumeCarousel}
          onFocusCapture={pauseCarousel}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) resumeCarousel(); }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { swipeStart.current = null; }}
        >
          <div
            className={`rv-track${trackAnimating && !reduceMotion ? " go" : ""}`}
            ref={trackRef}
            style={{ transform: `translateX(${trackOffset}px)` }}
            onTransitionEnd={(event) => {
              if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
              setTrackAnimating(false);
              if (trackIndex === 0) setTrackIndex(reviews.length);
              else if (trackIndex === reviews.length + 1) setTrackIndex(1);
            }}
          >
            {[
              { review: reviews[reviews.length - 1], index: reviews.length - 1, clone: true },
              ...reviews.map((review, index) => ({ review, index, clone: false })),
              { review: reviews[0], index: 0, clone: true },
            ].map(({ review, index, clone }, physicalIndex) => (
              <ReviewCard key={`review-${physicalIndex}`} review={review} index={index} total={reviews.length} active={physicalIndex === trackIndex} clone={clone} onSelect={selectReview} />
            ))}
          </div>
        </div>

        <div className="rv-controls rv-fade">
          <div className="rv-control-row">
            <button className="rv-arrow" type="button" aria-label="Previous review" onClick={() => moveReview(-1, true)}><ArrowLeft aria-hidden="true" /></button>
            <span className="rv-count" aria-hidden="true"><b>{activeNumber}</b> / {totalNumber}</span>
            <button className="rv-arrow" type="button" aria-label="Next review" onClick={() => moveReview(1, true)}><ArrowRight aria-hidden="true" /></button>
          </div>
          <div className={`rv-progress${paused ? " paused" : ""}`} aria-hidden="true">
            <i key={progressKey} className={autoplay ? "run" : ""} />
          </div>
        </div>
      </div>
    </section>
  );
}
