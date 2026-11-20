'use client';
// ContactSection.jsx — React version of "slatout-contact us.html" (the 4-step enquiry wizard)
// Self-contained: data, styles and behaviour live in this one file. Only needs React.
//
// Props:
//   action — where the form POSTs (default "/api/enquiries"). The request is FormData, Accept: application/json.

import React, { useEffect, useRef } from 'react';

const ORDER = ['start', 'build', 'grow', 'run'];
const STAGES: any[] = [
  ['start', 'Start', 'Just starting out', 'I have an idea, or I am about to register.'],
  ['build', 'Build', 'Building the foundations', 'I am set up, but my brand and systems are still rough.'],
  ['grow', 'Grow', 'Ready to grow', 'The base is solid and I want more customers.'],
  ['run', 'Run', 'Running and protecting it', 'I am operating and need finance and compliance in order.'],
  ['unsure', 'Not sure', 'Not sure yet', 'Help me work out where I am.'],
];
/* [slug, full name, tint, stage, short name] */
const SV: any[] = [
  ['business-setup-registration', 'Business Setup & Registration', '#E3EEDC', 'start', 'Business Setup'],
  ['technology-ai-solutions', 'Technology & AI Solutions', '#E2E6FF', 'build', 'Technology & AI'],
  ['offline-business-launch', 'Offline Business Launch', '#F4EAD8', 'start', 'Offline Launch'],
  ['branding-marketing', 'Branding & Marketing', '#FBE1E6', 'build', 'Branding'],
  ['content-strategy', 'Content Strategy', '#FFF3CC', 'build', 'Content'],
  ['digital-marketing', 'Digital Marketing & Growth', '#D8F2EA', 'grow', 'Digital Marketing'],
  ['ecommerce-marketplace-growth', 'E-Commerce & Marketplace Growth', '#EDE3FB', 'grow', 'E-Commerce'],
  ['programmatic-advertising', 'Programmatic Advertising', '#DDEFFB', 'grow', 'Programmatic Ads'],
  ['business-development-outsourcing', 'Business Development Outsourcing', '#FFE6D1', 'grow', 'BD Outsourcing'],
  ['finance-tax-compliance', 'Finance, Tax & Compliance', '#DDEDEC', 'run', 'Finance & Tax'],
  ['unsure', 'Not sure yet, help me choose', '#F2EDE7', '', ''],
];
const DEF: any = { start: 'business-setup-registration', build: 'branding-marketing', grow: 'digital-marketing', run: 'finance-tax-compliance' };
const WHY: any = {
  start: 'Foundations first, so everything after stands on solid ground.',
  build: 'Build the identity and systems your growth will rely on.',
  grow: 'Turn a solid base into steady customers.',
  run: 'Keep what you have built compliant and protected.',
};
const REACH = [['whatsapp', 'WhatsApp'], ['call', 'Phone call'], ['email', 'Email'], ['any', 'Any is fine']];
const TEAM = [['solo', 'Just me'], ['2-10', '2 to 10'], ['11-50', '11 to 50'], ['50+', '50 plus']];
const IDEAS = ['I would like a quote.', 'I am not sure where to start.', 'I have a launch date in mind.', 'I would prefer a call.'];
const TITLES = ['About you', 'Where you are', 'What you need', 'Anything else'];
const DESC: any = {
  'business-setup-registration': 'Structure, registrations, licences, IP and legal documents.',
  'technology-ai-solutions': 'Websites, software, automation and AI built around a real business problem.',
  'offline-business-launch': 'Market research, location strategy and local launch planning.',
  'branding-marketing': 'Brand strategy, visual identity and offline marketing.',
  'content-strategy': 'Pillars, voice, editorial calendar and content briefs.',
  'digital-marketing': 'SEO, AI-search visibility, paid ads, social and analytics as one system.',
  'ecommerce-marketplace-growth': 'Seller onboarding, listings, marketplace SEO and advertising.',
  'programmatic-advertising': 'Real-time buying across display, video, connected TV and audio.',
  'business-development-outsourcing': 'Market research, B2B lead generation, outreach and pipeline management.',
  'finance-tax-compliance': 'Accounting, GST, income tax, audit, payroll, FEMA and virtual CFO support.',
  'unsure': 'We will recommend the right place to begin.',
};
const ICO: any = {
  'business-setup-registration': '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M9.5 14l2 2 3.5-4"/>',
  'technology-ai-solutions': '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
  'offline-business-launch': '<path d="M4 9l1.5-5h13L20 9z"/><path d="M5 9v11h14V9"/><path d="M10 20v-6h4v6"/>',
  'branding-marketing': '<circle cx="12" cy="12" r="8.5"/><circle cx="8.5" cy="10.5" r="1.1"/><circle cx="12" cy="7.8" r="1.1"/><circle cx="15.5" cy="10.5" r="1.1"/><path d="M12 20.5c-1.5 0-1.6-1.5-.8-2.4.7-.8.2-2.1-1-2.1H8"/>',
  'content-strategy': '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>',
  'digital-marketing': '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M7 15l4-4 3 3 5-6"/>',
  'ecommerce-marketplace-growth': '<path d="M3 4h2l2.2 11h10.6L20 8H6.2"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
  'programmatic-advertising': '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/>',
  'business-development-outsourcing': '<circle cx="9" cy="9" r="3"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><circle cx="17" cy="10" r="2.2"/><path d="M16 14.2c2.7 0 4.5 1.6 4.5 4"/>',
  'finance-tax-compliance': '<path d="M7 5h10M7 9h10M7 5c4 0 6 1.5 6 4s-2 4-6 4l7 6"/>',
  'unsure': '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.6 2.4c-.7.4-1.1.9-1.1 1.8"/><circle cx="12" cy="16.8" r=".6"/>',
};
const ST_LBL: any = { start: 'Start', build: 'Build', grow: 'Grow', run: 'Run' };
const HEADLINE = ['Tell', 'us', 'where', 'you', 'are.', 'We\u2019ll', 'show', 'you', 'the', 'way.'];
const ROUTE = [['start', 'Start', 'Foundations'], ['build', 'Build', 'Identity & systems'], ['grow', 'Grow', 'Customers & sales'], ['run', 'Run', 'Finance & compliance']];

export default function ContactSection({ action = '/api/enquiries' }: { action?: string }) {
  const rootRef = useRef<any>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const $ = (id: string): any => root.querySelector('#' + id);
    const $$ = (s: string): any[] => [...root.querySelectorAll(s)];
    const fm = $('fm'), side = $('side');
    if (!fm || !side) return;

    const cleanups: any[] = [];
    const on = (t: any, type: string, fn: any, opts?: any) => { if (!t) return; t.addEventListener(type, fn, opts); cleanups.push(() => t.removeEventListener(type, fn, opts)); };
    const timers = new Set<any>();
    const later = (fn: any, ms: number) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; };

    const esc = (s: any) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const val = (n: string) => { const c = fm.querySelector('input[name=' + n + ']:checked'); return c ? c.value : ''; };
    const svc = (slug: string) => SV.filter(s => s[0] === slug)[0];

    /* ---------- build choices ---------- */
    if ($('stage')) $('stage').innerHTML = STAGES.map(o => '<label class="cx-opt"><input type="radio" name="stage" value="' + o[0] + '"><span class="cx-card"><span class="cx-k">' + o[1] + '</span><span><b>' + esc(o[2]) + '</b><span class="cx-d">' + esc(o[3]) + '</span></span><i class="cx-r"></i></span></label>').join('');
    const SVO = SV.slice().sort((a, b) => { const x = ORDER.indexOf(a[3]), y = ORDER.indexOf(b[3]); return (x < 0 ? 9 : x) - (y < 0 ? 9 : y); });
    const icon = (slug: string) => '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICO[slug] + '</svg>';
    const room = (o: any) => {
      const un = o[0] === 'unsure';
      return '<label class="cx-room' + (un ? ' cx-w2' : '') + '" data-st="' + o[3] + '" data-slug="' + o[0] + '" style="--t:' + o[2] + '"><input type="checkbox" name="service" value="' + o[0] + '"><span class="cx-rc"><span class="cx-ic">' + icon(o[0]) + '</span><span class="cx-rn">' + esc(o[1]) + '</span><span class="cx-rs">' + (un ? 'We will guide you' : ST_LBL[o[3]]) + '</span><i class="cx-ck"></i></span></label>';
    };
    if ($('svc')) $('svc').innerHTML = '<div class="cx-board">' + SVO.map(room).join('') + '</div><div class="cx-dt" id="dt" aria-live="polite"><span class="cx-ic" id="dt-i"></span><div><b id="dt-t"></b><span class="cx-dd" id="dt-d"></span></div><em class="cx-cn" id="dt-n"></em></div>';
    const DT0 = { t: 'Every service is here', d: 'Hover or tap any one to see what it covers. Pick as many as you like.' };
    let dtLast: any = null;
    function dt(slug: any) {
      const o = slug ? svc(slug) : null, box = $('dt');
      if (!box) return;
      if ($('dt-i')) $('dt-i').innerHTML = o ? icon(slug) : '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>';
      if ($('dt-t')) $('dt-t').textContent = o ? o[1] : DT0.t;
      if ($('dt-d')) $('dt-d').textContent = o ? DESC[slug] : DT0.d;
      const n = fm.querySelectorAll('input[name=service]:checked').length;
      if ($('dt-n')) $('dt-n').textContent = n ? n + ' selected' : '';
      box.classList.remove('cx-sw'); void box.offsetWidth; box.classList.add('cx-sw');
    }
    $$('.cx-room').forEach(r => {
      const sl = r.getAttribute('data-slug'), inp = r.querySelector('input');
      on(r, 'mouseenter', () => dt(sl));
      on(r, 'mouseleave', () => dt(dtLast));
      on(inp, 'focus', () => dt(sl));
      on(inp, 'change', () => { dtLast = sl; dt(sl); });
    });
    dt(null);
    if ($('team')) $('team').innerHTML = TEAM.map(o => '<label class="cx-pill"><input type="radio" name="team" value="' + o[0] + '"><span>' + o[1] + '</span></label>').join('');
    if ($('reach')) $('reach').innerHTML = REACH.map((o, i) => '<label class="cx-pill"><input type="radio" name="reach" value="' + o[0] + '"' + (i === 0 ? ' checked' : '') + '><span>' + esc(o[1]) + '</span></label>').join('');
    if ($('ideas')) $('ideas').innerHTML = IDEAS.map(t => '<button type="button">' + esc(t) + '</button>').join('');

    /* ---------- arrive from the route planner / a service page ---------- */
    try {
      const q = new URLSearchParams(window.location.search);
      (q.get('service') || '').split(',').forEach(v => { const b = fm.querySelector('input[name=service][value="' + v + '"]'); if (b) b.checked = true; });
      if (q.get('stage')) { const s = fm.querySelector('input[name=stage][value="' + q.get('stage') + '"]'); if (s) s.checked = true; }
      if (q.get('msg') && $('ms')) $('ms').value = q.get('msg')!.slice(0, 1500);
    } catch (x) { }

    /* ---------- quick-add ideas ---------- */
    const ms = $('ms');
    if ($('ideas')) {
      [...$('ideas').children].forEach(b => on(b, 'click', () => {
        const t = b.textContent, v = ms ? ms.value : '';
        if (v.indexOf(t) > -1) { if (ms) ms.value = v.replace(t, '').replace(/\s{2,}/g, ' ').trim(); b.classList.remove('cx-on'); }
        else { if (ms) ms.value = (v && !/\s$/.test(v) ? v + ' ' : v) + t; b.classList.add('cx-on'); }
      }));
    }

    /* ---------- wizard state (declared early; used by the route + change handler) ---------- */
    const panes = $$('.cx-pane'), segs = $('seg') ? [...$('seg').children] : [], go = $('go'), back = $('back');
    let cur = 0, max = 0, busy = false;

    /* ---------- live route ---------- */
    const lis = $$('.cx-route .cx-st'), tags: any = {}, recB = $('rec-b'), recK = $('rec-k'), rh = $('rh');
    let lastRec = '';
    function route() {
      const st = val('stage'), idx = ORDER.indexOf(st);
      lis.forEach((li, i) => { li.classList.toggle('cx-on', i === idx); li.classList.toggle('cx-past', idx > 0 && i < idx); });
      const sel = [...fm.querySelectorAll('input[name=service]:checked')].map((c: any) => c.value).filter(v => v !== 'unsure');
      Object.keys(tags).forEach(k => { if (sel.indexOf(k) < 0) { tags[k].remove(); delete tags[k]; } });
      sel.forEach(k => {
        if (tags[k]) return;
        const s = svc(k);
        if (!s) return;
        const li = lis[ORDER.indexOf(s[3])];
        if (!li) return;
        const t = document.createElement('span');
        t.className = 'cx-tag'; t.textContent = s[4];
        const slEl = li.querySelector('.cx-sl');
        if (slEl) slEl.appendChild(t);
        tags[k] = t;
      });
      lis.forEach(li => {
        const slEl = li.querySelector('.cx-sl');
        const n = slEl ? slEl.children.length : 0;
        const cntEl = li.querySelector('.cx-cnt');
        if (cntEl) cntEl.textContent = n ? n : '';
      });
      /* suggestion marks */
      $$('.cx-room').forEach(r => r.classList.toggle('cx-sug', idx >= 0 && r.getAttribute('data-st') === st));
      /* recommendation */
      let slug = '', why = '', k = 'Suggested first move';
      if (sel.length) {
        const best = sel.slice().sort((a, b) => ORDER.indexOf(svc(a)[3]) - ORDER.indexOf(svc(b)[3]))[0];
        slug = best; why = WHY[svc(best)[3]];
      } else if (idx >= 0) { slug = DEF[st]; why = WHY[st]; k = 'Usual first move at this stage'; }
      else if (st === 'unsure' || fm.querySelector('input[name=service][value=unsure]:checked')) {
        slug = ''; why = 'No problem. Tell us a little about your business and we will place you on the route.'; k = 'Not sure? That is fine';
      }
      const html = slug
        ? '<b>' + esc(svc(slug)[1]) + '</b><p>' + esc(why) + ' We will confirm this when we reply.</p>'
        : (why ? '<b>We will help you choose</b><p>' + esc(why) + '</p>' : '<b>Tell us where you are</b><p>Choose your stage and we will sketch your route here, live.</p>');
      if (html !== lastRec) {
        lastRec = html; if (recK) recK.textContent = k; if (recB) recB.innerHTML = html;
        if (recB) { recB.classList.remove('cx-sw'); void recB.offsetWidth; recB.classList.add('cx-sw'); }
      }
      if (rh) rh.textContent = sel.length || idx >= 0 ? (sel.length ? sel.length + ' service' + (sel.length > 1 ? 's' : '') + ' mapped' : 'Stage set') : 'Taking shape\u2026';
    }

    /* ---------- validation ---------- */
    const name = $('name'), ph = $('ph'), em = $('em');
    if (ph) on(ph, 'input', () => { const d = ph.value.replace(/\D/g, '').slice(0, 10); ph.value = d.length > 5 ? d.slice(0, 5) + ' ' + d.slice(5) : d; });
    const V: any = {
      name: () => name && name.value.trim().length >= 2,
      ph: () => ph && /^[6-9]\d{9}$/.test(ph.value.replace(/\D/g, '')),
      em: () => em && (!em.value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim())),
    };
    const F: any = { name: [name, $('f-name')], ph: [ph, $('f-ph')], em: [em, $('f-em')] };
    function mark(k: string, showErr: boolean) {
      const f = F[k];
      if (!f || !f[0] || !f[1]) return;
      const good = V[k](), bad = showErr && !good;
      f[0].setAttribute('aria-invalid', bad ? 'true' : 'false');
      f[1].classList.toggle('cx-bad', bad);
      f[1].classList.toggle('cx-ok', good && f[0].value.trim() !== '');
    }
    Object.keys(F).forEach(k => {
      const f = F[k];
      if (!f || !f[0] || !f[1]) return;
      on(f[0], 'blur', () => mark(k, true));
      on(f[0], 'input', () => { if (f[1].classList.contains('cx-bad')) mark(k, true); if ($('perr4')) $('perr4').classList.remove('cx-on'); });
    });

    /* ---------- wizard ---------- */
    function perr(i: number, msg: string) { const p = panes[i]; if (!p) return; const e = p.querySelector('.cx-perr'); if (!e) return; e.textContent = msg || ''; e.classList.toggle('cx-on', !!msg); }
    function ok(i: number) {
      perr(i, '');
      if (i === 1 && !val('stage')) { perr(1, 'Please choose where you are, or pick \u201cNot sure yet\u201d.'); return false; }
      if (i === 2 && !fm.querySelector('input[name=service]:checked')) { perr(2, 'Pick at least one, or choose \u201cNot sure yet, help me choose\u201d.'); return false; }
      if (i === 0) {
        const bad: string[] = [];
        ['name', 'ph', 'em'].forEach(k => { mark(k, true); if (!V[k]()) bad.push(k); });
        if (bad.length) {
          perr(0, 'Please check ' + bad.map(k => (({ name: 'your name', ph: 'your phone number', em: 'your email' } as any)[k])).join(', ').replace(/, ([^,]*)$/, ' and $1') + '.');
          if (F[bad[0]] && F[bad[0]][0]) F[bad[0]][0].focus(); return false;
        }
      }
      return true;
    }
    function bars() {
      segs.forEach((b: any, i: number) => { b.classList.toggle('cx-fill', i < cur); b.classList.toggle('cx-can', i <= max && i !== cur); });
      if (segs[cur]) segs[cur].classList.add('cx-fill');
      if (cur === 0 && !val('stage') && segs[0]) segs[0].classList.remove('cx-fill');
    }
    function show(i: number, rev?: boolean, init?: boolean) {
      cur = i; max = Math.max(max, i);
      panes.forEach((p: any, j: number) => { p.classList.toggle('cx-on', j === i); p.classList.toggle('cx-rev', !!rev); });
      if ($('sn')) $('sn').textContent = String(i + 1); if ($('stt')) $('stt').textContent = TITLES[i];
      if (back) back.hidden = i === 0;
      if (go && go.querySelector('.lab')) go.querySelector('.lab').textContent = i === 3 ? 'Send my enquiry' : 'Continue';
      if (i === 3 && $('recap')) {
        $('recap').innerHTML = [STAGES.filter(s => s[0] === val('stage'))[0]]
          .concat([...fm.querySelectorAll('input[name=service]:checked')].map((c: any) => svc(c.value)))
          .filter(Boolean).map((a, k) => '<span>' + esc(k === 0 ? a[2] : a[1]) + '</span>').join('');
      }
      if (i === 2) dt(dtLast);
      bars();
      if (init) return; /* first paint: never scroll or steal focus */
      const lg = panes[i] ? panes[i].querySelector('legend') : null;
      if ($('formside')) {
        const top = $('formside').getBoundingClientRect().top;
        if (top < 0 || top > window.innerHeight * 0.5) $('formside').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (lg) later(() => lg.focus({ preventScroll: true }), 30);
    }

    on(fm, 'change', () => { route(); bars(); perr(cur, ''); });
    route();

    if (back) on(back, 'click', () => { if (cur > 0) show(cur - 1, true); });
    segs.forEach((b: any, i: number) => on(b, 'click', () => { if (i <= max && i !== cur) show(i, i < cur); }));

    function advance() {
      if (busy) return;
      if (!ok(cur)) return;
      if (cur < 3) { show(cur + 1, false); return; }
      for (let k = 0; k < 3; k++) { if (!ok(k)) { show(k, true); return; } }
      send();
    }
    if (go) on(go, 'click', (e: any) => { e.preventDefault(); advance(); });
    on(fm, 'submit', (e: any) => e.preventDefault()); /* native submit is never used */
    on(fm, 'keydown', (e: any) => {
      if (e.key !== 'Enter' || e.isComposing) return;
      const t = e.target;
      if (t.tagName === 'TEXTAREA' || t.tagName === 'BUTTON' || t.type === 'checkbox') return;
      e.preventDefault(); advance();
    });

    function send() {
      busy = true; if (go) go.disabled = true; if (go && go.querySelector('.lab')) go.querySelector('.lab').textContent = 'Sending\u2026';
      const data = new FormData(fm);
      const done = () => { busy = false; thanks(); };
      if (fm.cx_hp && fm.cx_hp.value) { later(done, 700); return; } /* honeypot: pretend success, send nothing */
      const fail = () => {
        busy = false; if (go) go.disabled = false; if (go && go.querySelector('.lab')) go.querySelector('.lab').textContent = 'Send my enquiry';
        perr(3, 'We could not send that just now. Please check your connection and try again.');
      };
      if (!/^https?:$/.test(window.location.protocol)) { later(done, 900); return; } /* preview: no server */
      fetch(fm.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(r => (r.ok ? done() : fail()))
        .catch(fail);
    }

    function thanks() {
      if ($('thx-n') && name) $('thx-n').textContent = name.value.trim().split(/\s+/)[0];
      if ($('formside')) $('formside').classList.add('cx-sent');
      if ($('formwrap')) $('formwrap').style.display = 'none';
      if ($('route')) $('route').classList.add('cx-all');
      if (recK) recK.textContent = 'You are on the map';
      if (recB) {
        recB.innerHTML = '<b>Your route is with the team</b><p>We will reply with the right starting point.</p>';
        recB.classList.remove('cx-sw'); void recB.offsetWidth; recB.classList.add('cx-sw');
      }
      if (rh) rh.textContent = 'Sent';
      if ($('shell')) {
        const top = $('shell').getBoundingClientRect().top;
        if (top < 0) $('shell').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if ($('thx-h')) later(() => $('thx-h').focus({ preventScroll: true }), 60);
    }
    if ($('again')) on($('again'), 'click', () => {
      if ($('formside')) $('formside').classList.remove('cx-sent');
      if ($('formwrap')) $('formwrap').style.display = 'flex';
      if ($('route')) $('route').classList.remove('cx-all');
      fm.reset();
      if ($('ideas')) [...$('ideas').children].forEach((b: any) => b.classList.remove('cx-on'));
      Object.keys(F).forEach(k => { if (F[k] && F[k][1]) F[k][1].classList.remove('cx-bad', 'cx-ok'); if (F[k] && F[k][0]) F[k][0].setAttribute('aria-invalid', 'false'); });
      if (go) go.disabled = false; max = 0; route(); show(0, true); lastRec = '';
    });
    show(0, false, true);

    /* ---------- polish ---------- */
    if (matchMedia('(hover:hover)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
      on(side, 'pointermove', (e: any) => {
        const r = side.getBoundingClientRect();
        side.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        side.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    }
    const rv = $$('.cx-rv');
    let io: any = null;
    if (!('IntersectionObserver' in window)) rv.forEach(e => e.classList.add('cx-in'));
    else {
      io = new IntersectionObserver(es => {
        es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('cx-in'); io.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
      rv.forEach(e => io.observe(e));
    }

    return () => {
      if (io) io.disconnect();
      timers.forEach(clearTimeout); timers.clear();
      cleanups.forEach(f => f());
      // reset the DOM this effect built, so a remount (e.g. React StrictMode) starts clean
      ['stage', 'svc', 'team', 'reach', 'ideas', 'recap'].forEach(id => { const n = $(id); if (n) n.innerHTML = ''; });
      lis.forEach(li => { const slEl = li.querySelector('.cx-sl'); if (slEl) slEl.innerHTML = ''; li.classList.remove('cx-on', 'cx-past'); });
      if ($('formside')) $('formside').classList.remove('cx-sent');
      if ($('formwrap')) $('formwrap').style.display = 'flex';
      if ($('route')) $('route').classList.remove('cx-all');
      if (go) go.disabled = false;
    };
  }, []);

  return (
    <section className="cx-ct cx-js" id="enquire" aria-labelledby="ct-h" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cx-wrap">
        <div className="cx-shell" id="shell">

          {/* LEFT: first impression + live route */}
          <aside className="cx-side" id="side">
            <i className="cx-blob cx-b1" /><i className="cx-blob cx-b2" /><i className="cx-spot" />
            <p className="cx-eyebrow cx-rv">Contact</p>
            <h2 id="ct-h" className="cx-rv" style={{ '--d': 0.05 } as any}>
              {HEADLINE.map((w, i) => (
                <React.Fragment key={i}>
                  <span className="cx-w" style={{ '--i': i } as any}><span>{w === 'show' ? <em>show</em> : w}</span></span>
                  {i < HEADLINE.length - 1 ? ' ' : null}
                </React.Fragment>
              ))}
            </h2>
            <p className="cx-lede cx-rv" style={{ '--d': 0.3 } as any}>Four quick questions, no commitment. Answer them and we reply with a clear starting point, not a sales pitch.</p>

            <div className="cx-route-h cx-rv" style={{ '--d': 0.4 } as any}><span>Your route</span><b id="rh">Taking shape&hellip;</b></div>
            <ol className="cx-route cx-rv" id="route" style={{ '--d': 0.4 } as any} aria-hidden="true">
              {ROUTE.map((r, i) => (
                <li key={r[0]} className="cx-st" data-s={r[0]} style={{ '--i': i, '--k': i } as any}>
                  <span className="cx-pin">You are here</span>
                  <i className="cx-dot" />
                  <span className="cx-lb">{r[1]}<span className="cx-cnt" /></span>
                  <span className="cx-sb">{r[2]}</span>
                  <span className="cx-sl" />
                </li>
              ))}
            </ol>

            <div className="cx-rec cx-rv" style={{ '--d': 0.5 } as any} aria-live="polite">
              <small id="rec-k">Suggested first move</small>
              <div id="rec-b"><b>Tell us where you are</b><p>Choose your stage and we will sketch your route here, live.</p></div>
            </div>
            <p className="cx-promise cx-rv" style={{ '--d': 0.6 } as any}><b>&bull;</b> No sales pitch &nbsp;<b>&bull;</b> No commitment &nbsp;<b>&bull;</b> Made in India</p>
          </aside>

          {/* RIGHT: guided form */}
          <div className="cx-formside cx-rv" style={{ '--d': 0.15 } as any} id="formside">
            <div className="cx-formwrap" id="formwrap" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div className="cx-hd">
                <div className="cx-stp"><strong id="sn">1</strong><span>of 4</span><b id="stt">Where you are</b></div>
                <div className="cx-seg" id="seg">
                  <button type="button" aria-label="Step 1" /><button type="button" aria-label="Step 2" />
                  <button type="button" aria-label="Step 3" /><button type="button" aria-label="Step 4" />
                </div>
              </div>

              <form id="fm" action={action} method="post" noValidate>
                <div className="cx-hp" aria-hidden="true">
                  <label>Leave this empty <input type="text" name="cx_hp" tabIndex={-1} autoComplete="off" /></label>
                </div>

                <fieldset className="cx-pane cx-on" data-i="0">
                  <legend tabIndex={-1}>First, tell us about you.</legend>
                  <p className="cx-hint">Only used to answer this enquiry.</p>

                  <p className="cx-gl"><span>You</span></p>
                  <div className="cx-row">
                    <label className="cx-f" id="f-name">
                      <span className="cx-t">Your name <em>*</em></span>
                      <input name="name" id="name" autoComplete="name" placeholder="e.g. Madhav" aria-describedby="e-name" />
                      <span className="cx-msg" id="e-name">Please tell us your name.</span>
                    </label>
                    <label className="cx-f" id="f-ph">
                      <span className="cx-t">Phone / WhatsApp <em>*</em></span>
                      <span className="cx-pfx"><b aria-hidden="true">+91</b><input name="phone" id="ph" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={11} placeholder="9908987426" aria-describedby="e-ph" /></span>
                      <span className="cx-msg" id="e-ph">Enter a valid 10-digit mobile number.</span>
                    </label>
                  </div>
                  <div className="cx-row">
                    <label className="cx-f" id="f-em">
                      <span className="cx-t">Email <small>(optional)</small></span>
                      <input name="email" id="em" type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" aria-describedby="e-em" />
                      <span className="cx-msg" id="e-em">That email does not look right.</span>
                    </label>
                    <label className="cx-f" id="f-role">
                      <span className="cx-t">Your role <small>(optional)</small></span>
                      <span className="cx-sel">
                        <select name="role" id="role" defaultValue="">
                          <option value="">Select</option>
                          <option>Founder / Owner</option>
                          <option>Co-founder</option>
                          <option>Manager / Executive</option>
                          <option>Freelancer / Consultant</option>
                          <option>Other</option>
                        </select>
                      </span>
                    </label>
                  </div>

                  <p className="cx-gl"><span>Your business</span></p>
                  <div className="cx-row">
                    <label className="cx-f" id="f-biz"><span className="cx-t">Business name <small>(if any)</small></span><input name="business" id="biz" autoComplete="organization" placeholder="e.g. PVT / LLP" /></label>
                    <label className="cx-f" id="f-city"><span className="cx-t">City <small>(optional)</small></span><input name="city" id="city" autoComplete="address-level2" placeholder="e.g. Hyderabad" /></label>
                  </div>
                  <label className="cx-f cx-wide1" id="f-what"><span className="cx-t">What does your business do? <small>(optional)</small></span><input name="what" id="what" placeholder="e.g. Organic food brand, textile exports, a SaaS product" /></label>
                  <p className="cx-sub" id="tl">How big is the team?</p>
                  <div className="cx-pills" id="team" role="radiogroup" aria-labelledby="tl" />
                  <p className="cx-perr" role="alert" id="perr4" />
                </fieldset>

                <fieldset className="cx-pane" data-i="1">
                  <legend tabIndex={-1}>Where are you right now?</legend>
                  <p className="cx-hint">Pick the one that feels closest. There is no wrong answer, and you can change it later.</p>
                  <div className="cx-cards" id="stage" />
                  <p className="cx-perr" role="alert" />
                </fieldset>

                <fieldset className="cx-pane" data-i="2">
                  <legend tabIndex={-1}>What would move you forward?</legend>
                  <p className="cx-hint">Choose everything that applies. <span id="sugnote">We have marked the ones that usually fit your stage.</span></p>
                  <div className="cx-svc" id="svc" />
                  <p className="cx-perr" role="alert" />
                </fieldset>

                <fieldset className="cx-pane" data-i="3">
                  <legend tabIndex={-1}>Anything we should know before we reply?</legend>
                  <p className="cx-hint">Optional, but a line or two helps us give a sharper answer.</p>
                  <div className="cx-recap" id="recap" aria-label="Your choices so far" />
                  <div className="cx-f"><textarea id="ms" name="message" rows={4} maxLength={1500} placeholder="What you are building, your timeline, or a question you want answered." aria-label="Message" /></div>
                  <div className="cx-ideas" id="ideas" aria-label="Quick additions" />
                  <p className="cx-sub" id="rl">How should we reach you?</p>
                  <div className="cx-pills" id="reach" role="radiogroup" aria-labelledby="rl" />
                  <p className="cx-legal">By sending this you agree to our <a href="/privacy/">Privacy Policy</a>. We use your details only to reply to this enquiry.</p>
                  <p className="cx-note">We reply with a clear starting point and any questions. Nothing is booked, and nothing is charged.</p>
                  <p className="cx-perr" role="alert" />
                </fieldset>

                <div className="cx-nav">
                  <button type="button" className="cx-back" id="back" hidden>
                    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M16 10H5M9.5 5 4.5 10l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>Back
                  </button>
                  <button className="cx-btn" type="button" id="go">
                    <span className="lab">Continue</span>
                    <i aria-hidden="true">
                      <svg className="cx-ar" width="20" height="20" viewBox="0 0 20 20"><path d="M4 10h11M10.5 5 15.5 10l-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span className="cx-sp" />
                    </i>
                  </button>
                </div>
              </form>
            </div>

            <div className="cx-thx" id="thx" aria-live="polite">
              <svg className="cx-tick" viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="36" /><path d="M27 43l10 10 20-22" /></svg>
              <h3 id="thx-h" tabIndex={-1}>You&rsquo;re on the map, <em id="thx-n" />.</h3>
              <p>Your enquiry is in. Here is what happens next.</p>
              <ol className="cx-next">
                <li><i>01</i><span>We read your enquiry and look at your stage and goals.</span></li>
                <li><i>02</i><span>We reply with the best starting point and any questions.</span></li>
                <li><i>03</i><span>If it fits, we agree the scope in writing before any work begins.</span></li>
              </ol>
              <button type="button" className="cx-again" id="again">Send another enquiry</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export { ContactSection as Enquiry };

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@500&display=swap');

.cx-ct{
  --ink:#0B0B0B;--ink-2:#45434A;--ink-3:#7B7884;--paper:#FAF8F5;--card:#fff;--line:rgba(11,11,11,.12);--line-2:rgba(11,11,11,.22);
  --brand:#FF6A13;--brand-d:#D9520A;--brand-s:#FFE8DA;--err:#C2260C;
  --sec:clamp(72px,9vw,128px);--wrap:1640px;
  --sans:"Inter Tight",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --mono:"JetBrains Mono",ui-monospace,Menlo,monospace;--serif:"Instrument Serif","Playfair Display",Georgia,serif;
  --ease:cubic-bezier(.2,.8,.2,1);--spring:cubic-bezier(.34,1.56,.64,1);
  background:var(--paper);color:var(--ink);font:400 17px/1.6 var(--sans);-webkit-font-smoothing:antialiased;
}
.cx-ct *,.cx-ct *::before,.cx-ct *::after{box-sizing:border-box}
.cx-ct a{color:inherit}
.cx-ct p,.cx-ct h2,.cx-ct h3,.cx-ct ul,.cx-ct ol,.cx-ct fieldset{margin:0}
.cx-ct fieldset{padding:0;border:0;min-width:0}
.cx-ct ol,.cx-ct ul{padding:0;list-style:none}
.cx-ct button{font:inherit}
.cx-ct :focus-visible{outline:2px solid var(--brand);outline-offset:3px;border-radius:8px}
.cx-wrap{width:min(var(--wrap),calc(100% - 2*clamp(16px,2.2vw,32px)));margin-inline:auto}
.cx-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}

/* ================= shell ================= */
.cx-ct{padding:var(--sec) 0;scroll-margin-top:84px}
.cx-shell{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);border-radius:36px;background:var(--card);box-shadow:0 50px 90px -50px rgba(11,11,11,.4),0 0 0 1px var(--line);overflow:clip}

/* ================= left ================= */
.cx-side{position:relative;background:#080808;color:#fff;padding:clamp(28px,3.4vw,56px);isolation:isolate;overflow:hidden}
.cx-blob{position:absolute;z-index:-2;border-radius:50%;filter:blur(8px);pointer-events:none}
.cx-b1{right:-160px;top:-160px;width:480px;height:480px;background:radial-gradient(closest-side,rgba(255,106,19,.6),transparent);animation:cx-drift 16s ease-in-out infinite alternate}
.cx-b2{left:-140px;bottom:-140px;width:400px;height:400px;background:radial-gradient(closest-side,rgba(255,106,19,.28),transparent);animation:cx-drift 20s ease-in-out infinite alternate-reverse}
.cx-spot{position:absolute;z-index:-1;inset:0;pointer-events:none;background:radial-gradient(380px circle at var(--mx,70%) var(--my,20%),rgba(255,255,255,.07),transparent 60%);opacity:0;transition:opacity .4s}
.cx-side:hover .cx-spot{opacity:1}
@keyframes cx-drift{to{transform:translate(-50px,40px) scale(1.12)}}
.cx-eyebrow{display:inline-flex;align-items:center;font:500 .74rem/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:20px}
.cx-side h2{font-family:"Inter Tight",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#fff;font-size:clamp(2.2rem,3.9vw,3.7rem);font-weight:800;letter-spacing:-.045em;line-height:.98}
.cx-side h2 em{font:italic 400 1.1em/.9 var(--serif);letter-spacing:-.01em;color:var(--brand)}
.cx-w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.12em;margin-bottom:-.12em}
.cx-w>span{display:inline-block}
.cx-lede{margin-top:18px;max-width:27em;color:rgba(255,255,255,.72);font-size:1.04rem;line-height:1.55}

/* live route */
.cx-route-h{display:flex;justify-content:space-between;align-items:baseline;margin:clamp(26px,3vw,40px) 0 4px;font:500 .72rem/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5)}
.cx-route-h b{color:var(--brand);font-weight:500}
.cx-route{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0 12px;padding-top:34px}
.cx-st{position:relative;min-width:0}
.cx-st .cx-dot{position:relative;z-index:2;display:block;width:26px;height:26px;border-radius:50%;background:#080808;border:2px solid rgba(255,255,255,.28);transition:all .5s var(--ease)}
.cx-st .cx-dot::after{content:"";position:absolute;inset:5px;border-radius:50%;background:rgba(255,255,255,.28);transition:all .5s var(--ease)}
.cx-st::before,.cx-st::after{content:"";position:absolute;left:26px;right:-12px;top:12px;height:2px;border-radius:2px}
.cx-st::before{background:rgba(255,255,255,.14)}
.cx-st::after{background:var(--brand);transform:scaleX(0);transform-origin:left;transition:transform .7s var(--ease)}
.cx-st:last-child::before,.cx-st:last-child::after{display:none}
.cx-st.cx-past::after{transform:scaleX(1)}
.cx-st.cx-past .cx-dot,.cx-st.cx-on .cx-dot{border-color:var(--brand)}
.cx-st.cx-past .cx-dot::after{background:var(--brand)}
.cx-st.cx-on .cx-dot{background:var(--brand);box-shadow:0 0 0 7px rgba(255,106,19,.22)}
.cx-st.cx-on .cx-dot::after{background:#fff;inset:7px}
.cx-st.cx-on .cx-dot::before{content:"";position:absolute;inset:-2px;border-radius:50%;border:2px solid var(--brand);animation:cx-ping 1.8s var(--ease) infinite}
@keyframes cx-ping{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.3);opacity:0}}
.cx-pin{position:absolute;left:0;top:-31px;padding:5px 9px;border-radius:8px;background:var(--brand);color:#fff;font:600 .66rem/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;opacity:0;transform:translateY(6px) scale(.9);transform-origin:left bottom;transition:all .45s var(--spring)}
.cx-pin::after{content:"";position:absolute;left:10px;bottom:-4px;width:8px;height:8px;background:var(--brand);transform:rotate(45deg)}
.cx-st.cx-on .cx-pin{opacity:1;transform:none}
.cx-st .cx-lb{display:block;margin-top:12px;font:500 .72rem/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.9)}
.cx-st .cx-sb{display:block;margin-top:5px;font-size:.8rem;line-height:1.3;color:rgba(255,255,255,.5)}
.cx-st .cx-sl{display:flex;flex-direction:column;gap:6px;margin-top:12px;min-height:30px}
.cx-tag{display:block;padding:6px 9px;border-radius:9px;background:rgba(255,106,19,.2);border:1px solid rgba(255,106,19,.55);font-size:.78rem;font-weight:600;line-height:1.2;color:#fff;animation:cx-tagIn .5s var(--spring) both}
@keyframes cx-tagIn{from{opacity:0;transform:translateY(8px) scale(.85)}}
.cx-cnt{display:none}
.cx-all .cx-st .cx-dot{border-color:var(--brand);transition-delay:calc(var(--k) * .25s)}
.cx-all .cx-st .cx-dot::after{background:var(--brand);transition-delay:calc(var(--k) * .25s)}
.cx-all .cx-st::after{transform:scaleX(1);transition-delay:calc(var(--k) * .25s + .12s)}

/* live recommendation */
.cx-rec{position:relative;margin-top:clamp(20px,2.4vw,30px);padding:18px 20px;border-radius:20px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(6px)}
.cx-rec small{display:block;font:500 .68rem/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--brand)}
.cx-rec b{display:block;margin-top:9px;font-size:1.22rem;font-weight:700;letter-spacing:-.025em;line-height:1.2}
.cx-rec p{margin-top:5px;font-size:.9rem;line-height:1.45;color:rgba(255,255,255,.66)}
.cx-rec .cx-sw{animation:cx-swap .5s var(--ease)}
@keyframes cx-swap{from{opacity:0;transform:translateY(8px)}}
.cx-promise{margin-top:20px;font:500 .7rem/1.7 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.45)}
.cx-promise b{color:var(--brand);font-weight:500}

/* ================= right: guided form ================= */
.cx-formside{position:relative;padding:clamp(30px,3.6vw,56px);display:flex;flex-direction:column;min-height:640px}
.cx-hd{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:clamp(24px,2.6vw,34px)}
.cx-stp{display:flex;align-items:baseline;gap:8px;font:500 .74rem/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);white-space:nowrap}
.cx-stp strong{font-weight:500;color:var(--ink);font-size:.9rem}
.cx-stp b{font-weight:500;color:var(--brand-d)}
.cx-seg{display:flex;gap:6px;flex:1;max-width:260px}
.cx-seg button{flex:1;height:6px;padding:0;border:0;border-radius:6px;background:rgba(11,11,11,.1);position:relative;overflow:hidden;cursor:default}
.cx-seg button::after{content:"";position:absolute;inset:0;background:var(--brand);transform:scaleX(0);transform-origin:left;transition:transform .5s var(--ease)}
.cx-seg button.cx-fill::after{transform:scaleX(1)}
.cx-seg button.cx-can{cursor:pointer}
.cx-ct form{flex:1;display:flex;flex-direction:column}
.cx-pane{display:none;flex-direction:column;min-width:0}
.cx-pane.cx-on{display:flex;animation:cx-paneIn .5s var(--ease)}
.cx-pane.cx-on.cx-rev{animation-name:cx-paneBack}
@keyframes cx-paneIn{from{opacity:0;transform:translateX(28px)}}
@keyframes cx-paneBack{from{opacity:0;transform:translateX(-28px)}}
.cx-pane legend{padding:0;font-size:clamp(1.5rem,2.3vw,2.1rem);font-weight:800;letter-spacing:-.04em;line-height:1.08;outline:0;float:left;width:100%}
.cx-pane legend+*{clear:both}
.cx-hint{margin:12px 0 clamp(24px,2.2vw,32px);color:var(--ink-2);font-size:1.02rem;line-height:1.45;max-width:34em}

/* stage cards */
.cx-cards{display:grid;gap:10px}
.cx-opt{position:relative;display:block;cursor:pointer}
.cx-opt input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}
.cx-card{display:grid;grid-template-columns:auto 1fr 26px;gap:16px;align-items:center;padding:14px 18px;border-radius:18px;border:1.5px solid var(--line-2);background:#fff;transition:all .25s var(--ease)}
.cx-card .cx-k{display:grid;place-items:center;min-width:64px;height:30px;padding:0 10px;border-radius:999px;background:rgba(11,11,11,.06);font:500 .68rem/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-2);transition:all .25s}
.cx-card b{display:block;font-size:1.06rem;font-weight:700;letter-spacing:-.02em;line-height:1.2}
.cx-card span.cx-d{display:block;margin-top:2px;color:var(--ink-3);font-size:.9rem;line-height:1.35}
.cx-card .cx-r{width:26px;height:26px;border-radius:50%;border:1.5px solid var(--line-2);background:#fff center/14px no-repeat;transition:all .25s var(--ease)}
.cx-opt:hover .cx-card{border-color:var(--ink);transform:translateX(3px)}
.cx-opt input:checked+.cx-card{border-color:var(--ink);background:var(--brand-s);box-shadow:0 14px 26px -18px rgba(255,106,19,.7)}
.cx-opt input:checked+.cx-card .cx-k{background:var(--brand);color:#fff}
.cx-opt input:checked+.cx-card .cx-r,.cx-chip input:checked+span::before{background-color:var(--ink);border-color:var(--ink);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath d='M2.5 7.4 5.6 10.4 11.5 3.8' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}
.cx-opt input:focus-visible+.cx-card,.cx-chip input:focus-visible+span,.cx-pill input:focus-visible+span{outline:2px solid var(--brand);outline-offset:3px}

/* chips */
.cx-chips{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.cx-chip{position:relative;display:block;cursor:pointer}
.cx-chip input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}
.cx-chip span{position:relative;display:grid;grid-template-columns:22px 1fr;gap:12px;align-items:center;min-height:52px;padding:9px 14px;border-radius:14px;border:1.5px solid var(--line-2);background:#fff;font:600 .94rem/1.25 var(--sans);letter-spacing:-.01em;transition:all .22s var(--ease)}
.cx-chip span::before{content:"";width:22px;height:22px;border-radius:7px;border:1.5px solid var(--line-2);background:#fff center/14px no-repeat;transition:all .22s var(--ease)}
.cx-chip:hover span{border-color:var(--ink);background:var(--t)}
.cx-chip input:checked+span{background:var(--t);border-color:var(--ink)}
.cx-chip.cx-wide{grid-column:1/-1}
.cx-chip em{position:absolute;right:10px;top:-8px;padding:3px 8px;border-radius:999px;background:var(--brand);color:#fff;font:600 .6rem/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;font-style:normal;opacity:0;transform:translateY(4px) scale(.8);transition:all .35s var(--spring);pointer-events:none}
.cx-chip.cx-sug em{opacity:1;transform:none}

/* fields */
.cx-f{position:relative;display:block}
.cx-f>.cx-t{display:block;font:600 .8rem/1.25 var(--sans);color:var(--ink-2);margin-bottom:8px}
.cx-f>.cx-t em{font-style:normal;color:var(--brand-d)}
.cx-f>.cx-t small{font-weight:400;color:var(--ink-3);font-size:.8rem}
.cx-f input,.cx-f textarea{width:100%;font:400 .92rem/1.3 var(--sans);color:var(--ink);background:#fff;border:1.5px solid var(--line-2);border-radius:11px;padding:0 14px;height:48px;transition:border-color .2s,box-shadow .2s,background .2s;-webkit-appearance:none;appearance:none}
.cx-f textarea{height:auto;min-height:96px;padding:10px 14px;resize:vertical;line-height:1.45}
.cx-f input::placeholder,.cx-f textarea::placeholder{color:#A19DA9}
.cx-f input:hover,.cx-f textarea:hover{border-color:rgba(11,11,11,.42)}
.cx-f input:focus,.cx-f textarea:focus{outline:0;border-color:var(--brand);box-shadow:0 0 0 4px rgba(255,106,19,.16)}
.cx-f input[aria-invalid=true]{border-color:var(--err);background:#FFF8F6}
.cx-f.cx-ok input{border-color:rgba(31,122,77,.55)}
.cx-pfx{position:relative;display:block}
.cx-pfx b{position:absolute;left:1.5px;top:1.5px;bottom:1.5px;display:grid;place-items:center;width:50px;border-radius:9.5px 0 0 9.5px;background:rgba(11,11,11,.05);font:600 .86rem/1 var(--sans);color:var(--ink-2);pointer-events:none}
.cx-pfx input{padding-left:62px}
.cx-msg{display:none;align-items:center;gap:6px;margin-top:7px;font-size:.84rem;line-height:1.3;color:var(--err)}
.cx-f.cx-bad .cx-msg{display:flex}
.cx-msg::before,.cx-perr::before{content:"!";display:grid;place-items:center;flex:none;width:15px;height:15px;border-radius:50%;background:var(--err);color:#fff;font:700 .66rem/1 var(--sans)}
.cx-ideas{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.cx-ideas button{padding:8px 13px;border-radius:999px;border:1.5px dashed var(--line-2);background:transparent;font:500 .86rem/1 var(--sans);color:var(--ink-2);cursor:pointer;transition:all .2s}
.cx-ideas button:hover{border-color:var(--brand);color:var(--brand-d);border-style:solid}
.cx-ideas button.cx-on{border-style:solid;border-color:var(--ink);background:var(--ink);color:#fff}
.cx-sub{margin:22px 0 10px;font:700 .98rem/1.3 var(--sans);letter-spacing:-.015em}
.cx-pills{display:flex;flex-wrap:wrap;gap:10px}
.cx-pill{position:relative;display:block;cursor:pointer}
.cx-pill input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}
.cx-pill span{display:flex;align-items:center;height:38px;padding:0 16px;border-radius:999px;border:1.5px solid var(--line-2);background:#fff;font:600 .88rem/1 var(--sans);color:var(--ink-2);transition:all .22s var(--ease)}
.cx-pill:hover span{border-color:var(--ink)}
.cx-pill input:checked+span{background:var(--ink);border-color:var(--ink);color:#fff}

/* step 4 */
.cx-recap{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
.cx-recap span{padding:7px 12px;border-radius:999px;background:var(--brand-s);color:var(--brand-d);font:600 .82rem/1 var(--sans)}
.cx-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-bottom:16px;align-items:start}
.cx-note{margin-top:18px;padding:14px 16px;border-radius:14px;background:var(--paper);border:1px dashed var(--line-2);color:var(--ink-2);font-size:.92rem;line-height:1.5}
.cx-legal{margin-top:22px;font-size:.86rem;line-height:1.5;color:var(--ink-3)}
.cx-legal a{color:var(--ink-2)}

/* nav */
.cx-perr{display:none;align-items:center;gap:8px;margin-top:16px;padding:11px 14px;border-radius:12px;background:#FFF1EE;border:1px solid rgba(194,38,12,.25);color:var(--err);font-size:.92rem;line-height:1.35}
.cx-perr.cx-on{display:flex}
.cx-nav{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:auto;padding-top:clamp(22px,2.6vw,34px)}
.cx-back{padding:10px 4px;border:0;background:none;font:600 .98rem/1 var(--sans);color:var(--ink-2);cursor:pointer;display:inline-flex;align-items:center;gap:8px}
.cx-back:hover{color:var(--ink)}
.cx-back svg{transition:transform .25s}
.cx-back:hover svg{transform:translateX(-3px)}
.cx-back[hidden]{display:inline-flex;visibility:hidden}
.cx-btn{position:relative;display:inline-flex;align-items:center;gap:14px;height:62px;padding:0 12px 0 32px;border:0;border-radius:999px;background:var(--brand);color:#fff;font:700 1.06rem/1 var(--sans);letter-spacing:-.02em;cursor:pointer;white-space:nowrap;transition:background .3s,box-shadow .3s,transform .3s var(--ease)}
.cx-btn i{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:#fff;color:var(--brand);font-style:normal;transition:transform .35s var(--ease)}
.cx-btn:hover{background:var(--brand-d);box-shadow:0 16px 30px -14px rgba(255,106,19,.7);transform:translateY(-2px)}
.cx-btn:hover i{transform:translateX(4px)}
.cx-btn[disabled]{cursor:progress;background:#E59B6C;transform:none;box-shadow:none}
.cx-btn .cx-sp{display:none;width:20px;height:20px;border-radius:50%;border:2.5px solid rgba(255,106,19,.25);border-top-color:var(--brand);animation:cx-spin .8s linear infinite}
.cx-btn[disabled] .cx-sp{display:block}
.cx-btn[disabled] .cx-ar{display:none}
@keyframes cx-spin{to{transform:rotate(360deg)}}

/* thank-you */
.cx-thx{display:none;flex:1;flex-direction:column;align-items:flex-start;justify-content:center;gap:8px}
.cx-sent .cx-formwrap{display:none}
.cx-sent .cx-thx{display:flex}
.cx-tick{width:84px;height:84px;margin-bottom:14px}
.cx-tick circle{fill:none;stroke:var(--brand);stroke-width:3;stroke-dasharray:226;stroke-dashoffset:226}
.cx-tick path{fill:none;stroke:var(--brand);stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:50;stroke-dashoffset:50}
.cx-sent .cx-tick circle{animation:cx-draw .8s var(--ease) .1s forwards}
.cx-sent .cx-tick path{animation:cx-draw .5s var(--ease) .75s forwards}
@keyframes cx-draw{to{stroke-dashoffset:0}}
.cx-thx h3{font-size:clamp(1.9rem,3.2vw,2.8rem);font-weight:800;letter-spacing:-.045em;line-height:1.02;outline:0}
.cx-thx h3 em{font:italic 400 1.1em/1 var(--serif);color:var(--brand);letter-spacing:-.01em}
.cx-thx>p{max-width:30em;color:var(--ink-2)}
.cx-next{margin:14px 0 4px;display:grid;gap:12px;max-width:32em}
.cx-next li{display:grid;grid-template-columns:30px 1fr;gap:14px;align-items:start;color:var(--ink-2);font-size:.98rem;line-height:1.45}
.cx-next i{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--brand-s);color:var(--brand-d);font:500 .72rem/1 var(--mono);font-style:normal}
.cx-again{margin-top:12px;padding:0;background:none;border:0;border-bottom:2px solid var(--brand);font:600 .98rem/1.4 var(--sans);color:var(--ink);cursor:pointer}
.cx-again:hover{color:var(--brand-d)}

/* ================= entrance choreography ================= */
.cx-ct.cx-js .cx-rv{opacity:0;transform:translateY(24px);transition:opacity .8s var(--ease),transform .8s var(--ease);transition-delay:calc(var(--d,0) * 1s)}
.cx-ct.cx-js .cx-rv.cx-in{opacity:1;transform:none}
.cx-ct.cx-js .cx-w>span{transform:translateY(110%);transition:transform .9s var(--ease);transition-delay:calc(var(--d,0) * 1s + var(--i) * .06s)}
.cx-ct.cx-js .cx-in .cx-w>span,.cx-ct.cx-js .cx-w.cx-in>span{transform:none}
.cx-ct.cx-js .cx-route .cx-st{opacity:0;transform:translateY(14px);transition:opacity .6s var(--ease),transform .6s var(--ease);transition-delay:calc(var(--i) * .12s + .5s)}
.cx-ct.cx-js .cx-route.cx-in .cx-st{opacity:1;transform:none}

/* slide 1: grouped fields */
.cx-gl{display:flex;align-items:center;gap:12px;margin:4px 0 16px;font:500 .72rem/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}
.cx-gl::after{content:"";flex:1;height:1px;background:var(--line)}
.cx-gl span{color:var(--brand-d)}
.cx-pane .cx-row+.cx-gl,.cx-pane .cx-wide1+.cx-sub{margin-top:8px}
.cx-wide1{margin-bottom:6px}
.cx-sel{position:relative;display:block}
.cx-sel::after{content:"";position:absolute;right:14px;top:50%;width:7px;height:7px;border-right:2px solid var(--ink-2);border-bottom:2px solid var(--ink-2);transform:translateY(-70%) rotate(45deg);pointer-events:none}
.cx-f select{width:100%;height:48px;padding:0 38px 0 14px;font:400 .92rem/1.3 var(--sans);color:var(--ink);background:#fff;border:1.5px solid var(--line-2);border-radius:11px;-webkit-appearance:none;appearance:none;cursor:pointer;transition:border-color .2s,box-shadow .2s}
.cx-f select:hover{border-color:rgba(11,11,11,.42)}
.cx-f select:focus{outline:0;border-color:var(--brand);box-shadow:0 0 0 4px rgba(255,106,19,.16)}
.cx-pane .cx-sub{margin:16px 0 10px}

/* slide 3: every service on one board */
.cx-board{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.cx-room{position:relative;display:block;cursor:pointer;min-width:0}
.cx-room input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}
.cx-rc{position:relative;display:flex;flex-direction:column;gap:8px;height:100%;min-height:110px;padding:12px 13px 11px;border-radius:18px;border:1.5px solid var(--line-2);background:#fff;transition:all .28s var(--ease);overflow:hidden}
.cx-rc::before{content:"";position:absolute;inset:0;background:var(--t);opacity:0;transition:opacity .28s}
.cx-rc>*{position:relative}
.cx-ic{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--t);color:var(--ink);transition:transform .35s var(--spring),background .25s}
.cx-rn{display:block;font-size:.93rem;font-weight:700;letter-spacing:-.02em;line-height:1.2;color:var(--ink)}
.cx-rs{margin-top:auto;font:500 .6rem/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3)}
.cx-ck{position:absolute;right:12px;top:12px;width:22px;height:22px;border-radius:50%;border:1.5px solid var(--line-2);background:#fff center/13px no-repeat;transition:all .25s var(--ease)}
.cx-room:hover .cx-rc{border-color:var(--ink);transform:translateY(-3px);box-shadow:0 18px 28px -20px rgba(11,11,11,.5)}
.cx-room:hover .cx-ic{transform:scale(1.1) rotate(-5deg)}
.cx-room input:checked+.cx-rc{border-color:var(--ink);box-shadow:0 18px 30px -20px rgba(11,11,11,.55)}
.cx-room input:checked+.cx-rc::before{opacity:1}
.cx-room input:checked+.cx-rc .cx-ic{background:#fff}
.cx-room input:checked+.cx-rc .cx-ck{background-color:var(--ink);border-color:var(--ink);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath d='M2.5 7.4 5.6 10.4 11.5 3.8' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}
.cx-room input:focus-visible+.cx-rc{outline:2px solid var(--brand);outline-offset:3px}
.cx-room.cx-sug .cx-rs{color:var(--brand-d)}
.cx-room.cx-sug .cx-rs::before{content:"";display:inline-block;width:6px;height:6px;margin-right:6px;border-radius:50%;background:var(--brand);vertical-align:1px}
.cx-room.cx-sug:not(:has(input:checked)) .cx-rc{border-color:rgba(255,106,19,.5)}
.cx-room.cx-w2{grid-column:span 2}
.cx-room.cx-w2 .cx-rc{min-height:0;flex-direction:row;align-items:center;gap:14px;padding:14px 46px 14px 14px}
.cx-room.cx-w2 .cx-rs{margin:0 0 0 auto;white-space:nowrap}
.cx-dt{display:flex;align-items:center;gap:14px;min-height:60px;margin-top:10px;padding:10px 16px;border-radius:16px;background:var(--paper);border:1px dashed var(--line-2)}
.cx-dt .cx-ic{flex:none;background:#fff}
.cx-dt b{display:block;font-size:.95rem;letter-spacing:-.015em;line-height:1.25}
.cx-dt span.cx-dd{display:block;margin-top:2px;color:var(--ink-2);font-size:.88rem;line-height:1.4}
.cx-dt .cx-cn{margin-left:auto;flex:none;padding:6px 11px;border-radius:999px;background:var(--ink);color:#fff;font:600 .72rem/1 var(--mono);letter-spacing:.04em;font-style:normal;white-space:nowrap}
.cx-dt .cx-cn:empty{display:none}
.cx-dt.cx-sw{animation:cx-swap .4s var(--ease)}

/* ================= RESPONSIVE DEVICE BREAKPOINTS ================= */

/* 1. Standard Laptops and Medium Desktops (1025px - 1366px) */
@media (max-width: 1366px) {
  .cx-ct {
    --sec: clamp(48px, 5.5vw, 76px);
    --wrap: 1260px;
    font-size: 15px;
  }
  .cx-shell {
    border-radius: 28px;
  }
  .cx-side {
    padding: clamp(24px, 2.6vw, 40px);
  }
  .cx-side h2 {
    font-size: clamp(1.85rem, 2.7vw, 2.6rem);
  }
  .cx-lede {
    font-size: .92rem;
    margin-top: 14px;
  }
  .cx-route-h {
    margin: 24px 0 4px;
    font-size: .66rem;
  }
  .cx-route {
    gap: 0 10px;
    padding-top: 26px;
  }
  .cx-st .cx-dot {
    width: 22px;
    height: 22px;
  }
  .cx-st .cx-dot::after {
    inset: 4px;
  }
  .cx-st::before, .cx-st::after {
    left: 22px;
    right: -10px;
    top: 10px;
  }
  .cx-st.cx-on .cx-dot {
    box-shadow: 0 0 0 5px rgba(255,106,19,.2);
  }
  .cx-st.cx-on .cx-dot::after {
    inset: 6px;
  }
  .cx-pin {
    top: -26px;
    padding: 4px 7px;
    font-size: .6rem;
  }
  .cx-st .cx-lb {
    font-size: .66rem;
    margin-top: 10px;
  }
  .cx-st .cx-sb {
    font-size: .74rem;
    margin-top: 4px;
  }
  .cx-st .cx-sl {
    gap: 5px;
    margin-top: 10px;
    min-height: 24px;
  }
  .cx-tag {
    padding: 5px 8px;
    font-size: .72rem;
    border-radius: 7px;
  }
  .cx-rec {
    margin-top: 20px;
    padding: 14px 16px;
    border-radius: 16px;
  }
  .cx-rec small {
    font-size: .62rem;
  }
  .cx-rec b {
    font-size: 1.05rem;
    margin-top: 6px;
  }
  .cx-rec p {
    font-size: .84rem;
    margin-top: 4px;
  }
  .cx-promise {
    margin-top: 16px;
    font-size: .64rem;
  }

  .cx-formside {
    padding: clamp(28px, 2.8vw, 44px);
    min-height: 520px;
  }
  .cx-hd {
    margin-bottom: 22px;
  }
  .cx-stp {
    font-size: .68rem;
  }
  .cx-stp strong {
    font-size: .84rem;
  }
  .cx-seg {
    max-width: 200px;
  }
  .cx-pane legend {
    font-size: clamp(1.3rem, 1.8vw, 1.65rem);
  }
  .cx-hint {
    margin: 10px 0 22px;
    font-size: .92rem;
  }
  .cx-gl {
    margin: 4px 0 14px;
    font-size: .66rem;
  }
  .cx-row {
    gap: 14px;
    margin-bottom: 14px;
  }
  .cx-f>.cx-t {
    font-size: .8rem;
    margin-bottom: 7px;
  }
  .cx-f input, .cx-f textarea, .cx-f select {
    height: 46px;
    font-size: .88rem;
    border-radius: 10px;
    padding: 0 12px;
  }
  .cx-f textarea {
    height: auto;
    min-height: 88px;
    padding: 8px 12px;
  }
  .cx-pfx b {
    width: 48px;
    font-size: .84rem;
    border-radius: 8.5px 0 0 8.5px;
  }
  .cx-pfx input {
    padding-left: 56px;
  }
  .cx-f.cx-wide1 {
    margin-bottom: 12px;
  }
  .cx-sub {
    margin: 16px 0 8px;
    font-size: .88rem;
  }
  .cx-pills {
    gap: 8px;
  }
  .cx-pill span {
    height: 38px;
    padding: 0 16px;
    font-size: .86rem;
  }

  /* Stage cards */
  .cx-cards {
    gap: 8px;
  }
  .cx-card {
    padding: 11px 15px;
    border-radius: 14px;
    gap: 13px;
  }
  .cx-card .cx-k {
    min-width: 56px;
    height: 26px;
    font-size: .62rem;
  }
  .cx-card b {
    font-size: .96rem;
  }
  .cx-card span.cx-d {
    font-size: .82rem;
  }
  .cx-card .cx-r {
    width: 22px;
    height: 22px;
  }

  /* Service board */
  .cx-board {
    gap: 7px;
  }
  .cx-rc {
    min-height: 94px;
    padding: 10px 11px 9px;
    border-radius: 14px;
    gap: 6px;
  }
  .cx-ic {
    width: 34px;
    height: 34px;
    border-radius: 10px;
  }
  .cx-rn {
    font-size: .84rem;
  }
  .cx-rs {
    font-size: .56rem;
  }
  .cx-ck {
    width: 19px;
    height: 19px;
    right: 9px;
    top: 9px;
  }
  .cx-room.cx-w2 .cx-rc {
    padding: 10px 40px 10px 11px;
    gap: 12px;
  }
  .cx-dt {
    min-height: 50px;
    padding: 8px 12px;
    border-radius: 13px;
    margin-top: 8px;
    gap: 10px;
  }
  .cx-dt b {
    font-size: .88rem;
  }
  .cx-dt span.cx-dd {
    font-size: .8rem;
  }

  /* Step 4 ideas, recap */
  .cx-recap {
    gap: 6px;
    margin-bottom: 14px;
  }
  .cx-recap span {
    padding: 5px 10px;
    font-size: .76rem;
  }
  .cx-ideas {
    gap: 7px;
    margin-top: 10px;
  }
  .cx-ideas button {
    padding: 6px 11px;
    font-size: .8rem;
  }
  .cx-note {
    margin-top: 12px;
    padding: 10px 12px;
    font-size: .82rem;
    border-radius: 12px;
  }
  .cx-legal {
    margin-top: 14px;
    font-size: .78rem;
  }

  /* Nav */
  .cx-nav {
    padding-top: 16px;
  }
  .cx-back {
    font-size: .88rem;
  }
  .cx-btn {
    height: 52px;
    padding: 0 10px 0 24px;
    font-size: .96rem;
  }
  .cx-btn i {
    width: 38px;
    height: 38px;
  }
}

/* 2. Tablets and Small Laptops (769px - 1024px) */
@media (max-width: 1024px) {
  .cx-shell {
    grid-template-columns: 1fr;
    border-radius: 24px;
  }
  .cx-formside {
    min-height: auto;
    padding: 26px 24px 30px;
  }
  .cx-side {
    padding: 24px 24px 22px;
  }
  .cx-promise {
    display: none;
  }
  .cx-board {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
  }
}

/* 3. Mobile Devices (<= 768px) */
@media (max-width: 768px) {
  .cx-ct {
    --sec: clamp(32px, 6vw, 48px);
    font-size: 14px;
  }
  .cx-wrap {
    width: calc(100% - 24px);
  }
  .cx-shell {
    border-radius: 20px;
  }
  .cx-side {
    padding: 20px 16px 18px;
  }
  .cx-eyebrow {
    font-size: .62rem;
    margin-bottom: 10px;
  }
  .cx-side h2 {
    font-size: clamp(1.6rem, 5.5vw, 2.1rem);
    line-height: 1.05;
  }
  .cx-lede {
    font-size: .84rem;
    margin-top: 10px;
  }
  .cx-route-h {
    margin: 16px 0 4px;
    font-size: .62rem;
  }
  .cx-route {
    gap: 0 6px;
    padding-top: 22px;
  }
  .cx-st::before, .cx-st::after {
    right: -6px;
  }
  .cx-st .cx-sb, .cx-st .cx-sl {
    display: none;
  }
  .cx-st .cx-lb {
    font-size: .6rem;
    letter-spacing: .06em;
    margin-top: 8px;
  }
  .cx-cnt {
    display: inline-grid;
    place-items: center;
    min-width: 16px;
    height: 16px;
    margin-left: 4px;
    padding: 0 4px;
    border-radius: 8px;
    background: var(--brand);
    color: #fff;
    font: 600 .58rem/1 var(--mono);
    letter-spacing: 0;
  }
  .cx-cnt:empty {
    display: none;
  }
  .cx-rec {
    margin-top: 14px;
    padding: 11px 13px;
    border-radius: 13px;
  }
  .cx-rec b {
    font-size: .94rem;
  }
  .cx-rec p {
    font-size: .78rem;
  }

  .cx-formside {
    padding: 20px 16px 22px;
  }
  .cx-seg {
    max-width: 130px;
  }
  .cx-pane legend {
    font-size: clamp(1.22rem, 4.5vw, 1.45rem);
  }
  .cx-hint {
    font-size: .84rem;
    margin: 6px 0 14px;
  }
  .cx-row {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 10px;
  }
  .cx-f input, .cx-f textarea, .cx-f select {
    font-size: 15px;
    height: 40px;
    border-radius: 9px;
  }
  .cx-sub {
    margin: 14px 0 8px;
    font-size: .84rem;
  }
  .cx-pill span {
    height: 35px;
    padding: 0 13px;
    font-size: .82rem;
  }

  /* Stage cards */
  .cx-cards {
    gap: 7px;
  }
  .cx-card {
    grid-template-columns: auto 1fr 18px;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 12px;
  }
  .cx-card .cx-k {
    min-width: 48px;
    font-size: .56rem;
  }
  .cx-card b {
    font-size: .88rem;
  }
  .cx-card span.cx-d {
    font-size: .76rem;
  }

  /* Service board on mobile: 2 cols */
  .cx-board {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
  }
  .cx-rc {
    min-height: 86px;
    padding: 8px 9px;
  }
  .cx-rn {
    font-size: .78rem;
  }
  .cx-rs {
    font-size: .52rem;
  }
  .cx-ic {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .cx-ic svg {
    width: 17px;
    height: 17px;
  }
  .cx-room.cx-w2 {
    grid-column: span 2;
  }
  .cx-room.cx-w2 .cx-rc {
    padding: 8px 32px 8px 9px;
    gap: 10px;
  }
  .cx-dt {
    align-items: flex-start;
    padding: 8px 10px;
    margin-top: 6px;
  }
  .cx-dt .cx-cn {
    display: none;
  }

  .cx-btn {
    height: 46px;
    padding: 0 8px 0 18px;
    font-size: .9rem;
  }
  .cx-btn i {
    width: 32px;
    height: 32px;
  }
}

/* 4. Small Phones (<= 480px) */
@media (max-width: 480px) {
  .cx-wrap {
    width: calc(100% - 16px);
  }
  .cx-shell {
    border-radius: 16px;
  }
  .cx-side {
    padding: 16px 14px 14px;
  }
  .cx-side h2 {
    font-size: 1.45rem;
  }
  .cx-formside {
    padding: 16px 13px 18px;
  }
  .cx-pane legend {
    font-size: 1.18rem;
  }
  .cx-pill span {
    height: 33px;
    padding: 0 11px;
    font-size: .78rem;
  }
}

@media(prefers-reduced-motion:reduce){
  .cx-ct *{animation:none!important;transition:none!important}
  .cx-ct.cx-js .cx-rv,.cx-ct.cx-js .cx-w>span,.cx-ct.cx-js .cx-route .cx-st{opacity:1!important;transform:none!important}
  .cx-tick circle,.cx-tick path{stroke-dashoffset:0!important}
}
`;
