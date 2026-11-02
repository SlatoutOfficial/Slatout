/* "Ask SLATOUT": a site-wide command search. Ctrl/Cmd+K or "/" opens it anywhere.
   Searches services, what is inside each service, free tools, guides and common questions. */
(function () {
  'use strict';
  var IDX = window.SLATOUT_SEARCH; if (!IDX) return;
  var d = document, KEY = 'slatout.recent';
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var norm = function (s) { return String(s || '').toLowerCase(); };
  IDX.forEach(function (r) { r._t = norm(r.t); r._s = norm(r.s); r._k = norm(r.k); });
  var SUGGEST = ['GST registration', 'Private Limited or LLP', 'Sell on Amazon', 'Website and CRM', 'Trademark', 'Virtual CFO', 'SEO and AI search', 'Logo and brand'];
  var GROUPS = ['Services', 'Inside a service', 'Free tools', 'Guides', 'Questions', 'Pages'];

  var existing = d.querySelector('.cmd');
  if (existing) existing.remove();
  var root = d.createElement('div');
  root.className = 'cmd'; root.hidden = true;
  root.innerHTML = '<div class="cmd-back" data-close></div><div class="cmd-box" role="dialog" aria-modal="true" aria-labelledby="cmd-l">' +
    '<div class="cmd-top"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
    '<label id="cmd-l" class="sr" for="cmd-q">Ask SLATOUT: search services, tools, guides and questions</label>' +
    '<input id="cmd-q" type="text" role="combobox" aria-expanded="true" aria-controls="cmd-list" aria-autocomplete="list" autocomplete="off" spellcheck="false" placeholder="What does your business need? Try GST, Amazon, logo, CRM">' +
    '<button type="button" class="cmd-x" data-close aria-label="Close search">Esc</button></div>' +
    '<div class="cmd-body"><ul id="cmd-list" role="listbox" aria-label="Results"></ul></div>' +
    '<div class="cmd-foot"><span><kbd>&uarr;</kbd><kbd>&darr;</kbd> to move</span><span><kbd>Enter</kbd> to open</span><span class="cmd-count" role="status" aria-live="polite"></span></div></div>';
  d.body.appendChild(root);
  var q = root.querySelector('#cmd-q'), list = root.querySelector('#cmd-list'), count = root.querySelector('.cmd-count');
  var items = [], active = -1, lastFocus = null;

  function recent() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function remember(t) { try { var r = recent().filter(function (x) { return x !== t; }); r.unshift(t); localStorage.setItem(KEY, JSON.stringify(r.slice(0, 5))); } catch (e) { } }
  function mark(text, terms) {
    var out = esc(text); terms.forEach(function (t) { if (t.length < 2) return; out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
    return out;
  }
  function search(str) {
    var terms = norm(str).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    var res = [];
    IDX.forEach(function (r) {
      var sc = 0, all = true;
      terms.forEach(function (t) {
        var s = 0;
        if (r._t.indexOf(t) === 0) s = 60; else if (r._t.indexOf(' ' + t) > -1) s = 40; else if (r._t.indexOf(t) > -1) s = 26;
        else if (r._s.indexOf(t) > -1) s = 10; else if (r._k.indexOf(t) > -1) s = 6;
        if (!s) all = false; sc += s;
      });
      if (all) { sc += (r.g === 'Services' ? 14 : r.g === 'Free tools' ? 8 : r.g === 'Inside a service' ? 6 : 0); res.push([sc, r]); }
    });
    res.sort(function (a, b) { return b[0] - a[0]; });
    return res.slice(0, 14).map(function (x) { return x[1]; });
  }
  function render() {
    var v = q.value.trim(), html = '', terms = norm(v).split(/\s+/).filter(Boolean);
    items = [];
    if (!v) {
      var rc = recent();
      html += '<li class="cmd-h" role="presentation">' + (rc.length ? 'Recent searches' : 'Popular searches') + '</li><li class="cmd-chips" role="presentation">' +
        (rc.length ? rc : SUGGEST).map(function (s) { return '<button type="button" class="cmd-chip" data-q="' + esc(s) + '">' + esc(s) + '</button>'; }).join('') + '</li>';
      var svc = IDX.filter(function (r) { return r.g === 'Services'; });
      html += '<li class="cmd-h" role="presentation">Services</li>';
      svc.forEach(function (r) { items.push(r); html += opt(r, items.length - 1, []); });
      count.textContent = '';
    } else {
      var res = search(v);
      GROUPS.forEach(function (g) {
        var rows = res.filter(function (r) { return r.g === g; }); if (!rows.length) return;
        html += '<li class="cmd-h" role="presentation">' + esc(g) + '</li>';
        rows.forEach(function (r) { items.push(r); html += opt(r, items.length - 1, terms); });
      });
      if (!res.length) html = '<li class="cmd-empty" role="presentation"><p>Nothing matches &ldquo;' + esc(v) + '&rdquo; yet.</p><a class="btn btn-p btn-sm" href="/contact/?msg=' + encodeURIComponent('I am looking for help with: ' + v) + '#enquire">Ask our team directly</a></li>';
      count.textContent = res.length ? res.length + (res.length === 1 ? ' result' : ' results') : 'No results';
    }
    list.innerHTML = html; active = items.length ? 0 : -1; paint();
  }
  function opt(r, i, terms) {
    return '<li role="option" id="cmd-o' + i + '" data-i="' + i + '" aria-selected="false"><span class="cmd-t">' + mark(r.t, terms) + '</span>' + (r.s ? '<span class="cmd-s">' + mark(r.s.length > 110 ? r.s.slice(0, 108) + '…' : r.s, terms) + '</span>' : '') + '<span class="cmd-go" aria-hidden="true">&crarr;</span></li>';
  }
  function paint() {
    Array.prototype.forEach.call(list.querySelectorAll('[role=option]'), function (li) { var on = +li.getAttribute('data-i') === active; li.setAttribute('aria-selected', on); if (on) li.scrollIntoView({ block: 'nearest' }); });
    if (active > -1) q.setAttribute('aria-activedescendant', 'cmd-o' + active); else q.removeAttribute('aria-activedescendant');
  }
  function go(i) {
    var r = items[i]; if (!r) return;
    if (q.value.trim()) remember(q.value.trim());
    close(true);
    if (window.__nav) window.__nav(r.u); else location.href = r.u;
  }
  function open(seed) {
    lastFocus = d.activeElement; root.hidden = false; d.documentElement.classList.add('cmd-open');
    q.value = seed || ''; render(); setTimeout(function () { q.focus(); }, 10);
  }
  function close(nav) { root.hidden = true; d.documentElement.classList.remove('cmd-open'); if (!nav && lastFocus && lastFocus.focus) lastFocus.focus(); }

  q.addEventListener('input', render);
  q.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (items.length) { active = (active + 1) % items.length; paint(); } }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (items.length) { active = (active - 1 + items.length) % items.length; paint(); } }
    else if (e.key === 'Enter') { e.preventDefault(); go(active); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Tab') { e.preventDefault(); root.querySelector('.cmd-x').focus(); }
  });
  root.querySelector('.cmd-x').addEventListener('keydown', function (e) { if (e.key === 'Tab') { e.preventDefault(); q.focus(); } if (e.key === 'Escape') close(); });
  list.addEventListener('mousemove', function (e) { var li = e.target.closest('[role=option]'); if (li && +li.getAttribute('data-i') !== active) { active = +li.getAttribute('data-i'); paint(); } });
  list.addEventListener('click', function (e) {
    var li = e.target.closest('[role=option]'); if (li) { go(+li.getAttribute('data-i')); return; }
    var c = e.target.closest('[data-q]'); if (c) { q.value = c.getAttribute('data-q'); render(); q.focus(); }
  });
  root.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) close(); });
  d.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || '')) || e.target.isContentEditable;
    if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); if (root.hidden) open(); else close(); }
    else if (e.key === '/' && !typing && root.hidden) { e.preventDefault(); open(); }
  });
  d.addEventListener('click', function (e) {
    var t = e.target.closest('[data-search]'); if (!t) return;
    e.preventDefault(); open(t.getAttribute('data-seed') || '');
  });
  if (/Mac|iPhone|iPad/.test(navigator.platform || '')) Array.prototype.forEach.call(d.querySelectorAll('kbd.kk'), function (k) { k.textContent = '⌘ K'; });
  Array.prototype.forEach.call(d.querySelectorAll('[data-search]'), function (b) { b.hidden = false; });
})();
