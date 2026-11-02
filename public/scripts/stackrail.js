/* SLATOUT "My stack": the logo-as-navigation rail, the visitor's collected services, and build-your-scope on service pages.
   Saved in this browser only (localStorage key slatout.v1 -> stack). Without JS the rail is a plain list of service links. */
(function () {
  'use strict';
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var rail = $('#srail'); if (!rail) return;
  var KEY = 'slatout.v1', reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, mem = {};
  var load = function () { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return mem; } };
  var save = function (s) { mem = s; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { } };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var NAME = {}, ORDER = [];
  $$('.lf-i', rail).forEach(function (li) { var b = $('[data-stack-toggle]', li); NAME[b.getAttribute('data-stack-toggle')] = $('.lf-n', li).textContent; });
  $$('.lf-i', rail).forEach(function (li) { ORDER.push($('[data-stack-toggle]', li).getAttribute('data-stack-toggle')); });
  var stack = function () { var s = load().stack; return s && typeof s === 'object' && !Array.isArray(s) ? s : {}; };
  var setStack = function (st) { var s = load(); s.stack = st; save(s); render(); };
  rail.classList.add('js');

  var panel = $('#sr-panel'), list = $('.sr-list', rail), acts = $('.sr-acts', rail), empty = $('.sr-empty', rail), send = $('.sr-send', rail), mbtn = $('.sr-mbtn', rail), fab = $('.sr-fab', rail);
  function message(st, keys) {
    var lines = ['My SLATOUT stack:'];
    keys.forEach(function (k) { lines.push('- ' + NAME[k] + (st[k].length ? ': ' + st[k].join('; ') : '')); });
    var m = lines.join('\n'); return m.length > 1150 ? m.slice(0, 1147) + '...' : m;
  }
  function render() {
    var st = stack(), keys = ORDER.filter(function (k) { return st[k]; }), n = keys.length;
    $$('.sr-n', rail).forEach(function (b) { b.textContent = n; b.hidden = !n; });
    rail.classList.toggle('has', n > 0);
    $$('[data-stack-toggle]').forEach(function (b) { var on = !!st[b.getAttribute('data-stack-toggle')]; b.setAttribute('aria-pressed', on); var sp = b.querySelector('span'); if (sp) sp.textContent = on ? 'On my stack \u2713' : 'Add this room to my stack'; else b.textContent = on ? '\u2713' : '+'; });
    list.innerHTML = keys.map(function (k) {
      var c = st[k].length;
      return '<li><a href="/services/' + k + '/">' + esc(NAME[k]) + '</a><small>' + (c ? c + ' deliverable' + (c > 1 ? 's' : '') + ' picked' : 'Whole service') + '</small>' +
        '<button type="button" class="sr-x" data-stack-remove="' + k + '" aria-label="Remove ' + esc(NAME[k]) + ' from my stack">×</button></li>';
    }).join('');
    empty.hidden = n > 0; acts.hidden = !n;
    send.href = '/contact/?service=' + keys.join(',') + '&msg=' + encodeURIComponent(message(st, keys)) + '#enquire';
    // layers that hold picks glow, like the logo filling up
    $$('.lf-i', rail).forEach(function (l) { var b = $('[data-stack-toggle]', l); l.classList.toggle('filled', !!st[b.getAttribute('data-stack-toggle')]); });
    scopeRender(st);
  }
  function fly(from) {
    if (reduce || !from || !from.getBoundingClientRect) return;
    var target = getComputedStyle(fab).display !== 'none' ? fab : mbtn, a = from.getBoundingClientRect(), b = target.getBoundingClientRect();
    if (!a.width || !b.width) return;
    var el = d.createElement('i'); el.className = 'sr-flyer'; el.setAttribute('aria-hidden', 'true'); d.body.appendChild(el);
    var x0 = a.left + a.width / 2, y0 = a.top + a.height / 2, x1 = b.left + b.width / 2, y1 = b.top + b.height / 2, mx = (x0 + x1) / 2, my = Math.min(y0, y1) - 120;
    var frames = []; for (var i = 0; i <= 12; i++) { var t = i / 12, x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * mx + t * t * x1, y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * my + t * t * y1;
      frames.push({ transform: 'translate(' + x + 'px,' + y + 'px) rotate(' + (t * 300) + 'deg) scale(' + (1 - t * .5) + ')', opacity: t > .92 ? 0 : 1 }); }
    el.animate(frames, { duration: 750, easing: 'cubic-bezier(.3,.1,.3,1)' }).onfinish = function () { el.remove(); target.classList.remove('bump'); void target.offsetWidth; target.classList.add('bump'); };
  }
  function toggle(sl, from) { var st = stack(); if (st[sl]) delete st[sl]; else { st[sl] = []; fly(from); } setStack(st); }
  function addMany(sls, from) { var st = stack(), added = false; sls.forEach(function (sl) { if (NAME[sl] && !st[sl]) { st[sl] = []; added = true; } }); if (added) fly(from); setStack(st); openPanel(true); }
  function openPanel(on) {
    panel.hidden = !on; mbtn.setAttribute('aria-expanded', on);
    if (on && getComputedStyle(fab).display !== 'none') setSheet(true);
  }
  function setSheet(on) { rail.classList.toggle('open', on); fab.setAttribute('aria-expanded', on); d.documentElement.classList.toggle('sr-lock', on && innerWidth < 700); if (on) { panel.hidden = false; mbtn.setAttribute('aria-expanded', true); } }

  d.addEventListener('click', function (e) {
    var t = e.target.closest('[data-stack-toggle],[data-stack-add],[data-stack-remove],.sr-mbtn,.sr-fab,.sr-clear,.scp-b');
    if (!t) { if (!e.target.closest('#srail')) { openPanel(false); setSheet(false); } return; }
    if (t.hasAttribute('data-stack-toggle')) toggle(t.getAttribute('data-stack-toggle'), t);
    else if (t.hasAttribute('data-stack-add')) addMany(t.getAttribute('data-stack-add').split(','), t);
    else if (t.hasAttribute('data-stack-remove')) { var st = stack(); delete st[t.getAttribute('data-stack-remove')]; setStack(st); }
    else if (t.classList.contains('sr-mbtn')) openPanel(panel.hidden);
    else if (t.classList.contains('sr-fab')) setSheet(!rail.classList.contains('open'));
    else if (t.classList.contains('sr-clear')) setStack({});
    else if (t.classList.contains('scp-b')) scopeToggle(t);
  });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && (rail.classList.contains('open') || !panel.hidden)) { openPanel(false); setSheet(false); (getComputedStyle(fab).display !== 'none' ? fab : mbtn).focus(); } });
  addEventListener('storage', function (e) { if (e.key === KEY) render(); });

  /* ---------- build your scope (service pages) ---------- */
  var cur = $('.lf-i a[aria-current]', rail), slug = cur ? cur.parentNode.querySelector('[data-stack-toggle]').getAttribute('data-stack-toggle') : null;
  var bullets = slug ? $$('[data-scope-list] > li') : [], tray = null;
  function textOf(li) { return ($('span', li) || li).textContent.replace(/\s+/g, ' ').trim().slice(0, 140); }
  if (bullets.length) {
    d.body.classList.add('scoping');
    bullets.forEach(function (li) {
      var b = d.createElement('button'); b.type = 'button'; b.className = 'scp-b'; b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<span class="sr">Add to my scope: </span><i aria-hidden="true"></i>'; b.setAttribute('data-t', textOf(li));
      li.classList.add('scp'); li.appendChild(b);
      li.addEventListener('click', function (e) { if (e.target.closest('a,button,summary')) return; scopeToggle(b); });
    });
    var head = $('#included .inc-head') || $('#included');
    if (head) { var h = d.createElement('p'); h.className = 'scp-hint'; h.innerHTML = '<span aria-hidden="true">✓</span> Tick the deliverables you need. We will turn them into your scope.'; head.appendChild(h); }
    tray = d.createElement('div'); tray.className = 'scp-tray'; tray.setAttribute('role', 'status'); tray.setAttribute('aria-live', 'polite');
    tray.innerHTML = '<span class="scp-c"><b>0</b> <span>items in your scope</span></span><button type="button" class="scp-rv">Review</button><a class="btn btn-p scp-go" href="/contact/#enquire">Request this scope</a>';
    d.body.appendChild(tray);
    $('.scp-rv', tray).addEventListener('click', function (e) { e.stopPropagation(); openPanel(true); if (getComputedStyle(fab).display !== 'none') setSheet(true); });
  }
  function scopeToggle(b) {
    var st = stack(), t = b.getAttribute('data-t'), arr = st[slug] || [], i = arr.indexOf(t);
    if (i > -1) arr.splice(i, 1); else { arr.push(t); fly(b); }
    st[slug] = arr; setStack(st);
  }
  function scopeRender(st) {
    if (!tray) return;
    var arr = st[slug] || [];
    $$('.scp-b').forEach(function (b) { var on = arr.indexOf(b.getAttribute('data-t')) > -1; b.setAttribute('aria-pressed', on); b.parentNode.classList.toggle('on', on); });
    $('b', tray).textContent = arr.length; $('.scp-c span', tray).textContent = arr.length === 1 ? 'item in your scope' : 'items in your scope';
    tray.classList.toggle('show', arr.length > 0);
    var one = {}; one[slug] = arr;
    $('.scp-go', tray).href = '/contact/?service=' + slug + '&msg=' + encodeURIComponent(message(one, [slug]).replace('My SLATOUT stack:', 'I would like a scope for:')) + '#enquire';
  }
  render();
})();
