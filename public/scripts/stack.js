/* SLATOUT "Stack your business": the logo's stacked slabs become a live, rotating stack of the services a
   visitor picks. Pure Canvas 2D, no libraries. Everything here is optional: without it the page lists every
   service as normal links. Saved per browser in localStorage (key slatout.v1 -> stack). */
(function () {
  'use strict';
  var D = window.SLATOUT_STUDIO, cv = document.getElementById('stack');
  if (!D || !cv || !cv.getContext) return;
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx = cv.getContext('2d'), SV = D.services, ORDER = Object.keys(SV).sort(function (a, b) { return SV[a].floor - SV[b].floor; });
  var KEY = 'slatout.v1';
  var mode = cv.getAttribute('data-mode') || 'build', cur = cv.getAttribute('data-sl');
  var ART = mode === 'floor' && window.Path2D ? [new Path2D(cv.getAttribute('data-art') || ''), new Path2D(cv.getAttribute('data-art-a') || '')] : null;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function save(fn) { var s = load(); fn(s); try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { } }

  /* ---------- materials: one per business stage ---------- */
  var MAT = { start: [190, 186, 178], build: [242, 240, 235], grow: [255, 106, 0], run: [48, 52, 56] };
  var LIGHT = [-0.55, 0.83];

  /* ---------- geometry ---------- */
  function rrect(h, r, n) { // rounded square outline, counter-clockwise, as [x,y] points
    var pts = [], c = [[h - r, h - r, 0], [-(h - r), h - r, 90], [-(h - r), -(h - r), 180], [h - r, -(h - r), 270]];
    c.forEach(function (k) { for (var i = 0; i <= n; i++) { var a = (k[2] + 90 * i / n) * Math.PI / 180; pts.push([k[0] + r * Math.cos(a), k[1] + r * Math.sin(a)]); } });
    return pts;
  }
  var W = 0, H = 0, S = 240, T = 16, GAP = 9, CX = 0, BASE = 0, tBase = 0, K = 0.5, theta = -0.55, compact = false;
  var OUT = [], IN = [];
  function layout() {
    var r = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(280, r.width); H = Math.max(300, r.height);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    compact = W < 520;
    S = Math.min(compact ? W * 0.5 : W * 0.46, 300, H * 0.52);
    T = Math.max(10, S * 0.07); GAP = T * 1.2;
    CX = compact ? W * 0.44 : Math.min(W * 0.4, W - S * 0.78 - 190);
    if (typeof items !== 'undefined') retarget(true);
    OUT = rrect(S / 2, S * 0.2, 7); IN = rrect(S * 0.3, S * 0.11, 7);
  }
  function P(x, y, z) { var c = Math.cos(theta), s = Math.sin(theta); return [CX + x * c - y * s, BASE + (x * s + y * c) * K - z]; }
  function nrm(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [dy / l, -dx / l]; } // outward for CCW
  function rotN(n) { var c = Math.cos(theta), s = Math.sin(theta); return [n[0] * c - n[1] * s, n[0] * s + n[1] * c]; }
  function shade(m, f, a) { return 'rgba(' + Math.round(m[0] * f) + ',' + Math.round(m[1] * f) + ',' + Math.round(m[2] * f) + ',' + a + ')'; }
  function poly(pts) { ctx.beginPath(); pts.forEach(function (p, i) { if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }); ctx.closePath(); }

  /* draw one slab: z = bottom height, ring = hollow (logo style) */
  function slab(z, mat, alpha, dx, ring, hot) {
    var zt = z + T, out = OUT.map(function (p) { return [p[0] + dx, p[1]]; });
    // outer walls facing the viewer
    for (var i = 0; i < out.length; i++) {
      var a = out[i], b = out[(i + 1) % out.length], n = rotN(nrm(a, b));
      if (n[1] <= 0) continue;
      var f = 0.62 + 0.3 * Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1]);
      poly([P(a[0], a[1], zt), P(b[0], b[1], zt), P(b[0], b[1], z), P(a[0], a[1], z)]);
      ctx.fillStyle = shade(mat, f, alpha); ctx.fill(); ctx.strokeStyle = shade(mat, f, alpha); ctx.lineWidth = 0.6; ctx.stroke();
    }
    var inn = IN.map(function (p) { return [p[0] + dx, p[1]]; });
    if (ring) { // inner walls seen through the hole
      for (var j = 0; j < inn.length; j++) {
        var c = inn[j], e = inn[(j + 1) % inn.length], m = rotN(nrm(c, e));
        if (m[1] >= 0) continue;
        poly([P(c[0], c[1], zt), P(e[0], e[1], zt), P(e[0], e[1], z), P(c[0], c[1], z)]);
        ctx.fillStyle = shade(mat, 0.58, alpha); ctx.fill();
      }
    }
    // top face
    ctx.beginPath(); out.forEach(function (p, k) { var q = P(p[0], p[1], zt); if (k) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); }); ctx.closePath();
    if (ring) { inn.slice().reverse().forEach(function (p, k) { var q = P(p[0], p[1], zt); if (k) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); }); ctx.closePath(); }
    ctx.fillStyle = shade(mat, hot ? 1.04 : 1, alpha); ctx.fill('evenodd');
    ctx.strokeStyle = hot ? 'rgba(255,106,0,' + alpha + ')' : 'rgba(26,27,29,' + 0.18 * alpha + ')'; ctx.lineWidth = hot ? 2.5 : 1; ctx.stroke();
  }
  function shadow(spread, a) {
    var c = P(0, 0, 0); ctx.save(); ctx.translate(c[0], c[1] + 4); ctx.scale(1, K);
    var g = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 0.8 * spread); g.addColorStop(0, 'rgba(0,0,0,' + 0.22 * a + ')'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, S * 0.8 * spread, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }

  /* ---------- state ---------- */
  var items = [];      // {sl, z, tz, dx, tdx, a, ta}
  var logoA = 1, logoT = 1, hover = null, dragging = false, lastX = 0, running = false, visible = true, spin = !reduce;
  var ink = '#1A1B1D', ink2 = '#45474B';
  function readInk() { var cs = getComputedStyle(d.documentElement); ink = cs.getPropertyValue('--ink').trim() || ink; ink2 = cs.getPropertyValue('--ink-2').trim() || ink2; }
  function chosen() { return items.filter(function (i) { return i.ta > 0; }).map(function (i) { return i.sl; }); }
  function retarget(snap) {
    var live = items.filter(function (i) { return i.ta > 0; }).sort(function (a, b) { return SV[a.sl].floor - SV[b.sl].floor; });
    var split = mode === 'floor' ? S * 0.42 : 0;
    var n = live.length, room = H - S * 0.62 - 70 - split, unit = n ? Math.min(T * 2.3, Math.max(T * 1.1, room / n)) : 0;
    GAP = n ? unit - T : T * 1.2;
    var ci = -1; live.forEach(function (it, k) { if (it.sl === cur) ci = k; });
    live.forEach(function (it, k) {
      it.tz = k * unit + (mode === 'floor' && ci > -1 && k > ci ? split : 0);
      if (mode === 'floor' && it.sl === cur) it.tdx = S * 0.1;
      if (snap) { it.z = it.tz; if (mode === 'floor') it.dx = it.tdx; }
    });
    logoT = n ? 0 : 1;
    var height = n ? (n - 1) * unit + T + split : S * 0.68 + T;
    tBase = H / 2 + height / 2 + S * 0.16;
    if (snap || !BASE) BASE = tBase;
  }
  function add(sl, quiet) {
    var ex = items.filter(function (i) { return i.sl === sl; })[0];
    if (ex && ex.ta > 0) return;
    var live = chosen(), k = live.filter(function (x) { return SV[x].floor < SV[sl].floor; }).length;
    var above = k < live.length; // inserting in the middle slides in from the side; on top it drops in
    var it = ex || { sl: sl }; it.ta = 1; it.a = reduce ? 1 : 0; it.tdx = 0;
    if (!ex) items.push(it);
    retarget();
    it.dx = reduce ? 0 : (above ? S * 1.1 : 0); it.z = reduce || above ? it.tz : it.tz + S * 0.9;
    after(quiet ? null : 'Added floor ' + SV[sl].floor + ', ' + SV[sl].n + '.');
  }
  function remove(sl) {
    items.forEach(function (i) { if (i.sl === sl) { i.ta = 0; i.tdx = -S * 1.1; } });
    retarget(); after('Removed ' + SV[sl].n + '.');
  }
  function setStack(list, msg) { items.forEach(function (i) { i.ta = 0; i.tdx = -S * 1.1; }); retarget(); list.forEach(function (sl) { add(sl, true); }); after(msg); }
  function step() {
    var moving = false, e = reduce ? 1 : 0.16;
    items.forEach(function (i) {
      ['z', 'dx', 'a'].forEach(function (p) { var t = i['t' + p], v = i[p]; if (Math.abs(t - v) > 0.01) { i[p] = v + (t - v) * e; moving = true; } else i[p] = t; });
    });
    items = items.filter(function (i) { return i.ta > 0 || i.a > 0.02; });
    if (Math.abs(tBase - BASE) > 0.3) { BASE += (tBase - BASE) * (reduce ? 1 : 0.14); moving = true; } else BASE = tBase;
    if (Math.abs(logoT - logoA) > 0.01) { logoA += (logoT - logoA) * (reduce ? 1 : 0.12); moving = true; } else logoA = logoT;
    return moving;
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    var live = items.slice().sort(function (a, b) { return a.z - b.z; });
    var n = chosen().length;
    shadow(n ? 1 : 0.95, 1);
    if (logoA > 0.01) { // the SLATOUT mark: white ring, orange slab, white ring
      var g = S * 0.34;
      slab(0, MAT.build, logoA, 0, true, false); slab(g, MAT.grow, logoA, 0, false, false); slab(g * 2, MAT.build, logoA, 0, true, false);
    }
    live.forEach(function (i) {
      var z = i.z + (hover === i.sl ? T * 0.6 : 0) , stg = SV[i.sl].stage;
      slab(z, MAT[stg] || MAT.build, i.a, i.dx, false, hover === i.sl || i.sl === cur);
      if (ART && i.sl === cur) drawArt(z + T, i.dx, stg);
    });
    // labels
    ctx.textBaseline = 'middle';
    live.forEach(function (i) {
      if (i.a < 0.05) return;
      var y = P(0, 0, i.z + T / 2)[1] + S * 0.18, xEdge = CX + S * 0.72 + i.dx, lx = compact ? W - 8 : Math.min(W - 10, CX + S * 0.86 + 150);
      ctx.globalAlpha = i.a; ctx.strokeStyle = hover === i.sl ? '#FF6A00' : ink2; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(xEdge, y); ctx.lineTo(compact ? xEdge + 14 : CX + S * 0.86, y); ctx.stroke();
      ctx.fillStyle = hover === i.sl ? '#FF6A00' : ink;
      var f = SV[i.sl].floor;
      if (compact || (mode === 'floor' && i.sl !== cur && hover !== i.sl)) { ctx.font = '700 13px HerosCn, "Arial Narrow", sans-serif'; ctx.textAlign = 'left'; ctx.fillText(String(f), xEdge + 18, y); }
      else { ctx.textAlign = 'left'; ctx.font = '700 14px HerosCn, "Arial Narrow", sans-serif'; var tx = f + '  ' + SV[i.sl].short.toUpperCase(), mx = W - (CX + S * 0.86 + 6) - 8;
        while (tx.length > 4 && ctx.measureText(tx).width > mx) tx = tx.slice(0, -2) + '\u2026';
        ctx.fillText(tx, CX + S * 0.86 + 6, y); }
      ctx.globalAlpha = 1;
    });
  }
  function drawArt(zt, dx, stg) {
    var sc = S * 0.6 / 200, c = Math.cos(theta), sn = Math.sin(theta), ox = dx - 100 * sc, oy = -100 * sc;
    ctx.save();
    ctx.transform(sc * c, sc * sn * K, -sc * sn, sc * c * K, CX + ox * c - oy * sn, BASE - zt + (ox * sn + oy * c) * K);
    ctx.lineWidth = 2.6 / sc * 0.9; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = stg === 'run' ? '#EDEBE4' : '#1A1B1D'; ctx.stroke(ART[0]);
    ctx.lineWidth = 3.4 / sc * 0.9; ctx.strokeStyle = stg === 'grow' ? '#FFFFFF' : '#FF6A00'; ctx.stroke(ART[1]);
    ctx.restore();
  }
  function frame() {
    var moving = step();
    if (spin && !dragging && visible) { theta += 0.0035; moving = true; }
    draw();
    if ((moving || dragging) && visible && !d.hidden) requestAnimationFrame(frame); else running = false;
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }

  /* ---------- interaction ---------- */
  // isPointInPath uses the current transform; reset so coordinates are device pixels
  function hitAt(e) { var r = cv.getBoundingClientRect(); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); var h = hitScaled(e.clientX - r.left, e.clientY - r.top); ctx.restore(); return h; }
  function hitScaled(x, y) { var dpr = cv.width / W; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); var live = items.filter(function (i) { return i.ta > 0; }).sort(function (a, b) { return b.z - a.z; });
    for (var k = 0; k < live.length; k++) {
      var i = live[k], top = OUT.map(function (p) { return P(p[0] + i.dx, p[1], i.z + T); });
      poly(top); if (ctx.isPointInPath(x * dpr, y * dpr)) return i.sl;
      var side = OUT.map(function (p) { return P(p[0] + i.dx, p[1], i.z); }); poly(side); if (ctx.isPointInPath(x * dpr, y * dpr) && k === live.length - 1) return i.sl;
      var yl = P(0, 0, i.z + T / 2)[1] + S * 0.18; if (x > CX + S * 0.72 && Math.abs(y - yl) < (T + GAP) / 2 + 2) return i.sl;
    }
    return null; }
  var downX = 0, moved = false;
  cv.addEventListener('pointerdown', function (e) { dragging = true; moved = false; lastX = downX = e.clientX; try { cv.setPointerCapture(e.pointerId); } catch (x) { } kick(); });
  cv.addEventListener('pointermove', function (e) {
    if (dragging) { var dx = e.clientX - lastX; lastX = e.clientX; if (Math.abs(e.clientX - downX) > 4) moved = true; theta += dx * 0.012; draw(); return; }
    var h = hitAt(e); if (h !== hover) { hover = h; cv.style.cursor = h ? 'pointer' : 'grab'; draw(); }
  });
  function go(sl) { var a = d.createElement('a'); a.href = '/services/' + sl + '/'; a.setAttribute('data-floor', SV[sl].floor); a.hidden = true; d.body.appendChild(a); a.click(); a.remove(); }
  function end(e) { if (!dragging) return; dragging = false; if (!moved) { var h = hitAt(e); if (h && mode === 'floor') { if (h !== cur) go(h); } else if (h) inspect(h); } kick(); }
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', function () { dragging = false; });
  cv.addEventListener('pointerleave', function () { if (!dragging && hover) { hover = null; draw(); } });
  cv.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); theta += e.key === 'ArrowLeft' ? -0.2 : 0.2; draw(); }
  });
  var spinBtn = $('#stack-spin');
  if (spinBtn) { spinBtn.setAttribute('aria-pressed', spin); spinBtn.addEventListener('click', function () { spin = !spin; spinBtn.setAttribute('aria-pressed', spin); spinBtn.textContent = spin ? 'Pause turning' : 'Turn the stack'; kick(); }); spinBtn.textContent = spin ? 'Pause turning' : 'Turn the stack'; }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) kick(); }).observe(cv);
  d.addEventListener('visibilitychange', function () { if (!d.hidden) kick(); });
  addEventListener('resize', function () { layout(); draw(); });
  if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener && matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { readInk(); draw(); });

  /* ---------- panel: your stack, advice, actions ---------- */
  var picker = $$('.pick[data-sl]'), panel = $('#stack-panel'), live = $('#stack-live'), insp = $('#stack-inspect');
  function inspect(sl) {
    hover = sl; draw();
    if (!insp) return;
    var s = SV[sl];
    insp.innerHTML = '<p class="si-n">Floor ' + s.floor + '</p><h3>' + esc(s.n) + '</h3><p>' + esc(s.one) + '</p><p class="si-act"><a class="btn btn-p" href="/services/' + sl + '/" data-floor="' + s.floor + '">Open floor ' + s.floor + '</a> <button class="btn" type="button" data-remove="' + sl + '">Remove from my stack</button></p>';
    insp.hidden = false;
  }
  function advice(list) {
    var has = function (k) { return list.indexOf(k) > -1; }, tips = [];
    var BSR = 'business-setup-registration', TAI = 'technology-ai-solutions', OBL = 'offline-business-launch', BM = 'branding-marketing', CS = 'content-strategy',
      DM = 'digital-marketing', EMG = 'ecommerce-marketplace-growth', PA = 'programmatic-advertising', BDO = 'business-development-outsourcing', FTC = 'finance-tax-compliance';
    if (list.length && !has(BSR) && (has(OBL) || list.length >= 3)) tips.push([BSR, 'Most buildings start on floor 1. The right structure and registrations make every other floor easier.']);
    if ((has(DM) || has(PA) || has(EMG)) && !has(CS) && !has(BM)) tips.push([CS, 'Channels work better with a message to carry. Content Strategy or Branding underneath gives your ads and posts something consistent to say.']);
    if (has(PA) && !has(DM)) tips.push([DM, 'Programmatic usually comes after search and social are set up and measured.']);
    if (has(OBL) && !has(DM)) tips.push([DM, 'A new location needs to be found on Google Maps from day one.']);
    if (has(BDO) && !has(TAI)) tips.push([TAI, 'Outreach creates leads; a simple CRM stops them leaking. Technology & AI can set that up.']);
    if ((has(DM) || has(EMG) || has(PA) || has(BDO)) && !has(FTC)) tips.push([FTC, 'Growth is easier to steer with clean numbers. Finance, Tax & Compliance keeps the top floor in order.']);
    return tips.slice(0, 2);
  }
  function stages(list) {
    var c = { start: 0, build: 0, grow: 0, run: 0 }; list.forEach(function (sl) { c[SV[sl].stage]++; });
    return D.ready.stages.map(function (s) { return '<li class="' + (c[s.id] ? 'on' : '') + '"><span>' + esc(s.label) + '</span><b>' + c[s.id] + '</b></li>'; }).join('');
  }
  function after(msg) {
    if (mode === 'floor') { kick(); return; }
    var list = chosen().sort(function (a, b) { return SV[a].floor - SV[b].floor; });
    picker.forEach(function (b) { b.setAttribute('aria-pressed', list.indexOf(b.getAttribute('data-sl')) > -1); });
    save(function (s) { s.stack = list; });
    cv.setAttribute('aria-label', list.length ? 'Your stack: ' + list.map(function (sl) { return 'floor ' + SV[sl].floor + ' ' + SV[sl].n; }).join(', ') : 'The SLATOUT mark: three stacked slabs. Add services to build your own stack.');
    if (live && msg) live.textContent = msg + ' Your stack has ' + list.length + (list.length === 1 ? ' floor.' : ' floors.');
    if (insp && insp.querySelector('[data-remove]') && list.indexOf(insp.querySelector('[data-remove]').getAttribute('data-remove')) < 0) insp.hidden = true;
    if (!panel) { kick(); return; }
    if (!list.length) { panel.hidden = true; kick(); return; }
    var tips = advice(list);
    var msgTxt = 'My SLATOUT stack: ' + list.map(function (sl) { return SV[sl].floor + ' ' + SV[sl].n; }).join(', ') + '.';
    $('#sp-list').innerHTML = list.slice().reverse().map(function (sl) {
      return '<li class="m-' + SV[sl].stage + '"><a href="/services/' + sl + '/" data-floor="' + SV[sl].floor + '"><span class="sp-n">' + SV[sl].floor + '</span>' + esc(SV[sl].n) + '</a><button type="button" class="sp-x" data-remove="' + sl + '" aria-label="Remove ' + esc(SV[sl].n) + '">Remove</button></li>';
    }).join('');
    $('#sp-stages').innerHTML = stages(list);
    $('#sp-tips').innerHTML = tips.length ? tips.map(function (t) { return '<li><p>' + esc(t[1]) + '</p><button type="button" class="btn" data-add="' + t[0] + '">Add ' + esc(SV[t[0]].short) + '</button></li>'; }).join('') :
      '<li><p>' + (list.length >= 4 ? 'A well-balanced stack. Each floor hands over to the next, so you only explain your business once.' : 'A clear start. Add the next floor when you are ready; nothing here locks you in.') + '</p></li>';
    $('#sp-send').href = '/contact/?service=' + list.join(',') + '&msg=' + encodeURIComponent(msgTxt.slice(0, 380)) + '#enquire';
    $('#sp-count').textContent = list.length + (list.length === 1 ? ' floor' : ' floors');
    panel.hidden = false; kick();
  }
  d.addEventListener('click', function (e) {
    var b = e.target.closest('[data-sl].pick'); if (b) { var sl = b.getAttribute('data-sl'); if (b.getAttribute('aria-pressed') === 'true') remove(sl); else { add(sl); inspect(sl); } return; }
    var r = e.target.closest('[data-remove]'); if (r) { remove(r.getAttribute('data-remove')); return; }
    var a = e.target.closest('[data-add]'); if (a) { add(a.getAttribute('data-add')); inspect(a.getAttribute('data-add')); return; }
    var p = e.target.closest('[data-preset]'); if (p) {
      var pr = D.profiles.filter(function (x) { return x.id === p.getAttribute('data-preset'); })[0]; if (!pr) return;
      var list = pr.recs.map(function (r) { return r.sl; }); pr.plan.forEach(function (ph) { ph.items.forEach(function (it) { if (list.indexOf(it.sl) < 0 && list.length < 5) list.push(it.sl); }); });
      $$('[data-preset]').forEach(function (x) { x.setAttribute('aria-pressed', x === p); });
      save(function (s) { s.profile = pr.id; });
      setStack(list, 'Loaded the ' + pr.label.toLowerCase() + ' stack.');
    }
    if (e.target.closest('#sp-clear')) { setStack([], 'Cleared your stack.'); $$('[data-preset]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); if (insp) insp.hidden = true; }
  });

  /* save the stack as an image to share */
  var saveBtn = $('#sp-image');
  if (saveBtn) saveBtn.addEventListener('click', function () {
    var list = chosen().sort(function (a, b) { return SV[a].floor - SV[b].floor; }); if (!list.length) return;
    var oc = d.createElement('canvas'), w = 1200, h = 1500; oc.width = w; oc.height = h;
    var keep = [ctx, W, H, CX, BASE, S, T, GAP, compact, OUT, IN, hover];
    ctx = oc.getContext('2d'); W = w; H = h; compact = false; hover = null;
    S = 380; T = 26; GAP = 13; CX = 360; BASE = 1060; OUT = rrect(S / 2, S * 0.2, 7); IN = rrect(S * 0.3, S * 0.11, 7);
    ctx.fillStyle = '#F7F6F3'; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(26,27,29,.08)'; for (var gx = 0; gx < w; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); } for (var gy = 0; gy < h; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }
    ink = '#1A1B1D'; ink2 = '#45474B';
    ctx.fillStyle = '#1A1B1D'; ctx.font = '700 84px HerosCn, "Arial Narrow", sans-serif'; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
    ctx.fillText('My business stack', 80, 150);
    ctx.font = '400 30px Heros, Arial, sans-serif'; ctx.fillStyle = '#45474B'; ctx.fillText('Built with SLATOUT: one team for every floor of your business.', 80, 205);
    var snap = items; items = list.map(function (sl, k) { return { sl: sl, z: k * (T + GAP), tz: 0, dx: 0, tdx: 0, a: 1, ta: 1 }; });
    var th = theta; theta = -0.6; draw(); theta = th; items = snap;
    ctx.fillStyle = '#1A1B1D'; ctx.font = '700 34px HerosCn, "Arial Narrow", sans-serif'; ctx.fillText('SLATOUT  ·  BUILD BEYOND BUSINESS', 80, h - 80);
    var url; oc.toBlob(function (blob) {
      url = URL.createObjectURL(blob); var a = d.createElement('a'); a.href = url; a.download = 'my-slatout-stack.png'; d.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    });
    ctx = keep[0]; W = keep[1]; H = keep[2]; CX = keep[3]; BASE = keep[4]; S = keep[5]; T = keep[6]; GAP = keep[7]; compact = keep[8]; OUT = keep[9]; IN = keep[10]; hover = keep[11];
    readInk(); draw();
    if (live) live.textContent = 'Saved your stack as an image.';
  });

  /* ---------- start ---------- */
  readInk(); layout();
  if (mode === 'floor') {
    ORDER.forEach(function (sl) { items.push({ sl: sl, z: 0, tz: 0, dx: 0, tdx: 0, a: 1, ta: 1 }); });
    retarget(true); logoA = logoT = 0;
    if (!reduce) items.forEach(function (i) { if (SV[i.sl].floor > SV[cur].floor) i.z = i.tz - S * 0.42; });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { draw(); });
    draw(); kick(); return;
  }
  var st = load(), q = new URLSearchParams(window.__q || location.search).get('stack');
  var initial = (q ? q.split(',') : (st.stack || [])).filter(function (sl) { return SV[sl]; });
  if (initial.length) { initial.forEach(function (sl) { add(sl, true); }); items.forEach(function (i) { i.z = i.tz; i.dx = 0; i.a = 1; }); logoA = 0; after(null); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { draw(); });
  draw(); kick();
})();
