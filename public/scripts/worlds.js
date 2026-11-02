/* SLATOUT worlds: the interactive scene at the top of each service page. Every scene is illustrative and works without it. */
(function () {
  'use strict';
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cl = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ---------- The Registry ---------- */
  var rg = $('.wv.rg');
  if (rg) {
    var typed = $('.rg-typed', rg), suf = $('.rg-suf', rg), type = $('.rg-type', rg), inp = $('.rg-in input', rg), cert = $('.rg-cert', rg);
    $$('.rg-tab', rg).forEach(function (b) { b.addEventListener('click', function () { $$('.rg-tab', rg).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      suf.textContent = b.getAttribute('data-suf'); type.textContent = b.getAttribute('data-type'); cert.classList.remove('stamped'); }); });
    inp.addEventListener('input', function () { typed.textContent = inp.value.trim() || 'Your Company'; cert.classList.remove('stamped'); });
    $('.rg-go', rg).addEventListener('click', function () { cert.classList.remove('stamped'); void cert.offsetWidth; cert.classList.add('stamped'); });
    if (!reduce) setTimeout(function () { cert.classList.add('stamped'); }, 1400);
  }

  /* ---------- The Terminal ---------- */
  var tm = $('.wv.tm');
  if (tm) {
    var out = $('.tm-out', tm), f = $('.tm-f', tm), ti = $('#tm-in'), parts = tm.getAttribute('data-parts').split('|'), q = [], busy = false;
    var print = function (lines, cls) { lines.forEach(function (l) { q.push([l, cls]); }); pump(); };
    var pump = function () { if (busy) return; var n = q.shift(); if (!n) return; busy = true; var el = d.createElement('span'); el.className = n[1] || ''; out.appendChild(el);
      var i = 0, s = n[0]; (function t() { el.textContent = s.slice(0, ++i); out.parentNode.scrollTop = 1e6; if (i < s.length && !reduce) setTimeout(t, n[1] === 'tc' ? 28 : 6); else { el.appendChild(d.createTextNode('\n')); busy = false; setTimeout(pump, reduce ? 0 : 90); } })(); };
    var CMD = {
      help: ['Commands: build  ai  parts  stack  contact  clear'],
      build: ['Resolving your requirements...'].concat(parts.map(function (p) { return '✓ ' + p; })).concat(['Build planned. Scope is agreed before any code is written.']),
      ai: ['Looking for one real business problem...', '✓ Repetitive work found: replies, follow-ups, reports', '✓ Suggest: an assistant trained on your own documents', 'AI is added where it saves time, not for show.'],
      parts: parts.map(function (p, i) { return ('0' + (i + 1)).slice(-2) + '  ' + p; }),
      stack: ['Website  ·  CRM  ·  WhatsApp  ·  Automations  ·  Dashboards', 'Chosen for your process, not the other way round.'],
      contact: ['Opening the enquiry form below...']
    };
    var run = function (c) { c = (c || '').trim().toLowerCase(); if (!c) return; print(['$ ' + c], 'tc');
      if (c === 'clear') { out.textContent = ''; q = []; return; }
      if (CMD[c]) print(CMD[c], 'ok'); else print(['Not found: ' + c + '. Type help.'], 'err');
      if (c === 'contact') setTimeout(function () { var e = d.getElementById('enquire'); if (e) e.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }, 900); };
    f.addEventListener('submit', function (e) { e.preventDefault(); run(ti.value); ti.value = ''; });
    $$('[data-cmd]', tm).forEach(function (b) { b.addEventListener('click', function () { run(b.getAttribute('data-cmd')); ti.focus({ preventScroll: true }); }); });
    print(['$ slatout init your-business'], 'tc'); print(['Welcome. Type help, or press a command below.'], 'ok');
    if (!reduce) setTimeout(function () { run('build'); }, 1600);
  }

  /* ---------- The Street Map ---------- */
  var mp = $('.wv.mp');
  if (mp) {
    var svg = $('.mp-svg', mp), pin = $('.mp-pin', mp), pos = { x: 240, y: 160 }, drag = false;
    var check = function () {
      var foot = Math.hypot(pos.x - 210, pos.y - 200) < 75, comp = Math.hypot(pos.x - 475, pos.y - 212) > 110,
        road = Math.abs(pos.y - 200) < 22 || Math.abs(pos.x - 200) < 22 || Math.abs(pos.x - 420) < 22 && pos.y < 270, water = pos.y < 268;
      var res = { foot: foot, comp: comp, road: road, water: water }, n = 0;
      $$('.mp-l li', mp).forEach(function (li) { var ok = res[li.getAttribute('data-k')]; li.classList.toggle('ok', ok); li.classList.toggle('no', !ok); if (ok) n++; });
      $('.mp-v', mp).textContent = n === 4 ? 'Strong candidate. Now we would verify it with real data.' : n + ' of 4 checks pass. Try another spot.';
      pin.setAttribute('aria-valuetext', n + ' of 4 checks pass');
    };
    var place = function () { pin.setAttribute('transform', 'translate(' + pos.x + ' ' + pos.y + ')'); check(); };
    var toSvg = function (e) { var r = svg.getBoundingClientRect(); return { x: cl((e.clientX - r.left) / r.width * 600, 20, 580), y: cl((e.clientY - r.top) / r.height * 420, 64, 410) }; };
    pin.addEventListener('pointerdown', function (e) { drag = true; pin.setPointerCapture(e.pointerId); mp.classList.add('drag'); });
    pin.addEventListener('pointermove', function (e) { if (!drag) return; var p = toSvg(e); pos.x = p.x; pos.y = p.y + 30; place(); });
    pin.addEventListener('pointerup', function () { drag = false; mp.classList.remove('drag'); });
    svg.addEventListener('click', function (e) { if (e.target.closest('.mp-pin')) return; var p = toSvg(e); pos.x = p.x; pos.y = p.y + 30; place(); });
    pin.addEventListener('keydown', function (e) { var k = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }[e.key]; if (!k) return; e.preventDefault(); pos.x = cl(pos.x + k[0], 20, 580); pos.y = cl(pos.y + k[1], 70, 410); place(); });
    place();
  }

  /* ---------- The Brand Book ---------- */
  var bb = $('.wv.bb');
  if (bb) {
    $$('.bb-p', bb).forEach(function (b) { b.addEventListener('click', function () { var c = b.getAttribute('data-c').split(',');
      ['--b1', '--b2', '--b3', '--b4'].forEach(function (v, i) { bb.style.setProperty(v, c[i]); }); $$('.bb-p', bb).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); }); });
    $$('.bb-t', bb).forEach(function (b) { b.addEventListener('click', function () { bb.style.setProperty('--bf', b.getAttribute('data-f')); $$('.bb-t', bb).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); }); });
    if (!reduce) { var k = 0, auto = setInterval(function () { var ps = $$('.bb-p', bb); k = (k + 1) % ps.length; ps[k].click(); }, 2600); bb.addEventListener('pointerenter', function () { clearInterval(auto); }, { once: true }); }
  }

  /* ---------- The Editorial Desk ---------- */
  var ed = $('.wv.ed');
  if (ed) {
    var P = ['Educate: a how-to or explainer', 'Inspire: a story or behind the scenes', 'Prove: a result, review or case', 'Sell: an offer with a clear next step', 'Rest: repurpose or engage, no new piece'];
    $('.ed-date', ed).textContent = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    var o = $('.ed-out', ed);
    $$('.ed-d', ed).forEach(function (b) { var show = function () { o.textContent = 'Day ' + b.textContent + ' · ' + P[+b.getAttribute('data-p')]; $$('.ed-d', ed).forEach(function (x) { x.classList.toggle('on', x === b); }); };
      b.addEventListener('pointerenter', show); b.addEventListener('focus', show); b.addEventListener('click', show); });
  }

  /* ---------- The Dashboard ---------- */
  var db = $('.wv.db');
  if (db) {
    var tabs = $$('[role=tab]', db), views = $$('.db-v', db), user = false;
    var show = function (v) { tabs.forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-v') === v); }); views.forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-v') === v); }); };
    tabs.forEach(function (t) { t.addEventListener('click', function () { user = true; show(t.getAttribute('data-v')); }); });
    var qs = ['best dentist near me', 'ca for startups in pune', 'buy running shoes online', 'what is aeo'], qi = 0, tp = $('.db-typed', db);
    if (!reduce) setInterval(function () { qi = (qi + 1) % qs.length; var s = qs[qi], i = 0; tp.textContent = ''; (function t() { tp.textContent = s.slice(0, ++i); if (i < s.length) setTimeout(t, 55); })(); }, 3800);
    var seq = ['s', 'o', 'a'], si = 0; if (!reduce) setInterval(function () { if (user) return; si = (si + 1) % 3; show(seq[si]); }, 5200);
    var like = $('.db-like', db), lc = $('.db-lc', db), n = 0;
    like.addEventListener('click', function () { n++; like.setAttribute('aria-pressed', 'true'); like.classList.remove('pop'); void like.offsetWidth; like.classList.add('pop'); lc.textContent = n === 1 ? 'Liked. Now imagine that, measured and repeatable.' : 'Liked ' + n + ' times'; });
  }

  /* ---------- The Marketplace ---------- */
  var mk = $('.wv.mk');
  if (mk) {
    var cnt = $('.mk-cart b', mk), add = $('.mk-add', mk), n2 = 0;
    add.addEventListener('click', function () { n2++; cnt.textContent = n2; var c = $('.mk-cart', mk); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); add.textContent = 'Added ✓'; setTimeout(function () { add.textContent = 'Add to cart'; }, 1200); });
    if (!reduce) setTimeout(function () { mk.classList.add('ranked'); }, 800);
  }

  /* ---------- The Ad Exchange ---------- */
  var ax = $('.wv.ax');
  if (ax) {
    var cv = $('.ax-cv', ax), ctx = cv.getContext('2d'), rng = $('.ax-r input', ax), log = $('.ax-log', ax), scr = $$('.ax-scr li', ax), dots = [], W = 0, H = 0, vis = true;
    var size = function () { var r = cv.getBoundingClientRect(), dp = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height; cv.width = W * dp; cv.height = H * dp; ctx.setTransform(dp, 0, 0, dp, 0, 0); };
    size(); addEventListener('resize', size);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(ax);
    var NAMES = ['Display', 'Video', 'CTV', 'Audio'], lg = function (t) { var li = d.createElement('li'); li.textContent = t; log.insertBefore(li, log.firstChild); while (log.children.length > 6) log.removeChild(log.lastChild); };
    var tick = 0;
    (function loop() {
      requestAnimationFrame(loop); if (!vis || d.hidden) return; tick++;
      if (tick % 5 === 0 && dots.length < 90) { var a = Math.random() * Math.PI * 2, r = Math.max(W, H) * .62; dots.push({ x: W / 2 + Math.cos(a) * r, y: H / 2 + Math.sin(a) * r, m: Math.random() * 100 < +rng.value, s: Math.floor(Math.random() * 4), st: 0 }); }
      ctx.clearRect(0, 0, W, H);
      for (var k = 1; k <= 4; k++) { ctx.beginPath(); ctx.arc(W / 2, H / 2, k * Math.min(W, H) * .11 + ((tick * .4) % (Math.min(W, H) * .11)), 0, Math.PI * 2); ctx.strokeStyle = 'rgba(94,234,212,' + (.22 - k * .04) + ')'; ctx.stroke(); }
      dots = dots.filter(function (p) {
        var tx = W / 2, ty = H / 2;
        if (p.st === 1) { var el = scr[p.s], rr = el.getBoundingClientRect(), cr = cv.getBoundingClientRect(); tx = rr.left - cr.left + rr.width / 2; ty = rr.top - cr.top + rr.height / 2; }
        p.x += (tx - p.x) * (p.st ? .09 : .035); p.y += (ty - p.y) * (p.st ? .09 : .035);
        var dd = Math.hypot(tx - p.x, ty - p.y);
        if (!p.st && dd < 26) { if (p.m) { p.st = 1; lg('bid → won → ' + NAMES[p.s]); } else return false; }
        if (p.st && dd < 8) { scr[p.s].classList.remove('hit'); void scr[p.s].offsetWidth; scr[p.s].classList.add('hit'); return false; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.st ? 4 : 2.5, 0, Math.PI * 2); ctx.fillStyle = p.st ? '#5EEAD4' : (p.m ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.3)'); ctx.fill(); return true;
      });
    })();
  }

  /* ---------- The Pipeline ---------- */
  var pp = $('.wv.pp');
  if (pp) {
    var cols = $$('.pp-c', pp), count = function () { cols.forEach(function (c) { $('.pp-h b', c).textContent = $$('.pp-card', c).length; }); };
    var moveTo = function (card, ci) { var ul = $('ul', cols[ci]); ul.appendChild(card); card.classList.remove('land'); void card.offsetWidth; card.classList.add('land'); if (ci === cols.length - 1) card.classList.add('won'); count(); };
    $$('.pp-card', pp).forEach(function (card) {
      var sx, sy, drag = false;
      card.addEventListener('pointerdown', function (e) { drag = true; sx = e.clientX; sy = e.clientY; card.setPointerCapture(e.pointerId); card.classList.add('drag'); });
      card.addEventListener('pointermove', function (e) { if (drag) card.style.transform = 'translate(' + (e.clientX - sx) + 'px,' + (e.clientY - sy) + 'px) rotate(2deg)'; });
      card.addEventListener('pointerup', function (e) { if (!drag) return; drag = false; card.classList.remove('drag'); card.style.transform = '';
        var target = cols.filter(function (c) { var r = c.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right; })[0];
        if (target) moveTo(card, cols.indexOf(target)); });
      card.addEventListener('keydown', function (e) { var ci = cols.indexOf(card.closest('.pp-c'));
        if (e.key === 'ArrowRight' && ci < cols.length - 1) { e.preventDefault(); moveTo(card, ci + 1); card.focus(); }
        if (e.key === 'ArrowLeft' && ci > 0) { e.preventDefault(); moveTo(card, ci - 1); card.focus(); } });
    });
    if (!reduce) setTimeout(function () { var c = $('.pp-c[data-c="2"] .pp-card', pp); if (c) moveTo(c, 3); }, 1500);
  }

  /* ---------- The Ledger ---------- */
  var lgr = $('.wv.lg');
  if (lgr) {
    var rows = $$('tbody tr', lgr), bal = $('.lg-bal', lgr), go = $('.lg-go', lgr), done = false;
    var close = function () { if (done) { rows.forEach(function (r) { r.classList.remove('ok'); $('.lg-s span', r).textContent = 'Open'; }); bal.textContent = 'Open items'; lgr.classList.remove('bal'); go.textContent = 'Close the books'; done = false; return; }
      rows.forEach(function (r, i) { setTimeout(function () { r.classList.add('ok'); $('.lg-s span', r).textContent = 'Done'; if (i === rows.length - 1) { bal.textContent = 'Balanced ✓'; lgr.classList.add('bal'); go.textContent = 'Reopen'; done = true; } }, reduce ? 0 : i * 260); }); };
    go.addEventListener('click', close);
    if (!reduce && 'IntersectionObserver' in window) { var o2 = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { o2.disconnect(); setTimeout(close, 900); } }); o2.observe(lgr); }
  }
})();
