/* SLATOUT "The Tower": motion for the floors. Everything here is enhancement; pages read fully without it. */
(function () {
  'use strict';
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(pointer: fine)').matches;
  var cl = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var two = function (n) { return ('0' + n).slice(-2); };
  d.documentElement.classList.remove('no-js');
  if (reduce) d.documentElement.classList.add('rm');
  var raf = function (fn) { var on = false; return function () { if (!on) { on = true; requestAnimationFrame(function () { on = false; fn(); }); } }; };

  /* ---------- cursor dot ---------- */
  if (fine && !reduce) {
    var dot = d.createElement('i'); dot.className = 'cur-dot'; dot.setAttribute('aria-hidden', 'true'); d.body.appendChild(dot);
    addEventListener('pointermove', function (e) { dot.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)'; }, { passive: true });
  }

  /* ---------- hero: the logo's three slabs ---------- */
  var hero = $('.tw-hero'), ht = $('.hp-tw');
  if (hero && ht) {
    var hp = $$('.pl', ht), T = { x: 0, y: 0, s: .2, r: 0 }, C = { x: 0, y: 0, s: .2, r: 0 }, loop = null;
    hp.forEach(function (p, i) {
      p.style.setProperty('--gap', '46px');
      if (reduce) return;
      p.classList.add('nt'); p.style.setProperty('--land', 0);
      setTimeout(function () { p.classList.remove('nt'); p.style.transition = 'transform 1.2s cubic-bezier(.2,.9,.2,1)'; p.style.setProperty('--land', 1); setTimeout(function () { p.style.transition = ''; }, 1300); }, 350 + i * 260);
    });
    var tick = function () {
      C.x += (T.x - C.x) * .12; C.y += (T.y - C.y) * .12; C.s += (T.s - C.s) * .1; C.r += (T.r - C.r) * .12;
      ht.style.setProperty('--px', C.x.toFixed(3)); ht.style.setProperty('--py', C.y.toFixed(3)); ht.style.setProperty('--rot', C.r.toFixed(2) + 'deg');
      hp.forEach(function (p) { p.style.setProperty('--gap', (46 + C.s * 74).toFixed(1) + 'px'); });
      loop = (Math.abs(T.x - C.x) + Math.abs(T.y - C.y) + Math.abs(T.s - C.s) + Math.abs(T.r - C.r) > .003) ? requestAnimationFrame(tick) : null;
    };
    var kick = function () { if (!loop) loop = requestAnimationFrame(tick); };
    if (!reduce) {
      hero.addEventListener('pointermove', function (e) {
        var r = ht.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, dd = Math.hypot(e.clientX - cx, e.clientY - cy);
        T.x = cl((e.clientX - cx) / innerWidth * 2.6, -1, 1); T.y = cl((e.clientY - cy) / innerHeight * 2.6, -1, 1); T.s = cl(1.1 - dd / 520, .1, 1);
        var hr = hero.getBoundingClientRect(); hero.style.setProperty('--mx', e.clientX - hr.left + 'px'); hero.style.setProperty('--my', e.clientY - hr.top + 'px'); kick();
      });
      hero.addEventListener('pointerleave', function () { T.x = T.y = 0; T.s = .2; kick(); });
      var sc = $('.th-scene'), down = false, lx = 0;
      sc.addEventListener('pointerdown', function (e) { down = true; lx = e.clientX; sc.classList.add('drag'); sc.setPointerCapture(e.pointerId); T.s = 1; kick(); });
      sc.addEventListener('pointermove', function (e) { if (!down) return; T.r += (e.clientX - lx) * .45; lx = e.clientX; kick(); });
      var up = function () { down = false; sc.classList.remove('drag'); };
      sc.addEventListener('pointerup', up); sc.addEventListener('pointercancel', up);
      // on touch screens the slabs breathe open and shut so the idea still reads
      if (!fine) { var open = false; setInterval(function () { if (down) return; open = !open; T.s = open ? .95 : .2; kick(); }, 2600); }
    }
  }

  /* ---------- ticker: moves with scroll, two directions ---------- */
  var tks = $$('.tk');
  var onTick = function () { var y = scrollY; tks.forEach(function (t) { var dir = +t.getAttribute('data-tk'); t.style.transform = 'translateX(' + (dir < 0 ? -y * .35 : y * .35 - 1400) + 'px)'; }); };

  /* ---------- statement: words light up as you read ---------- */
  var stp = $('[data-reveal]'), words = stp ? $$('.w', stp) : [];
  var onState = function () {
    if (!stp || reduce) return; var r = stp.getBoundingClientRect(), p = cl((innerHeight * .85 - r.top) / (r.height + innerHeight * .35), 0, 1), n = Math.round(p * words.length);
    words.forEach(function (w, i) { w.classList.toggle('on', i < n); });
  };
  if (reduce) words.forEach(function (w) { w.classList.add('on'); });

  /* ---------- the build: ten floors assemble as you scroll ---------- */
  var build = $('#build'), bt = $('.b-tw'), lift = $$('.lf-i'), N = 10, lastAct = -2;
  var bp = bt ? $$('.pl', bt) : [], panels = build ? $$('.bpn', build) : [], bnum = $('.bnum'), bc = $('.bstat .bc');
  bp.forEach(function (p) { p.classList.add('nt'); });
  var onBuild = function () {
    if (!build) return;
    var vh = innerHeight, r = build.getBoundingClientRect(), total = build.offsetHeight - (vh - 64), p = cl(-r.top / total, 0, 1);
    var inb = r.top < vh * .5 && r.bottom > vh * .5; d.body.classList.toggle('inb', inb);
    var t = reduce ? N + 1 : p * (N + 1), e = cl(t - N, 0, 1), mo = innerWidth < 960, gap = 34 + e * (mo ? 18 : 40);
    bp.forEach(function (pl, i) {
      var land = cl((t + .6 - i) / .6, 0, 1); pl.style.setProperty('--land', land.toFixed(3)); pl.style.setProperty('--gap', gap + 'px');
      pl.style.setProperty('--draw', cl((t + .45 - i) / .4, 0, 1).toFixed(3));
      var act = t < N && Math.floor(t) === i; pl.classList.toggle('hot', act || t >= N); pl.classList.toggle('dim', !act && t < N && t >= i + 1);
    });
    var h = Math.min(Math.floor(t) + 1, N) * gap;
    bt.style.setProperty('--cy', (h * (mo ? .2 : .25) - 30 + e * (mo ? -20 : 46)) + 'px'); bt.style.setProperty('--sc', (1 - e * (mo ? .42 : .18)).toFixed(3)); bt.style.setProperty('--rz', (-44 + p * 22) + 'deg');
    var act2 = t >= N ? N : Math.min(Math.floor(t), N - 1);
    if (act2 !== lastAct) {
      lastAct = act2; panels.forEach(function (el, i) { el.classList.toggle('on', i === act2); });
      bnum.style.opacity = act2 === N ? 0 : 1; if (act2 < N) { bnum.textContent = two(act2 + 1); if (bc) bc.textContent = two(act2 + 1); }
      lift.forEach(function (li) { var f = +$('a', li).getAttribute('data-floor'); li.classList.toggle('on', inb && f === act2); });
    }
  };
  var floorY = function (i) { var vh = innerHeight, top = build.getBoundingClientRect().top + scrollY, total = build.offsetHeight - (vh - 64); return top + ((i + .5) / (N + 1)) * total; };
  if (build) {
    lift.forEach(function (li) { var a = $('a', li); a.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); scrollTo({ top: floorY(+a.getAttribute('data-floor')), behavior: reduce ? 'auto' : 'smooth' }); }); });
    $$('.fin a').forEach(function (a) { var i = +a.getAttribute('data-i'); var on = function (v) { return function () { bp[i].style.setProperty('--ty', v); }; }; a.addEventListener('mouseenter', on('9%')); a.addEventListener('mouseleave', on('0%')); a.addEventListener('focus', on('9%')); a.addEventListener('blur', on('0%')); });
  }

  /* ---------- lift visibility on the home page ---------- */
  var onHero = function () { if (hero) d.body.classList.toggle('past-hero', scrollY > hero.offsetHeight * .7); };

  /* ---------- plan builder: the tower lights the floors you need ---------- */
  var pst = $('#pl-st'), pg = $('#pl-g');
  if (pst && pg) {
    var pt = $('.p-tw'), pp = $$('.pl', pt), list = $('#pl-list'), empty = $('#pl-empty'), act = $('#pl-act'), send = $('#pl-send'), addB = $('#pl-stack');
    var SL = {}, NM = {}; $$('.lf-i').forEach(function (li) { var a = $('a', li); var sl = $('[data-stack-toggle]', li).getAttribute('data-stack-toggle'); SL[sl] = +a.getAttribute('data-floor'); NM[sl] = $('.lf-n', li).textContent; });
    var ONE = {}; $$('.bpn[data-i]').forEach(function (p) { var o = $('.one', p); if (o) ONE[+p.getAttribute('data-i')] = o.textContent; });
    pp.forEach(function (p) { p.style.setProperty('--gap', '30px'); });
    var stage = -1;
    var upd = function () {
      var set = {}, stLabel = '';
      $$('.chip', pst).forEach(function (c, k) { var on = k === stage; c.setAttribute('aria-pressed', on); if (on) { stLabel = c.textContent; c.getAttribute('data-f').split(',').forEach(function (s) { set[s] = 1; }); } });
      var needs = [];
      $$('.chip', pg).forEach(function (c) { if (c.getAttribute('aria-pressed') === 'true') { needs.push(c.textContent); c.getAttribute('data-f').split(',').forEach(function (s) { set[s] = 1; }); } });
      var sls = Object.keys(set).sort(function (a, b) { return SL[a] - SL[b]; }), idx = sls.map(function (s) { return SL[s]; });
      pp.forEach(function (p, i) { var on = idx.indexOf(i) > -1; p.classList.toggle('hot', on); p.classList.toggle('dim', !on); p.style.setProperty('--ty', on ? '14%' : '0%'); });
      list.innerHTML = sls.map(function (s, k) { return '<li><a href="/services/' + s + '/" style="--k:' + k + '"><b>' + two(SL[s] + 1) + '</b><span>' + NM[s] + '</span><small>' + (ONE[SL[s]] || '') + '</small></a></li>'; }).join('');
      empty.hidden = sls.length > 0; act.hidden = !sls.length;
      var msg = 'Hello SLATOUT, we are at the "' + (stLabel || 'not sure yet') + '" stage' + (needs.length ? ' and need to: ' + needs.join('; ').toLowerCase() : '') + '. We would like to start with: ' + sls.map(function (s) { return NM[s]; }).join(', ') + '.';
      send.href = '/contact/?service=' + sls.join(',') + '&msg=' + encodeURIComponent(msg) + '#enquire';
      addB.setAttribute('data-stack-add', sls.join(','));
      try { sessionStorage.setItem('slatout.plan', JSON.stringify({ s: stage, g: $$('.chip', pg).map(function (c) { return c.getAttribute('aria-pressed') === 'true'; }) })); } catch (x) { }
    };
    $$('.chip', pst).forEach(function (c, k) { c.addEventListener('click', function () { stage = stage === k ? -1 : k; upd(); }); });
    $$('.chip', pg).forEach(function (c) { c.addEventListener('click', function () { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true'); upd(); }); });
    try { var sv = JSON.parse(sessionStorage.getItem('slatout.plan') || 'null'); if (sv) { stage = sv.s; $$('.chip', pg).forEach(function (c, k) { c.setAttribute('aria-pressed', !!sv.g[k]); }); } } catch (x) { }
    upd();
  }

  /* ---------- floor pages: tilt, orbit, challenges, staircase ---------- */
  var shs = $('.sh-scene'), stw = $('.sh-tw');
  if (shs && stw) {
    var sp = $$('.pl', stw);
    sp.forEach(function (p, i) { if (reduce) return; p.classList.add('nt'); p.style.setProperty('--land', 0); p.style.setProperty('--draw', 0);
      setTimeout(function () { p.classList.remove('nt'); p.style.transition = 'transform 1.1s cubic-bezier(.2,.9,.2,1)'; p.style.setProperty('--land', 1); setTimeout(function () { p.style.transition = ''; }, 1200); }, 200 + i * 220);
      setTimeout(function () { var k = 0; (function dr() { k += .04; p.style.setProperty('--draw', Math.min(1, k)); if (k < 1) requestAnimationFrame(dr); })(); }, 700 + i * 220); });
    if (fine && !reduce) {
      var fh = $('.fl-hero');
      fh.addEventListener('pointermove', function (e) { var r = stw.getBoundingClientRect(); stw.style.setProperty('--px', cl((e.clientX - r.left - r.width / 2) / innerWidth * 2.4, -1, 1).toFixed(3)); stw.style.setProperty('--py', cl((e.clientY - r.top - r.height / 2) / innerHeight * 2.4, -1, 1).toFixed(3)); });
      fh.addEventListener('pointerleave', function () { stw.style.setProperty('--px', 0); stw.style.setProperty('--py', 0); });
    }
    // orbit: the service's parts circle its floor; hovering stops the orbit
    var orb = $('.orbit'), nodes = orb ? $$('li', orb) : [], phase = 0, paused = false, ovis = true;
    if (nodes.length && !reduce) {
      orb.addEventListener('pointerenter', function () { paused = true; }); orb.addEventListener('pointerleave', function () { paused = false; });
      orb.addEventListener('focusin', function () { paused = true; }); orb.addEventListener('focusout', function () { paused = false; });
      if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { ovis = es[0].isIntersecting; }).observe(orb);
      var n = nodes.length, rx = innerWidth < 600 ? 34 : 44, ry = 42;
      (function spin() {
        if (!paused && ovis && !d.hidden) phase += .0016;
        nodes.forEach(function (li, k) { var a = -Math.PI / 2 + k * 2 * Math.PI / n + phase, z = Math.sin(a);
          li.style.left = (50 + rx * Math.cos(a)) + '%'; li.style.top = (50 + ry * z) + '%';
          li.style.zIndex = z > 0 ? 3 : 1; li.style.opacity = (.55 + .45 * (z + 1) / 2).toFixed(2); li.style.transform = 'translate(-50%,-50%) scale(' + (.86 + .14 * (z + 1) / 2).toFixed(3) + ')'; });
        requestAnimationFrame(spin);
      })();
    }
    $$('[data-open]').forEach(function (a) { a.addEventListener('click', function () { var t = d.getElementById(a.getAttribute('data-open')); if (t && t.tagName === 'DETAILS') t.open = true; }); });
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('fx'); cio.unobserve(e.target); } }); }, { rootMargin: '0px 0px -30% 0px' });
    $$('.crk li').forEach(function (li, i) { li.style.transitionDelay = (i % 6) * 90 + 'ms'; cio.observe(li); });
  } else $$('.crk li').forEach(function (li) { li.classList.add('fx'); });
  var stairs = $('[data-stairs]');
  if (stairs) {
    var st = $$('.st2', stairs), climb = $('.climb', stairs), lit = -1;
    var onStairs = function () {
      var r = stairs.getBoundingClientRect(), p = reduce ? 1 : cl((innerHeight * .8 - r.top) / (innerHeight * .6), 0, 1), k = Math.min(st.length - 1, Math.floor(p * st.length + .0001) - (p < 1 ? 0 : 0));
      if (p <= 0) k = -1;
      if (k === lit) return; lit = k;
      st.forEach(function (s, i) { s.classList.toggle('lit', i <= k); });
      if (climb && k > -1) { var s = st[k], sr = s.getBoundingClientRect(), wr = stairs.getBoundingClientRect(); stairs.classList.add('go');
        climb.style.setProperty('--cx', (sr.left - wr.left + 14) + 'px'); climb.style.setProperty('--cyy', (sr.top - wr.top + wr.height - 6) + 'px'); }
    };
  }

  /* ---------- page transitions: a short lift ride between pages ---------- */
  var floorOf = function (path) { var a = $('.lf-i a[href="' + path + '"]'); return a ? +a.getAttribute('data-floor') + 1 : 0; };
  var here = floorOf(location.pathname);
  var wipe = d.createElement('div'); wipe.className = 'wipe'; wipe.setAttribute('aria-hidden', 'true'); wipe.innerHTML = '<i></i><i></i><i></i><i></i><i></i><i></i>';
  var wn = d.createElement('div'); wn.className = 'wipe-n'; wn.setAttribute('aria-hidden', 'true'); wn.innerHTML = '<div><b><span></span></b><small></small></div>';
  d.body.appendChild(wipe); d.body.appendChild(wn);
  var label = function (path) { var f = floorOf(path); if (f) return [two(f), 'Floor ' + two(f)];
    var m = { '/': ['G', 'Ground floor'], '/services/': ['10', 'All floors'], '/contact/': ['', 'Contact'], '/about/': ['', 'About'], '/blog/': ['', 'Insights'], '/studio/': ['', 'Free tools'] };
    return m[path] || ['', 'SLATOUT']; };
  if (!reduce && !window.__nav) {
    var arrived = false; try { arrived = sessionStorage.getItem('slatout.wipe') === '1'; sessionStorage.removeItem('slatout.wipe'); } catch (x) { }
    if (arrived) { wipe.style.transition = 'none'; wipe.classList.add('in'); $$('i', wipe).forEach(function (i) { i.style.transition = 'none'; });
      requestAnimationFrame(function () { requestAnimationFrame(function () { $$('i', wipe).forEach(function (i) { i.style.transition = ''; }); wipe.classList.add('out'); setTimeout(function () { wipe.className = 'wipe'; }, 900); }); }); }
    d.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest('a[href]'); if (!a || a.target || a.hasAttribute('download')) return;
      var u; try { u = new URL(a.href, location.href); } catch (x) { return; }
      if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search) || /\.(xml|txt|pdf|png|jpg|webp)$/.test(u.pathname)) return;
      e.preventDefault();
      var L = label(u.pathname), from = here ? two(here) : (location.pathname === '/' ? 'G' : '');
      var b = $('b span', wn); b.textContent = L[0] && from && from !== L[0] ? from : L[0]; $('small', wn).textContent = L[1];
      wipe.className = 'wipe in'; setTimeout(function () { wn.classList.add('on'); if (L[0] && from && from !== L[0]) { b.style.transform = 'translateY(-100%)'; setTimeout(function () { b.style.transition = 'none'; b.textContent = L[0]; b.style.transform = 'translateY(100%)'; requestAnimationFrame(function () { b.style.transition = ''; b.style.transform = 'none'; }); }, 260); } }, 300);
      try { sessionStorage.setItem('slatout.wipe', '1'); } catch (x) { }
      setTimeout(function () { location.href = u.href; }, 880);
    });
    addEventListener('pageshow', function (e) { if (e.persisted) { wipe.className = 'wipe'; wn.className = 'wipe-n'; } });
  }

  /* ---------- one scroll loop ---------- */
  var all = raf(function () { onTick(); onState(); onBuild(); onHero(); if (stairs) onStairs(); });
  addEventListener('scroll', all, { passive: true }); addEventListener('resize', all); all();
})();
