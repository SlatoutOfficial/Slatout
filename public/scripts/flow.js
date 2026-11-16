/* SLATOUT "Ten Rooms": the flow layer. Colour that moves with you, a thread through the home page, rooms that stack,
   observations the client can make, and a colour wash between pages. Pure enhancement: every page reads without it. */
(function () {
  'use strict';
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(pointer: fine)').matches;
  var cl = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var two = function (n) { return ('0' + n).slice(-2); };
  var body = d.body, isHome = body.classList.contains('r-home');

  /* ---------- 1. the page colour flows with the section you are in ---------- */
  var bgs = $$('[data-bg]'), lastBg = '';
  function flowBg() {
    if (!bgs.length) return; var mid = innerHeight * .5, pick = null;
    bgs.forEach(function (s) { if (s.getBoundingClientRect().top <= mid) pick = s; });
    var c = pick ? pick.getAttribute('data-bg') : bgs[0].getAttribute('data-bg');
    if (c !== lastBg) { lastBg = c; body.style.setProperty('--pg', c); }
  }

  /* ---------- 2. the ten doors: hover to open; they also open one by one on their own ---------- */
  $$('.doors').forEach(function (ds) {
    var items = $$('.door', ds), cur = 0, touched = false, vis = true;
    var open = function (i) { items.forEach(function (x, k) { x.classList.toggle('open', k === i); }); cur = i; };
    items.forEach(function (it, i) {
      it.addEventListener('pointerenter', function () { if (innerWidth > 960) { touched = true; open(i); } });
      it.addEventListener('focusin', function () { touched = true; open(i); });
    });
    ds.addEventListener('pointerleave', function () { touched = false; });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(ds);
    if (!reduce) setInterval(function () { if (!touched && vis && !d.hidden && innerWidth > 960) open((cur + 1) % items.length); }, 3400);
  });

  /* ---------- 3. the thread: one line that flows through every section of the home page ---------- */
  var main = $('#main'), th = null;
  function buildThread() {
    if (!isHome || !main) return;
    var secs = $$('#main > section'), W = main.clientWidth, H = main.scrollHeight;
    if (!th) {
      th = d.createElementNS('http://www.w3.org/2000/svg', 'svg'); th.setAttribute('class', 'thread'); th.setAttribute('aria-hidden', 'true');
      th.innerHTML = '<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB683"/><stop offset=".25" stop-color="#86D6C1"/><stop offset=".5" stop-color="#A3AEF4"/><stop offset=".75" stop-color="#EFA2B3"/><stop offset="1" stop-color="#F2D165"/></linearGradient></defs>' +
        '<path class="t-bg"/><path class="t-fg"/><circle class="t-dot" r="6"/>';
      main.insertBefore(th, main.firstChild);
    }
    th.setAttribute('width', W); th.setAttribute('height', H); th.setAttribute('viewBox', '0 0 ' + W + ' ' + H); th.style.height = H + 'px';
    var mt = main.getBoundingClientRect().top + scrollY, side = W < 700 ? 8 : Math.max(16, (W - 1320) / 2 + 10), x = side, dd = '';
    secs.forEach(function (s, i) {
      if (!i) return;                                  // start below the hero
      var y = s.getBoundingClientRect().top + scrollY - mt, nx = (i % 2) ? W - side : side;
      if (!dd) { dd = 'M' + x + ' ' + (y - 40); }
      else { dd += ' L' + x + ' ' + (y - 70); }
      dd += ' C' + x + ' ' + (y - 10) + ' ' + nx + ' ' + (y - 10) + ' ' + nx + ' ' + (y + 50);   // cross in the gap between sections
      x = nx;
    });
    dd += ' L' + x + ' ' + (H - 40);
    $('.t-bg', th).setAttribute('d', dd); var fg = $('.t-fg', th); fg.setAttribute('d', dd);
    th._len = fg.getTotalLength(); fg.style.strokeDasharray = th._len; th._samp = [];
    for (var k = 0; k <= 400; k++) { var L = th._len * k / 400; th._samp.push([L, fg.getPointAtLength(L)]); }
    th._mt = mt; drawThread();
  }
  function drawThread() {
    if (!th || !th._samp) return;
    var target = scrollY + innerHeight * .62 - th._mt, s = th._samp, L = 0, pt = s[0][1];
    for (var k = 0; k < s.length; k++) { if (s[k][1].y <= target || k === 0) { L = s[k][0]; pt = s[k][1]; } else break; }
    if (reduce) { L = th._len; pt = s[s.length - 1][1]; }
    $('.t-fg', th).style.strokeDashoffset = th._len - L; var dot = $('.t-dot', th); dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
  }
  if (isHome) { addEventListener('load', buildThread); addEventListener('resize', function () { clearTimeout(buildThread.t); buildThread.t = setTimeout(buildThread, 200); }); setTimeout(buildThread, 300); }

  /* ---------- 4. the rooms stack like the logo's slabs ---------- */
  var roomEls = $$('.room');
  function stackRooms() {
    if (innerWidth <= 960 || reduce) return;
    roomEls.forEach(function (r, i) {
      var next = roomEls[i + 1], card = $('.rm', r); if (!next) return;
      var a = r.getBoundingClientRect(), b = next.getBoundingClientRect(), cover = cl(1 - (b.top - a.top) / a.height, 0, 1);
      card.style.setProperty('--sc', (1 - cover * .05).toFixed(4)); card.style.setProperty('--br', (1 - cover * .06).toFixed(4));
    });
  }

  /* ---------- 5. what you will observe: each room cycles through what you leave with ---------- */
  $$('.obs-l').forEach(function (ul, j) {
    var li = $$('li', ul), k = 0, vis = false; if (!li.length) return; li[0].classList.add('on');
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(ul);
    if (!reduce) setTimeout(function () { setInterval(function () { if (!vis || d.hidden) return; li[k].classList.remove('on'); li[k].classList.add('off'); var o = li[k]; setTimeout(function () { o.classList.remove('off'); }, 650); k = (k + 1) % li.length; li[k].classList.add('on'); }, 2600); }, j * 300);
  });

  /* ---------- 6. statement: words light up as you read ---------- */
  var stp = $('[data-reveal]'), words = stp ? $$('.w', stp) : [];
  function readState() { if (!stp) return; if (reduce) { words.forEach(function (w) { w.classList.add('on'); }); return; }
    var r = stp.getBoundingClientRect(), p = cl((innerHeight * .85 - r.top) / (r.height + innerHeight * .3), 0, 1), n = Math.round(p * words.length);
    words.forEach(function (w, i) { w.classList.toggle('on', i < n); }); }

  /* ---------- 7. planner: the route through the rooms ---------- */
  var pst = $('#pl-st'), pg = $('#pl-g');
  if (pst && pg) {
    var nodes = $$('.route-n li'), path = $('.route-p'), list = $('#pl-list'), empty = $('#pl-empty'), act = $('#pl-act'), send = $('#pl-send'), addB = $('#pl-stack');
    var ORDER = nodes.map(function (n) { return n.getAttribute('data-sl'); }), NAME = {}, ONE = {};
    $$('.lf-i').forEach(function (li) { NAME[$('[data-stack-toggle]', li).getAttribute('data-stack-toggle')] = $('.lf-n', li).textContent; });
    $$('.room').forEach(function (r, i) { ONE[ORDER[i]] = $('.rm-tag', r).textContent; });
    nodes.forEach(function (n, i) { n.style.setProperty('--x', i); n.style.setProperty('--y', '50%'); });
    var stage = -1;
    var upd = function () {
      var set = {}, stLabel = '', needs = [];
      $$('.chip', pst).forEach(function (c, k) { var on = k === stage; c.setAttribute('aria-pressed', on); if (on) { stLabel = c.textContent; c.getAttribute('data-f').split(',').forEach(function (s) { set[s] = 1; }); } });
      $$('.chip', pg).forEach(function (c) { if (c.getAttribute('aria-pressed') === 'true') { needs.push(c.textContent); c.getAttribute('data-f').split(',').forEach(function (s) { set[s] = 1; }); } });
      var sls = ORDER.filter(function (s) { return set[s]; }), pts = [], j = 0;
      nodes.forEach(function (n, i) { var on = !!set[ORDER[i]]; n.classList.toggle('on', on); var y = on ? (j++ % 2 ? 72 : 28) : 50; n.style.setProperty('--y', y + '%'); if (on) pts.push([50 + i * 99, y * 2.2]); });
      var dd = ''; pts.forEach(function (p, i) { if (!i) dd = 'M' + p[0] + ' ' + p[1]; else { var q = pts[i - 1], mx = (q[0] + p[0]) / 2; dd += ' C' + mx + ' ' + q[1] + ' ' + mx + ' ' + p[1] + ' ' + p[0] + ' ' + p[1]; } });
      path.setAttribute('d', dd);
      list.innerHTML = sls.map(function (s, k) { var li = nodes[ORDER.indexOf(s)]; return '<li><a href="/services/' + s + '/" style="' + li.getAttribute('style').replace(/--x:[^;]*;?|--y:[^;]*;?/g, '') + ';--k:' + k + '"><b>' + two(ORDER.indexOf(s) + 1) + '</b><span>' + NAME[s] + '</span><small>' + (ONE[s] || '') + '</small></a></li>'; }).join('');
      empty.hidden = sls.length > 0; act.hidden = !sls.length;
      var msg = 'Hello SLATOUT, we are at the "' + (stLabel || 'not sure yet') + '" stage' + (needs.length ? ' and need to: ' + needs.join('; ').toLowerCase() : '') + '. We would like to start with: ' + sls.map(function (s) { return NAME[s]; }).join(', ') + '.';
      send.href = '/contact/?service=' + sls.join(',') + '&msg=' + encodeURIComponent(msg) + '#enquire';
      addB.setAttribute('data-stack-add', sls.join(','));
      try { sessionStorage.setItem('slatout.route', JSON.stringify({ s: stage, g: $$('.chip', pg).map(function (c) { return c.getAttribute('aria-pressed') === 'true'; }) })); } catch (x) { }
    };
    $$('.chip', pst).forEach(function (c, k) { c.addEventListener('click', function () { stage = stage === k ? -1 : k; upd(); }); });
    $$('.chip', pg).forEach(function (c) { c.addEventListener('click', function () { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true'); upd(); }); });
    try { var sv = JSON.parse(sessionStorage.getItem('slatout.route') || 'null'); if (sv) { stage = sv.s; $$('.chip', pg).forEach(function (c, k) { c.setAttribute('aria-pressed', !!sv.g[k]); }); } } catch (x) { }
    upd();
  }

  /* ---------- 8. room pages: is this room for you? ---------- */
  var obc = $('.ob-card');
  if (obc) {
    var boxes = $$('.obl input'), nEl = $('.ob-n', obc), arc = $('.ob-arc', obc), msgEl = $('.ob-msg', obc), sendEl = $('.ob-send', obc), base = sendEl.getAttribute('href').split('#')[0];
    var room = ($('.rh .kick') || {}).textContent || '';
    var obUpd = function () {
      var picked = boxes.filter(function (b) { return b.checked; }), n = picked.length, t = boxes.length;
      nEl.textContent = n; arc.style.strokeDashoffset = (327 * (1 - n / t)).toFixed(1);
      msgEl.textContent = !n ? 'Tick anything that sounds familiar. Nothing is sent until you choose to.' : n < 3 ? 'Some of this room fits your business. A short conversation would tell us where to begin.' : 'This room fits your business well. Here is where we would start.';
      var m = 'I looked at ' + room.replace(/\s+/g, ' ').trim() + ' and this sounds like my business:\n' + picked.map(function (b) { return '- ' + b.value; }).join('\n');
      sendEl.href = base + (n ? '&msg=' + encodeURIComponent(m.slice(0, 1150)) : '') + '#enquire';
      obc.classList.toggle('has', n > 0);
    };
    boxes.forEach(function (b) { b.addEventListener('change', obUpd); }); obUpd();
  }

  /* ---------- 9. room pages: the process flows along a wave ---------- */
  var fsw = $('[data-flowsteps]'), fg = fsw ? $('.fx-fg', fsw) : null, fsDot = fsw ? $('.fx-dot', fsw) : null, fsItems = fsw ? $$('.fx', fsw) : [], fsLen = 0;
  if (fg) { fsLen = fg.getTotalLength(); fsw.style.setProperty('--len', fsLen); }
  function flowSteps() {
    if (!fsw) return;
    var r = fsw.getBoundingClientRect(), p = reduce ? 1 : cl((innerHeight * .75 - r.top) / (innerHeight * .55), 0, 1);
    fsw.style.setProperty('--p', p.toFixed(4));
    if (fg && innerWidth > 960) { var pt = fg.getPointAtLength(fsLen * p), w = fsw.clientWidth; fsDot.style.setProperty('--dx', (pt.x / 1000 * w) + 'px'); fsDot.style.setProperty('--dy', pt.y + 'px'); }
    var n = fsItems.length; fsItems.forEach(function (s, i) { s.classList.toggle('fxon', p >= (n > 1 ? i / (n - 1) : 0) - .02 && p > 0); });
  }

  /* ---------- 10. room hero: the window leans toward the cursor ---------- */
  var rv = $('.rh-vis');
  if (rv && fine && !reduce) {
    var win = $('.win', rv);
    $('.rh').addEventListener('pointermove', function (e) { var r = rv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      win.style.transform = 'perspective(1000px) rotateY(' + (x * 8).toFixed(2) + 'deg) rotateX(' + (-y * 6).toFixed(2) + 'deg) rotate(-1deg)'; });
    $('.rh').addEventListener('pointerleave', function () { win.style.transform = ''; });
  }

  /* ---------- 11. a wash of the next room's colour between pages ---------- */
  var roomOf = function (path) { var a = $('.lf-i a[href="' + path + '"]'); return a ? a.parentNode : null; };
  var wash = d.createElement('div'); wash.className = 'wash'; wash.setAttribute('aria-hidden', 'true');
  var wt = d.createElement('div'); wt.className = 'wash-t'; wt.setAttribute('aria-hidden', 'true'); wt.innerHTML = '<div><small></small><b></b></div>';
  body.appendChild(wash); body.appendChild(wt);
  var LABEL = { '/': 'Home', '/services/': 'All ten rooms', '/contact/': 'Contact', '/about/': 'About SLATOUT', '/blog/': 'Insights', '/studio/': 'Free tools' };
  if (!reduce && !window.__nav) {
    var arrived = null; try { arrived = sessionStorage.getItem('slatout.wash'); sessionStorage.removeItem('slatout.wash'); } catch (x) { }
    if (arrived) { wash.style.setProperty('--wc', arrived); wash.style.transition = 'none'; wash.classList.add('in');
      requestAnimationFrame(function () { requestAnimationFrame(function () { wash.style.transition = ''; wash.classList.add('out'); setTimeout(function () { wash.className = 'wash'; }, 900); }); }); }
    d.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest('a[href]'); if (!a || a.target || a.hasAttribute('download')) return;
      var u; try { u = new URL(a.href, location.href); } catch (x) { return; }
      if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search) || /\.(xml|txt|pdf|png|jpg|webp)$/.test(u.pathname)) return;
      e.preventDefault();
      var li = roomOf(u.pathname), cs = li ? getComputedStyle(li) : null, col = cs ? cs.getPropertyValue('--h').trim() : '#FAF7F2';
      wash.style.setProperty('--wc', col); wash.style.setProperty('--wx', e.clientX + 'px'); wash.style.setProperty('--wy', e.clientY + 'px');
      if (cs) wt.style.setProperty('--wi', cs.getPropertyValue('--hi').trim());
      $('small', wt).textContent = li ? 'Room ' + $('.lf-l em', li).textContent : 'SLATOUT'; $('b', wt).textContent = li ? $('.lf-n', li).textContent : (LABEL[u.pathname] || 'One moment');
      wash.className = 'wash in'; setTimeout(function () { wt.classList.add('on'); }, 260);
      try { sessionStorage.setItem('slatout.wash', col); } catch (x) { }
      setTimeout(function () { location.href = u.href; }, 760);
    });
    addEventListener('pageshow', function (e) { if (e.persisted) { wash.className = 'wash'; wt.className = 'wash-t'; } });
  }

  /* ---------- one scroll loop ---------- */
  var hero = $('.fh'), ticking = false;
  var all = function () { ticking = false; flowBg(); drawThread(); stackRooms(); readState(); flowSteps(); if (hero) body.classList.toggle('past-hero', scrollY > hero.offsetHeight * .8); };
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(all); } }, { passive: true });
  addEventListener('resize', all); all();
})();

/* ---------- v12: plates, the sideways journey, the explorer ---------- */
(function () {
  'use strict';
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(pointer: fine)').matches;
  var cl = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* plates draw their line drawing when they come into view, and lean toward the cursor */
  var plates = $$('.p3');
  if ('IntersectionObserver' in window && !reduce) {
    var pio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('drawn'); pio.unobserve(e.target); } }); }, { threshold: .35 });
    plates.forEach(function (p) { pio.observe(p); });
  } else plates.forEach(function (p) { p.classList.add('drawn'); });
  if (fine && !reduce) plates.forEach(function (p) {
    var zone = p.closest('section, li, a') || p;
    zone.addEventListener('pointermove', function (e) { var r = p.getBoundingClientRect(); p.style.setProperty('--tx', cl((e.clientX - r.left - r.width / 2) / r.width, -1, 1).toFixed(3)); p.style.setProperty('--ty', cl((e.clientY - r.top - r.height / 2) / r.height, -1, 1).toFixed(3)); });
    zone.addEventListener('pointerleave', function () { p.style.setProperty('--tx', 0); p.style.setProperty('--ty', 0); });
  });
  var logo = $('.p3.logo');
  if (logo && !reduce) { setTimeout(function () { logo.classList.add('open'); setTimeout(function () { logo.classList.remove('open'); }, 2200); }, 700);
    if (!fine) setInterval(function () { logo.classList.toggle('open'); }, 2800); }
  var big = $('.p3.big');
  if (big && !reduce) setTimeout(function () { big.classList.add('open'); setTimeout(function () { big.classList.remove('open'); }, 1800); }, 900);

  /* the journey: vertical scroll moves the steps sideways */
  var hz = $('.hz'), track = hz ? $('.hz-track', hz) : null, hs = hz ? $$('.hz-s', hz) : [];
  function journey() {
    if (!hz) return;
    if (innerWidth <= 960 || reduce) { hs.forEach(function (s) { s.classList.add('on'); }); hz.style.setProperty('--p', 1); return; }
    var r = hz.getBoundingClientRect(), total = hz.offsetHeight - innerHeight, p = cl(-r.top / Math.max(1, total), 0, 1);
    var max = track.scrollWidth - innerWidth + 40; track.style.setProperty('--x', (-max * p).toFixed(1) + 'px'); hz.style.setProperty('--p', p.toFixed(4));
    var k = Math.min(hs.length - 1, Math.floor(p * hs.length * 1.0001)); hs.forEach(function (s, i) { s.classList.toggle('on', i <= k && r.top <= 80); });
  }
  if (hz) { addEventListener('scroll', function () { requestAnimationFrame(journey); }, { passive: true }); addEventListener('resize', journey); journey(); }

  /* the explorer: one part at a time */
  var tabs = $$('.xp-t [role=tab]'), pans = $$('.xp-p');
  function pick(i, focus, scroll) {
    tabs.forEach(function (t, k) { var on = k === i; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; pans[k].classList.toggle('on', on); });
    if (focus) tabs[i].focus();
    if (scroll) $('.xp').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  if (tabs.length) {
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { pick(i); });
      t.addEventListener('keydown', function (e) { var n = tabs.length, j = -1;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % n; else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i + n - 1) % n; else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = n - 1;
        if (j > -1) { e.preventDefault(); pick(j, true); } });
    });
    $$('[data-tab]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); pick(+a.getAttribute('data-tab') - 1, false, true); }); });
    var m = location.hash.match(/^#inc-(\d+)$/); pick(m ? Math.min(+m[1] - 1, tabs.length - 1) : 0, false, false);
  }
})();
