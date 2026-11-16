/* SLATOUT Free Studio: profession-aware home, readiness check, 90-day plan, structure picker.
   Progress is stored in this browser only (localStorage). Everything degrades to plain HTML without it. */
(function () {
  'use strict';
  var D = window.SLATOUT_STUDIO; if (!D) return;
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var KEY = 'slatout.v1';
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  /* ---------- storage (never assume it works) ---------- */
  var mem = {};
  function load() { try { var v = localStorage.getItem(KEY); return v ? JSON.parse(v) : {}; } catch (e) { return mem; } }
  function save(o) { mem = o; try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* private mode: keep in memory */ } }
  function patch(fn) { var s = load(); fn(s); save(s); return s; }

  var P = {}; D.profiles.forEach(function (p) { P[p.id] = p; });
  var SV = D.services;
  var qs = new URLSearchParams(window.__q || location.search);
  function planDone(id) { var s = load(), n = 0, all = 0; if (!P[id]) return [0, 9]; P[id].plan.forEach(function (ph) { ph.items.forEach(function (it) { all++; if (s.plan && s.plan[it.id]) n++; }); }); return [n, all]; }
  function nextStep(id) { var s = load(), r = null; P[id].plan.forEach(function (ph) { ph.items.forEach(function (it) { if (!r && !(s.plan && s.plan[it.id])) r = it; }); }); return r; }

  function ring(pct, size, label) {
    var c = 2 * Math.PI * 42, off = c * (1 - pct / 100);
    return '<svg class="ring" width="' + size + '" height="' + size + '" viewBox="0 0 100 100" role="img" aria-label="' + esc(label) + '"><circle class="rg-bg" cx="50" cy="50" r="42"/>' +
      '<circle class="rg-fg" cx="50" cy="50" r="42" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + c.toFixed(1) + '" data-off="' + off.toFixed(1) + '" transform="rotate(-90 50 50)"/>' +
      '<text x="50" y="57" text-anchor="middle" class="rg-t">' + pct + '%</text></svg>';
  }
  function animateRings(root) { requestAnimationFrame(function () { requestAnimationFrame(function () { $$('.rg-fg', root).forEach(function (c) { c.setAttribute('stroke-dashoffset', c.getAttribute('data-off')); }); }); }); }
  function msgFor(n, all) {
    if (n === 0) return 'Start with any step. Small beats perfect.';
    if (n === all) return 'All done. That is real momentum. Ready for the next layer?';
    if (n >= all * .75) return 'Almost there. You are closer than you think.';
    if (n >= all * .4) return 'Good momentum. Keep going.';
    return 'Nice start. One step at a time.';
  }

  /* ---------- resume line (all studio pages and home) ---------- */
  function resume() {
    var el = $('#resume'); if (!el) return; var s = load(), t = '';
    if (s.profile && P[s.profile]) {
      var dn = planDone(s.profile), nx = nextStep(s.profile);
      if (dn[0] > 0 && nx) t = 'Welcome back. You are ' + dn[0] + ' of ' + dn[1] + ' steps into your ' + esc(P[s.profile].label.toLowerCase()) + ' plan. <a href="/studio/90-day-plan/?for=' + s.profile + '#plan">Next: ' + esc(nx.t) + '</a>';
      else if (dn[0] === dn[1]) t = 'Your ' + esc(P[s.profile].label.toLowerCase()) + ' plan is complete. Well done. <a href="/studio/readiness-score/">Check your readiness again</a>';
      else t = 'Welcome back. <a href="/studio/90-day-plan/?for=' + s.profile + '#plan">Continue your ' + esc(P[s.profile].label.toLowerCase()) + ' plan</a>';
    } else if (s.ready) t = 'Welcome back. Your last readiness score was ' + s.ready.pct + '%. <a href="/studio/90-day-plan/">Turn it into a 90-day plan</a>';
    if (t) { el.innerHTML = t; el.hidden = false; }
  }

  /* ---------- HOME: hero sentence builder ("I run ... and I want to ...") ---------- */
  var planner = $('#planner');
  if (planner) {
    var out = $('#plan-out'), G = {}, HL = { start: 0, build: 1, grow: 2, run: 3 }; D.goals.forEach(function (g) { G[g.id] = g; });
    var selW = $('#mad-who'), selG = $('#mad-goal');
    var fit = function (sel) { // size each select to its chosen words (fallback for browsers without field-sizing)
      if (CSS.supports && CSS.supports('field-sizing', 'content')) return;
      var m = d.createElement('span'), cs = getComputedStyle(sel); m.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:' + cs.font + ';letter-spacing:' + cs.letterSpacing;
      m.textContent = sel.options[sel.selectedIndex].text; d.body.appendChild(m); sel.style.width = (m.getBoundingClientRect().width + 44) + 'px'; m.remove();
    };
    var render = function (fromUser) {
      [selW, selG].forEach(fit);
      planner.classList.toggle('has-who', !!selW.value); planner.classList.toggle('has-goal', !!selG.value);
      var pid = selW.value, gid = selG.value, p = P[pid];
      if (!p) return;
      var list = []; (G[gid] ? G[gid].services : []).concat(p.recs.map(function (r) { return r.sl; })).forEach(function (sl) { if (list.indexOf(sl) < 0) list.push(sl); });
      list = list.slice(0, gid ? 3 : 3);
      var why = function (sl) { var r = p.recs.filter(function (x) { return x.sl === sl; })[0]; return r ? r.why : SV[sl].one; };
      var svcs = list.map(function (sl, i) { return '<li style="--i:' + i + '"><a href="/services/' + sl + '/"><b class="st-' + SV[sl].stage + '">' + (i + 1) + '</b><span><strong>' + esc(SV[sl].n) + '</strong><small>' + esc(why(sl)) + '</small></span></a></li>'; }).join('');
      var steps = p.plan.map(function (ph, i) { return '<li style="--i:' + (i + 3) + '"><span>' + esc(ph.t) + '</span>' + esc(ph.items[0].t) + '</li>'; }).join('');
      var msg = 'I run ' + D.as_[pid] + (G[gid] ? ' and want to ' + G[gid].label : '') + '. Recommended: ' + list.map(function (sl) { return SV[sl].n; }).join(', ') + '.';
      out.innerHTML = '<div class="mad-card"><p class="pl-k">' + (gid ? 'Start with these, in this order' : 'Pick your next move to sharpen this. For now, start with') + '</p><ol class="pl-svcs">' + svcs + '</ol>' +
        '<p class="pl-k">Your first 90 days</p><ol class="pl-90">' + steps + '</ol>' +
        '<div class="pl-act"><a class="btn btn-p" data-magnetic href="/contact/?service=' + list.join(',') + '&msg=' + encodeURIComponent(msg.slice(0, 380)) + '#enquire">Send this plan to SLATOUT</a>' +
        '<button class="btn btn-ghost" type="button" data-stack-add="' + list.join(',') + '">Add to my stack</button>' +
        '<a class="tlink" href="/studio/90-day-plan/?for=' + pid + '#plan">Full 90-day plan</a></div></div>';
      planner.classList.add('done');
      var stages = list.map(function (sl) { return SV[sl].stage; }), one = stages.every(function (x) { return x === stages[0]; });
      window.__slPlan = { hl: one ? HL[stages[0]] : 3, services: list }; d.dispatchEvent(new CustomEvent('slatout:plan', { detail: window.__slPlan }));
      patch(function (s) { s.profile = pid; if (gid) s.goal = gid; });
      resume();
    };
    planner.addEventListener('change', function () { render(true); });
    planner.addEventListener('submit', function (e) { if (selW.value) { e.preventDefault(); render(true); } });
    var s0 = load(), pid0 = qs.get('for') || s0.profile;
    if (pid0 && P[pid0]) { selW.value = pid0; if (s0.goal && G[s0.goal]) selG.value = s0.goal; }
    render(false);
  }

  /* ---------- 90-DAY PLAN ---------- */
  var plans = $$('.plan');
  if (plans.length) {
    var pick = $$('#pf-pick .pf-chip');
    var show = function (id, scroll) {
      plans.forEach(function (pl) { pl.classList.toggle('on', pl.getAttribute('data-for') === id); });
      pick.forEach(function (c) { var on = c.getAttribute('data-for') === id; c.classList.toggle('on', on); if (on) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current'); });
      var e = $('.plan-empty'); if (e) e.hidden = !!id;
      if (id) { patch(function (s) { s.profile = id; }); try { history.replaceState(null, '', '?for=' + id + '#plan'); } catch (x) { } meters(); resume(); }
      if (scroll && id) $('#plan').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    };
    var meters = function () {
      plans.forEach(function (pl) {
        var id = pl.getAttribute('data-for'), dn = planDone(id), pct = Math.round(dn[0] / dn[1] * 100), m = $('[data-meter]', pl);
        m.setAttribute('role', 'status'); m.setAttribute('aria-live', 'polite');
        m.innerHTML = ring(pct, 76, 'Progress ' + pct + ' percent') + '<p><strong>' + dn[0] + ' of ' + dn[1] + '</strong><span>' + esc(msgFor(dn[0], dn[1])) + '</span></p>';
        pl.classList.toggle('done', dn[0] === dn[1]); animateRings(m);
        var help = $('a.btn-p', pl), left = []; P[id].plan.forEach(function (ph) { ph.items.forEach(function (it) { if (!(load().plan || {})[it.id]) left.push(it.t); }); });
        var msg = left.length ? 'I am following the 90-day plan for ' + P[id].label.toLowerCase() + '. I would like help with: ' + left.slice(0, 3).join('; ') + '.' : 'I have completed the 90-day plan for ' + P[id].label.toLowerCase() + ' and want to plan the next layer.';
        help.href = '/contact/?service=' + P[id].recs.map(function (r) { return r.sl; }).join(',') + '&plan=' + id + '&msg=' + encodeURIComponent(msg.slice(0, 380)) + '#enquire';
      });
    };
    var st = load();
    $$('.plan input[data-id]').forEach(function (cb) {
      cb.checked = !!(st.plan && st.plan[cb.getAttribute('data-id')]);
      cb.addEventListener('change', function () { patch(function (s) { s.plan = s.plan || {}; if (cb.checked) s.plan[cb.getAttribute('data-id')] = 1; else delete s.plan[cb.getAttribute('data-id')]; }); meters(); resume(); });
    });
    pick.forEach(function (c) { c.addEventListener('click', function (e) { e.preventDefault(); show(c.getAttribute('data-for'), true); }); });
    $$('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });
    $$('[data-save]').forEach(function (b) {
      b.addEventListener('click', function () {
        var pl = b.closest('.plan'), id = pl.getAttribute('data-for'), p = P[id], s = load(), out = ['SLATOUT 90-DAY PLAN: ' + p.label.toUpperCase(), p.promise, ''];
        p.plan.forEach(function (ph) { out.push(ph.t + ' - ' + ph.h); ph.items.forEach(function (it) { out.push('  [' + ((s.plan || {})[it.id] ? 'x' : ' ') + '] ' + it.t + ' (' + SV[it.sl].short + ')'); }); out.push(''); });
        out.push('General guidance, not legal, tax or financial advice. Made with the SLATOUT Free Studio.');
        var a = d.createElement('a'); a.href = URL.createObjectURL(new Blob([out.join('\n')], { type: 'text/plain' })); a.download = 'slatout-90-day-plan-' + id + '.txt'; d.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 500);
      });
    });
    var sec = $('#plan .wrap'); var e = d.createElement('p'); e.className = 'plan-empty lede'; e.textContent = 'Choose your profession above to see your plan.'; sec.insertBefore(e, sec.firstChild);
    var fromHash = (location.hash.match(/^#plan-(\w+)/) || [])[1];
    var pid = qs.get('for') || fromHash || st.profile; if (!P[pid]) pid = null;
    meters(); show(pid, false);
  }

  /* ---------- READINESS ---------- */
  var rf = $('#ready-form');
  if (rf) {
    var Q = D.ready.q, out = $('#rd-result'), cnt = $('#rd-count'), bar = $('#rd-bar'), stat = $('#rd-status');
    var answers = function () { var a = {}, n = 0; Q.forEach(function (q) { var c = rf.querySelector('input[name=' + q.id + ']:checked'); if (c) { a[q.id] = +c.value; n++; } }); return [a, n]; };
    var progress = function () { var n = answers()[1]; cnt.textContent = n + ' of ' + Q.length + ' answered'; bar.style.width = (n / Q.length * 100) + '%'; };
    var level = function (pct) { var l = D.ready.levels[0]; D.ready.levels.forEach(function (x) { if (pct >= x.min) l = x; }); return l; };
    var compute = function (a) {
      var tot = 0, st = {}, cntS = {};
      Q.forEach(function (q) { tot += a[q.id]; st[q.stage] = (st[q.stage] || 0) + a[q.id]; cntS[q.stage] = (cntS[q.stage] || 0) + 2; });
      var sp = {}; Object.keys(st).forEach(function (k) { sp[k] = Math.round(st[k] / cntS[k] * 100); });
      var gaps = Q.filter(function (q) { return a[q.id] < 2; }).sort(function (x, y) { return a[x.id] - a[y.id]; }).slice(0, 3);
      return { pct: Math.round(tot / (Q.length * 2) * 100), stages: sp, gaps: gaps };
    };
    var show = function (r, focus) {
      var lv = level(r.pct), prof = load().profile;
      var bars = D.ready.stages.map(function (s) { return '<li><span class="bl">' + esc(s.label) + '<small>' + esc(s.sub) + '</small></span><span class="bt"><i style="width:' + r.stages[s.id] + '%"></i></span><span class="bp">' + r.stages[s.id] + '%</span></li>'; }).join('');
      var gaps = r.gaps.length ? r.gaps.map(function (g, i) { return '<li><span class="gn">' + (i + 1) + '</span><div><strong>' + esc(g.tip) + '</strong><a href="/services/' + g.sl + '/">How SLATOUT helps: ' + esc(SV[g.sl].n) + '</a></div></li>'; }).join('') : '<li><div><strong>Nothing urgent. Keep reviewing these areas every quarter.</strong></div></li>';
      var svcs = r.gaps.map(function (g) { return g.sl; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).join(',');
      var msg = 'My readiness score is ' + r.pct + '%. Top gaps: ' + r.gaps.map(function (g) { return SV[g.sl].short; }).join(', ') + '.';
      out.innerHTML = '<div class="res-top">' + ring(r.pct, 132, 'Overall readiness ' + r.pct + ' percent') + '<div><p class="res-k">Your result</p><h2>' + esc(lv.t) + '</h2><p>' + esc(lv.msg) + '</p></div></div>' +
        '<h3>By stage</h3><ul class="res-bars">' + bars + '</ul><h3>Your best next three steps</h3><ol class="res-gaps">' + gaps + '</ol>' +
        '<div class="res-act"><a class="btn btn-p" href="/studio/90-day-plan/' + (prof ? '?for=' + prof + '#plan' : '') + '">Turn this into a 90-day plan</a> <a class="btn btn-g" href="/contact/?service=' + (svcs || 'not-sure') + '&msg=' + encodeURIComponent(msg) + '#enquire">Talk to SLATOUT about it</a> <button class="btn btn-g" type="button" id="rd-retake">Retake</button></div>' +
        '<p class="small saved">Saved on this device only. This is a self-assessment, not an audit.</p>';
      out.hidden = false; animateRings(out);
      $$('.res-bars i', out).forEach(function (i) { var w = i.style.width; i.style.width = '0'; requestAnimationFrame(function () { requestAnimationFrame(function () { i.style.width = w; }); }); });
      $('#rd-retake').addEventListener('click', function () { rf.reset(); progress(); out.hidden = true; patch(function (s) { delete s.ready; }); rf.scrollIntoView({ block: 'start' }); });
      if (focus) { out.focus({ preventScroll: true }); out.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); }
    };
    rf.addEventListener('change', progress);
    rf.addEventListener('submit', function (e) {
      e.preventDefault(); var r = answers();
      if (r[1] < Q.length) { var miss = Q.filter(function (q) { return r[0][q.id] === undefined; })[0]; stat.className = 'form-status bad'; stat.textContent = 'Please answer all ' + Q.length + ' questions. ' + (Q.length - r[1]) + ' left.'; rf.querySelector('input[name=' + miss.id + ']').focus(); return; }
      stat.textContent = ''; var res = compute(r[0]); patch(function (s) { s.ready = { pct: res.pct, stages: res.stages, answers: r[0], ts: Date.now() }; }); show(res, true); resume();
    });
    var sv = load().ready;
    if (sv && sv.answers) { Q.forEach(function (q) { var c = rf.querySelector('input[name=' + q.id + '][value="' + sv.answers[q.id] + '"]'); if (c) c.checked = true; }); progress(); show(compute(sv.answers), false); } else progress();
  }

  /* ---------- STRUCTURE PICKER (mirrors build/content_studio.pick_structure) ---------- */
  var sf = $('#struct-form');
  if (sf) {
    var pick2 = function (a) {
      if (a.equity === 'yes') return ['pvt', a.owners === 'many' ? ['llp'] : ['opc'], 'You expect equity or ESOPs, which a private company is designed for.'];
      if (a.liab === 'no' && a.equity === 'no') return [a.owners === 'one' ? 'prop' : 'partner', a.owners === 'one' ? ['opc'] : ['llp'], 'You want the lightest setup and can accept that owners are personally liable.'];
      if (a.owners === 'one') return ['opc', ['pvt', 'prop'], 'You are a solo founder who wants limited liability.'];
      if (a.prof === 'yes' || a.load === 'light') return ['llp', ['pvt'], 'Several owners, limited liability and lighter compliance point to an LLP.'];
      return [a.equity === 'maybe' ? 'pvt' : 'llp', [a.equity === 'maybe' ? 'llp' : 'pvt'], 'Several owners who want limited liability. The best fit depends on whether investors may join.'];
    };
    var names = ['equity', 'owners', 'liab', 'prof', 'load'], sout = $('#sp-result'), sst = $('#sp-status');
    var get = function () { var a = {}, n = 0; names.forEach(function (k) { var c = sf.querySelector('input[name=' + k + ']:checked'); if (c) { a[k] = c.value; n++; } }); return [a, n]; };
    var render = function (a, focus) {
      var r = pick2(a), b = D.structs[r[0]], alts = r[1].map(function (k) { return '<li><strong>' + esc(D.structs[k].n) + '</strong>: ' + esc(D.structs[k].d) + '</li>'; }).join('');
      var msg = 'The structure picker suggested a ' + b.n + '. I would like to confirm the right structure and register it.';
      sout.innerHTML = '<p class="res-k">Our suggested starting point</p><h2>' + esc(b.n) + '</h2><p class="res-big">' + esc(b.d) + '</p><h3>Why</h3><p>' + esc(r[2]) + '</p>' +
        '<h3>Also worth discussing</h3><ul class="res-alt">' + alts + '</ul><div class="disc">General orientation only, not legal or tax advice. Eligibility, tax and compliance depend on your details and current rules. Confirm with a qualified professional before registering.</div>' +
        '<div class="res-act"><a class="btn btn-p" href="/contact/?service=business-setup-registration&msg=' + encodeURIComponent(msg) + '#enquire">Talk to SLATOUT about registration</a> <a class="btn btn-g" href="/blog/private-limited-vs-llp-vs-opc/">Read the full comparison</a> <a class="btn btn-g" href="/services/business-setup-registration/">See the setup service</a></div>';
      sout.hidden = false; if (focus) { sout.focus({ preventScroll: true }); sout.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); }
    };
    sf.addEventListener('submit', function (e) {
      e.preventDefault(); var r = get();
      if (r[1] < names.length) { sst.className = 'form-status bad'; sst.textContent = 'Please answer all five questions.'; var m = names.filter(function (k) { return !r[0][k]; })[0]; sf.querySelector('input[name=' + m + ']').focus(); return; }
      sst.textContent = ''; patch(function (s) { s.struct = r[0]; }); render(r[0], true);
    });
    var ss = load().struct; if (ss) { names.forEach(function (k) { var c = ss[k] && sf.querySelector('input[name=' + k + '][value="' + ss[k] + '"]'); if (c) c.checked = true; }); if (get()[1] === names.length) render(ss, false); }
  }

  resume();
})();
