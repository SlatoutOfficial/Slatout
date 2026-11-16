/* SLATOUT: progressive enhancement. The site works fully without this file. */
(function () {
  'use strict';
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- mobile menu + services mega menu ---- */
  var mb = $('.menu-btn'), nav = $('#site-nav'), mmb = $('.mm-btn'), mm = $('#mm');
  function setMenu(open) { if (!mb) return; mb.setAttribute('aria-expanded', open); nav.classList.toggle('open', open); d.body.style.overflow = open ? 'hidden' : ''; }
  function setMM(open) { if (!mmb) return; mmb.setAttribute('aria-expanded', open); mm.classList.toggle('open', open); }
  if (mb) mb.addEventListener('click', function () { setMenu(mb.getAttribute('aria-expanded') !== 'true'); });
  if (mmb) mmb.addEventListener('click', function (e) { e.stopPropagation(); setMM(mmb.getAttribute('aria-expanded') !== 'true'); });
  addEventListener('resize', function () { if (innerWidth > 1080) setMenu(false); });
  d.addEventListener('click', function (e) { if (mm && !e.target.closest('.has-mm')) setMM(false); });
  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (mmb && mmb.getAttribute('aria-expanded') === 'true') { setMM(false); mmb.focus(); }
    else if (mb && mb.getAttribute('aria-expanded') === 'true') { setMenu(false); mb.focus(); }
  });
  $$('#site-nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); setMM(false); }); });

  /* ---- the 3D SLATOUT mark: hero and scroll story (WebGL; falls back to rendered stills) ---- */
  function Scene(canvas, opt) {
    if (!window.Slab3D || !canvas) return null;
    canvas.parentNode.classList.add('gl');
    var s = new window.Slab3D(canvas, opt);
    if (!s.ok) { canvas.parentNode.classList.remove('gl'); this.s = null; return; }
    var self = this; this.s = s; this.t = { split: s.p.split, spin: s.p.spin, tiltX: 0, tiltY: 0, offx: s.p.offx, hl: s.p.hl, zoom: s.p.zoom };
    this.idle = !reduce; this.vis = true; this.run = false; this.k = reduce ? 1 : opt.ease || .06;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { self.vis = es[0].isIntersecting; if (self.vis) self.kick(); }).observe(canvas);
    addEventListener('resize', function () { if (opt.layout) opt.layout(self); s.resize(); self.kick(); });
    d.addEventListener('visibilitychange', function () { if (!d.hidden) self.kick(); });
    if (opt.layout) opt.layout(this);
    this.kick();
  }
  Scene.prototype.kick = function () { var self = this; if (!this.run) { this.run = true; requestAnimationFrame(function f(now) { if (self.step(now)) requestAnimationFrame(f); else self.run = false; }); } };
  Scene.prototype.step = function (now) {
    if (!this.vis || d.hidden) return false;
    var p = this.s.p, t = this.t, k = this.k, moving = false;
    if (this.idle) t.spin += .0028;
    ['split', 'spin', 'tiltX', 'tiltY', 'offx', 'zoom'].forEach(function (n) { var dv = t[n] - p[n]; if (Math.abs(dv) > .0005) { p[n] += dv * k; moving = true; } else p[n] = t[n]; });
    p.hl = t.hl;
    this.s.draw(now / 1000);
    return moving || this.idle;
  };
  Scene.prototype.set = function (o) { for (var n in o) this.t[n] = o[n]; this.kick(); };

  /* drag to spin (with inertia), tap to open or close the layers */
  function grab(sc, zone, opts) {
    opts = opts || {};
    var down = false, moved = 0, lx = 0, ly = 0, vx = 0, open = false, wrap = opts.wrap || zone;
    zone.addEventListener('pointerdown', function (e) {
      if (e.button > 0 || e.target.closest('a,button,input,textarea,select,label,.h3d-copy')) return;
      down = true; moved = 0; lx = e.clientX; ly = e.clientY; vx = 0; sc.idle = false; wrap.classList.add('dragging');
      if (zone.setPointerCapture) zone.setPointerCapture(e.pointerId);
    });
    zone.addEventListener('pointermove', function (e) {
      if (!down) return; var dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
      vx = dx * .012; sc.t.spin += vx; sc.t.tiltY = Math.max(-.9, Math.min(.9, sc.t.tiltY + dy * .006)); sc.kick();
    });
    var up = function () {
      if (!down) return; down = false; wrap.classList.remove('dragging');
      if (moved < 6) { open = !open; sc.set({ split: open ? 1 : (opts.rest || 0), hl: open ? 3 : (opts.hl == null ? -1 : opts.hl) }); }
      else { var v = vx; (function coast() { v *= .94; sc.t.spin += v; sc.kick(); if (Math.abs(v) > .0008 && !down) requestAnimationFrame(coast); else if (!down && !reduce) setTimeout(function () { if (!down) sc.idle = true; sc.kick(); }, 2400); })(); }
      if (opts.onUse) opts.onUse();
    };
    zone.addEventListener('pointerup', up); zone.addEventListener('pointercancel', up);
  }

  var hero = $('#hero3d');
  if (hero) {
    var hs = new Scene(hero, { transparent: true, split: reduce ? 0 : 1, spin: reduce ? 0 : -1.2, ease: .045, layout: function (sc) { var w = innerWidth, h = hero.getBoundingClientRect().height || innerHeight; sc.t.offx = w > 900 ? Math.min(.6, (w / h) * .3) : 0; sc.t.zoom = (w > 900 ? 1.45 : 1.2) * (window.__slPlan ? 1.28 : 1); if (!sc.ready) { sc.s.p.zoom = sc.t.zoom; sc.ready = 1; } } });
    if (hs && hs.s) {
      var h3 = $('.h3d'), hint = $('.h3d-hint');
      h3.classList.add('gl-on');
      setTimeout(function () { if (!window.__slPlan) hs.set({ split: 0, spin: 0 }); else hs.set({ spin: 0 }); }, 200);
      if (matchMedia('(pointer:fine)').matches && !reduce) h3.addEventListener('pointermove', function (e) {
        if (h3.classList.contains('dragging')) return;
        hs.set({ tiltX: (e.clientX / innerWidth - .5) * 1.2, tiltY: (e.clientY / innerHeight - .5) * 1.2 });
      });
      var onPlan = function (pl) { if (pl) { hs.set({ hl: pl.hl, split: .85 }); hs.t.zoom = (innerWidth > 900 ? 1.45 : 1.2) * 1.28; hs.kick(); } };
      onPlan(window.__slPlan); d.addEventListener('slatout:plan', function (e) { onPlan(e.detail); });
      grab(hs, innerWidth > 900 ? h3 : hero.parentNode, { wrap: h3, onUse: function () { if (hint) hint.classList.add('gone'); } });
    }
  }

  /* each service page: its own live mark, highlighting the layer that service belongs to */
  $$('canvas.svc3d').forEach(function (cv) {
    var hl = +cv.getAttribute('data-hl'), sp = +cv.getAttribute('data-split') || .25;
    var sc = new Scene(cv, { split: sp, hl: hl, spin: +cv.getAttribute('data-spin') || 0, zoom: 1.12, light: 0, ease: .07 });
    if (sc && sc.s) grab(sc, cv, { wrap: cv.parentNode, rest: sp, hl: hl });
  });

  var steps = $$('.story .step'), story = $('#story3d');
  if (steps.length) {
    var ss = story ? new Scene(story, { transparent: true, split: .08, ease: .07, zoom: 1.25 }) : null;
    var still = $('.story-stick .still'), dots = $$('.story-dots li');
    var activate = function (el) {
      steps.forEach(function (x) { x.classList.toggle('on', x === el); });
      var hl = +el.getAttribute('data-hl'), i = steps.indexOf(el);
      dots.forEach(function (dd, j) { dd.classList.toggle('on', j === hl || hl === 3); });
      if (ss && ss.s) ss.set({ hl: hl, split: +el.getAttribute('data-split'), spin: ss.t.spin + (reduce ? 0 : .0) + (i - (ss.lastI || 0)) * .45 });
      else if (still) still.src = el.getAttribute('data-still');
      if (ss) ss.lastI = i;
    };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) activate(e.target); }); }, { rootMargin: innerWidth <= 900 ? '-62% 0px -30% 0px' : '-45% 0px -45% 0px' });
      steps.forEach(function (x) { io.observe(x); });
    }
    activate(steps[0]);
  }

  /* ---- header turns solid once you scroll past the top ---- */
  var hdr = $('.site-header');
  if (hdr) { var onS = function () { hdr.classList.toggle('scrolled', scrollY > 24 || (mb && mb.getAttribute('aria-expanded') === 'true')); }; addEventListener('scroll', onS, { passive: true }); onS(); if (mb) mb.addEventListener('click', onS); }

  /* ---- stage tabs (WAI-ARIA) ---- */
  var tablist = $('[role=tablist]');
  if (tablist) {
    var tabs = $$('[role=tab]', tablist), panels = tabs.map(function (t) { return d.getElementById(t.getAttribute('aria-controls')); });
    var pick = function (t, focus) {
      tabs.forEach(function (x, i) { var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; if (panels[i]) panels[i].classList.toggle('on', on); });
      if (focus) t.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { pick(t); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, j = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % n; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i + n - 1) % n;
        else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = n - 1;
        if (j > -1) { e.preventDefault(); pick(tabs[j], true); }
      });
    });
    pick(tabs[0]);
  }

  /* ---- services: stage filter + search over crawlable cards ---- */
  var grid = $('#svc-grid');
  if (grid) {
    var q = $('#svc-q'), cards = $$('#svc-grid > li'), chips = $$('.tab-chip'), cnt = $('#exp-count'), empty = $('#exp-empty'), stage = 'all';
    var run = function () {
      var terms = (q.value || '').toLowerCase().split(/\s+/).filter(Boolean), n = 0;
      cards.forEach(function (c) {
        var ok = (stage === 'all' || c.getAttribute('data-stage') === stage) && terms.every(function (t) { return c.getAttribute('data-index').indexOf(t) > -1; });
        c.hidden = !ok; if (ok) n++;
      });
      grid.classList.toggle('bento-off', n !== cards.length);
      cnt.textContent = n === cards.length ? 'Showing all ' + n + ' services' : 'Showing ' + n + ' of ' + cards.length + ' services';
      empty.hidden = n !== 0;
    };
    q.addEventListener('input', run);
    q.addEventListener('keydown', function (e) { if (e.key === 'Escape') { q.value = ''; run(); } });
    chips.forEach(function (c) { c.addEventListener('click', function () { stage = c.getAttribute('data-filter'); chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c); }); run(); }); });
    var clr = $('#exp-clear'); if (clr) clr.addEventListener('click', function () { q.value = ''; stage = 'all'; chips.forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-filter') === 'all'); }); run(); q.focus(); });
  }

  /* ---- service page sub-navigation highlights the section in view ---- */
  var sub = $$('.subnav a');
  if (sub.length && 'IntersectionObserver' in window) {
    var map = {}; sub.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { sub.forEach(function (a) { a.classList.remove('on'); a.removeAttribute('aria-current'); }); var a = map[e.target.id]; if (a) { a.classList.add('on'); a.setAttribute('aria-current', 'true'); if (a.scrollIntoView && a.parentNode.parentNode.scrollWidth > a.parentNode.parentNode.clientWidth) a.parentNode.parentNode.scrollLeft = a.offsetLeft - 16; } } });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var el = d.getElementById(id); if (el) io.observe(el); });
  }
})();
