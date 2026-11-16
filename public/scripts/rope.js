/* SLATOUT home hero: one white rope woven through the wordmark. Drag it, double-click to retie it. */
(function () {
  'use strict';
  var cv = document.getElementById('rope'); if (!cv) return; var ctx = cv.getContext('2d'), hero = cv.parentNode;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 0, H = 0, DPR = 1, FONT = '900 100px "Inter Tight", "Inter", "Helvetica Neue", Arial, sans-serif';
  var WORD = 'slatout', letters = [], fontPx = 100, base = 0, R = 40, scaleT = 1, scale = 1;
  var N = 320, P = [], seed = Math.random() * 10, time = 0;
  var mouse = { x: -1e4, y: -1e4, down: false, grab: -1 };

  /* ---------- the giant wordmark, one letter at a time ---------- */
  function layoutWord() {
    ctx.font = FONT.replace('100px', '100px');
    var w100 = ctx.measureText(WORD).width;
    fontPx = Math.min((W * .94) / w100 * 100, H * .52);
    ctx.font = FONT.replace('100px', fontPx + 'px');
    var total = ctx.measureText(WORD).width, x0 = (W - total) / 2;
    base = H * (W < 640 ? .6 : .73);
    letters = [];
    for (var i = 0; i < WORD.length; i++) {
      var before = ctx.measureText(WORD.slice(0, i)).width, wi = ctx.measureText(WORD[i]).width;
      letters.push({ ch: WORD[i], x: x0 + before, w: wi, lift: 0, liftT: 0, tilt: 0 });
    }
    R = Math.max(12, fontPx * .085);
  }

  /* ---------- where the tube wants to be: a curly ribbon woven through the letters ---------- */
  function rest(t, ph) {
    var cx = W / 2, cy = base - fontPx * .4, span = W * 1.24, f = Math.PI * 2 * 3.5, a = t * f + seed + ph * .6;
    var x = cx - span / 2 + span * t + fontPx * .46 * Math.sin(a);
    var y = cy + fontPx * .42 * Math.cos(a) + fontPx * .14 * Math.sin(t * Math.PI * 2 * .8 + seed * 1.7 + ph);
    return [x, y];
  }
  function depth(t) { return Math.sin(t * Math.PI * 2 * 4.5 + seed * 2.3); }   // >0: over the letters, <0: behind them

  function initRope() {
    P = [];
    for (var i = 0; i < N; i++) { var t = i / (N - 1), r = rest(t, 0); P.push({ x: r[0], y: r[1] + (reduce ? 0 : H * .8), px: r[0], py: r[1] + (reduce ? 0 : H * .8), t: t }); }
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    layoutWord();
    if (!P.length) initRope();
  }

  /* ---------- physics: springs to the woven shape, neighbours pull each other, the cursor pushes ---------- */
  function step() {
    time += reduce ? 0 : .006;
    var ph = time, ox = P.map(function (q) { return q.x; }), oy = P.map(function (q) { return q.y; });
    for (var i = 0; i < N; i++) {
      var p = P[i], r = rest(p.t, ph), vx = (p.x - p.px) * .86, vy = (p.y - p.py) * .86;
      p.px = p.x; p.py = p.y;
      var k = mouse.grab >= 0 ? .012 : .035;
      var fx = (r[0] - p.x) * k, fy = (r[1] - p.y) * k;
      if (i > 0 && i < N - 1) { fx += (ox[i - 1] + ox[i + 1] - 2 * ox[i]) * .2; fy += (oy[i - 1] + oy[i + 1] - 2 * oy[i]) * .2; }
      var dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy, rr = R * 3.2;
      if (mouse.grab < 0 && d2 < rr * rr && d2 > 1) { var d = Math.sqrt(d2), f = (rr - d) / rr * 2.2; fx += dx / d * f; fy += dy / d * f; }
      p.x += vx + fx; p.y += vy + fy;
    }
    if (mouse.grab >= 0) {   // the grabbed point follows the cursor, its neighbours follow it softly
      for (var j = -14; j <= 14; j++) { var q = P[mouse.grab + j]; if (!q) continue; var w = Math.pow(1 - Math.abs(j) / 15, 2);
        q.x += (mouse.x - q.x) * .35 * w; q.y += (mouse.y - q.y) * .35 * w; }
    }
  }

  /* ---------- drawing ---------- */
  // the tube: each run of points on the same side of the letters is stroked several times, dark to light,
  // with the lighter strokes nudged toward the light, which reads as a soft white cylinder
  function trace(pts, ox, oy) {
    ctx.beginPath(); ctx.moveTo(pts[0].x + ox, pts[0].y + oy);
    for (var i = 1; i < pts.length - 1; i++) { var mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2; ctx.quadraticCurveTo(pts[i].x + ox, pts[i].y + oy, mx + ox, my + oy); }
    var l = pts[pts.length - 1]; ctx.lineTo(l.x + ox, l.y + oy);
  }
  var LAYERS = (function () {   // 12 soft steps from the shaded edge to the highlight
    var out = [], c0 = [176, 132, 104], c1 = [255, 255, 255];
    for (var k = 0; k < 12; k++) { var u = k / 11, e = Math.pow(u, .8), w = 1 - .78 * Math.pow(u, .9);
      var c = c0.map(function (v, j) { return Math.round(v + (c1[j] - v) * e); });
      out.push([w, 'rgb(' + c.join(',') + ')', -.32 * u, -.4 * u]); }
    return out; })();
  // one continuous tube, drawn in short overlapping pieces so that where it crosses itself the later piece
  // sits on top, exactly like a real rope; its shadow is drawn once underneath
  function tube() {
    var rr = R * (1 + (scale - 1) * .6);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(90,28,0,.14)'; ctx.lineWidth = rr * 2.4; trace(P, rr * .55, rr * .95); ctx.stroke();
    ctx.strokeStyle = 'rgba(90,28,0,.12)'; ctx.lineWidth = rr * 1.8; trace(P, rr * .38, rr * .62); ctx.stroke();
    LAYERS.forEach(function (L) { ctx.strokeStyle = L[1]; ctx.lineWidth = rr * 2 * L[0]; trace(P, rr * L[2], rr * L[3]); ctx.stroke(); });
    // where the tube crosses itself, the later stretch is drawn again on top (with its own little shadow), so the rope reads as one loop over another
    ctx.lineCap = 'butt';
    var K = 2, seen = {};
    for (var i = 0; i < N - K; i += K) {
      var a1 = P[i], a2 = P[i + K];
      for (var j = i + 6 * K; j < N - K; j += K) {
        var b1 = P[j], b2 = P[j + K];
        if (Math.max(a1.x, a2.x) < Math.min(b1.x, b2.x) || Math.max(b1.x, b2.x) < Math.min(a1.x, a2.x) || Math.max(a1.y, a2.y) < Math.min(b1.y, b2.y) || Math.max(b1.y, b2.y) < Math.min(a1.y, a2.y)) continue;
        var d = (a2.x - a1.x) * (b2.y - b1.y) - (a2.y - a1.y) * (b2.x - b1.x); if (!d) continue;
        var u = ((b1.x - a1.x) * (b2.y - b1.y) - (b1.y - a1.y) * (b2.x - b1.x)) / d, v = ((b1.x - a1.x) * (a2.y - a1.y) - (b1.y - a1.y) * (a2.x - a1.x)) / d;
        if (u < 0 || u > 1 || v < 0 || v > 1) continue;
        var key = Math.round(j / 12); if (seen[key]) continue; seen[key] = 1;
        var ix = a1.x + (a2.x - a1.x) * u, iy = a1.y + (a2.y - a1.y) * u, cr = rr * 2.3;
        var span = Math.ceil(cr * 1.6 / Math.max(1, Math.hypot(b2.x - b1.x, b2.y - b1.y) / K)), pts = P.slice(Math.max(0, j - span), Math.min(N, j + span + 1));
        ctx.save(); ctx.beginPath(); ctx.arc(ix, iy, cr, 0, Math.PI * 2); ctx.clip(); ctx.lineCap = 'round';
        ctx.strokeStyle = 'rgba(90,28,0,.14)'; ctx.lineWidth = rr * 2.1; trace(pts, rr * .2, rr * .32); ctx.stroke();
        LAYERS.forEach(function (L) { ctx.strokeStyle = L[1]; ctx.lineWidth = rr * 2 * L[0]; trace(pts, rr * L[2], rr * L[3]); ctx.stroke(); });
        ctx.restore();
      }
    }
  }
  // the weave: the tube passes in front of some letters and behind the others
  var weave = [true, false, true, false, true, false, true];
  function word(front) {
    ctx.font = FONT.replace('100px', fontPx + 'px'); ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#0B0B0B';
    var cx = W / 2, cy = base - fontPx * .35;
    ctx.save(); ctx.translate(cx, cy); ctx.scale(scale, scale); ctx.translate(-cx, -cy);
    letters.forEach(function (L, i) {
      if (weave[i] === front) return;
      ctx.save(); ctx.translate(L.x + L.w / 2, base - L.lift); ctx.rotate(L.tilt * L.lift / 40);
      ctx.fillText(L.ch, -L.w / 2, 0); ctx.restore();
    });
    ctx.restore();
  }
  var visible = true; if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(hero);
  function frame() {
    if (!visible || document.hidden) { requestAnimationFrame(frame); return; }
    scale += (scaleT - scale) * .08;
    step();
    // letters lift when the cursor is near them
    letters.forEach(function (L) { var inX = mouse.x > L.x && mouse.x < L.x + L.w, inY = mouse.y > base - fontPx * .8 && mouse.y < base + fontPx * .1;
      L.liftT = (inX && inY && mouse.grab < 0) ? fontPx * .07 : 0; L.tilt = (L.ch.charCodeAt(0) % 2 ? 1 : -1) * .04; });
    ctx.clearRect(0, 0, W, H);
    letters.forEach(function (L) { L.lift += (L.liftT - L.lift) * .15; });
    word(false);   // letters the tube passes in front of
    tube();        // the tube itself
    word(true);    // letters the tube passes behind
    requestAnimationFrame(frame);
  }

  /* ---------- input ---------- */
  function pos(e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
  function nearest(x, y) { var best = -1, bd = (R * 1.6) * (R * 1.6); for (var i = 0; i < N; i++) { var dx = P[i].x - x, dy = P[i].y - y, d = dx * dx + dy * dy; if (d < bd) { bd = d; best = i; } } return best; }
  var cur = document.createElement('div'); cur.className = 'rope-cur'; cur.setAttribute('aria-hidden', 'true'); hero.appendChild(cur); var hint = hero.querySelector('.rh-hint') || document.createElement('p');
  cv.addEventListener('pointermove', function (e) { var p = pos(e); mouse.x = p[0]; mouse.y = p[1]; cur.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)'; cur.classList.toggle('on', mouse.grab >= 0 || nearest(p[0], p[1]) >= 0); });
  cv.addEventListener('pointerdown', function (e) { var p = pos(e); mouse.x = p[0]; mouse.y = p[1]; mouse.grab = nearest(p[0], p[1]); if (mouse.grab >= 0) { cv.setPointerCapture(e.pointerId); cv.classList.add('grabbing'); hint.classList.add('gone'); } });
  var up = function () { mouse.grab = -1; cv.classList.remove('grabbing'); };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('pointerleave', function () { if (mouse.grab < 0) { mouse.x = mouse.y = -1e4; cur.classList.remove('on'); } });
  
  function retie() { seed = Math.random() * 10; weave = weave.map(function (v) { return !v; }); P.forEach(function (p) { p.py -= (Math.random() - .5) * 40; }); hint.classList.add('gone'); }
  cv.addEventListener('dblclick', retie);
  document.addEventListener('keydown', function (e) { if (e.key === ' ' && e.target === document.body && hero.getBoundingClientRect().bottom > 0) { e.preventDefault(); retie(); } });

  /* Think bigger: everything grows, the button flips to Think smaller */
  var think = document.getElementById('think');
  think.addEventListener('click', function () { var on = think.getAttribute('aria-pressed') !== 'true'; think.setAttribute('aria-pressed', on); hero.classList.toggle('big', on);
    scaleT = on ? 1.16 : 1; think.firstChild.nodeValue = on ? 'Think smaller ' : 'Think bigger '; });

  /* the headline's first word cycles when clicked */
  var swap = hero.querySelector('[data-swap]'), words = ['Ordinary', 'Average', 'Safe', 'Beige', 'Boring', 'Template'], wi = 0;
  swap.addEventListener('click', function () { wi = (wi + 1) % words.length; swap.textContent = words[wi]; swap.animate([{ transform: 'translateY(30%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 400, easing: 'cubic-bezier(.2,.8,.2,1)' }); retie(); });

  /* typed line, bottom left */
  var typed = hero.querySelector('.typed'), lines = ['Unexpected possibilities.', 'Bold ideas, built properly.', 'Strategy before noise.', 'Unexpected possibilities.'], li = 0;
  if (!reduce) (function cycle() {
    var target = lines[li % lines.length], cur2 = typed.textContent, i = cur2.length;
    var del = setInterval(function () { i--; typed.textContent = cur2.slice(0, Math.max(0, i)); if (i <= 0) { clearInterval(del); var j = 0;
      var add = setInterval(function () { j++; typed.textContent = target.slice(0, j); if (j >= target.length) { clearInterval(add); li++; setTimeout(cycle, 3200); } }, 45); } }, 25);
  })();
  setTimeout(function () { hint.classList.add('gone'); }, 9000);

  /* start once the display font is ready, so the wordmark measures correctly */
  var go = function () { resize(); requestAnimationFrame(frame); };
  addEventListener('resize', function () { var oldW = W; resize(); if (Math.abs(W - oldW) > 40) initRope(); });
  if (document.fonts && document.fonts.load) Promise.race([document.fonts.load(FONT), new Promise(function (r) { setTimeout(r, 1500); })]).then(go, go); else go();
})();
