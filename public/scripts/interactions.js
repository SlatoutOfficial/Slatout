/* SLATOUT interaction layer: every section gets its own movable, responsive element.
   Pointer effects run only with a fine pointer; everything is skipped or simplified with reduced motion.
   All content stays usable without this file. */
(function () {
  'use strict';
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(pointer: fine)').matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* 1. Scroll progress line */
  var bar = d.createElement('div'); bar.className = 'sprog'; bar.setAttribute('aria-hidden', 'true'); d.body.appendChild(bar);
  var onScroll = function () { var h = d.documentElement.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (h > 0 ? clamp(scrollY / h, 0, 1) : 0) + ')'; };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* 2. Soft light and ring that follow the cursor */
  if (fine && !reduce) {
    var light = d.createElement('div'), ring = d.createElement('div');
    light.className = 'cur-light'; ring.className = 'cur-ring'; light.setAttribute('aria-hidden', 'true'); ring.setAttribute('aria-hidden', 'true');
    d.body.appendChild(light); d.body.appendChild(ring);
    var mx = -999, my = -999, lx = mx, ly = my, rx = mx, ry = my;
    addEventListener('pointermove', function (e) { mx = e.clientX; my = e.clientY; var t = e.target.closest && e.target.closest('a,button,summary,[role=slider],input,textarea,select,label,canvas'); ring.classList.toggle('hot', !!t); ring.classList.toggle('grab', !!(t && t.tagName === 'CANVAS')); }, { passive: true });
    d.addEventListener('pointerleave', function () { mx = my = -999; });
    (function loop() { lx += (mx - lx) * .12; ly += (my - ly) * .12; rx += (mx - rx) * .3; ry += (my - ry) * .3;
      light.style.transform = 'translate(' + lx + 'px,' + ly + 'px)'; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)'; requestAnimationFrame(loop); })();
  }

  /* 3. Magnetic buttons: primary actions lean toward the cursor */
  if (fine && !reduce) $$('[data-magnetic], .btn-p').forEach(function (el) {
    el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .22).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * .3).toFixed(1) + 'px)'; });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  });

  /* 4. Cards tilt toward the cursor with a moving highlight */
  if (fine && !reduce) $$('.cards3 a, .posts a, .inc, .tool a, .svc a, .svh-card, .j-panel, .pl-out').forEach(function (el) {
    el.classList.add('tilt');
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height, k = el.classList.contains('svh-card') || el.classList.contains('pl-out') ? .5 : 1;
      el.style.transform = 'perspective(900px) rotateX(' + ((.5 - y) * 7 * k).toFixed(2) + 'deg) rotateY(' + ((x - .5) * 9 * k).toFixed(2) + 'deg) translateY(-3px)';
      el.style.setProperty('--gx', (x * 100).toFixed(1) + '%'); el.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  });

  /* 5. Choreographed reveal of headings and cards as they enter (content starts visible without JS) */
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('main .sh, main .svc-grid > li, main .incs > li, main .cards3 > li, main .posts > li, main .why-grid > li, main .tr-s, main .louvres > li, main .ticks > li, main .ck > li, main .vs, main .planner, main .ct-form').forEach(function (el) {
      if (el.getBoundingClientRect().top < innerHeight * .92) return;
      var i = Array.prototype.indexOf.call(el.parentNode.children, el) % 6;
      el.classList.add('rv'); el.style.transitionDelay = (i * 70) + 'ms'; io.observe(el);
    });
  }

  /* 6. Platform strip: drifts on its own, can be grabbed and flung */
  $$('.marq').forEach(function (m) {
    var uls = $$('ul', m); if (uls.length < 2) return;
    m.classList.add('js-marq');
    var x = 0, v = reduce ? 0 : -.45, auto = reduce ? 0 : -.45, down = false, last = 0, w = 0, hover = false;
    var measure = function () { w = uls[0].getBoundingClientRect().width; };
    measure(); addEventListener('resize', measure);
    m.addEventListener('pointerdown', function (e) { down = true; last = e.clientX; v = 0; m.setPointerCapture(e.pointerId); m.classList.add('drag'); });
    m.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - last; last = e.clientX; x += dx; v = dx; });
    var up = function () { down = false; m.classList.remove('drag'); };
    m.addEventListener('pointerup', up); m.addEventListener('pointercancel', up);
    m.addEventListener('pointerenter', function () { hover = true; }); m.addEventListener('pointerleave', function () { hover = false; });
    (function loop() {
      if (!down) { v += ((hover ? 0 : auto) - v) * .04; x += v; }
      if (w) { if (x <= -w) x += w; if (x > 0) x -= w; }
      uls.forEach(function (u) { u.style.transform = 'translateX(' + x + 'px)'; });
      requestAnimationFrame(loop);
    })();
  });

  /* 7. Ten vendors vs one team: drag the handle */
  $$('[data-vs]').forEach(function (vs) {
    var h = $('.vs-handle', vs), cur = 50, dragging = false, used = false;
    if (reduce) $$('svg', vs).forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
    var set = function (p) {
      cur = clamp(p, 0, 100); vs.style.setProperty('--x', cur + '%'); h.setAttribute('aria-valuenow', Math.round(cur));
      h.setAttribute('aria-valuetext', cur < 15 ? 'Separate vendors' : cur > 85 ? 'One SLATOUT team' : Math.round(100 - cur) + ' percent one SLATOUT team');
    };
    var fromX = function (cx) { var r = vs.getBoundingClientRect(); set((cx - r.left) / r.width * 100); };
    vs.addEventListener('pointerdown', function (e) { if (e.target.closest('a')) return; dragging = true; used = true; vs.setPointerCapture(e.pointerId); vs.classList.add('drag'); fromX(e.clientX); });
    vs.addEventListener('pointermove', function (e) { if (dragging) fromX(e.clientX); });
    var up = function () { dragging = false; vs.classList.remove('drag'); };
    vs.addEventListener('pointerup', up); vs.addEventListener('pointercancel', up);
    h.addEventListener('focus', function () { used = true; });
    h.addEventListener('keydown', function (e) {
      used = true; var k = e.key, step = e.shiftKey ? 20 : 5;
      if (k === 'ArrowLeft' || k === 'ArrowDown') { e.preventDefault(); set(cur - step); } else if (k === 'ArrowRight' || k === 'ArrowUp') { e.preventDefault(); set(cur + step); }
      else if (k === 'Home') { e.preventDefault(); set(0); } else if (k === 'End') { e.preventDefault(); set(100); }
    });
    // one gentle demonstration the first time it comes into view
    if (!reduce && 'IntersectionObserver' in window) {
      var shown = false, o = new IntersectionObserver(function (es) {
        if (shown || used || !es[0].isIntersecting) return; shown = true; o.disconnect();
        var keys = [[0, 50], [900, 22], [1900, 78], [2900, 50]], t0 = performance.now();
        (function anim(now) { if (dragging || used) return; var t = now - t0, i = 0; while (i < keys.length - 1 && t > keys[i + 1][0]) i++;
          if (i >= keys.length - 1) { if (!used) set(50); return; } var a = keys[i], b = keys[i + 1], k = (t - a[0]) / (b[0] - a[0]); k = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          set(a[1] + (b[1] - a[1]) * k); requestAnimationFrame(anim); })(t0);
      }, { threshold: .6 });
      o.observe(vs);
    }
    set(50);
  });

  /* 8. Process track: the orb travels with scroll and can be dragged to scrub */
  $$('[data-track]').forEach(function (tr) {
    var steps = $$('.tr-s', tr), n = steps.length, line = $('.tr-line', tr), manual = false;
    var apply = function (p) { tr.style.setProperty('--p', p.toFixed(4)); steps.forEach(function (s, i) { s.classList.toggle('on', p >= (n > 1 ? i / (n - 1) : 0) - .02); }); };
    var fromScroll = function () { if (manual) return; var r = tr.getBoundingClientRect(); apply(clamp((innerHeight * .78 - r.top) / (innerHeight * .55 + r.height * .3), 0, 1)); };
    if (reduce) apply(1); else { addEventListener('scroll', fromScroll, { passive: true }); addEventListener('resize', fromScroll); fromScroll(); }
    var drag = false;
    var fromPtr = function (e) { var r = line.getBoundingClientRect(), vert = r.height > r.width; apply(clamp(vert ? (e.clientY - r.top) / r.height : (e.clientX - r.left) / r.width, 0, 1)); };
    line.addEventListener('pointerdown', function (e) { drag = true; manual = true; line.setPointerCapture(e.pointerId); fromPtr(e); });
    line.addEventListener('pointermove', function (e) { if (drag) fromPtr(e); });
    line.addEventListener('pointerup', function () { drag = false; setTimeout(function () { manual = false; }, 1500); });
  });

  /* 9. Footer wordmark: letters lift as the cursor passes */
  var word = $('.ft-word');
  if (word && fine && !reduce) {
    var ls = $$('span', word), px = -9999, cur2 = ls.map(function () { return 0; }), running = false;
    var tick = function () {
      var moving = false;
      ls.forEach(function (l, i) { var r = l.getBoundingClientRect(), c = r.left + r.width / 2, t = clamp(1 - Math.abs(px - c) / 260, 0, 1); cur2[i] += (t - cur2[i]) * .14; if (Math.abs(t - cur2[i]) > .002) moving = true;
        l.style.transform = 'translateY(' + (-cur2[i] * 26).toFixed(2) + 'px)'; l.style.setProperty('--lit', cur2[i].toFixed(3)); });
      if (moving) requestAnimationFrame(tick); else running = false;
    };
    var foot = word.closest('footer');
    foot.addEventListener('pointermove', function (e) { px = e.clientX; if (!running) { running = true; requestAnimationFrame(tick); } });
    foot.addEventListener('pointerleave', function () { px = -9999; if (!running) { running = true; requestAnimationFrame(tick); } });
  }

  /* 10. Enquiry form: shows how ready the enquiry is, celebrates when it is sent */
  $$('form.enq').forEach(function (f) {
    var em = $('.enq-prog em', f), b = $('.enq-prog b', f); if (!em) return;
    var upd = function () {
      var parts = [], v = function (n) { var el = f.elements[n]; return el && el.value && el.value.trim(); };
      parts.push(!!v('name')); parts.push(!!(v('email') || v('phone')));
      if (f.querySelector('input[name=stage]')) parts.push(!!f.querySelector('input[name=stage]:checked'));
      if (f.querySelector('input[type=checkbox][name=services]')) parts.push(!!f.querySelector('input[name=services]:checked'));
      parts.push(!!(v('message') && v('message').length > 14));
      var p = Math.round(parts.filter(Boolean).length / parts.length * 100);
      em.textContent = p + '%'; b.style.width = p + '%'; f.classList.toggle('ready', p === 100);
    };
    f.addEventListener('input', upd); f.addEventListener('change', upd); upd();
    var st = $('.form-status', f);
    if (st && 'MutationObserver' in window) new MutationObserver(function () {
      if (!st.classList.contains('ok') || reduce) return;
      var burst = d.createElement('div'); burst.className = 'burst'; burst.setAttribute('aria-hidden', 'true');
      for (var i = 0; i < 18; i++) { var s = d.createElement('i'); s.style.setProperty('--a', (i * 20) + 'deg'); s.style.setProperty('--r', (60 + (i % 3) * 30) + 'px'); burst.appendChild(s); }
      st.appendChild(burst); setTimeout(function () { burst.remove(); }, 1400); upd();
    }).observe(st, { attributes: true, attributeFilter: ['class'] });
  });

  /* 11. FAQ: instant filter and smooth opening */
  var fq = $('#faq-q');
  if (fq) {
    var items = $$('.faq-list .faq-i'), none = $('.faq-none');
    fq.addEventListener('input', function () {
      var q = fq.value.trim().toLowerCase(), n = 0;
      items.forEach(function (it) { var ok = !q || it.textContent.toLowerCase().indexOf(q) > -1; it.hidden = !ok; if (ok) n++; });
      if (none) none.hidden = n > 0;
    });
  }
  if (!reduce && 'animate' in d.body) $$('details.faq-i, details.inc-more, details.lv-d, details.acc-i, details.ai').forEach(function (det) {
    var sum = det.querySelector('summary'), busy = false;
    sum.addEventListener('click', function (e) {
      e.preventDefault(); if (busy) return; busy = true;
      var start = det.offsetHeight;
      if (det.open) {
        var end = sum.offsetHeight;
        det.animate({ height: [start + 'px', end + 'px'] }, { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = function () { det.open = false; busy = false; };
      } else {
        det.open = true; var full = det.offsetHeight;
        det.animate({ height: [start + 'px', full + 'px'] }, { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = function () { busy = false; };
      }
    });
  });

  /* 12. Service-page sub-navigation: a bar glides to the section in view */
  var sn = $('.subnav ul');
  if (sn) {
    var snb = d.createElement('i'); snb.className = 'sn-bar'; snb.setAttribute('aria-hidden', 'true'); sn.appendChild(snb);
    var place = function () { var a = $('a.on', sn) || $('a', sn); snb.style.width = a.offsetWidth + 'px'; snb.style.transform = 'translateX(' + a.offsetLeft + 'px)'; };
    if ('MutationObserver' in window) new MutationObserver(place).observe(sn, { attributes: true, subtree: true, attributeFilter: ['class'] });
    addEventListener('resize', place); setTimeout(place, 50);
  }

  /* 13. Story rail buttons jump to a stage */
  $$('.story-dots button').forEach(function (b) {
    b.addEventListener('click', function () { var st = $$('.story .step')[+b.getAttribute('data-go')]; if (st) st.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' }); });
  });
})();
