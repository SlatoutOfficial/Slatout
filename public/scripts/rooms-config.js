(function () {
  'use strict';
  // slug, short name, tint, deep, stage, one-line
  var S = [
    ['business-setup-registration', 'Business Setup', '#E3EEDC', '#2E5B34', 'Start', 'Structure, registrations, licences and legal documents'],
    ['technology-ai-solutions', 'Technology & AI', '#E2E6FF', '#3140A3', 'Build', 'Websites, software, automation and AI'],
    ['offline-business-launch', 'Offline Launch', '#F4EAD8', '#6E5320', 'Start', 'Market research, location strategy and local launch'],
    ['branding-marketing', 'Branding', '#FBE1E6', '#A1324C', 'Build', 'Brand strategy, visual identity and offline marketing'],
    ['content-strategy', 'Content Strategy', '#FFF3CC', '#7A5900', 'Build', 'Pillars, voice, editorial calendar and briefs'],
    ['digital-marketing', 'Digital Marketing', '#D8F2EA', '#126B5A', 'Grow', 'SEO, AI-search visibility, paid ads and analytics'],
    ['ecommerce-marketplace-growth', 'Marketplaces', '#EDE3FB', '#5C3C9F', 'Grow', 'Seller onboarding, listings, marketplace SEO and ads'],
    ['programmatic-advertising', 'Programmatic Ads', '#DDEFFB', '#175C88', 'Grow', 'Real-time buying across display, video, CTV and audio'],
    ['business-development-outsourcing', 'BD Outsourcing', '#FFE6D1', '#A2470F', 'Grow', 'B2B research, lead generation and pipeline'],
    ['finance-tax-compliance', 'Finance & Tax', '#DDEDEC', '#24555A', 'Run', 'Accounting, GST, audit, payroll and CFO support']];
  var host = document.querySelector('slatout-footer'), root = host && host.shadowRoot; if (!root) return;
  var $ = function (id) { return root.getElementById(id); }, NS = 'http://www.w3.org/2000/svg', ft = $('ft');
  var two = function (n) { return ('0' + n).slice(-2); }, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var links = [].slice.call(root.querySelectorAll('.svl a')), dots = [].slice.call(root.querySelectorAll('#dots button'));

  /* ---- split-flap board ---- */
  var N = 17, CH = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ&-', flaps = $('flaps'), cells = [];
  for (var c = 0; c < N; c++) { var f = document.createElement('div'); f.className = 'fl'; f.innerHTML = '<span> </span><i></i>'; flaps.appendChild(f); cells.push({ el: f, sp: f.firstChild, ch: ' ' }); }
  function pad(t) { t = t.toUpperCase(); var l = Math.floor((N - t.length) / 2); return (new Array(l + 1).join(' ') + t + new Array(N + 1).join(' ')).slice(0, N); }
  var shown = -1, timers = [];
  function board(i) {
    if (i === shown) return; shown = i;
    var s = S[i], target = pad(s[1]);
    flaps.setAttribute('aria-label', s[1]);
    $('gate').textContent = two(i + 1); $('gate').style.setProperty('--t', s[2]); $('gate').style.setProperty('--d', s[3]);
    $('gn').textContent = two(i + 1); $('gs').textContent = s[4]; $('gl').textContent = s[5];
    $('go').href = '/services/' + s[0] + '/'; $('go').setAttribute('aria-label', 'Explore ' + s[1]);
    dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
    ft.style.setProperty('--au', s[3]);
    timers.forEach(clearTimeout); timers = [];
    cells.forEach(function (cell, k) {
      var to = target[k];
      if (reduce) { cell.sp.textContent = to; cell.ch = to; return; }
      if (cell.ch === to && to === ' ') return;
      var steps = 3 + Math.floor(Math.random() * 4), n = 0;
      (function step() {
        var last = n >= steps, ch = last ? to : CH[1 + Math.floor(Math.random() * 26)];
        cell.el.classList.remove('go'); void cell.el.offsetWidth; cell.el.classList.add('go');
        cell.sp.textContent = ch; cell.ch = ch; n++;
        if (!last) timers.push(setTimeout(step, 70));
      })();
    });
  }
  // cycles on its own; pauses while someone is reading or pointing
  var auto = 0, hold = false, cyc = null;
  function startCycle() { stopCycle(); cyc = setInterval(function () { if (!hold) { auto = (shown + 1) % S.length; board(auto); } }, 3200); }
  function stopCycle() { if (cyc) clearInterval(cyc); }
  $('brd').addEventListener('pointerenter', function () { hold = true; }); $('brd').addEventListener('pointerleave', function () { hold = false; });
  dots.forEach(function (d, k) { d.addEventListener('click', function () { board(k); startCycle(); }); });

  /* ---- wordmark: letters cut out of ten slats ---- */
  var svg = $('wsv'), wm = $('wm'), tip = $('tip'), TOP = 14, BASE = 190, BH = (BASE - TOP) / 10, R = [];
  var defs = document.createElementNS(NS, 'defs'), cp = document.createElementNS(NS, 'clipPath'); cp.id = 'wmc';
  var t = document.createElementNS(NS, 'text');
  t.setAttribute('x', '4'); t.setAttribute('y', BASE); t.setAttribute('textLength', '992'); t.setAttribute('lengthAdjust', 'spacingAndGlyphs');
  t.setAttribute('style', 'font:900 242px "Inter Tight",system-ui,sans-serif'); t.textContent = 'SLATOUT';
  cp.appendChild(t); defs.appendChild(cp); svg.appendChild(defs);
  var bgT = t.cloneNode(true); bgT.setAttribute('fill', '#1C1A18'); svg.appendChild(bgT);
  var g = document.createElementNS(NS, 'g'); g.setAttribute('clip-path', 'url(#wmc)'); svg.appendChild(g);
  S.forEach(function (s, i) {
    var r = document.createElementNS(NS, 'rect'); r.setAttribute('x', -10); r.setAttribute('width', 1020);
    r.setAttribute('y', (TOP + i * BH - .4).toFixed(2)); r.setAttribute('height', (BH + .8).toFixed(2)); r.setAttribute('fill', s[2]); r.setAttribute('class', 'sl');
    r.style.transitionDelay = (i * 70) + 'ms'; g.appendChild(r); R.push(r);
  });
  for (var j = 1; j < 10; j++) { var ln = document.createElementNS(NS, 'rect'); ln.setAttribute('x', -10); ln.setAttribute('width', 1020); ln.setAttribute('y', (TOP + j * BH - .9).toFixed(2)); ln.setAttribute('height', 1.8); ln.setAttribute('fill', '#0E0D0C'); g.appendChild(ln); }
  S.forEach(function (s, i) {
    var a = document.createElementNS(NS, 'a'); a.setAttribute('href', '/services/' + s[0] + '/'); a.setAttribute('aria-label', s[1]);
    var h = document.createElementNS(NS, 'rect'); h.setAttribute('class', 'hit'); h.setAttribute('x', 0); h.setAttribute('width', 1000); h.setAttribute('y', TOP + i * BH); h.setAttribute('height', BH);
    a.appendChild(h); svg.appendChild(a);
    a.addEventListener('pointerenter', function (e) { focus(i, e); }); a.addEventListener('pointermove', place);
    a.addEventListener('pointerleave', function () { focus(-1); }); a.addEventListener('focus', function () { focus(i); }); a.addEventListener('blur', function () { focus(-1); });
  });

  // one focus for everything: index link, board, slat, aura
  function focus(i, e) {
    wm.classList.toggle('focus', i >= 0);
    R.forEach(function (r, k) { r.style.transitionDelay = '0ms'; r.classList.toggle('on', k === i); });
    links.forEach(function (l, k) { l.classList.toggle('on', k === i); });
    hold = i >= 0;
    if (i >= 0) {
      board(i);
      tip.style.setProperty('--t', S[i][2]); tip.style.setProperty('--d', S[i][3]);
      tip.querySelector('b').textContent = two(i + 1); tip.querySelector('span').textContent = S[i][1];
      if (e) { place(e); tip.classList.add('on'); }
    } else tip.classList.remove('on');
  }
  function place(e) { var w = wm.getBoundingClientRect(); tip.style.left = (e.clientX - w.left) + 'px'; tip.style.top = (e.clientY - w.top) + 'px'; }
  links.forEach(function (l, k) { l.addEventListener('mouseenter', function () { focus(k); }); l.addEventListener('mouseleave', function () { focus(-1); }); l.addEventListener('focus', function () { focus(k); }); l.addEventListener('blur', function () { focus(-1); }); });

  // aura follows the pointer, gently
  var raf = 0;
  ft.addEventListener('pointermove', function (e) {
    if (reduce || e.pointerType !== 'mouse') return; cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function () { var r = ft.getBoundingClientRect(); ft.style.setProperty('--mx', (e.clientX - r.left) + 'px'); ft.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
  });

  /* ---- pull cord ---- */
  var cord = $('cord'), kb = $('kb'), cl = $('cl'), cs = $('cs'), REST = 96, MAX = 168, NEED = 46, y0 = 0, dy = 0, dragging = false;
  function setY(y) { cord.style.setProperty('--y', y + 'px'); cl.setAttribute('y2', y); }
  function up() { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); }
  kb.addEventListener('pointerdown', function (e) { dragging = true; y0 = e.clientY; dy = 0; cord.classList.add('drag'); kb.setPointerCapture(e.pointerId); });
  kb.addEventListener('pointermove', function (e) {
    if (!dragging) return; dy = Math.max(0, e.clientY - y0); setY(REST + Math.min(MAX - REST, dy * .8));
    cord.classList.toggle('ready', dy > NEED); cs.textContent = dy > NEED ? 'Let go' : 'Pull to go up';
  });
  function release() {
    if (!dragging) return; dragging = false; cord.classList.remove('drag');
    var go = dy > NEED || dy < 4, from = parseFloat(cl.getAttribute('y2')), t0 = performance.now();
    cord.classList.remove('ready'); cord.style.setProperty('--y', REST + 'px'); cs.textContent = 'Pull to go up';
    (function step(n) { var k = Math.min(1, (n - t0) / 700), s = 1 - Math.sin(k * Math.PI * 2.5) * Math.exp(-k * 5) * .6; cl.setAttribute('y2', (REST + (from - REST) * (1 - k) * s).toFixed(1)); if (k < 1) requestAnimationFrame(step); else cl.setAttribute('y2', REST); })(t0);
    if (go) setTimeout(up, 180);
  }
  kb.addEventListener('pointerup', release); kb.addEventListener('pointercancel', release);
  kb.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); up(); } });
  setY(REST);

  // newsletter: front-end check only; connect to your mailing list provider
  $('sub').addEventListener('submit', function (e) {
    e.preventDefault(); var v = $('se').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { $('sn').textContent = 'Please enter a valid email address.'; $('se').focus(); return; }
    $('sn').textContent = 'Thank you. You are on the list.'; $('se').value = '';
  });

  function tick() { try { $('clk').textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }); } catch (x) { } }
  tick(); setInterval(tick, 20000);
  $('yr').textContent = new Date().getFullYear();

  // reveal; the board starts flipping the first time it is seen
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) {
      if (!x.isIntersecting) return;
      if (x.target === wm) wm.classList.add('lit'); else x.target.classList.add('in');
      if (x.target.id === 'brd') { setTimeout(function () { board(0); startCycle(); }, 500); }
      io.unobserve(x.target);
    });
  }, { threshold: .25 });
  [].forEach.call(root.querySelectorAll('.fade'), function (x, i) { x.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(x); });
  io.observe(wm);
})();
