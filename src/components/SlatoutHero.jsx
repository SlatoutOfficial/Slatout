'use client';
// SlatoutHero.jsx — React version of "slatout hero section.html"
// Full-screen hero: 3D rope around the wordmark, top navigation, "service worlds" backdrop
// (photo + animated scene per service), grouped tool panel, sounds and colours.
//
// Requires: npm i three   (written against three@0.160)
// Props:
//   images — 10 background photo URLs, one per service (defaults to /images/01-....jpg … /images/10-....jpg)

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Scale, Code, Landmark, Palette, FileText, Megaphone, ShoppingBag, Sparkles, Users, CreditCard } from 'lucide-react';

const DEFAULT_IMAGES = [
  '/images/01-business-setup.jpg', '/images/02-technology-ai.jpg', '/images/03-offline-launch.jpg',
  '/images/04-branding.jpg', '/images/05-content-strategy.jpg', '/images/06-digital-marketing.jpg',
  '/images/07-marketplace-growth.jpg', '/images/08-programmatic-ads.jpg', '/images/09-business-development.jpg',
  '/images/10-finance-tax.jpg',
];

// [link, line, short name] — one per service world
const WORLDS = [
  ['/services/business-setup-registration/', 'Build Your Business on the Right Foundation', 'Business Setup'],
  ['/services/technology-ai-solutions/', 'Build Your Business. Connect Your Customers. Automate Your Operations.', 'Technology & AI'],
  ['/services/offline-business-launch/', 'Build Your Business Around the Market Not Assumptions', 'Offline Launch'],
  ['/services/branding-marketing/', 'Give Your Business an Identity Worth Remembering', 'Branding'],
  ['/services/content-strategy/', 'Know What to Say Before You Decide Where to Say It', 'Content Strategy'],
  ['/services/digital-marketing/', 'Turn Visibility into Customers', 'Digital Marketing'],
  ['/services/ecommerce-marketplace-growth/', 'Sell Better. Rank Higher. Scale Across Marketplaces.', 'Marketplace Growth'],
  ['/services/programmatic-advertising/', 'Reach the Right Audience, Everywhere They Are Automatically', 'Programmatic Ads'],
  ['/services/business-development-outsourcing/', 'Build Your Pipeline. Win More Customers. Grow Your Business.', 'Business Development'],
  ['/services/finance-tax-compliance/', 'The Financial and Compliance Partner Your Business Needs to Keep Moving', 'Finance & Tax'],
];
const NAV_DD = [
  ['business-setup-registration', 'Business Setup & Registration', 'Structure, registrations, licences, IP and legal documents.', '#10b981,#2dd4bf', Scale],
  ['technology-ai-solutions', 'Technology & AI Solutions', 'Websites, software, automation and AI built around business problems.', '#3b82f6,#818cf8', Code],
  ['offline-business-launch', 'Offline Business Launch', 'Market research, location strategy and local launch planning.', '#f59e0b,#fb923c', Landmark],
  ['branding-marketing', 'Branding & Marketing', 'Brand strategy, visual identity and offline marketing.', '#f43f5e,#f472b6', Palette],
  ['content-strategy', 'Content Strategy', 'Pillars, voice, editorial calendar and content briefs.', '#eab308,#fbbf24', FileText],
  ['digital-marketing', 'Digital Marketing & Growth', 'SEO, AI-search visibility, paid ads, social and analytics.', '#14b8a6,#22d3ee', Megaphone],
  ['ecommerce-marketplace-growth', 'E-Commerce & Marketplace Growth', 'Seller onboarding, listings, marketplace SEO and advertising.', '#8b5cf6,#6366f1', ShoppingBag],
  ['programmatic-advertising', 'Programmatic Advertising', 'Real-time buying across display, video, connected TV and audio.', '#06b6d4,#60a5fa', Sparkles],
  ['business-development-outsourcing', 'Business Development', 'Market research, B2B lead generation, outreach and pipeline.', '#f97316,#fbbf24', Users],
  ['finance-tax-compliance', 'Finance, Tax & Compliance', 'Accounting, GST, income tax, audit, payroll and virtual CFO.', '#059669,#14b8a6', CreditCard],
];
// colour, svg tone, tone alpha, label
const SWATCHES = [
  ['#ff6a13', '255,255,255', '1', 'Orange'],
  ['#faf8f5', '255,106,19', '1.5', 'Off-white'],
  ['#9cc9f5', '14,50,110', '.7', 'Sky'],
  ['#ffdc82', '110,55,0', '.7', 'Sun'],
];
const HEADLINE = 'Build Beyond Business.';
const HOME_LEAD = 'Ten services, one team. From first idea to running business: setup, technology, brand, marketing and finance, planned together.';

/* ---------- animated SVG scene per service (drawn behind the wordmark) ---------- */
function buildScenes() {
  function A(c, d, x) { return '<g class="a ' + c + '" style="--d:' + d + 's">' + x + '</g>'; }
  function R(c, x, y, w, h, r) { return '<rect class="' + c + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r || 0) + '"/>'; }
  function C(c, x, y, r) { return '<circle class="' + c + '" cx="' + x + '" cy="' + y + '" r="' + r + '"/>'; }
  function P(c, d) { return '<path class="' + c + '" d="' + d + '"/>'; }
  function D(c, t, d) { return '<path class="' + c + ' dw" pathLength="1" style="--d:' + t + 's" d="' + d + '"/>'; }
  function T(x, y, t, c, anchor) { return '<text class="tx ' + (c || '') + '" x="' + x + '" y="' + y + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + t + '</text>'; }
  function star(cx, cy, ro, ri) { let d = ''; for (let i = 0; i < 10; i++) { const g = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? ri : ro; d += (i ? 'L' : 'M') + (cx + Math.cos(g) * r).toFixed(1) + ' ' + (cy + Math.sin(g) * r).toFixed(1); } return d + 'Z'; }
  const S = [null];
  // 1 BUSINESS SETUP
  S[1] = A('pop', 0, R('t2', 28, 22, 150, 156, 14) + R('t3', 46, 42, 70, 9, 4) + R('t1', 46, 66, 112, 6, 3) + R('t1', 46, 82, 96, 6, 3) + R('t1', 46, 98, 106, 6, 3) + C('t3', 138, 146, 22)) + D('k2', .55, 'M128 146l8 9 16-19') +
    ['Registration', 'GST', 'Trademark'].map((l, i) => { const y = 34 + i * 50, d = .3 + i * .4; return A('lf', d, R('t1', 210, y, 236, 38, 12) + R('k', 222, y + 8, 22, 22, 7) + T(258, y + 24, l)) + D('k2', d + .25, 'M227 ' + (y + 19) + 'l6 6 11-13'); }).join('');
  // 2 TECHNOLOGY
  S[2] = A('pop', 0, R('t2', 24, 20, 290, 160, 14) + R('t3', 24, 20, 290, 28, 14) + C('t4', 42, 34, 4) + C('t4', 56, 34, 4) + C('t4', 70, 34, 4)) +
    A('pop', .25, R('t3', 40, 60, 160, 66, 8) + P('t2', 'M40 126l44-36 34 26 28-20 54 30z')) +
    A('gx', .4, R('t3', 214, 64, 84, 8, 4)) + A('gx', .5, R('t2', 214, 82, 64, 8, 4)) + A('gx', .6, R('t2', 214, 100, 76, 8, 4)) + A('pop', .75, R('t4', 214, 114, 46, 14, 7)) +
    A('up', .85, R('t2', 40, 138, 86, 28, 8)) + A('up', .95, R('t2', 136, 138, 86, 28, 8)) + A('up', 1.05, R('t2', 232, 138, 66, 28, 8)) +
    A('pop', 1.0, R('t3', 340, 54, 116, 44, 16) + C('t4', 366, 76, 4) + C('t4', 382, 76, 4) + C('t4', 398, 76, 4)) + A('pop', 1.35, R('t2', 360, 110, 96, 40, 16) + R('t4', 376, 126, 64, 8, 4));
  // 3 OFFLINE LAUNCH
  let aw = ''; for (let i = 0; i < 5; i++) { aw += A('dn', .1 + i * .1, P(i % 2 ? 't2' : 't3', 'M' + (50 + i * 36) + ' 66h36l-6 36H' + (44 + i * 36) + 'z')); }
  S[3] = aw + A('up', .55, R('t2', 58, 102, 168, 76, 0) + R('t3', 124, 124, 34, 54, 4) + R('t1', 72, 118, 40, 30, 5) + R('t1', 172, 118, 40, 30, 5)) + A('pop', .85, R('t4', 100, 52, 84, 20, 10) + T(142, 66, 'OPEN', 'txd', 'middle')) +
    A('dn', .9, P('t4', 'M340 28a34 34 0 0 1 34 34c0 28-34 62-34 62s-34-34-34-62a34 34 0 0 1 34-34z') + C('t1', 340, 62, 12)) +
    '<ellipse class="rip t3" style="--d:1.2s" cx="340" cy="136" rx="46" ry="12"/><ellipse class="rip t3" style="--d:1.7s" cx="340" cy="136" rx="46" ry="12"/>';
  // 4 BRANDING
  S[4] = A('pop', 0, R('t2', 40, 28, 144, 144, 36)) + A('pop', .25, P('t4', star(112, 98, 46, 19))) + A('up', .5, '<text class="aa" x="214" y="110">Aa</text>') + A('gx', .65, R('t2', 320, 62, 120, 9, 4)) + A('gx', .75, R('t1', 320, 80, 86, 9, 4)) +
    [0, 1, 2, 3].map(i => A('pop', .8 + i * .12, C(i == 3 ? 'k' : (i % 2 ? 't3' : 't4'), 230 + i * 40, 146, 15))).join('');
  // 5 CONTENT
  S[5] = A('pop', 0, R('t2', 32, 16, 196, 168, 14)) + A('gx', .2, R('t3', 52, 38, 96, 10, 5)) + [0, 1, 2, 3, 4].map(i => A('gx', .35 + i * .12, R('t1', 52, 64 + i * 18, [150, 130, 150, 104, 136][i], 7, 3))).join('') +
    [['Blog', 0], ['Reel', 1], ['Post', 2], ['Email', 3]].map(o => { const i = o[1], x = 262 + (i % 2) * 100, y = 28 + Math.floor(i / 2) * 76; return A('pop', .5 + i * .2, R(i == 1 ? 't3' : 't2', x, y, 90, 64, 14) + T(x + 45, y + 37, o[0].toUpperCase(), '', 'middle')); }).join('') +
    A('pop', 1.1, '<g transform="rotate(38 200 150)">' + R('t4', 192, 98, 16, 70, 4) + P('t3', 'M192 168h16l-8 18z') + '</g>');
  // 6 DIGITAL MARKETING
  S[6] = [30, 52, 78, 106, 138].map((h, i) => A('gy', .1 + i * .14, R(i == 4 ? 't4' : 't2', 40 + i * 56, 176 - h, 38, h, 8))).join('') + D('k2', .75, 'M59 150L115 126L171 98L227 66L283 38') + D('k2', 1.25, 'M271 36L283 38L278 50') +
    ['Reach', 'Leads', 'Sales'].map((l, i) => A('rt', .45 + i * .3, R('t2', 346, 28 + i * 50, 110, 38, 19) + T(366, 52 + i * 50, l.toUpperCase()) + P('t4', 'M432 ' + (54 + i * 50) + 'l6-8 6 8'))).join('');
  // 7 MARKETPLACE GROWTH
  let g = ''; for (let i = 0; i < 6; i++) { const x = 34 + (i % 3) * 98, y = 24 + Math.floor(i / 3) * 80; g += A('pop', .1 + i * .14, R('t2', x, y, 88, 70, 12) + R(i == 2 ? 't4' : 't3', x + 10, y + 10, 68, 30, 8) + R('t1', x + 10, y + 48, 44, 6, 3)); }
  S[7] = g + A('pop', .95, R('t4', 226, 18, 64, 18, 9) + T(258, 31, 'TOP', 'txd', 'middle')) + A('lf', 1.0, P('k2', 'M350 70h18l10 40h60l10-34H372') + C('t4', 386, 128, 7) + C('t4', 434, 128, 7)) + A('pop', 1.25, C('t4', 444, 58, 15) + T(444, 63, '6', 'txd', 'middle'));
  // 8 PROGRAMMATIC ADS
  S[8] = A('pop', 0, C('t1', 120, 100, 84)) + A('pop', .12, C('t2', 120, 100, 60)) + A('pop', .24, C('t3', 120, 100, 36)) + A('pop', .36, C('t4', 120, 100, 12)) + A('dn', .55, P('t4', 'M128 106v52l14-12 11 22 11-5-11-21h18z')) + '<circle class="rip k" style="--d:.95s" cx="120" cy="100" r="30"/><circle class="rip k" style="--d:1.35s" cx="120" cy="100" r="30"/>' +
    [0, 1, 2].map(i => { const y = 30 + i * 54; return A('gx', .3 + i * .25, R(i == 1 ? 't3' : 't2', 250, y, 206, 42, 12) + C('t4', 270, y + 21, 8) + R('t1', 288, y + 11, 110, 6, 3) + R('t1', 288, y + 25, 76, 6, 3)); }).join('');
  // 9 BUSINESS DEVELOPMENT
  function person(x, y, r, c, d) { return A('pop', d, C(c, x, y - r * .9, r * .58) + P(c, 'M' + (x - r) + ' ' + (y + r * .9) + 'a' + r + ' ' + r + ' 0 0 1 ' + (2 * r) + ' 0z')); }
  S[9] = person(90, 104, 34, 't2', 0) + person(240, 96, 44, 't3', .15) + person(390, 104, 34, 't2', .3) + D('k2', .55, 'M126 70Q170 40 204 62') + D('k2', .8, 'M276 62Q310 40 354 70') + A('pop', 1.0, C('t4', 440, 50, 10)) + A('pop', 1.15, C('t4', 452, 98, 7)) + D('k', 1.05, 'M424 70L408 84') +
    A('up', .9, T(90, 176, 'LEADS', '', 'middle') + T(240, 176, 'PARTNERS', '', 'middle') + T(390, 176, 'CLIENTS', '', 'middle'));
  // 10 FINANCE & TAX
  S[10] = A('pop', 0, R('t2', 28, 18, 128, 164, 18) + R('t3', 42, 32, 100, 36, 8) + T(132, 58, '₹', '', 'end')) + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => A('pop', .2 + i * .07, R(i == 8 ? 't4' : 't3', 42 + (i % 3) * 34, 80 + Math.floor(i / 3) * 32, 28, 24, 7))).join('') +
    ['GST filing', 'Income tax', 'Accounts', 'Compliance'].map((l, i) => { const y = 24 + i * 40, d = .45 + i * .3; return A('lf', d, R('t1', 186, y, 274, 32, 10) + T(202, y + 20, l.toUpperCase())) + D('k2', d + .2, 'M428 ' + (y + 16) + 'l6 6 11-12'); }).join('');
  return S;
}

export default function SlatoutHero({ images = DEFAULT_IMAGES }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const $ = s => root.querySelector(s);
    const $$ = s => [...root.querySelectorAll(s)];

    const cleanups = [];
    const on = (t, type, fn, opts) => { t.addEventListener(type, fn, opts); cleanups.push(() => t.removeEventListener(type, fn, opts)); };
    const timers = new Set();
    const later = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; };
    let disposed = false, sceneReady = false, rafMain = 0;

    // No intro timer: the page is ready immediately. If WebGL fails, show a static version.
    root.classList.add('loaded');
    later(() => { if (!sceneReady) root.classList.add('no-gl', 'ready'); }, 7000);

    /* ================= service-world scenes ================= */
    const S = buildScenes();
    const host = $('#bgsvg');
    let html = '';
    for (let n = 1; n <= 10; n++) html += '<g class="scene" data-n="' + n + '">' + S[n] + '</g>';
    host.innerHTML = html;
    const sc = host.querySelectorAll('.scene');
    let sceneCur = 0;
    function setScene(n) {
      if (n === sceneCur || !S[n]) return;
      if (sceneCur) sc[sceneCur - 1].classList.remove('on');
      sc[n - 1].classList.add('on'); sceneCur = n;
    }

    /* ================= "more tools" toggle ================= */
    const moreBtn = $('#moreBtn'), dockEl = $('.dock');
    on(moreBtn, 'click', () => { const o = dockEl.classList.toggle('more'); moreBtn.setAttribute('aria-expanded', String(o)); });

    /* ================= service worlds: auto-play until the visitor takes over ================= */
    const ticks = $$('.th-ticks i');
    const nm = $('#thName'), eb = $('#eyebrow'), ld = $('#lead'), lt = $('#leadT'), ll = $('#leadL');
    let wcur = 0, wtimer = null;
    function showWorld(i) {
      wcur = ((i - 1 + 10) % 10) + 1;
      setScene(wcur);
      ticks.forEach((t, k) => t.classList.toggle('on', k + 1 === wcur));
      eb.classList.add('swp'); ld.classList.add('swp');
      later(() => {
        const d = WORLDS[wcur - 1];
        nm.textContent = d[2];
        eb.textContent = ('0' + wcur).slice(-2) + ' / 10 · ' + d[2];
        lt.textContent = d[1]; ll.href = d[0]; ll.hidden = false;
        eb.classList.remove('swp'); ld.classList.remove('swp');
      }, 140);
    }
    function wtick(ms) { clearTimeout(wtimer); wtimer = setTimeout(() => { if (!document.hidden) showWorld(wcur + 1); wtick(2000); }, ms || 2000); }
    const wstop = () => wtick(5000);
    on($('#thNext'), 'click', () => { wstop(); showWorld(wcur + 1); });
    on($('#thPrev'), 'click', () => { wstop(); showWorld(wcur - 1); });
    ticks.forEach((t, k) => {
      t.parentNode.style.pointerEvents = 'auto'; t.style.cursor = 'pointer';
      on(t, 'click', () => { wstop(); showWorld(k + 1); });
    });
    const startIv = setInterval(() => { if (root.classList.contains('ready')) { clearInterval(startIv); showWorld(1); wtick(2000); } }, 200);
    cleanups.push(() => { clearInterval(startIv); clearTimeout(wtimer); });

    /* ================= 3D rope ================= */
    function runScene() {
      const TAU = Math.PI * 2;
      const WORD = 'slatout';
      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
      const clamp01 = v => clamp(v, 0, 1);
      const easeOut = t => 1 - Math.pow(1 - t, 4);
      const easeInOut = t => t < .5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      function spring(o, k, v, target, K, D, dt) { o[v] += ((target - o[k]) * K - o[v] * D) * dt; o[k] += o[v] * dt; }

      const canvas = $('#gl');
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch (err) {
        root.classList.add('no-gl', 'ready');
        return;
      }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.localClippingEnabled = true;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 200);
      const CAMZ = 30;
      camera.position.set(0, 0, CAMZ);

      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;

      const hemi = new THREE.HemisphereLight(0xffffff, 0xff7a2a, 0.55);
      scene.add(hemi);
      const sun = new THREE.DirectionalLight(0xffffff, 2.1);
      sun.position.set(-5, 9, 16);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      sun.shadow.radius = 6;
      sun.shadow.bias = -0.0004;
      sun.shadow.normalBias = 0.03;
      scene.add(sun);
      const rim = new THREE.DirectionalLight(0xffd6b8, 0.7);
      rim.position.set(9, -5, 6);
      scene.add(rim);

      const shadowMat = new THREE.ShadowMaterial({ color: 0x5a1d00, opacity: 0.3 });
      const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), shadowMat);
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);

      /* ---------- procedural braided-rope textures ---------- */
      function makeRopeTextures() {
        const S = 256, h = new Float32Array(S * S), strandA = new Float32Array(S * S);
        const fr = x => x - Math.floor(x);
        for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
          const u = x / S, v = y / S;
          const s = fr(v * 3 - u * 2);
          const strand = Math.pow(Math.sin(Math.PI * s), 0.55);
          const fib = 0.5 + 0.5 * Math.sin(TAU * (v * 30 + u * 16));
          const fib2 = 0.5 + 0.5 * Math.sin(TAU * (v * 11 + u * 7) + 1.3);
          h[y * S + x] = strand * (0.84 + 0.11 * fib + 0.05 * fib2);
          strandA[y * S + x] = strand;
        }
        const nc = document.createElement('canvas'), cc = document.createElement('canvas');
        nc.width = nc.height = cc.width = cc.height = S;
        const nctx = nc.getContext('2d'), cctx = cc.getContext('2d');
        const nd = nctx.createImageData(S, S), cd = cctx.createImageData(S, S);
        const at = (x, y) => h[((y + S) % S) * S + ((x + S) % S)];
        const str = 5.5;
        for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
          const dx = (at(x + 1, y) - at(x - 1, y)) * str, dy = (at(x, y + 1) - at(x, y - 1)) * str;
          const l = Math.hypot(dx, dy, 1);
          const i = (y * S + x) * 4;
          nd.data[i] = (-dx / l * 0.5 + 0.5) * 255;
          nd.data[i + 1] = (-dy / l * 0.5 + 0.5) * 255;
          nd.data[i + 2] = (1 / l * 0.5 + 0.5) * 255;
          nd.data[i + 3] = 255;
          const st = strandA[y * S + x];
          const c = 0.5 + 0.5 * Math.pow(st, 0.6) * (0.93 + 0.07 * (h[y * S + x] / Math.max(st, 1e-3)));
          cd.data[i] = 248 * c; cd.data[i + 1] = 242 * c; cd.data[i + 2] = 232 * c; cd.data[i + 3] = 255;
        }
        nctx.putImageData(nd, 0, 0); cctx.putImageData(cd, 0, 0);
        const normal = new THREE.CanvasTexture(nc), color = new THREE.CanvasTexture(cc);
        color.colorSpace = THREE.SRGBColorSpace;
        for (const t of [normal, color]) {
          t.wrapS = t.wrapT = THREE.RepeatWrapping;
          t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        }
        return { normal, color };
      }
      const ropeTex = makeRopeTextures();

      const MATS = {
        rope: new THREE.MeshPhysicalMaterial({
          color: 0xffffff, map: ropeTex.color, normalMap: ropeTex.normal, normalScale: new THREE.Vector2(1.15, 1.15),
          roughness: 0.86, metalness: 0, sheen: 1, sheenRoughness: 0.45, sheenColor: new THREE.Color(0xfff2e2),
          envMapIntensity: 0.6, emissive: 0xffffff, emissiveIntensity: 0
        }),
        clay: new THREE.MeshPhysicalMaterial({
          color: 0xf4f0ea, roughness: 0.4, metalness: 0, clearcoat: 0.35, clearcoatRoughness: 0.35,
          sheen: 0.4, sheenRoughness: 0.6, sheenColor: new THREE.Color(0xffffff),
          envMapIntensity: 0.85, emissive: 0xffffff, emissiveIntensity: 0
        }),
        chrome: new THREE.MeshPhysicalMaterial({
          color: 0xffffff, metalness: 1, roughness: 0.09, clearcoat: 1, clearcoatRoughness: 0.05,
          envMapIntensity: 1.3, emissive: 0xffffff, emissiveIntensity: 0
        }),
        neon: new THREE.MeshBasicMaterial({ color: 0xfffaf0, toneMapped: false })
      };
      const MAT_ORDER = ['rope', 'clay', 'chrome', 'neon'];
      const MAT_LABEL = { rope: 'Rope', clay: 'Clay', chrome: 'Chrome', neon: 'Neon' };
      let matName = 'rope';

      /* ---------- rope simulation buffers ---------- */
      const N = 240, S = 3, M = 22, MV = M + 1;
      const R = (N - 1) * S + 1;
      const P = new Float32Array(N * 3), PP = new Float32Array(N * 3), REST = new Float32Array(N * 3);
      const DRAW = new Float32Array(N * 3);
      const REST_LEN = new Float32Array(N - 1);
      const SMOOTH = new Float32Array(R * 3);
      const RAD = new Float32Array(R);
      const SX = new Float32Array(N), SY = new Float32Array(N);

      const ropeGeo = new THREE.BufferGeometry();
      const pos = new Float32Array(R * MV * 3), nor = new Float32Array(R * MV * 3), uvs = new Float32Array(R * MV * 2);
      ropeGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
      ropeGeo.setAttribute('normal', new THREE.BufferAttribute(nor, 3).setUsage(THREE.DynamicDrawUsage));
      ropeGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2).setUsage(THREE.DynamicDrawUsage));
      const idx = new Uint32Array((R - 1) * M * 6);
      for (let k = 0, o = 0; k < R - 1; k++) for (let m = 0; m < M; m++) {
        const a = k * MV + m, b = a + 1, c = (k + 1) * MV + m, d = c + 1;
        idx[o++] = a; idx[o++] = b; idx[o++] = c;
        idx[o++] = b; idx[o++] = d; idx[o++] = c;
      }
      ropeGeo.setIndex(new THREE.BufferAttribute(idx, 1));
      ropeGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e4);

      const rope = new THREE.Mesh(ropeGeo, MATS.rope);
      rope.castShadow = true; rope.receiveShadow = true; rope.frustumCulled = false;
      scene.add(rope);

      const glowMat = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(0xfff1cf) }, uExpand: { value: 0.3 } },
        vertexShader: `
          uniform float uExpand; varying vec3 vN; varying vec3 vV;
          void main(){
            vec3 p = position + normal * uExpand;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          uniform vec3 uColor; varying vec3 vN; varying vec3 vV;
          void main(){
            float f = abs(dot(normalize(vN), normalize(vV)));
            float a = pow(f, 2.2) * 0.75;
            gl_FragColor = vec4(uColor * a, a);
          }`,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
      });
      const glow = new THREE.Mesh(ropeGeo, glowMat);
      glow.frustumCulled = false; glow.visible = false; glow.renderOrder = 2;
      scene.add(glow);

      /* ---------- state ---------- */
      const NORMAL = { turns: 4.6, amp: 1.0, radiusK: 0.105 };
      const BIGGER = { turns: 3.4, amp: 1.32, radiusK: 0.16 };
      const st = { ...NORMAL };
      let target = NORMAL, bigger = false;
      let info = null, vw = 1, vh = 1;
      let time = 0, phase = 0, spinVel = 0;
      const baseSpin = reduceMotion ? 0.08 : 0.32;
      let mode = 'play';
      const drag = { on: false, i: -1, z: 0, t: new THREE.Vector3() };
      const cut = { i: -1, t: 0, phase: '', heal: 0 };
      const draw = { blend: 0, target: 0, holdUntil: 0 };
      const stroke = { pts: [], recording: false, fade: 0 };
      const slash = [];
      let T, letters = [], letterGeo = null;
      let clipBase = 0;
      const clip = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

      function computeRest() {
        const { W, xhW, cy } = info;
        const a = st.amp, X0 = -W * 0.7, X1 = W * 0.7;
        for (let i = 0; i < N; i++) {
          const t = i / (N - 1);
          const th = TAU * st.turns * t + phase;
          const ry = xhW * (0.8 + 0.15 * Math.sin(t * TAU * 1.7 - time * 0.6)) * a;
          const rz = xhW * 0.8 * a;
          const j = i * 3;
          REST[j] = X0 + (X1 - X0) * t - xhW * 0.45 * a * Math.sin(th);
          REST[j + 1] = cy + ry * Math.cos(th) + xhW * 0.2 * Math.sin(t * TAU * 1.2 + time * 0.4);
          REST[j + 2] = rz * Math.sin(th);
        }
        if (draw.blend > 0) {
          const b = draw.blend;
          for (let j = 0; j < N * 3; j++) REST[j] += (DRAW[j] - REST[j]) * b;
        }
        for (let i = 0; i < N - 1; i++) {
          const a3 = i * 3, b3 = a3 + 3;
          const dx = REST[b3] - REST[a3], dy = REST[b3 + 1] - REST[a3 + 1], dz = REST[b3 + 2] - REST[a3 + 2];
          REST_LEN[i] = Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
      }

      const STEP = 1 / 60;
      function step() {
        let k = drag.on ? 0.012 : 0.05, damp = 0.935, grav = 0;
        if (cut.i >= 0) {
          if (cut.phase === 'fall') { k = 0.0024; damp = 0.972; grav = info.xhW * 0.0035; }
          else { const h = easeInOut(cut.heal); k = 0.05 * h; damp = 0.95; grav = info.xhW * 0.0035 * (1 - h); }
        }
        for (let i = 1; i < N - 1; i++) {
          const j = i * 3;
          for (let c = 0; c < 3; c++) {
            const p = P[j + c], v = (p - PP[j + c]) * damp;
            PP[j + c] = p;
            P[j + c] = p + v + (REST[j + c] - p) * k;
          }
          P[j + 1] -= grav;
        }
        if (drag.on) {
          const g = drag.i * 3;
          P[g] += (drag.t.x - P[g]) * 0.6;
          P[g + 1] += (drag.t.y - P[g + 1]) * 0.6;
          P[g + 2] += (drag.t.z - P[g + 2]) * 0.6;
        }
        for (let it = 0; it < 6; it++) {
          for (let i = 0; i < N - 1; i++) {
            if (i === cut.i) continue;
            const a = i * 3, b = a + 3;
            const dx = P[b] - P[a], dy = P[b + 1] - P[a + 1], dz = P[b + 2] - P[a + 2];
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (d < 1e-6) continue;
            const wa = (i === 0 || (drag.on && i === drag.i)) ? 0 : 1;
            const wb = (i + 1 === N - 1 || (drag.on && i + 1 === drag.i)) ? 0 : 1;
            const ws = wa + wb; if (!ws) continue;
            const diff = (d - REST_LEN[i]) / d * 0.85;
            const fa = wa / ws * diff, fb = wb / ws * diff;
            P[a] += dx * fa; P[a + 1] += dy * fa; P[a + 2] += dz * fa;
            P[b] -= dx * fb; P[b + 1] -= dy * fb; P[b + 2] -= dz * fb;
          }
        }
        for (let c = 0; c < 3; c++) {
          P[c] = REST[c]; PP[c] = REST[c];
          const l = (N - 1) * 3 + c; P[l] = REST[l]; PP[l] = REST[l];
        }
      }

      function updateTube(radius) {
        const ci = cut.i;
        let o = 0;
        for (let i = 0; i < N - 1; i++) {
          const a1 = i * 3, a2 = (i + 1) * 3;
          const a0 = Math.max(i - 1, 0) * 3, a3 = Math.min(i + 2, N - 1) * 3;
          for (let s = 0; s < S; s++) {
            if (i === ci) {
              const src = s <= 1 ? a1 : a2;
              SMOOTH[o++] = P[src]; SMOOTH[o++] = P[src + 1]; SMOOTH[o++] = P[src + 2];
              continue;
            }
            const u = s / S, u2 = u * u, u3 = u2 * u;
            for (let c = 0; c < 3; c++) {
              const p1 = P[a1 + c], p2 = P[a2 + c];
              const p0 = (ci >= 0 && i === ci + 1) ? 2 * p1 - p2 : P[a0 + c];
              const p3 = (ci >= 0 && i === ci - 1) ? 2 * p2 - p1 : P[a3 + c];
              SMOOTH[o++] = 0.5 * ((2 * p1) + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3);
            }
          }
        }
        const l = (N - 1) * 3;
        SMOOTH[o++] = P[l]; SMOOTH[o++] = P[l + 1]; SMOOTH[o++] = P[l + 2];

        const kL = ci >= 0 ? ci * S + 1 : -10, kR = ci >= 0 ? ci * S + 2 : -10;
        RAD.fill(1);
        RAD[0] = 0; RAD[R - 1] = 0;
        if (ci >= 0) { RAD[kL] = 0; RAD[kR] = 0; RAD[kL - 1] = 0.94; RAD[kR + 1] = 0.94; }

        let nx = 0, ny = 0, nz = 1, ptx = 1, pty = 0, ptz = 0, arc = 0;
        const uScale = 1.0 / (TAU * Math.max(radius, 1e-4));
        for (let k = 0; k < R; k++) {
          const lo = (ci >= 0 && k >= kR) ? kR : 0;
          const hi = (ci >= 0 && k <= kL) ? kL : R - 1;
          let a = Math.max(k - 1, lo), b = Math.min(k + 1, hi);
          let tx = SMOOTH[b * 3] - SMOOTH[a * 3], ty = SMOOTH[b * 3 + 1] - SMOOTH[a * 3 + 1], tz = SMOOTH[b * 3 + 2] - SMOOTH[a * 3 + 2];
          let tl = Math.hypot(tx, ty, tz);
          if (tl < 1e-6) {
            a = Math.max(k - 2, lo); b = Math.min(k + 2, hi);
            tx = SMOOTH[b * 3] - SMOOTH[a * 3]; ty = SMOOTH[b * 3 + 1] - SMOOTH[a * 3 + 1]; tz = SMOOTH[b * 3 + 2] - SMOOTH[a * 3 + 2];
            tl = Math.hypot(tx, ty, tz);
          }
          if (tl < 1e-6) { tx = ptx; ty = pty; tz = ptz; } else { tx /= tl; ty /= tl; tz /= tl; }
          ptx = tx; pty = ty; ptz = tz;

          if (k === 0) { nx = 0; ny = 0; nz = 1; }
          const dp = nx * tx + ny * ty + nz * tz;
          nx -= tx * dp; ny -= ty * dp; nz -= tz * dp;
          let nl = Math.hypot(nx, ny, nz);
          if (nl < 1e-5) { nx = -ty; ny = tx; nz = 0; nl = Math.hypot(nx, ny, nz) || 1; }
          nx /= nl; ny /= nl; nz /= nl;
          const bx = ty * nz - tz * ny, by = tz * nx - tx * nz, bz = tx * ny - ty * nx;

          const cx = SMOOTH[k * 3], cy = SMOOTH[k * 3 + 1], cz = SMOOTH[k * 3 + 2];
          if (k > 0 && k !== kR) arc += Math.hypot(cx - SMOOTH[k * 3 - 3], cy - SMOOTH[k * 3 - 2], cz - SMOOTH[k * 3 - 1]);
          const rk = RAD[k] * radius;
          const cap = RAD[k] === 0 ? ((k === 0 || k === kR) ? -1 : 1) : 0;
          const uu = arc * uScale;
          for (let m = 0; m < MV; m++) {
            const ang = m / M * TAU, cs = Math.cos(ang), sn = Math.sin(ang);
            const ox = cs * nx + sn * bx, oy = cs * ny + sn * by, oz = cs * nz + sn * bz;
            const v = (k * MV + m) * 3, w = (k * MV + m) * 2;
            if (cap) { nor[v] = tx * cap; nor[v + 1] = ty * cap; nor[v + 2] = tz * cap; }
            else { nor[v] = ox; nor[v + 1] = oy; nor[v + 2] = oz; }
            pos[v] = cx + ox * rk; pos[v + 1] = cy + oy * rk; pos[v + 2] = cz + oz * rk;
            uvs[w] = uu; uvs[w + 1] = m / M;
          }
        }
        ropeGeo.attributes.position.needsUpdate = true;
        ropeGeo.attributes.normal.needsUpdate = true;
        ropeGeo.attributes.uv.needsUpdate = true;
        glowMat.uniforms.uExpand.value = radius * 1.5;
      }

      /* ---------- wordmark: one plane per letter ---------- */
      function makeText() {
        const fs = 520;
        const font = `900 ${fs}px "Inter Tight", "Helvetica Neue", Helvetica, Arial, sans-serif`;
        const m = document.createElement('canvas').getContext('2d');
        m.font = font;
        const track = -0.062 * fs, chars = [...WORD];
        const ws = chars.map(ch => m.measureText(ch).width);
        const total = ws.reduce((a, b) => a + b, 0) + track * (chars.length - 1);
        const asc = m.measureText('lt').actualBoundingBoxAscent;
        const xh = m.measureText('xsaou').actualBoundingBoxAscent;
        const pad = Math.round(fs * 0.08);
        const Hc = Math.ceil(asc + pad * 2), base = pad + asc;
        let x = pad;
        const ls = chars.map((ch, i) => {
          const c = document.createElement('canvas');
          c.width = Math.ceil(ws[i] + pad * 2); c.height = Hc;
          const g = c.getContext('2d');
          g.font = font; g.fillStyle = '#fff'; g.textBaseline = 'alphabetic';
          g.fillText(ch, pad, base);
          const l = { canvas: c, left: x - pad, adv: ws[i] };
          x += ws[i] + track;
          return l;
        });
        return { letters: ls, wordW: total + pad * 2, H: Hc, base, xh, asc, pad };
      }

      function buildLetters() {
        letterGeo = new THREE.PlaneGeometry(1, 1);
        letters = T.letters.map(l => {
          const tex = new THREE.CanvasTexture(l.canvas);
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
          const mat = new THREE.MeshBasicMaterial({
            map: tex, color: 0x0b0b0b, alphaTest: 0.5, alphaToCoverage: true,
            toneMapped: false, clippingPlanes: [clip], side: THREE.DoubleSide
          });
          const mesh = new THREE.Mesh(letterGeo, mat);
          scene.add(mesh);
          return { ...l, mesh, q: { z: 0, vz: 0, rx: 0, vrx: 0, ry: 0, vry: 0, rz: 0, vrz: 0, sc: 1, vsc: 0, flip: 0, vflip: 0, flipT: 0 } };
        });
      }

      function letterAt(x, y) {
        if (!info || y < info.baseW || y > info.baseW + info.ascW) return -1;
        for (let i = 0; i < letters.length; i++) if (Math.abs(x - letters[i].hitX) < letters[i].halfAdv) return i;
        return -1;
      }
      function letterImpulse(x, strength) {
        for (const l of letters) {
          const d = Math.abs(x - l.hitX) / (info.xhW * 2.6);
          if (d >= 1) continue;
          const f = (1 - d) * strength, q = l.q;
          q.vsc += 1.6 * f; q.vrz += (Math.random() - 0.5) * 5 * f; q.vz += info.xhW * 3 * f;
        }
      }
      function flipLetter(i) {
        const q = letters[i].q;
        q.flipT += TAU; q.vsc += 1.4;
        playNote(noteFor(letters[i].hitX) + 5, 0.8, letters[i].hitX / (info.W * 0.5));
      }

      /* ---------- layout ---------- */
      const ink = $('#ink'), ictx = ink.getContext('2d');
      function layout() {
        vw = innerWidth; vh = innerHeight;
        renderer.setSize(vw, vh, false);
        camera.aspect = vw / vh;
        camera.updateProjectionMatrix();
        const H = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * CAMZ;
        const W = H * camera.aspect;
        const portrait = vw / vh < 0.9;
        const pw = W * (portrait ? 0.96 : 0.94);
        const s = pw / T.wordW, ph = T.H * s;
        const xhW = T.xh * s;
        const cy = portrait ? -H * 0.02 : -H * 0.075;
        const planeY = cy - (T.H / 2 - (T.base - T.xh / 2)) * s;
        const baseW = planeY + (T.H / 2 - T.base) * s;
        clipBase = -(baseW - xhW * 0.05);
        for (const l of letters) {
          l.w = l.canvas.width * s; l.h = ph;
          l.cx = -pw / 2 + (l.left + l.canvas.width / 2) * s;
          l.hitX = -pw / 2 + (l.left + T.pad + l.adv / 2) * s;
          l.halfAdv = l.adv * s / 2;
        }
        info = { W, H, xhW, cy, planeY, ph, baseW, ascW: T.asc * s };
        shadowPlane.position.z = -(xhW * 1.1 + 0.9);
        const sc2 = sun.shadow.camera;
        sc2.left = -W * 0.8; sc2.right = W * 0.8; sc2.top = H * 0.8; sc2.bottom = -H * 0.8;
        sc2.near = 0.5; sc2.far = 90; sc2.updateProjectionMatrix();
        computeRest();
        P.set(REST); PP.set(REST);
        if (cut.i >= 0) { cut.i = -1; cut.phase = ''; }
        const dpr = Math.min(devicePixelRatio, 2);
        ink.width = vw * dpr; ink.height = vh * dpr;
        ictx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      /* ---------- sound ---------- */
      const audio = { ctx: null, on: true, master: null, cache: new Map(), voice: 0 };
      const VOICES = ['Pluck', 'Harp', 'Bell', 'Marimba', 'Synth'];
      const SCALE = [0, 3, 5, 7, 10];
      function ensureAudio() {
        if (!audio.ctx) {
          const AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) return false;
          audio.ctx = new AC();
          const comp = audio.ctx.createDynamicsCompressor();
          audio.master = audio.ctx.createGain(); audio.master.gain.value = 0.6;
          audio.master.connect(comp).connect(audio.ctx.destination);
        }
        if (audio.ctx.state === 'suspended') audio.ctx.resume();
        return true;
      }
      function noteFreq(n) {
        const oct = Math.floor(n / 5), deg = ((n % 5) + 5) % 5;
        return 146.83 * Math.pow(2, (12 * oct + SCALE[deg]) / 12);
      }
      function noteFor(x) { return Math.round((clamp(x / (info.W * 0.5), -1, 1) + 1) / 2 * 11); }
      function ksBuffer(freq, harp) {
        const key = Math.round(freq * 10) + (harp ? 'h' : '');
        if (audio.cache.has(key)) return audio.cache.get(key);
        const sr = audio.ctx.sampleRate, len = Math.floor(sr * 1.8);
        const buf = audio.ctx.createBuffer(1, len, sr), data = buf.getChannelData(0);
        const period = Math.max(2, Math.round(sr / freq));
        const line = new Float32Array(period);
        let prev = 0;
        for (let i = 0; i < period; i++) { const r = Math.random() * 2 - 1; prev = harp ? r : prev * 0.45 + r * 0.55; line[i] = prev; }
        let p = 0;
        for (let i = 0; i < len; i++) {
          const cur = line[p], nxt = line[(p + 1) % period];
          data[i] = cur;
          line[p] = (cur + nxt) * 0.5 * (harp ? 0.9988 : 0.9965);
          p = (p + 1) % period;
        }
        audio.cache.set(key, buf);
        return buf;
      }
      function playNote(n, vel = 1, pan = 0) {
        if (!audio.on || !audio.ctx) return;
        const ctx = audio.ctx;
        if (audio.voice >= 2) return playTone(noteFreq(n), vel, pan);
        const src = ctx.createBufferSource();
        src.buffer = ksBuffer(noteFreq(n) * (audio.voice === 1 ? 2 : 1), audio.voice === 1);
        const g = ctx.createGain(); g.gain.value = 0.32 * clamp(vel, 0.1, 1.4) * (audio.voice === 1 ? 0.8 : 1);
        let node = src.connect(g);
        if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = clamp(pan, -1, 1) * 0.7; node = node.connect(p); }
        node.connect(audio.master);
        src.start();
      }
      /* extra voices: Bell, Marimba, Synth */
      function playTone(f, vel, pan) {
        const ctx = audio.ctx, t = ctx.currentTime, v = clamp(vel, 0.1, 1.4), out = ctx.createGain();
        let node = out;
        if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = clamp(pan, -1, 1) * 0.7; out.connect(p); node = p; }
        node.connect(audio.master);
        const partial = (type, freq, peak, dec, att = 0.004) => {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.type = type; o.frequency.value = freq;
          g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak * v, t + att);
          g.gain.exponentialRampToValueAtTime(0.0001, t + dec);
          o.connect(g).connect(out); o.start(t); o.stop(t + dec + 0.05);
        };
        if (audio.voice === 2) {
          f *= 2;
          partial('sine', f, 0.22, 2.4); partial('sine', f * 2.76, 0.10, 1.5);
          partial('sine', f * 5.4, 0.06, 0.9); partial('sine', f * 8.93, 0.03, 0.5);
        } else if (audio.voice === 3) {
          f *= 2;
          partial('sine', f, 0.34, 0.7, 0.002); partial('sine', f * 4, 0.12, 0.12, 0.002); partial('sine', f * 9.2, 0.04, 0.05, 0.002);
        } else {
          const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 6;
          lp.frequency.setValueAtTime(4200, t); lp.frequency.exponentialRampToValueAtTime(380, t + 0.5);
          lp.connect(out);
          [-7, 7].forEach(d => {
            const o = ctx.createOscillator(), g = ctx.createGain();
            o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = d;
            g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.11 * v, t + 0.006);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);
            o.connect(g).connect(lp); o.start(t); o.stop(t + 0.7);
          });
        }
      }
      function snapSound() {
        if (!audio.on || !audio.ctx) return;
        const ctx = audio.ctx, t = ctx.currentTime;
        const len = Math.floor(ctx.sampleRate * 0.22), b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 6);
        const n = ctx.createBufferSource(); n.buffer = b;
        const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1400;
        const g = ctx.createGain(); g.gain.value = 0.55;
        n.connect(hp).connect(g).connect(audio.master); n.start(t);
        const o = ctx.createOscillator(); o.type = 'sine';
        o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.25);
        const og = ctx.createGain(); og.gain.setValueAtTime(0.6, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        o.connect(og).connect(audio.master); o.start(t); o.stop(t + 0.32);
      }
      function tieSound() { playNote(5, 0.7); later(() => playNote(8, 0.6), 90); }

      /* ---------- pointer ---------- */
      const ptr = { x: -999, y: -999, px: -999, py: -999, nx: 0, ny: 0, inside: false, down: false, type: 'mouse' };
      const ray = new THREE.Raycaster();
      const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const ndc = new THREE.Vector2();
      const mW = new THREE.Vector3(), mWPrev = new THREE.Vector3();
      let havePrev = false, uiHover = false, hoverRope = false, hoverLetter = -1;
      const lastNote = new Float32Array(N);

      function worldAtNDC(nx, ny, z, out) {
        zPlane.constant = -z;
        ndc.set(nx, ny);
        ray.setFromCamera(ndc, camera);
        return ray.ray.intersectPlane(zPlane, out);
      }
      const worldAt = (z, out) => worldAtNDC(ptr.nx, ptr.ny, z, out);
      function setPtr(e) {
        ptr.x = e.clientX; ptr.y = e.clientY; ptr.type = e.pointerType || 'mouse';
        ptr.nx = (e.clientX / vw) * 2 - 1;
        ptr.ny = -(e.clientY / vh) * 2 + 1;
      }
      const pv = new THREE.Vector3();
      function projectAll() {
        for (let i = 0; i < N; i++) {
          pv.set(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]).project(camera);
          SX[i] = (pv.x + 1) * 0.5 * vw; SY[i] = (1 - pv.y) * 0.5 * vh;
        }
      }
      function nearestRope() {
        let best = -1, bd = 1e9;
        for (let i = 2; i < N - 2; i++) {
          const d = Math.hypot(SX[i] - ptr.x, SY[i] - ptr.y);
          if (d < bd) { bd = d; best = i; }
        }
        return { i: best, d: bd };
      }
      const grabThresh = () => Math.max(30, st.radiusK * info.xhW * (vh / info.H) + 18);
      function segCross(ax, ay, bx, by, cx, cy, dx, dy) {
        const d1x = bx - ax, d1y = by - ay, d2x = dx - cx, d2y = dy - cy;
        const den = d1x * d2y - d1y * d2x;
        if (Math.abs(den) < 1e-9) return false;
        const t = ((cx - ax) * d2y - (cy - ay) * d2x) / den;
        const u = ((cx - ax) * d1y - (cy - ay) * d1x) / den;
        return t >= 0 && t <= 1 && u >= 0 && u <= 1;
      }
      function crossings(maxHits) {
        const hits = [];
        for (let i = 1; i < N - 2 && hits.length < maxHits; i++) {
          if (i === cut.i) continue;
          if (segCross(ptr.px, ptr.py, ptr.x, ptr.y, SX[i], SY[i], SX[i + 1], SY[i + 1])) hits.push(i);
        }
        return hits;
      }
      function localTension(i) {
        let mx = 0;
        for (let s = Math.max(0, i - 4); s < Math.min(N - 1, i + 4); s++) {
          const a = s * 3, b = a + 3;
          const d = Math.hypot(P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]);
          mx = Math.max(mx, d / Math.max(REST_LEN[s], 1e-6) - 1);
        }
        return mx;
      }

      function pluck(strength = 1) {
        const Rr = info.xhW * 2.4;
        for (let i = 1; i < N - 1; i++) {
          const j = i * 3;
          const dx = P[j] - mW.x, dy = P[j + 1] - mW.y;
          const d = Math.hypot(dx, dy);
          if (d < Rr && d > 1e-4) {
            const f = (1 - d / Rr) ** 2 * info.xhW * 0.55 * strength;
            PP[j] -= dx / d * f;
            PP[j + 1] -= dy / d * f;
            PP[j + 2] -= (Math.random() - 0.3) * f * 0.8;
          }
        }
        letterImpulse(mW.x, 0.6 * strength);
        playNote(noteFor(mW.x), 0.9, mW.x / (info.W * 0.5));
      }
      function shakeAll(amount) {
        for (let i = 1; i < N - 1; i++) {
          const j = i * 3, w = Math.sin(i / N * Math.PI);
          PP[j + 1] -= (Math.random() - 0.5) * amount * w;
          PP[j + 2] -= (Math.random() - 0.5) * amount * w;
        }
      }
      function ripple(x, y) {
        const r = document.createElement('div');
        r.className = 'ripple'; r.style.left = x + 'px'; r.style.top = y + 'px';
        root.appendChild(r);
        later(() => r.remove(), 950);
      }

      function doCut(i) {
        if (cut.i >= 0 || i < 3 || i > N - 5) return;
        cut.i = i; cut.t = 0; cut.phase = 'fall'; cut.heal = 0;
        const a = i * 3;
        const span = 34;
        for (let m = 0; m < span; m++) {
          const f = Math.pow(1 - m / span, 2) * info.xhW * 0.2;
          const L = i - m, Rr = i + 1 + m;
          if (L > 0) {
            const t0 = L * 3, t1 = Math.max(L - 1, 0) * 3;
            const dx = P[t1] - P[t0], dy = P[t1 + 1] - P[t0 + 1], dz = P[t1 + 2] - P[t0 + 2], dl = Math.hypot(dx, dy, dz) || 1;
            PP[t0] -= dx / dl * f; PP[t0 + 1] -= dy / dl * f - f * 0.3; PP[t0 + 2] -= dz / dl * f;
          }
          if (Rr < N - 1) {
            const t0 = Rr * 3, t1 = Math.min(Rr + 1, N - 1) * 3;
            const dx = P[t1] - P[t0], dy = P[t1 + 1] - P[t0 + 1], dz = P[t1 + 2] - P[t0 + 2], dl = Math.hypot(dx, dy, dz) || 1;
            PP[t0] -= dx / dl * f; PP[t0 + 1] -= dy / dl * f - f * 0.3; PP[t0 + 2] -= dz / dl * f;
          }
        }
        snapSound();
        letterImpulse(P[a], 1.2);
        toast('Snip. It grows back in a moment.');
      }
      function updateCut(dt) {
        if (cut.i < 0) return;
        cut.t += dt;
        if (cut.phase === 'fall' && cut.t > 2.6) cut.phase = 'heal';
        if (cut.phase === 'heal') {
          cut.heal = Math.min(1, cut.heal + dt / 1.6);
          const a = cut.i * 3, b = a + 3;
          const d = Math.hypot(P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]);
          if ((cut.heal > 0.55 && d < REST_LEN[cut.i] * 1.8) || cut.t > 8) {
            const x = P[a];
            cut.i = -1; cut.phase = ''; cut.heal = 0;
            tieSound(); letterImpulse(x, 0.6);
          }
        }
      }

      function commitStroke() {
        const pts = stroke.pts.map(p => worldAtNDC(p.nx, p.ny, 0, new THREE.Vector3())).filter(Boolean);
        if (pts.length < 2) return false;
        const cum = [0];
        for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1]));
        const Ltot = cum[cum.length - 1];
        if (Ltot < info.xhW * 1.2) return false;
        let j = 0;
        for (let i = 0; i < N; i++) {
          const tgt = Ltot * i / (N - 1);
          while (j < pts.length - 2 && cum[j + 1] < tgt) j++;
          const seg = (cum[j + 1] - cum[j]) || 1, f = clamp01((tgt - cum[j]) / seg);
          DRAW[i * 3] = pts[j].x + (pts[j + 1].x - pts[j].x) * f;
          DRAW[i * 3 + 1] = pts[j].y + (pts[j + 1].y - pts[j].y) * f;
          DRAW[i * 3 + 2] = info.xhW * 0.6 * Math.sin(tgt / (info.xhW * 1.1) * Math.PI);
        }
        draw.target = 1; draw.holdUntil = time + 7.5;
        return true;
      }

      on(canvas, 'pointerdown', e => {
        if (!info) return;
        if (audio.on) ensureAudio();
        setPtr(e); ptr.inside = true; ptr.down = true; ptr.px = ptr.x; ptr.py = ptr.y;
        worldAt(0, mW);
        try { canvas.setPointerCapture(e.pointerId); } catch (_) { }
        if (mode === 'play') {
          projectAll();
          const n = nearestRope();
          const thresh = grabThresh() * (ptr.type === 'mouse' ? 1 : 1.6);
          if (n.d < thresh) {
            drag.on = true; drag.i = n.i;
            drag.z = Math.max(P[n.i * 3 + 2], info.xhW * 0.9);
            worldAt(drag.z, drag.t);
          } else {
            const li = letterAt(mW.x, mW.y);
            if (li >= 0) flipLetter(li);
            else { pluck(1); ripple(e.clientX, e.clientY); }
          }
        } else if (mode === 'draw') {
          stroke.pts = [{ x: ptr.x, y: ptr.y, nx: ptr.nx, ny: ptr.ny }];
          stroke.recording = true; stroke.fade = 1;
        } else if (mode === 'cut') {
          slash.push({ x: ptr.x, y: ptr.y, t: time });
        }
      });
      on(window, 'pointermove', e => {
        setPtr(e); ptr.inside = true;
        uiHover = !!(e.target.closest && e.target.closest('a,button,.dock'));
        root.classList.remove('out');
      });
      function release() {
        if (drag.on) {
          const ten = localTension(drag.i);
          if (ten > 0.05) {
            const x = P[drag.i * 3];
            playNote(clamp(Math.round(4 + ten * 18), 0, 14), 1, x / (info.W * 0.5));
            letterImpulse(x, clamp(ten * 4, 0.3, 1.5));
          }
        }
        drag.on = false;
        if (stroke.recording) {
          stroke.recording = false;
          if (commitStroke()) { toast('The rope follows your line'); playNote(7, 0.7); }
          else toast('Draw a longer line');
        }
        ptr.down = false;
        if (ptr.type !== 'mouse') { ptr.inside = false; havePrev = false; }
      }
      on(window, 'pointerup', release);
      on(window, 'pointercancel', release);
      on(document, 'pointerleave', () => { ptr.inside = false; havePrev = false; root.classList.add('out'); });
      on(window, 'blur', () => { drag.on = false; });
      on(window, 'wheel', e => { spinVel = clamp(spinVel + e.deltaY * 0.004, -6, 6); }, { passive: true });

      /* ---------- UI ---------- */
      const toastEl = $('#toast');
      let toastTimer = 0;
      function toast(msg) {
        toastEl.textContent = msg; toastEl.classList.add('show');
        clearTimeout(toastTimer); toastTimer = later(() => toastEl.classList.remove('show'), 1800);
      }

      const HINTS = {
        play: 'Drag rope<i>/</i>Click to pluck<i>/</i>Click letters<i>/</i>Scroll',
        cut: 'Slash across the rope to cut it',
        draw: 'Draw a path<i>/</i>The rope will follow it'
      };
      function setMode(m) {
        if (m === mode) return;
        mode = m; drag.on = false; stroke.recording = false;
        $$('.dk[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === m)));
        $('#hint').innerHTML = HINTS[m];
        $('#hMode').textContent = m;
      }
      $('#hint').innerHTML = HINTS.play;
      $$('.dk[data-mode]').forEach(b => on(b, 'click', () => setMode(b.dataset.mode)));

      function setMaterial(name) {
        matName = name;
        rope.material = MATS[name];
        glow.visible = name === 'neon';
        $('#matName').textContent = MAT_LABEL[name];
        $('#hMat').textContent = MAT_LABEL[name];
        shakeAll(info.xhW * 0.25);
      }
      function cycleMaterial() {
        setMaterial(MAT_ORDER[(MAT_ORDER.indexOf(matName) + 1) % MAT_ORDER.length]);
        toast('Material: ' + MAT_LABEL[matName]);
      }
      on($('#matBtn'), 'click', cycleMaterial);

      function toggleSound() {
        if (!ensureAudio()) { toast('Sound isn’t supported here'); return; }
        audio.on = !audio.on;
        $('#soundBtn').setAttribute('aria-pressed', String(audio.on));
        toast(audio.on ? 'Sound on. Swipe across the rope to play it.' : 'Sound off');
        if (audio.on) playNote(5, 0.8);
      }
      on($('#soundBtn'), 'click', toggleSound);

      function cycleVoice() {
        if (!ensureAudio()) { toast('Sound isn’t supported here'); return; }
        audio.voice = (audio.voice + 1) % VOICES.length;
        if (!audio.on) { audio.on = true; $('#soundBtn').setAttribute('aria-pressed', 'true'); }
        $('#voiceName').textContent = VOICES[audio.voice];
        toast('Sound: ' + VOICES[audio.voice]);
        playNote(5, 0.8); later(() => playNote(8, 0.7), 130); later(() => playNote(12, 0.7), 260);
      }
      on($('#voiceBtn'), 'click', cycleVoice);

      function setBigger(v) {
        bigger = v;
        target = bigger ? BIGGER : NORMAL;
        $('#biggerLabel').textContent = bigger ? 'Think smaller' : 'Think bigger';
      }
      on($('#bigger'), 'click', () => {
        setBigger(!bigger);
        shakeAll(info.xhW * 0.5);
        spinVel += bigger ? 3 : -2;
        playNote(bigger ? 2 : 9, 0.8);
      });

      function reset() {
        setBigger(false);
        draw.target = 0; draw.holdUntil = 0;
        if (cut.i >= 0) { cut.phase = 'heal'; cut.heal = Math.max(cut.heal, 0.6); cut.t = Math.max(cut.t, 6.5); }
        spinVel = 0;
        for (const l of letters) { l.q.flipT = Math.round(l.q.flip / TAU) * TAU; }
        setMode('play');
        toast('Back to the coil');
      }
      on($('#resetBtn'), 'click', reset);

      // colour swatches: page colour + tone of the service-world drawings
      const tmpCol = new THREE.Color();
      $$('.dock .sw').forEach(sw => on(sw, 'click', () => {
        $$('.dock .sw').forEach(x => x.classList.remove('on'));
        sw.classList.add('on');
        const c = sw.dataset.c;
        root.style.setProperty('--bg', c);
        root.style.setProperty('--tone', sw.dataset.tone || '255,255,255');
        root.style.setProperty('--ta', sw.dataset.ta || '1');
        tmpCol.set(c); hemi.groundColor.copy(tmpCol);
        shadowMat.color.copy(tmpCol).multiplyScalar(0.28);
        shakeAll(info.xhW * 0.35);
      }));

      $$('[data-magnetic]').forEach(el => {
        on(el, 'pointermove', e => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${dx * 0.28}px, ${dy * 0.38}px)`;
        });
        on(el, 'pointerleave', () => { el.style.transform = ''; });
      });
      // links that still point to "#" do nothing (checked at click time, so the service link works once set)
      $$('a').forEach(a => on(a, 'click', e => { if (a.getAttribute('href') === '#') e.preventDefault(); }));

      on(window, 'keydown', e => {
        if (e.metaKey || e.ctrlKey || e.altKey || !info) return;
        const k = e.key.toLowerCase();
        if (k === '1') setMode('play');
        else if (k === '2') setMode('cut');
        else if (k === '3') setMode('draw');
        else if (k === 'm') cycleMaterial();
        else if (k === 's') toggleSound();
        else if (k === 'v') cycleVoice();
        else if (k === 'b') $('#bigger').click();
        else if (k === 'r') reset();
      });

      /* ---------- ink overlay ---------- */
      let inkDirty = false;
      function drawInk(dt) {
        while (slash.length && time - slash[0].t > 0.28) slash.shift();
        if (!stroke.recording && stroke.pts.length) { stroke.fade -= dt * 1.4; if (stroke.fade <= 0) stroke.pts = []; }
        const has = stroke.pts.length > 1 || slash.length > 1;
        if (!has && !inkDirty) return;
        ictx.clearRect(0, 0, vw, vh);
        inkDirty = has;
        if (stroke.pts.length > 1) {
          ictx.globalAlpha = stroke.recording ? 1 : Math.max(0, stroke.fade);
          ictx.strokeStyle = '#0b0b0b'; ictx.lineWidth = 3; ictx.lineCap = 'round'; ictx.lineJoin = 'round';
          ictx.setLineDash([10, 9]);
          ictx.beginPath(); ictx.moveTo(stroke.pts[0].x, stroke.pts[0].y);
          for (const p of stroke.pts) ictx.lineTo(p.x, p.y);
          ictx.stroke(); ictx.setLineDash([]);
        }
        if (slash.length > 1) {
          ictx.strokeStyle = '#ffffff'; ictx.lineCap = 'round';
          for (let i = 1; i < slash.length; i++) {
            const a = 1 - (time - slash[i].t) / 0.28;
            ictx.globalAlpha = clamp01(a);
            ictx.lineWidth = 1 + 5 * clamp01(a) * (i / slash.length);
            ictx.beginPath(); ictx.moveTo(slash[i - 1].x, slash[i - 1].y); ictx.lineTo(slash[i].x, slash[i].y); ictx.stroke();
          }
        }
        ictx.globalAlpha = 1;
      }

      /* ---------- cursor + HUD ---------- */
      const curLabel = $('#curLabel');
      const CUR_TEXT = { grab: 'Drag', pull: 'Pull', letter: 'Flip', cut: 'Cut', draw: 'Draw' };
      let curState = '';
      function setCur(s) {
        if (s === curState) return;
        curState = s; root.dataset.cur = s;
        if (CUR_TEXT[s]) curLabel.textContent = CUR_TEXT[s];
      }
      const dot = $('.c-dot'), ring = $('.c-ring');
      let rx = -100, ry = -100, hudTick = 0;
      const hTen = $('#hTen'), hSpin = $('#hSpin'), hState = $('#hState');

      function updateLetters(dt, el) {
        let hl = -1;
        if (mode === 'play' && ptr.inside && !uiHover && !drag.on && !hoverRope && ptr.type === 'mouse') hl = letterAt(mW.x, mW.y);
        hoverLetter = hl;
        letters.forEach((l, i) => {
          const q = l.q;
          let tz = 0, trx = 0, tryy = 0;
          if (i === hl) {
            tz = info.xhW * 0.35;
            tryy = clamp((mW.x - l.hitX) / l.halfAdv, -1, 1) * 0.32;
            trx = -clamp((mW.y - (info.baseW + info.ascW / 2)) / (info.ascW / 2), -1, 1) * 0.32;
          } else if (hl >= 0 && Math.abs(i - hl) === 1) tz = info.xhW * 0.1;
          spring(q, 'z', 'vz', tz, 140, 12, dt);
          spring(q, 'rx', 'vrx', trx, 140, 12, dt);
          spring(q, 'ry', 'vry', tryy, 140, 12, dt);
          spring(q, 'rz', 'vrz', 0, 160, 9, dt);
          spring(q, 'sc', 'vsc', 1, 200, 10, dt);
          spring(q, 'flip', 'vflip', q.flipT, 60, 7, dt);
          const tp = easeOut(clamp01((el - 0.15 - i * 0.07) / 1.1));
          l.mesh.position.set(l.cx, info.planeY - info.ph * (1 - tp) * 0.95, q.z);
          l.mesh.rotation.set(q.rx, q.ry + q.flip, q.rz);
          l.mesh.scale.set(l.w * q.sc, l.h * q.sc, 1);
        });
      }

      /* ---------- main loop ---------- */
      let last = performance.now(), acc = 0, t0 = Infinity;
      function frame(now) {
        if (disposed) return;
        rafMain = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05); last = now;
        time += dt;
        const el = (now - t0) / 1000;

        const kk = 1 - Math.exp(-dt * 2.6);
        st.turns += (target.turns - st.turns) * kk;
        st.amp += (target.amp - st.amp) * kk;
        st.radiusK += (target.radiusK - st.radiusK) * kk;

        phase += (baseSpin + spinVel) * dt;
        spinVel *= Math.pow(0.08, dt);

        if (draw.target === 1 && time > draw.holdUntil) draw.target = 0;
        draw.blend += (draw.target - draw.blend) * (1 - Math.exp(-dt * 2.2));
        if (draw.target === 0 && draw.blend < 1e-3) draw.blend = 0;

        updateCut(dt);
        computeRest();
        projectAll();

        const overCanvas = ptr.inside && !uiHover;
        const moved = ptr.inside && ptr.px > -900 && (ptr.x !== ptr.px || ptr.y !== ptr.py);
        if (ptr.inside) worldAt(0, mW);
        const sweepActive = overCanvas && mode === 'play' && (ptr.type === 'mouse' || ptr.down);
        if (sweepActive) {
          if (havePrev && !drag.on) {
            let vx = mW.x - mWPrev.x, vy = mW.y - mWPrev.y;
            const vl = Math.hypot(vx, vy), maxV = info.xhW * 0.6;
            if (vl > maxV) { vx *= maxV / vl; vy *= maxV / vl; }
            const Rr = info.xhW;
            for (let i = 1; i < N - 1; i++) {
              const j = i * 3, dx = P[j] - mW.x, dy = P[j + 1] - mW.y;
              const d = Math.hypot(dx, dy);
              if (d < Rr) { const f = (1 - d / Rr) ** 2 * 0.55; P[j] += vx * f; P[j + 1] += vy * f; }
            }
            if (moved && audio.on) {
              const speed = Math.hypot(ptr.x - ptr.px, ptr.y - ptr.py);
              for (const i of crossings(3)) {
                const b = i >> 2;
                if (time - lastNote[b] > 0.12) {
                  lastNote[b] = time;
                  const x = P[i * 3];
                  playNote(noteFor(x), clamp(speed / 40, 0.3, 1.1), x / (info.W * 0.5));
                }
              }
            }
          }
          mWPrev.copy(mW); havePrev = true;
        } else havePrev = false;

        if (mode === 'cut' && ptr.down && moved) {
          slash.push({ x: ptr.x, y: ptr.y, t: time });
          const hits = crossings(1);
          if (hits.length) doCut(hits[0]);
        }
        if (mode === 'draw' && stroke.recording && moved) {
          const lp = stroke.pts[stroke.pts.length - 1];
          if (Math.hypot(ptr.x - lp.x, ptr.y - lp.y) > 4) stroke.pts.push({ x: ptr.x, y: ptr.y, nx: ptr.nx, ny: ptr.ny });
        }
        if (drag.on) worldAt(drag.z, drag.t);

        acc += dt; let n = 0;
        while (acc >= STEP && n < 4) { step(); acc -= STEP; n++; }
        if (n === 4) acc = 0;

        hoverRope = false;
        if (mode === 'play' && overCanvas && ptr.type === 'mouse' && !drag.on) hoverRope = nearestRope().d < grabThresh();
        updateLetters(dt, el);
        if (drag.on) setCur('pull');
        else if (uiHover) setCur('link');
        else if (!ptr.inside || ptr.type !== 'mouse') setCur('');
        else if (mode === 'cut') setCur('cut');
        else if (mode === 'draw') setCur('draw');
        else if (hoverRope) setCur('grab');
        else if (hoverLetter >= 0) setCur('letter');
        else setCur('');

        const rm = rope.material;
        if (rm.emissive) {
          const g = drag.on ? 0.1 : hoverRope ? 0.05 : 0;
          rm.emissiveIntensity += (g - rm.emissiveIntensity) * 0.12;
        }

        updateTube(st.radiusK * info.xhW);

        clip.constant = el > 2.4 ? 1e4 : clipBase;
        const rp = easeInOut(clamp01((el - 0.6) / 2.0));
        ropeGeo.setDrawRange(0, Math.floor(rp * (R - 1)) * M * 6);

        const tx = ptr.inside ? ptr.nx * 0.9 : 0, ty = ptr.inside ? ptr.ny * 0.6 : 0;
        camera.position.x += (tx - camera.position.x) * 0.04;
        camera.position.y += (ty - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        drawInk(dt);

        rx += (ptr.x - rx) * 0.18; ry += (ptr.y - ry) * 0.18;
        dot.style.transform = `translate(${ptr.x}px, ${ptr.y}px)`;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;

        if (++hudTick % 6 === 0) {
          let mx = 0;
          for (let i = 0; i < N - 1; i++) {
            if (i === cut.i) continue;
            const a = i * 3, b = a + 3;
            mx = Math.max(mx, Math.hypot(P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]) / Math.max(REST_LEN[i], 1e-6) - 1);
          }
          hTen.textContent = Math.round(clamp(mx, 0, 9.99) * 100) + '%';
          const sp = baseSpin + spinVel;
          hSpin.textContent = (sp >= 0 ? '+' : '') + sp.toFixed(2);
          hState.textContent =
            cut.i >= 0 ? (cut.phase === 'fall' ? 'Cut' : 'Healing') :
              draw.target === 1 ? 'Drawn ' + Math.max(0, Math.ceil(draw.holdUntil - time)) + 's' :
                drag.on ? 'Stretched' : bigger ? 'Big coil' : 'Coiled';
        }

        ptr.px = ptr.x; ptr.py = ptr.y;
        renderer.render(scene, camera);
      }

      /* ---------- teardown ---------- */
      cleanups.push(() => {
        ropeGeo.dispose(); glowMat.dispose();
        Object.values(MATS).forEach(m => m.dispose());
        ropeTex.normal.dispose(); ropeTex.color.dispose();
        shadowPlane.geometry.dispose(); shadowMat.dispose();
        letters.forEach(l => { l.mesh.material.map.dispose(); l.mesh.material.dispose(); });
        if (letterGeo) letterGeo.dispose();
        envTex.dispose(); pmrem.dispose(); renderer.dispose();
        if (audio.ctx) audio.ctx.close().catch(() => { });
      });

      /* ---------- boot ---------- */
      (async function init() {
        try {
          await Promise.race([
            document.fonts.load('900 200px "Inter Tight"'),
            new Promise(r => setTimeout(r, 2500))
          ]);
        } catch (e) { }
        if (disposed) return;
        T = makeText();
        buildLetters();
        layout();
        on(window, 'resize', layout);
        t0 = performance.now(); root.classList.add('ready');
        sceneReady = true;
        last = performance.now();
        rafMain = requestAnimationFrame(frame);
      })();
    }

    try { runScene(); } catch (err) { root.classList.add('no-gl', 'ready'); console.error(err); }

    // service-world arrow keys (separate from the rope shortcuts, like the original)
    on(window, 'keydown', e => {
      if (e.key === 'ArrowRight') { wstop(); showWorld(wcur + 1); }
      else if (e.key === 'ArrowLeft') { wstop(); showWorld(wcur - 1); }
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafMain);
      timers.forEach(clearTimeout); timers.clear();
      cleanups.forEach(f => { try { f(); } catch (_) { } });
      host.innerHTML = '';
      root.classList.remove('loaded', 'ready', 'no-gl', 'out');
      root.dataset.cur = '';
      ['--bg', '--tone', '--ta'].forEach(v => root.style.removeProperty(v));
      root.querySelectorAll('.ripple').forEach(r => r.remove());
    };
  }, []);

  const words = HEADLINE.split(' ');

  return (
    <div className="slh" ref={rootRef} data-cur="">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="slh-background" aria-hidden="true">
        <div className="phs">
          {images.slice(0, 10).map((src, i) => (
            <div key={i} className="ph" data-n={i + 1} style={{ backgroundImage: `url('${src}')` }} />
          ))}
        </div>
        <svg id="bgsvg" viewBox="0 0 480 200" preserveAspectRatio="xMidYMid meet" />
      </div>
      <div className="glow" />
      <canvas id="gl" aria-label="Interactive 3D rope wrapped around the slatout wordmark" />
      <canvas id="ink" />
      <div className="fallback" aria-hidden="true">slatout</div>
      <div className="grain" />

      {/* top navigation */}
      <div className="tn" role="banner">
        <a className="tn-logo" href="/">
          <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
            <rect width="40" height="40" rx="9" fill="#0B0B0B" />
            <g transform="translate(6 6) scale(.7)">
              <path d="M20 25.5 35 31 20 36.5 5 31Z" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinejoin="round" />
              <path d="M5 20.5 20 26 35 20.5V23L20 28.5 5 23Z" fill="#C24E00" />
              <path d="M20 15 35 20.5 20 26 5 20.5Z" fill="#FF6A00" />
              <path d="M20 4 35 9.5 20 15 5 9.5Z" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinejoin="round" />
            </g>
          </svg>
          <span>Slatout</span>
        </a>
        <ul className="tn-links">
          <li><a className="cur" href="/" aria-current="page">Home</a></li>
          <li className="has-dd">
            <a href="/services/">Services<svg className="cv" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></a>
            <div className="tn-dd"><div className="tn-dd-in">
              {NAV_DD.map(([slug, label, description, gradient, Icon], i) => (
                <a key={slug} href={`/services/${slug}/`} className="tn-dd-card">
                  <span className="tn-dd-icon" style={{ background: `linear-gradient(135deg, ${gradient})` }}><Icon size={18} strokeWidth={2} aria-hidden="true" /></span>
                  <span className="tn-dd-copy">
                    <span className="tn-dd-title"><b>{String(i + 1).padStart(2, '0')}.</b>{label}</span>
                    <span className="tn-dd-desc">{description}</span>
                  </span>
                </a>
              ))}
            </div></div>
          </li>
          <li><a href="/blogs/">Insights</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
        <a className="tn-cta" href="/contact/">
          <span className="full">Book a strategy call</span><span className="short">Book a call</span>
          <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></i>
        </a>
      </div>

      <div className="ui">
        <div>
          <h1 id="headline">
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span className="w"><span style={{ transitionDelay: `${0.15 + i * 0.08}s` }}>{w}</span></span>
                {i < words.length - 1 ? ' ' : null}
              </React.Fragment>
            ))}
          </h1>
          <p className="eyebrow" id="eyebrow">Ten services &middot; one team</p>
          <p className="lead" id="lead">
            <span id="leadT">{HOME_LEAD}</span>{' '}
            <a className="lead-l" id="leadL" href="#" hidden>View service</a>
          </p>
        </div>
        <footer>
          <span aria-hidden="true" />
          <button className="pill big" id="bigger" data-magnetic=""><span id="biggerLabel">Think bigger</span><span className="arr">↗</span></button>
        </footer>
      </div>

      {/* tools */}
      <div className="mid" id="tools">
        <p className="hint" id="hint" />
        <div className="dock" role="toolbar" aria-label="Rope tools">
          <div className="grp" role="group" aria-label="Mode"><span className="cap">Mode</span><div className="row">
            <button className="dk" data-mode="play" aria-pressed="true" aria-label="Play mode">
              <svg viewBox="0 0 24 24"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-1.5V4.5a1.5 1.5 0 0 1 3 0V11m0-.5V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1.2a6 6 0 0 1-4.7-2.3L4 14.5a1.6 1.6 0 0 1 2.4-2.1L8 14" /></svg>
              <span className="tip">Play · 1</span>
            </button>
            <button className="dk" data-mode="cut" aria-pressed="false" aria-label="Cut mode">
              <svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" /></svg>
              <span className="tip">Cut · 2</span>
            </button>
            <button className="dk" data-mode="draw" aria-pressed="false" aria-label="Draw mode">
              <svg viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
              <span className="tip">Draw · 3</span>
            </button>
          </div></div>

          <div className="grp xg" role="group" aria-label="Rope"><span className="cap">Rope</span><div className="row">
            <button className="dk" id="matBtn" aria-label="Change material">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M4.2 9.6c4.6 2.3 11 2.3 15.6 0M4.2 14.4c4.6-2.3 11-2.3 15.6 0" /></svg>
              <span id="matName">Rope</span>
              <span className="tip">Material · M</span>
            </button>
            <button className="dk" id="resetBtn" aria-label="Reset">
              <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
              <span className="tip">Reset · R</span>
            </button>
          </div></div>

          <div className="grp xg" role="group" aria-label="Sound"><span className="cap">Sound</span><div className="row">
            <button className="dk" id="soundBtn" aria-pressed="true" aria-label="Toggle sound">
              <svg className="off-ico" viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4z" /><path d="m22 9-6 6m0-6 6 6" /></svg>
              <svg className="on-ico" viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /></svg>
              <span className="tip">Sound · S</span>
            </button>
            <button className="dk" id="voiceBtn" aria-label="Change sound">
              <svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="16.5" cy="16" r="2.5" /></svg>
              <span id="voiceName">Pluck</span>
              <span className="tip">Sound type · V</span>
            </button>
          </div></div>

          <div className="grp" role="group" aria-label="Service world"><span className="cap">Service world</span><div className="row">
            <button className="dk" id="thPrev" aria-label="Previous service"><svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6" /></svg><span className="tip">Previous · ←</span></button>
            <span className="th-chip"><b id="thName">All services</b><span className="th-ticks">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</span></span>
            <button className="dk" id="thNext" aria-label="Next service"><svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6" /></svg><span className="tip">Next · →</span></button>
          </div></div>

          <div className="grp" role="group" aria-label="Colour"><span className="cap">Colour</span><div className="row row-sw">
            {SWATCHES.map((s, i) => (
              <button key={s[0]} className={'sw' + (i === 0 ? ' on' : '')} style={{ '--c': s[0] }} data-c={s[0]} data-tone={s[1]} data-ta={s[2]} aria-label={s[3]} />
            ))}
          </div></div>

          <div className="grp mg"><div className="row">
            <button className="dk" id="moreBtn" aria-label="More tools" aria-expanded="false">
              <svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></svg>
              <span className="tip">Rope &amp; sound</span>
            </button>
          </div></div>
        </div>
      </div>

      <div className="hud" aria-hidden="true" hidden style={{ display: 'none' }}>
        <div><span>Mode</span> <b id="hMode">Play</b></div>
        <div><span>Material</span> <b id="hMat">Rope</b></div>
        <div><span>Tension</span> <b id="hTen">0%</b></div>
        <div><span>Spin</span> <b id="hSpin">+0.32</b></div>
        <div><span>State</span> <b id="hState">Coiled</b></div>
      </div>
      <div className="toast" id="toast" />

      <div className="c-ring"><b id="curLabel">Drag</b></div>
      <div className="c-dot" />
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

body:has(.slh)>header{display:none!important}
.slh{
  --bg:#ff6a13;--ink:#0b0b0b;--paper:#ffffff;
  --ease:cubic-bezier(.7,0,.2,1);--ease-out:cubic-bezier(.2,.8,.1,1);
  --pad-x:clamp(18px,3vw,44px);--pad-y:clamp(18px,2.4vw,34px);
  --tone:255,255,255;--ta:1;
  position:relative;width:100%;height:100vh;height:100svh;min-height:580px;overflow:hidden;
  background:var(--bg);color:var(--ink);
  font-family:'Inter Tight',system-ui,-apple-system,sans-serif;
  transition:background-color .9s var(--ease);
  cursor:none;-webkit-font-smoothing:antialiased;
  user-select:none;-webkit-user-select:none;
}
.slh,.slh *{box-sizing:border-box;margin:0;padding:0}
@media (hover:none){ .slh{cursor:auto} }
.slh button{font:inherit;color:inherit}

/* ---------- background layers ---------- */
.slh .glow{position:absolute;inset:0;z-index:0;pointer-events:none;
  background:radial-gradient(60% 50% at 50% 56%,rgba(255,255,255,.16),transparent 70%),radial-gradient(90% 60% at 50% 115%,rgba(0,0,0,.16),transparent 60%)}
.slh #gl{position:absolute;inset:0;width:100%;height:100%;display:block;z-index:1;touch-action:none}
.slh #ink{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none}
.slh .grain{position:absolute;inset:-50%;z-index:2;pointer-events:none;opacity:.13;mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation:slh-grain .9s steps(5) infinite}
@keyframes slh-grain{0%{transform:translate(0,0)}20%{transform:translate(-3%,2%)}40%{transform:translate(2%,-3%)}60%{transform:translate(-2%,-1%)}80%{transform:translate(3%,3%)}100%{transform:translate(0,0)}}

/* ---------- UI layer ---------- */
.slh .ui{position:absolute;inset:0;z-index:3;pointer-events:none;display:flex;flex-direction:column;justify-content:space-between;
  padding:var(--pad-y) var(--pad-x);padding-top:calc(var(--pad-y) + 60px + clamp(8px,1.6vh,18px))}
.slh .ui a,.slh .ui button,.slh .dock{pointer-events:auto}

.slh .pill{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:10px;
  background:var(--paper);color:var(--ink);border:0;border-radius:999px;
  padding:12px 18px 12px 22px;font:600 14px 'Inter Tight',sans-serif;letter-spacing:-.01em;
  text-decoration:none;cursor:none;white-space:nowrap;box-shadow:0 10px 30px -12px rgba(0,0,0,.45);
  transition:transform .5s var(--ease-out);will-change:transform}
.slh .pill::before{content:'';position:absolute;inset:0;background:var(--ink);border-radius:inherit;transform:translateY(101%);transition:transform .55s var(--ease)}
.slh .pill:hover::before{transform:translateY(0)}
.slh .pill span{position:relative;z-index:1;transition:color .4s var(--ease)}
.slh .pill:hover span{color:#fff}
.slh .pill .arr{display:inline-block;transition:transform .5s var(--ease)}
.slh .pill:hover .arr{transform:rotate(45deg)}
.slh .pill.big{padding:16px 22px 16px 28px;font-size:16px}

.slh h1{font-weight:800;font-size:clamp(38px,6.3vw,104px);letter-spacing:-.052em;line-height:.98;margin-top:0;max-width:16ch}
.slh h1 .w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.1em;margin-bottom:-.1em}
.slh h1 .w>span{display:inline-block;transform:translateY(112%);transition:transform 1.1s var(--ease-out)}
.slh.ready h1 .w>span{transform:none}

.slh footer{display:flex;align-items:flex-end;justify-content:flex-end;gap:20px;
  opacity:0;transform:translateY(14px);transition:opacity 1s var(--ease-out) 1.2s, transform 1s var(--ease-out) 1.2s}
.slh.ready footer{opacity:1;transform:none}

/* ---------- tools: grouped control panel, bottom-left ---------- */
.slh .mid{position:absolute;z-index:5;left:var(--pad-x);bottom:var(--pad-y);display:flex;flex-direction:column;align-items:flex-start;gap:14px;
  max-width:calc(100vw - 2*var(--pad-x) - 200px);opacity:0;transform:translateY(12px);transition:opacity .9s var(--ease-out) 1s,transform .9s var(--ease-out) 1s}
.slh.ready .mid{opacity:1;transform:none}
.slh .hint{display:block;white-space:normal;max-width:34em;font:500 11px/1.5 'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;opacity:.8;padding-left:14px;position:relative;transition:opacity .3s}
.slh .hint i{font-style:normal;opacity:.45;margin:0 .6em}
.slh .hint::before{content:"";position:absolute;left:0;top:.45em;width:6px;height:6px;border-radius:50%;background:var(--ink);animation:slh-pulse 2.4s ease-in-out infinite}
.slh .hint,.slh .dk[data-mode]::after,.slh .dk .tip,.slh .th-chip b{display:none!important}
@keyframes slh-pulse{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.6);opacity:.35}}

.slh .dock{display:flex;flex-direction:row;align-items:flex-end;flex-wrap:wrap;gap:10px;padding:0;border-radius:0;background:none;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none;overflow:visible;max-width:none}
.slh .dock:not(.more) .xg{display:none}
.slh .grp{display:flex;flex-direction:column;gap:7px}
.slh .cap{display:none!important}
.slh .row{display:flex;align-items:center;gap:2px;padding:4px;border-radius:14px;background:rgba(255,255,255,.2);
  backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4);
  box-shadow:0 14px 30px -18px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.32)}
.slh .row-sw{padding:0 12px;height:44px;gap:2px}

.slh .dk{position:relative;display:flex;align-items:center;justify-content:center;gap:7px;height:36px;min-width:36px;padding:0 9px;border:0;border-radius:10px;
  background:transparent;cursor:none;font:600 12.5px 'Inter Tight',sans-serif;letter-spacing:-.01em;
  transition:background-color .3s, color .3s, transform .3s var(--ease-out)}
.slh .dk svg{width:18px;height:18px;flex:none;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.slh .dk:hover{background:rgba(0,0,0,.09)}
.slh .dk:active{transform:scale(.92)}
.slh .dk[aria-pressed=true]{background:var(--ink);color:#fff}
.slh .dk[data-mode]{padding:0 13px 0 10px;gap:7px}
.slh .dk[data-mode]::after{content:attr(data-mode);text-transform:capitalize;font:600 12.5px 'Inter Tight',sans-serif;letter-spacing:-.01em}
.slh .dk .tip{position:absolute;bottom:calc(100% + 10px);left:50%;transform:translate(-50%,4px);
  background:var(--ink);color:#fff;font:500 10.5px 'JetBrains Mono',monospace;letter-spacing:.04em;
  padding:6px 9px;border-radius:7px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s, transform .25s var(--ease-out)}
.slh .dk:hover .tip{opacity:1;transform:translate(-50%,0)}
.slh .dk .on-ico{display:none}
.slh .dk[aria-pressed=true] .on-ico{display:block}
.slh .dk[aria-pressed=true] .off-ico{display:none}
.slh #moreBtn[aria-expanded="true"]{background:var(--ink);color:#fff}
.slh #matName,.slh #voiceName{display:inline;font:600 12.5px 'Inter Tight',sans-serif;letter-spacing:-.01em;min-width:0}
.slh .sw{width:20px;height:20px;margin:0 3px;border-radius:50%;border:2px solid rgba(0,0,0,.18);background:var(--c);cursor:none;flex:none;transition:transform .35s var(--ease-out), border-color .3s}
.slh .sw:hover{transform:scale(1.2)}
.slh .sw.on{border-color:var(--ink);transform:scale(1.15)}

/* service-world chip */
.slh .th-chip{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:142px;padding:0 4px}
.slh .th-chip b{font:700 12.5px/1 'Inter Tight',sans-serif;letter-spacing:-.01em;white-space:nowrap}
.slh .th-ticks{display:flex;gap:4px}
.slh .th-ticks i{width:7px;height:3px;border-radius:3px;background:rgba(11,11,11,.25);transition:width .4s var(--ease-out),background .3s}
.slh .th-ticks i.on{width:16px;background:var(--ink)}

/* ---------- HUD + toast ---------- */
.slh .hud{position:absolute;z-index:3;right:var(--pad-x);top:calc(var(--pad-y) + 64px);font:500 10.5px/1.9 'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.1em;text-align:right;pointer-events:none;opacity:0;transition:opacity 1s 1.6s}
.slh .toast{position:absolute;z-index:6;left:50%;bottom:clamp(120px,20vh,190px);transform:translate(-50%,10px);opacity:0;pointer-events:none;
  background:var(--ink);color:#fff;border-radius:99px;padding:9px 16px;font:500 11.5px 'JetBrains Mono',monospace;letter-spacing:.04em;white-space:nowrap;
  transition:opacity .3s, transform .4s var(--ease-out)}
.slh .toast.show{opacity:1;transform:translate(-50%,0)}

/* ---------- custom cursor ---------- */
.slh .c-dot,.slh .c-ring{position:absolute;left:0;top:0;z-index:60;pointer-events:none;border-radius:50%}
.slh .c-dot{width:6px;height:6px;margin:-3px 0 0 -3px;background:var(--ink);transition:opacity .2s}
.slh .c-ring{width:42px;height:42px;margin:-21px 0 0 -21px;border:1.5px solid var(--ink);display:grid;place-items:center;
  transition:width .4s var(--ease-out),height .4s var(--ease-out),margin .4s var(--ease-out),background-color .3s,opacity .3s,border-color .3s}
.slh .c-ring b{font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:#fff;opacity:0;transition:opacity .2s}
.slh[data-cur=grab] .c-ring{width:86px;height:86px;margin:-43px 0 0 -43px;background:var(--ink)}
.slh[data-cur=pull] .c-ring{width:64px;height:64px;margin:-32px 0 0 -32px;background:var(--ink)}
.slh[data-cur=letter] .c-ring{width:66px;height:66px;margin:-33px 0 0 -33px;background:var(--ink)}
.slh[data-cur=cut] .c-ring,.slh[data-cur=draw] .c-ring{width:58px;height:58px;margin:-29px 0 0 -29px;background:var(--ink)}
.slh[data-cur=grab] .c-ring b,.slh[data-cur=pull] .c-ring b,.slh[data-cur=letter] .c-ring b,.slh[data-cur=cut] .c-ring b,.slh[data-cur=draw] .c-ring b{opacity:1}
.slh[data-cur=grab] .c-dot,.slh[data-cur=pull] .c-dot,.slh[data-cur=letter] .c-dot{opacity:0}
.slh[data-cur=link] .c-ring{width:70px;height:70px;margin:-35px 0 0 -35px;opacity:.45}
.slh:not(.loaded) .c-ring{border-color:var(--bg)}
.slh:not(.loaded) .c-dot{background:var(--bg)}
.slh.out .c-dot,.slh.out .c-ring{opacity:0}
@media (hover:none){.slh .c-dot,.slh .c-ring{display:none}}

.slh .ripple{position:absolute;z-index:4;pointer-events:none;width:20px;height:20px;margin:-10px 0 0 -10px;border-radius:50%;border:1.5px solid var(--ink);animation:slh-rip .9s var(--ease-out) forwards}
@keyframes slh-rip{from{transform:scale(.4);opacity:.9}to{transform:scale(7);opacity:0}}

/* ---------- fallback ---------- */
.slh .fallback{display:none;position:absolute;left:0;right:0;top:50%;transform:translateY(-35%);z-index:1;text-align:center;font-weight:900;font-size:24vw;letter-spacing:-.07em;line-height:1}
.slh.no-gl .fallback{display:block}
.slh.no-gl .dock,.slh.no-gl .hint,.slh.no-gl .hud,.slh.no-gl .mid{display:none}

/* ---------- top navigation ---------- */
.slh .tn{position:absolute;z-index:8;top:var(--pad-y);left:var(--pad-x);right:var(--pad-x);height:60px;padding:0 8px 0 20px;display:flex;align-items:center;justify-content:space-between;
  border-radius:999px;background:rgba(255,229,210,.88);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 20px 40px -28px rgba(110,36,0,.55);
  opacity:0;transform:translateY(-14px);transition:opacity .9s var(--ease-out) .1s,transform .9s var(--ease-out) .1s}
.slh.ready .tn{opacity:1;transform:none}
.slh .tn a{cursor:pointer}
.slh .tn-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink);font:800 22px/1 'Inter Tight',sans-serif;letter-spacing:-.05em}
.slh .tn-logo svg{display:block}
.slh .tn-links{list-style:none;display:flex;align-items:center;gap:4px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.slh .tn-links>li{position:relative}
.slh .tn-links>li>a{display:flex;align-items:center;gap:6px;padding:10px 18px;border-radius:999px;text-decoration:none;color:#2a1a10;font:500 16px/1 'Inter Tight',sans-serif;transition:background .25s,color .25s}
.slh .tn-links>li>a:hover,.slh .has-dd:focus-within>a{background:rgba(255,106,19,.14);color:#C24E00}
.slh .tn-links a.cur{background:rgba(255,106,19,.18);color:#E55A05}
.slh .cv{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;opacity:.7;transition:transform .3s var(--ease-out)}
.slh .has-dd:hover .cv,.slh .has-dd:focus-within .cv{transform:rotate(180deg)}
.slh .tn-dd{position:absolute;left:50%;top:100%;padding-top:14px;transform:translateX(-50%) translateY(-6px);opacity:0;visibility:hidden;transition:opacity .25s,transform .35s var(--ease-out),visibility 0s .25s}
.slh .has-dd:hover .tn-dd,.slh .has-dd:focus-within .tn-dd{opacity:1;visibility:visible;transform:translateX(-50%);transition-delay:0s}
.slh .tn-dd-in{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;width:min(800px,calc(100vw - 40px));padding:18px;border:1px solid rgba(11,11,11,.08);border-radius:18px;background:#fff;box-shadow:0 20px 50px rgba(0,0,0,.12)}
.slh .tn-dd-in a.tn-dd-card{display:flex;align-items:flex-start;gap:12px;min-width:0;padding:11px;border:1px solid transparent;border-radius:12px;text-decoration:none;color:var(--ink);white-space:normal;transition:background .2s,border-color .2s}
.slh .tn-dd-in a.tn-dd-card:hover{background:#fff8f3;border-color:#ffeadf}
.slh .tn-dd-icon{display:grid;place-items:center;flex:none;width:38px;height:38px;border-radius:11px;color:#fff;box-shadow:0 3px 8px rgba(11,11,11,.12);transition:transform .3s var(--ease-out)}
.slh .tn-dd-card:hover .tn-dd-icon{transform:scale(1.06)}
.slh .tn-dd-copy{display:flex;min-width:0;flex-direction:column;gap:5px;text-align:left}
.slh .tn-dd-title{display:flex;align-items:flex-start;gap:5px;color:#282821;font:700 13px/1.3 'Inter Tight',sans-serif;letter-spacing:-.02em;transition:color .2s}
.slh .tn-dd-card:hover .tn-dd-title{color:#e65e18}
.slh .tn-dd-title b{flex:none;color:#e65e18;font:600 9px/1.6 'JetBrains Mono',monospace;letter-spacing:.04em}
.slh .tn-dd-desc{color:#77766e;font:400 11px/1.4 'Inter Tight',sans-serif;letter-spacing:0}
.slh .tn-cta{display:flex;align-items:center;gap:12px;height:44px;padding:0 5px 0 20px;border-radius:999px;background:#FF6A13;color:#fff;text-decoration:none;font:600 14.5px/1 'Inter Tight',sans-serif;transition:background .3s,transform .3s var(--ease-out)}
.slh .tn-cta:hover{background:#0B0B0B;transform:translateY(-1px)}
.slh .tn-cta i{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#fff;color:#FF6A13;transition:transform .35s var(--ease-out),color .3s}
.slh .tn-cta:hover i{transform:translateX(2px);color:#0B0B0B}
.slh .tn-cta svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.slh .tn-cta .short{display:none}

/* ---------- service worlds: photo + animated scene behind the name ---------- */
.slh .slh-background{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.slh .phs{position:absolute;inset:0;overflow:hidden}
.slh .ph{position:absolute;inset:-2%;background-color:var(--bg);background-size:cover;background-position:center 55%;background-blend-mode:luminosity;opacity:0;transform:scale(1.07);
  transition:opacity .7s ease,transform 3.2s cubic-bezier(.2,.6,.2,1);
  -webkit-mask-image:radial-gradient(ellipse 85% 75% at 50% 56%,#000 35%,transparent 100%);mask-image:radial-gradient(ellipse 85% 75% at 50% 56%,#000 35%,transparent 100%)}
.slh .ph.on{opacity:.5;transform:scale(1)}
.slh #bgsvg{position:absolute;right:3vw;top:12vh;width:min(30vw,47vh,480px);height:auto;aspect-ratio:12/5;overflow:visible}
@media (max-width:760px),(max-aspect-ratio:9/10){.slh #bgsvg{right:auto;left:50%;top:auto;bottom:calc(var(--pad-y) + 128px);width:min(70vw,360px);transform:translateX(-50%)}}
.slh #bgsvg .t1{fill:rgba(var(--tone),calc(.14*var(--ta)))}
.slh #bgsvg .t2{fill:rgba(var(--tone),calc(.24*var(--ta)))}
.slh #bgsvg .t3{fill:rgba(var(--tone),calc(.4*var(--ta)))}
.slh #bgsvg .t4{fill:rgba(var(--tone),calc(.85*var(--ta)))}
.slh #bgsvg .k,.slh #bgsvg .k2{fill:none;stroke-linecap:round;stroke-linejoin:round}
.slh #bgsvg .k{stroke:rgba(var(--tone),calc(.5*var(--ta)));stroke-width:2.5}
.slh #bgsvg .k2{stroke:rgba(var(--tone),calc(.9*var(--ta)));stroke-width:4}
.slh #bgsvg .tx{font:500 10.5px 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.06em;fill:rgba(var(--tone),calc(.95*var(--ta)))}
.slh #bgsvg .txd{fill:rgba(60,20,0,.75)}
.slh #bgsvg .aa{font:800 74px 'Inter Tight',sans-serif;letter-spacing:-.04em;fill:rgba(var(--tone),calc(.9*var(--ta)))}
.slh #bgsvg .a{opacity:0;transform-box:fill-box;transform-origin:center;transition:opacity .25s ease,transform .25s ease}
.slh #bgsvg .pop{transform:scale(.6)}
.slh #bgsvg .up{transform:translateY(14px)}
.slh #bgsvg .dn{transform:translateY(-18px)}
.slh #bgsvg .lf{transform:translateX(-22px)}
.slh #bgsvg .rt{transform:translateX(22px)}
.slh #bgsvg .gx{transform:scaleX(0);transform-origin:left center}
.slh #bgsvg .gy{transform:scaleY(0);transform-origin:center bottom}
.slh #bgsvg .scene.on .a{opacity:1;transform:none;transition:opacity .45s ease var(--d,0s),transform .65s cubic-bezier(.2,.8,.2,1) var(--d,0s)}
.slh #bgsvg .dw{stroke-dasharray:1;stroke-dashoffset:1;opacity:0;transition:opacity .2s}
.slh #bgsvg .scene.on .dw{stroke-dashoffset:0;opacity:1;transition:stroke-dashoffset .55s ease var(--d,0s),opacity .01s linear var(--d,0s)}
.slh #bgsvg .rip{opacity:0;transform-box:fill-box;transform-origin:center}
.slh #bgsvg .scene.on .rip{animation:slh-bgrip 1.5s ease-out var(--d,0s) infinite}
@keyframes slh-bgrip{0%{transform:scale(.3);opacity:.8}100%{transform:scale(1.35);opacity:0}}
@media (prefers-reduced-motion:reduce){.slh #bgsvg .a,.slh #bgsvg .dw{transition:none!important}.slh #bgsvg .rip{animation:none!important}}

/* headline caption */
.slh .eyebrow{margin-top:14px;font:500 11px/1 'JetBrains Mono',monospace;letter-spacing:.18em;text-transform:uppercase;color:rgba(11,11,11,.7);transition:opacity .25s}
.slh .lead{margin-top:8px!important;max-width:60ch;transition:opacity .25s,transform .35s var(--ease-out)}
.slh .eyebrow.swp,.slh .lead.swp{opacity:0;transform:translateY(4px)}
.slh .lead-l{pointer-events:auto;margin-left:.5em;color:var(--ink);font-weight:700;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}
.slh .lead-l[hidden]{display:none}

/* ---------- responsive ---------- */
@media (max-width:1180px){.slh .grp{gap:0}.slh .dock{gap:8px}}
@media (max-width:820px){
  .slh .ui{padding-top:calc(var(--pad-y) + 52px + 12px)}
  .slh footer{flex-wrap:wrap;row-gap:14px;padding-bottom:62px}
  .slh .hud,.slh .hint{display:none}
  .slh .mid{right:var(--pad-x);max-width:none;gap:10px}
  .slh .dock{flex-wrap:wrap;overflow:visible;width:100%;gap:8px;justify-content:flex-start}
  .slh .grp{flex:none}
  .slh .row{padding:3px}
  .slh .row-sw{height:42px}
  .slh .dk,.slh .dk[data-mode]{padding:0 9px}
  .slh .dk .tip{display:none}
  .slh .dk[data-mode]::after{display:none}
  .slh #matName,.slh #voiceName{display:none}
  .slh .tn{height:52px;padding:0 6px 0 14px}
  .slh .tn-links{display:none}
  .slh .tn-logo{font-size:19px}
  .slh .tn-logo svg{width:30px;height:30px}
  .slh .tn-cta{height:40px;padding:0 4px 0 15px;font-size:13px}
  .slh .tn-cta i{width:30px;height:30px}
  .slh .tn-cta .full{display:none}
  .slh .tn-cta .short{display:inline}
  .slh .th-chip{min-width:122px}
}
@media (max-width:560px){
  .slh .pill.big{padding:13px 18px 13px 22px;font-size:14px}
  .slh #bigger{position:absolute;z-index:6;right:var(--pad-x);bottom:var(--pad-y);height:46px;padding:0 16px 0 18px;font-size:13.5px}
}
`;
