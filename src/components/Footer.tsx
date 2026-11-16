"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

const S: [string, string, string, string, string, string][] = [
  ['business-setup-registration', 'Business Setup', '#E3EEDC', '#2E5B34', 'Start', 'Structure, registrations, licences and legal documents'],
  ['technology-ai-solutions', 'Technology & AI', '#E2E6FF', '#3140A3', 'Build', 'Websites, software, automation and AI'],
  ['offline-business-launch', 'Offline Launch', '#F4EAD8', '#6E5320', 'Start', 'Market research, location strategy and local launch'],
  ['branding-marketing', 'Branding', '#FBE1E6', '#A1324C', 'Build', 'Brand strategy, visual identity and offline marketing'],
  ['content-strategy', 'Content Strategy', '#FFF3CC', '#7A5900', 'Build', 'Pillars, voice, editorial calendar and briefs'],
  ['digital-marketing', 'Digital Marketing', '#D8F2EA', '#126B5A', 'Grow', 'SEO, AI-search visibility, paid ads and analytics'],
  ['ecommerce-marketplace-growth', 'Marketplaces', '#EDE3FB', '#5C3C9F', 'Grow', 'Seller onboarding, listings, marketplace SEO and ads'],
  ['programmatic-advertising', 'Programmatic Ads', '#DDEFFB', '#175C88', 'Grow', 'Real-time buying across display, video, CTV and audio'],
  ['business-development-outsourcing', 'BD Outsourcing', '#FFE6D1', '#A2470F', 'Grow', 'B2B research, lead generation and pipeline'],
  ['finance-tax-compliance', 'Finance & Tax', '#DDEDEC', '#24555A', 'Run', 'Accounting, GST, audit, payroll and CFO support'],
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = footerRef.current;
    if (!root) return;

    const $ = (id: string) => root.querySelector('#' + id) as any;
    const NS = 'http://www.w3.org/2000/svg';
    const ft = root;
    const two = (n: number) => ('0' + n).slice(-2);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cleanups: (() => void)[] = [];
    const on = (t: EventTarget | null, type: string, fn: EventListenerOrEventListenerObject, opts?: any) => {
      if (!t) return;
      t.addEventListener(type, fn, opts);
      cleanups.push(() => t.removeEventListener(type, fn, opts));
    };

    // index of services
    const svlEl = $('svl');
    if (svlEl) {
      svlEl.innerHTML = S.map((s, i) => '<li><a href="/services/' + s[0] + '/" data-i="' + i + '" style="--t:' + s[2] + '"><i></i>' + s[1] + '</a></li>').join('');
    }
    const dotsEl = $('dots');
    if (dotsEl) {
      dotsEl.innerHTML = S.map((s) => '<button type="button" style="--t:' + s[2] + '" aria-label="Show ' + s[1] + '"></button>').join('');
    }
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('.svl a'));
    const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('#dots button'));

    /* ---- split-flap board ---- */
    const N = 17, CH = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ&-', flaps = $('flaps');
    const cells: { el: HTMLElement; sp: HTMLElement; ch: string }[] = [];
    if (flaps) {
      flaps.innerHTML = '';
      for (let c = 0; c < N; c++) {
        const f = document.createElement('div');
        f.className = 'fl';
        f.innerHTML = '<span> </span><i></i>';
        flaps.appendChild(f);
        cells.push({ el: f, sp: f.firstChild as HTMLElement, ch: ' ' });
      }
    }

    function pad(t: string) {
      t = t.toUpperCase();
      const l = Math.floor((N - t.length) / 2);
      return (new Array(l + 1).join(' ') + t + new Array(N + 1).join(' ')).slice(0, N);
    }

    let shown = -1;
    let timers: any[] = [];
    function board(i: number) {
      if (i === shown) return;
      shown = i;
      const s = S[i];
      if (!s) return;
      const target = pad(s[1]);
      if (flaps) flaps.setAttribute('aria-label', s[1]);
      const gate = $('gate'), gn = $('gn'), gs = $('gs'), gl = $('gl'), go = $('go');
      if (gate) {
        gate.textContent = two(i + 1);
        gate.style.setProperty('--t', s[2]);
        gate.style.setProperty('--d', s[3]);
      }
      if (gn) gn.textContent = two(i + 1);
      if (gs) gs.textContent = s[4];
      if (gl) gl.textContent = s[5];
      if (go) {
        go.href = '/services/' + s[0] + '/';
        go.setAttribute('aria-label', 'Explore ' + s[1]);
      }
      dots.forEach((d, k) => { d.classList.toggle('on', k === i); });
      ft.style.setProperty('--au', s[3]);
      timers.forEach(clearTimeout);
      timers = [];
      cells.forEach((cell, k) => {
        const to = target[k];
        if (reduce) { cell.sp.textContent = to; cell.ch = to; return; }
        if (cell.ch === to && to === ' ') return;
        const steps = 3 + Math.floor(Math.random() * 4);
        let n = 0;
        const step = () => {
          const last = n >= steps, ch = last ? to : CH[1 + Math.floor(Math.random() * 26)];
          cell.el.classList.remove('go');
          void cell.el.offsetWidth;
          cell.el.classList.add('go');
          cell.sp.textContent = ch;
          cell.ch = ch;
          n++;
          if (!last) timers.push(setTimeout(step, 70));
        };
        step();
      });
    }

    // cycles on its own; pauses while someone is reading or pointing
    let auto = 0, hold = false, cyc: any = null;
    function startCycle() {
      stopCycle();
      cyc = setInterval(() => {
        if (!hold) {
          auto = (shown + 1) % S.length;
          board(auto);
        }
      }, 3200);
    }
    function stopCycle() { if (cyc) clearInterval(cyc); }

    const brd = $('brd');
    if (brd) {
      on(brd, 'pointerenter', () => { hold = true; });
      on(brd, 'pointerleave', () => { hold = false; });
    }
    dots.forEach((d, k) => {
      on(d, 'click', () => { board(k); startCycle(); });
    });

    /* ---- wordmark: letters cut out of ten slats ---- */
    const svg = $('wsv') as SVGSVGElement | null, wm = $('wm') as HTMLElement | null, tip = $('tip') as HTMLElement | null;
    const TOP = 14, BASE = 190, BH = (BASE - TOP) / 10;
    const R: SVGElement[] = [];

    if (svg) {
      svg.innerHTML = '';
      const defs = document.createElementNS(NS, 'defs');
      const cp = document.createElementNS(NS, 'clipPath');
      cp.id = 'wmc';
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', '4');
      t.setAttribute('y', String(BASE));
      t.setAttribute('textLength', '992');
      t.setAttribute('lengthAdjust', 'spacingAndGlyphs');
      t.setAttribute('style', 'font:900 242px "Inter Tight",system-ui,sans-serif');
      t.textContent = 'SLATOUT';
      cp.appendChild(t);
      defs.appendChild(cp);
      svg.appendChild(defs);

      const bgT = t.cloneNode(true) as SVGElement;
      bgT.setAttribute('fill', '#1C1A18');
      svg.appendChild(bgT);

      const g = document.createElementNS(NS, 'g');
      g.setAttribute('clip-path', 'url(#wmc)');
      svg.appendChild(g);

      S.forEach((s, i) => {
        const r = document.createElementNS(NS, 'rect');
        r.setAttribute('x', '-10');
        r.setAttribute('width', '1020');
        r.setAttribute('y', (TOP + i * BH - 0.4).toFixed(2));
        r.setAttribute('height', (BH + 0.8).toFixed(2));
        r.setAttribute('fill', s[2]);
        r.setAttribute('class', 'sl');
        (r as any).style.transitionDelay = (i * 70) + 'ms';
        g.appendChild(r);
        R.push(r);
      });

      for (let j = 1; j < 10; j++) {
        const ln = document.createElementNS(NS, 'rect');
        ln.setAttribute('x', '-10');
        ln.setAttribute('width', '1020');
        ln.setAttribute('y', (TOP + j * BH - 0.9).toFixed(2));
        ln.setAttribute('height', '1.8');
        ln.setAttribute('fill', '#0E0D0C');
        g.appendChild(ln);
      }

      S.forEach((s, i) => {
        const a = document.createElementNS(NS, 'a');
        a.setAttribute('href', '/services/' + s[0] + '/');
        a.setAttribute('aria-label', s[1]);
        const h = document.createElementNS(NS, 'rect');
        h.setAttribute('class', 'hit');
        h.setAttribute('x', '0');
        h.setAttribute('width', '1000');
        h.setAttribute('y', String(TOP + i * BH));
        h.setAttribute('height', String(BH));
        a.appendChild(h);
        svg.appendChild(a);

        on(a, 'pointerenter', (e: any) => { focus(i, e); });
        on(a, 'pointermove', place);
        on(a, 'pointerleave', () => { focus(-1); });
        on(a, 'focus', () => { focus(i); });
        on(a, 'blur', () => { focus(-1); });
      });

      const syncSCurve = () => {
        if (!root) return;
        const svgEl = root.querySelector('#wsv') as SVGSVGElement | null;
        if (!svgEl) return;
        const svgRect = svgEl.getBoundingClientRect();
        const rootRect = root.getBoundingClientRect();
        if (!svgRect.width) return;
        const leftPad = svgRect.left - rootRect.left;
        // In viewBox 0 0 1000 196, the curve of S reaches x = 78 (7.8% of SVG width)
        const sOffset = leftPad + (50 / 1000) * svgRect.width;
        root.style.setProperty('--s-curve', Math.round(sOffset) + 'px');
      };
      syncSCurve();
      on(window, 'resize', syncSCurve);
    }

    // one focus for everything: index link, board, slat, aura
    function focus(i: number, e?: any) {
      if (wm) wm.classList.toggle('focus', i >= 0);
      R.forEach((r, k) => {
        (r as any).style.transitionDelay = '0ms';
        r.classList.toggle('on', k === i);
      });
      links.forEach((l, k) => { l.classList.toggle('on', k === i); });
      hold = i >= 0;
      if (i >= 0 && tip) {
        board(i);
        tip.style.setProperty('--t', S[i][2]);
        tip.style.setProperty('--d', S[i][3]);
        const b = tip.querySelector('b');
        if (b) b.textContent = two(i + 1);
        const sp = tip.querySelector('span');
        if (sp) sp.textContent = S[i][1];
        if (e) { place(e); tip.classList.add('on'); }
      } else if (tip) {
        tip.classList.remove('on');
      }
    }

    function place(e: any) {
      if (!wm || !tip) return;
      const w = wm.getBoundingClientRect();
      tip.style.left = (e.clientX - w.left) + 'px';
      tip.style.top = (e.clientY - w.top) + 'px';
    }

    links.forEach((l, k) => {
      on(l, 'mouseenter', () => { focus(k); });
      on(l, 'mouseleave', () => { focus(-1); });
      on(l, 'focus', () => { focus(k); });
      on(l, 'blur', () => { focus(-1); });
    });

    // aura follows the pointer, gently
    let raf = 0;
    on(ft, 'pointermove', (e: any) => {
      if (reduce || e.pointerType !== 'mouse') return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = ft.getBoundingClientRect();
        ft.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        ft.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    /* ---- pull cord ---- */
    const cord = $('cord'), kb = $('kb'), cl = $('cl'), cs = $('cs');
    const REST = 96, MAX = 168, NEED = 46;
    let y0 = 0, dy = 0, dragging = false;

    function setY(y: number) {
      if (cord) cord.style.setProperty('--y', y + 'px');
      if (cl) cl.setAttribute('y2', String(y));
    }

    function up() {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }

    if (kb) {
      on(kb, 'pointerdown', (e: any) => {
        dragging = true;
        y0 = e.clientY;
        dy = 0;
        if (cord) cord.classList.add('drag');
        if (kb.setPointerCapture) kb.setPointerCapture(e.pointerId);
      });
      on(kb, 'pointermove', (e: any) => {
        if (!dragging) return;
        dy = Math.max(0, e.clientY - y0);
        setY(REST + Math.min(MAX - REST, dy * 0.8));
        if (cord) cord.classList.toggle('ready', dy > NEED);
        if (cs) cs.textContent = dy > NEED ? 'Let go' : 'Pull to go up';
      });
      const release = () => {
        if (!dragging) return;
        dragging = false;
        if (cord) cord.classList.remove('drag');
        const go = dy > NEED || dy < 4;
        const from = parseFloat(cl ? cl.getAttribute('y2') || String(REST) : String(REST));
        const t0 = performance.now();
        if (cord) {
          cord.classList.remove('ready');
          cord.style.setProperty('--y', REST + 'px');
        }
        if (cs) cs.textContent = 'Pull to go up';
        const step = (n: number) => {
          const k = Math.min(1, (n - t0) / 700);
          const s = 1 - Math.sin(k * Math.PI * 2.5) * Math.exp(-k * 5) * 0.6;
          if (cl) cl.setAttribute('y2', (REST + (from - REST) * (1 - k) * s).toFixed(1));
          if (k < 1) requestAnimationFrame(step);
          else if (cl) cl.setAttribute('y2', String(REST));
        };
        requestAnimationFrame(step);
        if (go) setTimeout(up, 180);
      };
      on(kb, 'pointerup', release);
      on(kb, 'pointercancel', release);
      on(kb, 'keydown', (e: any) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          up();
        }
      });
    }
    setY(REST);

    // newsletter: front-end check only
    const sub = $('sub');
    if (sub) {
      on(sub, 'submit', (e: any) => {
        e.preventDefault();
        const se = $('se') as HTMLInputElement | null;
        const sn = $('sn');
        const v = se ? se.value.trim() : '';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
          if (sn) sn.textContent = 'Please enter a valid email address.';
          if (se) se.focus();
          return;
        }
        if (sn) sn.textContent = 'Thank you. You are on the list.';
        if (se) se.value = '';
      });
    }

    function tick() {
      try {
        const clk = $('clk');
        if (clk) {
          clk.textContent = new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Kolkata',
          });
        }
      } catch (x) { }
    }
    tick();
    const clockTimer = setInterval(tick, 20000);
    const yr = $('yr');
    if (yr) yr.textContent = String(new Date().getFullYear());

    // reveal; the board starts flipping the first time it is seen
    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((es) => {
        es.forEach((x) => {
          if (!x.isIntersecting) return;
          if (x.target === wm) {
            wm?.classList.add('lit');
          } else {
            x.target.classList.add('in');
          }
          if (x.target.id === 'brd') {
            setTimeout(() => {
              board(0);
              startCycle();
            }, 500);
          }
          io?.unobserve(x.target);
        });
      }, { threshold: 0.25 });

      Array.from(root.querySelectorAll('.fade')).forEach((x: any, i: number) => {
        x.style.transitionDelay = ((i % 3) * 90) + 'ms';
        io?.observe(x);
      });
      if (wm) io.observe(wm);
    } else {
      Array.from(root.querySelectorAll('.fade')).forEach((x: any) => x.classList.add('in'));
      if (wm) wm.classList.add('lit');
      board(0);
      startCycle();
    }

    return () => {
      stopCycle();
      clearInterval(clockTimer);
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      timers = [];
      if (io) io.disconnect();
      cleanups.forEach(f => f());
      if (flaps) flaps.innerHTML = '';
      if (svlEl) svlEl.innerHTML = '';
      if (dotsEl) dotsEl.innerHTML = '';
      if (svg) svg.innerHTML = '';
    };
  }, []);

  return (
    <footer className="ft site-footer" id="ft" ref={footerRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cord ft-cord" id="cord">
        <svg aria-hidden="true"><line x1="22" y1="0" x2="22" y2="96" id="cl" /></svg>
        <button className="kb" id="kb" type="button" aria-label="Back to top">&uarr;</button>
        <small id="cs">Pull to go up</small>
      </div>

      <div className="wrap">
        <div className="top">
          <div className="fade"><p className="k">Before you go</p><h2>Where is your business <em>headed</em> next?</h2></div>
          <div className="top-r fade"><p>Pick a destination below, or tell us where you are and we will plan the route with you.</p>
            <div className="acts"><Link className="btn" href="/contact/#enquire">Book a strategy call <i aria-hidden="true">&rarr;</i></Link><Link className="btn btn-g" href="/#plan">Plan my route</Link></div></div>
        </div>

        <div className="brd fade" id="brd" aria-label="Departures: the ten Slatout services">
          <div className="brd-h"><span>Slatout departures &middot; <b>ten destinations</b></span><span className="live">Boarding now</span></div>
          <div className="row">
            <span className="gate" id="gate">01</span>
            <div className="flaps" id="flaps" aria-live="polite" aria-atomic="true"></div>
            <Link className="go-b" id="go" href="/services/business-setup-registration/">Board <span aria-hidden="true">&rarr;</span></Link>
          </div>
          <div className="brd-f"><span>Gate <b id="gn">01</b> &middot; <b id="gs">Start</b> &middot; <span id="gl">Structure, registrations, licences and legal documents</span></span><span className="dots" id="dots"></span></div>
        </div>

        <div className="cols fade">
          <div><h3>Ten services</h3><ul className="svl" id="svl"></ul></div>
          <div><h3>Company</h3><ul>
            <li><Link href="/about/">About Slatout</Link></li><li><Link href="/work/">Case studies</Link></li><li><Link href="/blogs/">Insights</Link></li><li><Link href="/contact/">Contact</Link></li></ul></div>
          <div><h3>Start here</h3><ul>
            <li><Link href="/#plan">Route planner <span className="ar">&rarr;</span></Link></li><li><Link href="/studio/90-day-plan/">90-day plan</Link></li><li><Link href="/services/">All services</Link></li><li><Link href="/#faq">FAQs</Link></li></ul></div>
          <div><h3>New guides by email</h3>
            <form className="sub" id="sub" noValidate><input type="email" id="se" placeholder="you@company.com" aria-label="Your email" autoComplete="email" /><button type="submit">Subscribe</button></form>
            <p className="sub-n" id="sn" aria-live="polite">Practical guides on setting up and growing a business in India.</p>
            <div className="soc" aria-label="Slatout on social media">
              <a href="https://www.linkedin.com/company/slatout/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.6 4.76 6V21h-4v-5.07c0-1.2-.02-2.76-1.7-2.76-1.7 0-1.95 1.32-1.95 2.68V21h-4V9.75Z" /></svg></a>
              <a href="https://www.instagram.com/slatoutofficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg></a>
              <a href="https://x.com/slatoutofficial" target="_blank" rel="noopener noreferrer" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" /></svg></a>
              <a href="https://www.youtube.com/@Slatoutofficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.3.4-3.8.4-3.8s0-2.5-.4-3.8ZM10 15V9l5.2 3L10 15Z" /></svg></a>
            </div>
          </div>
        </div>
      </div>

      <div className="wm" id="wm" aria-label="Slatout"><svg id="wsv" viewBox="0 0 1000 196" role="img" aria-label="Slatout wordmark made of ten service colours"></svg><span className="tip" id="tip"><b></b><span></span></span></div>

      <div className="wrap">
        <div className="bar">
          <span>&copy; <span id="yr">2026</span> Slatout. All rights reserved.</span>
          <nav aria-label="Legal"><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link><Link href="/sitemap.xml">Sitemap</Link></nav>
          <span className="clk"><i></i>India &middot; <span id="clk">--:--</span> IST</span>
          <span className="tg">Build beyond business.</span>
        </div>
      </div>
    </footer>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@500;700&display=swap');

.ft{
  --ink:#0E0D0C;--ink-2:#171615;--ink-3:#262420;--txt:#F5F1EA;--txt-2:#B8B2A8;--txt-3:#7E786F;--line:rgba(245,241,234,.1);
  --brand:#FF6A13;--brand-d:#D9520A;
  --sans:"Inter Tight",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;--serif:"Instrument Serif",Georgia,serif;--mono:"JetBrains Mono",ui-monospace,Menlo,monospace;
  --ease:cubic-bezier(.22,.8,.2,1);
  --au:#FF6A13;--mx:70%;--my:20%;position:relative;background:var(--ink);color:var(--txt);border-radius:clamp(28px,4vw,48px) clamp(28px,4vw,48px) 0 0;padding-top:clamp(80px,10vw,130px);overflow:clip;isolation:isolate;
  font:400 17px/1.6 var(--sans);-webkit-font-smoothing:antialiased;
}
.ft *,.ft *::before,.ft *::after{box-sizing:border-box}
.ft p,.ft h2,.ft h3,.ft ul{margin:0}
.ft a{color:inherit}
.ft .wrap{position:relative;width:calc(100% - 2 * var(--s-curve, calc(clamp(8px, 1.6vw, 24px) + 0.50 * (100% - 2 * clamp(8px, 1.6vw, 24px)))));margin-inline:auto}
.ft .fade{opacity:0;transform:translateY(16px);transition:opacity 1s var(--ease),transform 1.1s var(--ease)}
.ft .fade.in{opacity:1;transform:none}

/* aura */
.ft::before{content:"";position:absolute;z-index:-1;left:var(--mx);top:var(--my);width:min(900px,120vw);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;
  background:radial-gradient(closest-side,color-mix(in srgb,var(--au) 42%,transparent),transparent 70%);transition:left 1.2s var(--ease),top 1.2s var(--ease),background 1s}
.ft::after{content:"";position:absolute;z-index:-1;inset:0;pointer-events:none;opacity:.5;
  background-image:linear-gradient(rgba(245,241,234,.035) 1px,transparent 1px);background-size:100% 64px;mask:linear-gradient(#000,transparent 70%)}

/* pull cord: back to top */
.ft .cord{position:absolute;z-index:5;top:0;right:clamp(20px,3.5vw,68px);width:44px;height:200px;touch-action:none;user-select:none}
.ft .cord svg{position:absolute;left:0;top:0;width:44px;height:200px;overflow:visible}
.ft .cord line{stroke:#4A4641;stroke-width:2}
.ft .cord .kb{position:absolute;left:4px;top:var(--y,96px);width:36px;height:36px;margin-top:-4px;border:0;border-radius:50%;background:var(--brand);color:#fff;font:600 1rem/1 var(--sans);cursor:grab;box-shadow:0 10px 20px -8px rgba(255,106,19,.9);transition:top .7s cubic-bezier(.3,1.6,.5,1),background .3s,color .3s}
.ft .cord.drag .kb{transition:none;cursor:grabbing}
.ft .cord .kb:focus-visible{outline:2px solid var(--txt);outline-offset:3px}
.ft .cord small{position:absolute;right:52px;top:calc(var(--y,96px) + 4px);white-space:nowrap;font:500 .62rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--txt-3);transition:top .7s cubic-bezier(.3,1.6,.5,1),color .3s}
.ft .cord.drag small{transition:none}
.ft .cord.ready small{color:var(--brand)}.ft .cord.ready .kb{background:#fff;color:var(--brand)}

/* 1. the closing question */
.ft .top{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr);gap:28px 60px;align-items:end}
.ft .k{display:inline-flex;align-items:center;gap:10px;margin-bottom:22px;font:500 .72rem/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--txt-3)}
.ft .k::before{display:none}
.ft .top h2{font-weight:800;font-size:clamp(2.6rem,6vw,5.6rem);line-height:.95;letter-spacing:-.055em;color:var(--txt)}
.ft .top h2 em{font:italic 400 1.08em/1 var(--serif);letter-spacing:-.01em;color:var(--brand)}
.ft .top-r{display:grid;gap:22px;justify-items:start}
.ft .top-r p{color:var(--txt-2);max-width:24em}
.ft .acts{display:flex;flex-wrap:wrap;gap:12px}
.ft .btn{display:inline-flex;align-items:center;gap:12px;height:56px;padding:0 8px 0 26px;border-radius:999px;background:var(--brand);color:#fff;text-decoration:none;font:600 1rem/1 var(--sans);transition:background .3s}
.ft .btn i{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#fff;color:var(--brand);font-style:normal;transition:transform .35s var(--ease)}
.ft .btn:hover{background:var(--brand-d)}.ft .btn:hover i{transform:translateX(3px)}
.ft .btn-g{background:transparent;color:var(--txt);box-shadow:inset 0 0 0 1.5px rgba(245,241,234,.22);padding-right:26px}.ft .btn-g:hover{background:rgba(245,241,234,.06)}

/* 2. the departures board: split-flap slats */
.ft .brd{position:relative;margin-top:clamp(48px,6vw,80px);padding:clamp(16px,2vw,24px);border-radius:22px;background:linear-gradient(#141311,#0B0A09);box-shadow:inset 0 0 0 1px var(--line),0 30px 60px -30px #000}
.ft .brd-h{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:14px;font:500 .66rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--txt-3)}
.ft .brd-h b{font-weight:500;color:var(--txt-2)}
.ft .brd-h .live{display:inline-flex;align-items:center;gap:8px;color:var(--brand)}
.ft .brd-h .live::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--brand);animation:ft-blink 1.6s steps(1) infinite}
@keyframes ft-blink{50%{opacity:.25}}
.ft .row{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:clamp(10px,1.6vw,20px);align-items:center}
.ft .gate{display:grid;place-items:center;width:clamp(48px,5vw,84px);aspect-ratio:1;border-radius:14px;background:var(--t,#262420);color:var(--d,#fff);font:700 clamp(1.1rem,2vw,1.75rem)/1 var(--mono);transition:background .6s,color .6s}
.ft .flaps{--n:17;display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:clamp(2px,.35vw,5px)}
.ft .fl{position:relative;aspect-ratio:.72;border-radius:clamp(3px,.5vw,7px);background:#1F1D1A;box-shadow:inset 0 -1px 0 rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.04);overflow:hidden;perspective:300px}
.ft .fl::after{content:"";position:absolute;left:0;right:0;top:50%;height:1.5px;margin-top:-.75px;background:#0B0A09;z-index:3}
.ft .fl span{position:absolute;inset:0;display:grid;place-items:center;font:700 clamp(.8rem,2.7vw,2.4rem)/1 var(--mono);color:var(--txt);text-transform:uppercase}
.ft .fl i{position:absolute;left:0;right:0;top:0;height:50%;z-index:2;background:#24221F;border-radius:inherit;transform-origin:bottom;transform:rotateX(0);opacity:0}
.ft .fl.go i{animation:ft-flip .09s linear}
@keyframes ft-flip{0%{opacity:1;transform:rotateX(0)}100%{opacity:1;transform:rotateX(-90deg)}}
.ft .go-b{display:inline-flex;align-items:center;gap:10px;height:clamp(48px,5vw,84px);padding:0 22px;border-radius:14px;background:var(--txt);color:var(--ink);text-decoration:none;font:600 .95rem var(--sans);white-space:nowrap;transition:background .3s,color .3s}
.ft .go-b:hover{background:var(--brand);color:#fff}
.ft .brd-f{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 20px;margin-top:14px;font:500 .66rem var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--txt-3)}
.ft .brd-f span b{font-weight:500;color:var(--txt-2)}
.ft .dots{display:flex;gap:6px}
.ft .dots button{all:unset;cursor:pointer;width:18px;height:6px;border-radius:3px;background:var(--t);opacity:.25;transition:opacity .4s,width .4s var(--ease)}
.ft .dots button.on{opacity:1;width:30px}
.ft .dots button:focus-visible{outline:2px solid var(--brand);outline-offset:3px}

/* 3. link columns */
.ft .cols{display:grid;grid-template-columns:1.5fr 1fr 1fr 1.2fr;gap:36px clamp(24px,3vw,48px);padding:clamp(56px,7vw,88px) 0 clamp(40px,5vw,64px)}
.ft .cols>div{min-width:0}
.ft .cols h3{margin-bottom:18px;font:500 .68rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--txt-3)}
.ft .cols ul{list-style:none;padding:0;display:grid;gap:2px}
.ft .cols a{display:inline-flex;align-items:center;gap:10px;padding:5px 0;text-decoration:none;color:var(--txt-2);font-size:.98rem;transition:color .25s}
.ft .cols a:hover,.ft .cols a:focus-visible{color:var(--txt)}
.ft .cols a:focus-visible{outline:2px solid var(--brand);outline-offset:3px;border-radius:4px}
.ft .svl{grid-template-columns:1fr 1fr;column-gap:24px}
.ft .svl a i{flex:none;width:8px;height:8px;border-radius:50%;background:var(--t);opacity:.75;transition:transform .3s var(--ease),opacity .3s}
.ft .svl a:hover i,.ft .svl a.on i{transform:scale(1.5);opacity:1}
.ft .svl a.on{color:var(--txt)}
.ft .cols .ar{display:inline-block;transition:transform .3s var(--ease)}.ft .cols a:hover .ar{transform:translateX(3px)}
.ft .sub{display:flex;gap:8px;margin-top:6px;padding:5px;border-radius:999px;background:var(--ink-2);box-shadow:inset 0 0 0 1px var(--line)}
.ft .sub input{flex:1;min-width:0;height:44px;padding:0 14px;border:0;background:none;color:var(--txt);font:500 .95rem var(--sans);outline:0}
.ft .sub input::placeholder{color:var(--txt-3)}
.ft .sub button{flex:none;height:44px;padding:0 18px;border:0;border-radius:999px;background:var(--txt);color:var(--ink);font:600 .9rem var(--sans);cursor:pointer;transition:background .3s,color .3s}
.ft .sub button:hover{background:var(--brand);color:#fff}
.ft .sub:focus-within{box-shadow:inset 0 0 0 1.5px var(--brand)}
.ft .sub-n{margin-top:10px;font-size:.84rem;color:var(--txt-3);min-height:1.3em}
.ft .soc{display:flex;gap:8px;margin-top:22px}
.ft .soc a{display:grid;place-items:center;width:42px;height:42px;padding:0;border-radius:50%;box-shadow:inset 0 0 0 1px var(--line);color:var(--txt-2);transition:background .3s,color .3s,box-shadow .3s}
.ft .soc a:hover{background:var(--txt);color:var(--ink);box-shadow:none}
.ft .soc svg{width:17px;height:17px}

/* 4. the wordmark: ten slats, one per service */
.ft .wm{position:relative;padding:0 clamp(8px,1.6vw,24px);margin-top:4px}
.ft .wm svg{display:block;width:100%;height:auto;overflow:visible}
.ft .wm .sl{opacity:0;transition:opacity .6s var(--ease)}
.ft .wm.lit .sl{opacity:.92}
.ft .wm.focus .sl{opacity:.12}
.ft .wm.focus .sl.on{opacity:1}
.ft .wm .hit{fill:transparent;cursor:pointer}
.ft .tip{position:absolute;z-index:3;left:0;top:0;display:flex;align-items:center;gap:10px;padding:8px 14px 8px 8px;border-radius:999px;background:var(--txt);color:var(--ink);font:600 .86rem var(--sans);white-space:nowrap;pointer-events:none;opacity:0;transform:translate(-50%,-130%) scale(.96);transition:opacity .2s,transform .3s var(--ease)}
.ft .tip b{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--t);color:var(--d);font:500 .66rem var(--mono)}
.ft .tip.on{opacity:1;transform:translate(-50%,-130%)}

/* 5. bottom bar */
.ft .bar{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px 28px;padding:22px 0 28px;border-top:1px solid var(--line);font-size:.86rem;color:var(--txt-3)}
.ft .bar nav{display:flex;flex-wrap:wrap;gap:6px 22px}
.ft .bar a{text-decoration:none;transition:color .25s}.ft .bar a:hover{color:var(--txt)}
.ft .bar .tg{font:italic 400 1.1rem var(--serif);color:var(--txt-2)}
.ft .bar .clk{font:500 .7rem var(--mono);letter-spacing:.12em;text-transform:uppercase;font-variant-numeric:tabular-nums}
.ft .bar .clk i{display:inline-block;width:7px;height:7px;margin-right:8px;border-radius:50%;background:var(--brand);vertical-align:1px}

@media(max-width:1060px){.ft .top{grid-template-columns:1fr}.ft .cols{grid-template-columns:1fr 1fr}.ft .cols>div:first-child{grid-column:1/-1}}
@media(max-width:700px){
  .ft .row{grid-template-columns:minmax(0,1fr)}.ft .go-b{justify-content:space-between;height:52px}
  .ft .gate{display:none}.ft .brd{padding:14px}.ft .fl span{font-size:.95rem}
  .ft .acts{flex-direction:column;width:100%}.ft .acts .btn{flex:none;width:100%}
  .ft .cols{grid-template-columns:1fr}.ft .svl{grid-template-columns:1fr 1fr}
  .ft .cord{right:16px;height:150px}.ft .cord small{display:none}
  .ft .btn{flex:1;justify-content:space-between}.ft .btn-g{justify-content:center}
  .ft .bar{flex-direction:column;align-items:flex-start}
  .ft .brd-f .dots{display:none}
}
@media(prefers-reduced-motion:reduce){.ft *{transition:none!important;animation:none!important}.ft .fade{opacity:1;transform:none}.ft .wm .sl{opacity:.92}}
`;
