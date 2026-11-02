"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glCanvasRef = useRef<HTMLCanvasElement>(null);
  const inkCanvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const matNameRef = useRef<HTMLSpanElement>(null);
  const soundBtnRef = useRef<HTMLButtonElement>(null);
  const biggerLabelRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const curLabelRef = useRef<HTMLElement>(null);

  // HUD refs
  const hModeRef = useRef<HTMLElement>(null);
  const hMatRef = useRef<HTMLElement>(null);
  const hTenRef = useRef<HTMLElement>(null);
  const hSpinRef = useRef<HTMLElement>(null);
  const hStateRef = useRef<HTMLElement>(null);

  const [currentColor, setCurrentColor] = useState("#ff6a13");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = glCanvasRef.current;
    const ink = inkCanvasRef.current;
    if (!container || !canvas || !ink) return;

    // Split headline words for word-by-word reveal
    const h1 = headlineRef.current;
    if (h1 && !h1.dataset.split) {
      h1.dataset.split = "true";
      const words = h1.textContent?.trim().split(/\\s+/) || [];
      h1.innerHTML = words
        .map(
          (w, i) =>
            `<span class="w"><span style="transition-delay:${0.15 + i * 0.08
            }s">${w}</span></span>`
        )
        .join(" ");
    }

    const TAU = Math.PI * 2;
    const WORD = "slatout";
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v: number, a: number, b: number) =>
      Math.min(b, Math.max(a, v));
    const clamp01 = (v: number) => clamp(v, 0, 1);
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
    const easeInOut = (t: number) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    function spring(
      o: any,
      k: string,
      v: string,
      target: number,
      K: number,
      D: number,
      dt: number
    ) {
      o[v] += ((target - o[k]) * K - o[v] * D) * dt;
      o[k] += o[v] * dt;
    }

    /* ─── Renderer & Scene ─── */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (err) {
      container.classList.add("no-gl", "ready");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

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

    const shadowMat = new THREE.ShadowMaterial({
      color: 0x5a1d00,
      opacity: 0.3,
    });
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      shadowMat
    );
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    /* ─── Procedural Braided Rope Textures ─── */
    function makeRopeTextures() {
      const S = 256,
        h = new Float32Array(S * S),
        strandA = new Float32Array(S * S);
      const fr = (x: number) => x - Math.floor(x);
      for (let y = 0; y < S; y++)
        for (let x = 0; x < S; x++) {
          const u = x / S,
            v = y / S;
          const s = fr(v * 3 - u * 2);
          const strand = Math.pow(Math.sin(Math.PI * s), 0.55);
          const fib = 0.5 + 0.5 * Math.sin(TAU * (v * 30 + u * 16));
          const fib2 = 0.5 + 0.5 * Math.sin(TAU * (v * 11 + u * 7) + 1.3);
          h[y * S + x] = strand * (0.84 + 0.11 * fib + 0.05 * fib2);
          strandA[y * S + x] = strand;
        }
      const nc = document.createElement("canvas"),
        cc = document.createElement("canvas");
      nc.width = nc.height = cc.width = cc.height = S;
      const nctx = nc.getContext("2d")!,
        cctx = cc.getContext("2d")!;
      const nd = nctx.createImageData(S, S),
        cd = cctx.createImageData(S, S);
      const at = (x: number, y: number) =>
        h[((y + S) % S) * S + ((x + S) % S)];
      const str = 5.5;
      for (let y = 0; y < S; y++)
        for (let x = 0; x < S; x++) {
          const dx = (at(x + 1, y) - at(x - 1, y)) * str,
            dy = (at(x, y + 1) - at(x, y - 1)) * str;
          const l = Math.hypot(dx, dy, 1);
          const i = (y * S + x) * 4;
          nd.data[i] = (-dx / l * 0.5 + 0.5) * 255;
          nd.data[i + 1] = (-dy / l * 0.5 + 0.5) * 255;
          nd.data[i + 2] = (1 / l * 0.5 + 0.5) * 255;
          nd.data[i + 3] = 255;
          const st = strandA[y * S + x];
          const c =
            0.5 +
            0.5 *
            Math.pow(st, 0.6) *
            (0.93 + 0.07 * (h[y * S + x] / Math.max(st, 1e-3)));
          cd.data[i] = 248 * c;
          cd.data[i + 1] = 242 * c;
          cd.data[i + 2] = 232 * c;
          cd.data[i + 3] = 255;
        }
      nctx.putImageData(nd, 0, 0);
      cctx.putImageData(cd, 0, 0);
      const normal = new THREE.CanvasTexture(nc),
        color = new THREE.CanvasTexture(cc);
      color.colorSpace = THREE.SRGBColorSpace;
      for (const t of [normal, color]) {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      }
      return { normal, color };
    }
    const ropeTex = makeRopeTextures();

    const MATS: Record<string, THREE.Material> = {
      rope: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        map: ropeTex.color,
        normalMap: ropeTex.normal,
        normalScale: new THREE.Vector2(1.15, 1.15),
        roughness: 0.86,
        metalness: 0,
        sheen: 1,
        sheenRoughness: 0.45,
        sheenColor: new THREE.Color(0xfff2e2),
        envMapIntensity: 0.6,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0,
      }),
      clay: new THREE.MeshPhysicalMaterial({
        color: 0xf4f0ea,
        roughness: 0.4,
        metalness: 0,
        clearcoat: 0.35,
        clearcoatRoughness: 0.35,
        sheen: 0.4,
        sheenRoughness: 0.6,
        sheenColor: new THREE.Color(0xffffff),
        envMapIntensity: 0.85,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0,
      }),
      chrome: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0.09,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.3,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0,
      }),
      neon: new THREE.MeshBasicMaterial({ color: 0xfffaf0, toneMapped: false }),
    };

    const MAT_ORDER = ["rope", "clay", "chrome", "neon"];
    const MAT_LABEL: Record<string, string> = {
      rope: "Rope",
      clay: "Clay",
      chrome: "Chrome",
      neon: "Neon",
    };
    let matName = "rope";

    /* ─── Simulation Buffers ─── */
    const N = 240;
    const S = 3;
    const M = 22;
    const MV = M + 1;
    const R = (N - 1) * S + 1;
    const P = new Float32Array(N * 3),
      PP = new Float32Array(N * 3),
      REST = new Float32Array(N * 3);
    const DRAW = new Float32Array(N * 3);
    const REST_LEN = new Float32Array(N - 1);
    const SMOOTH = new Float32Array(R * 3);
    const RAD = new Float32Array(R);
    const SX = new Float32Array(N),
      SY = new Float32Array(N);

    const ropeGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(R * MV * 3),
      nor = new Float32Array(R * MV * 3),
      uvs = new Float32Array(R * MV * 2);
    ropeGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage)
    );
    ropeGeo.setAttribute(
      "normal",
      new THREE.BufferAttribute(nor, 3).setUsage(THREE.DynamicDrawUsage)
    );
    ropeGeo.setAttribute(
      "uv",
      new THREE.BufferAttribute(uvs, 2).setUsage(THREE.DynamicDrawUsage)
    );
    const idx = new Uint32Array((R - 1) * M * 6);
    for (let k = 0, o = 0; k < R - 1; k++)
      for (let m = 0; m < M; m++) {
        const a = k * MV + m,
          b = a + 1,
          c = (k + 1) * MV + m,
          d = c + 1;
        idx[o++] = a;
        idx[o++] = b;
        idx[o++] = c;
        idx[o++] = b;
        idx[o++] = d;
        idx[o++] = c;
      }
    ropeGeo.setIndex(new THREE.BufferAttribute(idx, 1));
    ropeGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e4);

    const rope = new THREE.Mesh(ropeGeo, MATS.rope);
    rope.castShadow = true;
    rope.receiveShadow = true;
    rope.frustumCulled = false;
    scene.add(rope);

    const glowMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0xfff1cf) },
        uExpand: { value: 0.3 },
      },
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
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(ropeGeo, glowMat);
    glow.frustumCulled = false;
    glow.visible = false;
    glow.renderOrder = 2;
    scene.add(glow);

    /* ─── State ─── */
    const NORMAL = { turns: 4.6, amp: 1.0, radiusK: 0.105 };
    const BIGGER = { turns: 3.4, amp: 1.32, radiusK: 0.16 };
    const st = { ...NORMAL };
    let target = NORMAL,
      bigger = false;
    let info: any = null,
      vw = 1,
      vh = 1;
    let time = 0,
      phase = 0,
      spinVel = 0;
    const baseSpin = reduceMotion ? 0.08 : 0.32;
    let mode = "play";
    const drag = { on: false, i: -1, z: 0, t: new THREE.Vector3() };
    const cut = { i: -1, t: 0, phase: "", heal: 0 };
    const draw = { blend: 0, target: 0, holdUntil: 0 };
    const stroke: { pts: any[]; recording: boolean; fade: number } = {
      pts: [],
      recording: false,
      fade: 0,
    };
    const slash: any[] = [];
    let T: any,
      letters: any[] = [];
    let clipBase = 0;
    const clip = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    /* ─── Rest Shape ─── */
    function computeRest() {
      if (!info) return;
      const { W, xhW, cy } = info;
      const a = st.amp,
        X0 = -W * 0.7,
        X1 = W * 0.7;
      for (let i = 0; i < N; i++) {
        const t = i / (N - 1);
        const th = TAU * st.turns * t + phase;
        const ry =
          xhW * (0.8 + 0.15 * Math.sin(t * TAU * 1.7 - time * 0.6)) * a;
        const rz = xhW * 0.8 * a;
        const j = i * 3;
        REST[j] = X0 + (X1 - X0) * t - xhW * 0.45 * a * Math.sin(th);
        REST[j + 1] =
          cy +
          ry * Math.cos(th) +
          xhW * 0.2 * Math.sin(t * TAU * 1.2 + time * 0.4);
        REST[j + 2] = rz * Math.sin(th);
      }
      if (draw.blend > 0) {
        const b = draw.blend;
        for (let j = 0; j < N * 3; j++) REST[j] += (DRAW[j] - REST[j]) * b;
      }
      for (let i = 0; i < N - 1; i++) {
        const a3 = i * 3,
          b3 = a3 + 3;
        const dx = REST[b3] - REST[a3],
          dy = REST[b3 + 1] - REST[a3 + 1],
          dz = REST[b3 + 2] - REST[a3 + 2];
        REST_LEN[i] = Math.sqrt(dx * dx + dy * dy + dz * dz);
      }
    }

    /* ─── Physics: Verlet + Distance Constraints ─── */
    const STEP = 1 / 60;
    function step() {
      let k = drag.on ? 0.012 : 0.05,
        damp = 0.935,
        grav = 0;
      if (cut.i >= 0 && info) {
        if (cut.phase === "fall") {
          k = 0.0024;
          damp = 0.972;
          grav = info.xhW * 0.0035;
        } else {
          const h = easeInOut(cut.heal);
          k = 0.05 * h;
          damp = 0.95;
          grav = info.xhW * 0.0035 * (1 - h);
        }
      }
      for (let i = 1; i < N - 1; i++) {
        const j = i * 3;
        for (let c = 0; c < 3; c++) {
          const p = P[j + c],
            v = (p - PP[j + c]) * damp;
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
          const a = i * 3,
            b = a + 3;
          const dx = P[b] - P[a],
            dy = P[b + 1] - P[a + 1],
            dz = P[b + 2] - P[a + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < 1e-6) continue;
          const wa = i === 0 || (drag.on && i === drag.i) ? 0 : 1;
          const wb =
            i + 1 === N - 1 || (drag.on && i + 1 === drag.i) ? 0 : 1;
          const ws = wa + wb;
          if (!ws) continue;
          const diff = ((d - REST_LEN[i]) / d) * 0.85;
          const fa = (wa / ws) * diff,
            fb = (wb / ws) * diff;
          P[a] += dx * fa;
          P[a + 1] += dy * fa;
          P[a + 2] += dz * fa;
          P[b] -= dx * fb;
          P[b + 1] -= dy * fb;
          P[b + 2] -= dz * fb;
        }
      }
      for (let c = 0; c < 3; c++) {
        P[c] = REST[c];
        PP[c] = REST[c];
        const l = (N - 1) * 3 + c;
        P[l] = REST[l];
        PP[l] = REST[l];
      }
    }

    /* ─── Tube Mesh ─── */
    function updateTube(radius: number) {
      const ci = cut.i;
      let o = 0;
      for (let i = 0; i < N - 1; i++) {
        const a1 = i * 3,
          a2 = (i + 1) * 3;
        const a0 = Math.max(i - 1, 0) * 3,
          a3 = Math.min(i + 2, N - 1) * 3;
        for (let s = 0; s < S; s++) {
          if (i === ci) {
            const src = s <= 1 ? a1 : a2;
            SMOOTH[o++] = P[src];
            SMOOTH[o++] = P[src + 1];
            SMOOTH[o++] = P[src + 2];
            continue;
          }
          const u = s / S,
            u2 = u * u,
            u3 = u2 * u;
          for (let c = 0; c < 3; c++) {
            const p1 = P[a1 + c],
              p2 = P[a2 + c];
            const p0 = ci >= 0 && i === ci + 1 ? 2 * p1 - p2 : P[a0 + c];
            const p3 = ci >= 0 && i === ci - 1 ? 2 * p2 - p1 : P[a3 + c];
            SMOOTH[o++] =
              0.5 *
              (2 * p1 +
                (-p0 + p2) * u +
                (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 +
                (-p0 + 3 * p1 - 3 * p2 + p3) * u3);
          }
        }
      }
      const l = (N - 1) * 3;
      SMOOTH[o++] = P[l];
      SMOOTH[o++] = P[l + 1];
      SMOOTH[o++] = P[l + 2];

      const kL = ci >= 0 ? ci * S + 1 : -10,
        kR = ci >= 0 ? ci * S + 2 : -10;
      RAD.fill(1);
      RAD[0] = 0;
      RAD[R - 1] = 0;
      if (ci >= 0) {
        RAD[kL] = 0;
        RAD[kR] = 0;
        RAD[kL - 1] = 0.94;
        RAD[kR + 1] = 0.94;
      }

      let nx = 0,
        ny = 0,
        nz = 1,
        ptx = 1,
        pty = 0,
        ptz = 0,
        arc = 0;
      const uScale = 1.0 / (TAU * Math.max(radius, 1e-4));
      for (let k = 0; k < R; k++) {
        const lo = ci >= 0 && k >= kR ? kR : 0;
        const hi = ci >= 0 && k <= kL ? kL : R - 1;
        let a = Math.max(k - 1, lo),
          b = Math.min(k + 1, hi);
        let tx = SMOOTH[b * 3] - SMOOTH[a * 3],
          ty = SMOOTH[b * 3 + 1] - SMOOTH[a * 3 + 1],
          tz = SMOOTH[b * 3 + 2] - SMOOTH[a * 3 + 2];
        let tl = Math.hypot(tx, ty, tz);
        if (tl < 1e-6) {
          a = Math.max(k - 2, lo);
          b = Math.min(k + 2, hi);
          tx = SMOOTH[b * 3] - SMOOTH[a * 3];
          ty = SMOOTH[b * 3 + 1] - SMOOTH[a * 3 + 1];
          tz = SMOOTH[b * 3 + 2] - SMOOTH[a * 3 + 2];
          tl = Math.hypot(tx, ty, tz);
        }
        if (tl < 1e-6) {
          tx = ptx;
          ty = pty;
          tz = ptz;
        } else {
          tx /= tl;
          ty /= tl;
          tz /= tl;
        }
        ptx = tx;
        pty = ty;
        ptz = tz;

        if (k === 0) {
          nx = 0;
          ny = 0;
          nz = 1;
        }
        const dp = nx * tx + ny * ty + nz * tz;
        nx -= tx * dp;
        ny -= ty * dp;
        nz -= tz * dp;
        let nl = Math.hypot(nx, ny, nz);
        if (nl < 1e-5) {
          nx = -ty;
          ny = tx;
          nz = 0;
          nl = Math.hypot(nx, ny, nz) || 1;
        }
        nx /= nl;
        ny /= nl;
        nz /= nl;
        const bx = ty * nz - tz * ny,
          by = tz * nx - tx * nz,
          bz = tx * ny - ty * nx;

        const cx = SMOOTH[k * 3],
          cy = SMOOTH[k * 3 + 1],
          cz = SMOOTH[k * 3 + 2];
        if (k > 0 && k !== kR)
          arc += Math.hypot(
            cx - SMOOTH[k * 3 - 3],
            cy - SMOOTH[k * 3 - 2],
            cz - SMOOTH[k * 3 - 1]
          );
        const rk = RAD[k] * radius;
        const cap = RAD[k] === 0 ? (k === 0 || k === kR ? -1 : 1) : 0;
        const uu = arc * uScale;
        for (let m = 0; m < MV; m++) {
          const ang = (m / M) * TAU,
            cs = Math.cos(ang),
            sn = Math.sin(ang);
          const ox = cs * nx + sn * bx,
            oy = cs * ny + sn * by,
            oz = cs * nz + sn * bz;
          const v = (k * MV + m) * 3,
            w = (k * MV + m) * 2;
          if (cap) {
            nor[v] = tx * cap;
            nor[v + 1] = ty * cap;
            nor[v + 2] = tz * cap;
          } else {
            nor[v] = ox;
            nor[v + 1] = oy;
            nor[v + 2] = oz;
          }
          pos[v] = cx + ox * rk;
          pos[v + 1] = cy + oy * rk;
          pos[v + 2] = cz + oz * rk;
          uvs[w] = uu;
          uvs[w + 1] = m / M;
        }
      }
      ropeGeo.attributes.position.needsUpdate = true;
      ropeGeo.attributes.normal.needsUpdate = true;
      ropeGeo.attributes.uv.needsUpdate = true;
      glowMat.uniforms.uExpand.value = radius * 1.5;
    }

    /* ─── Wordmark Text ─── */
    function makeText() {
      const fs = 520;
      const font = `900 ${fs}px "Inter Tight", "Helvetica Neue", Helvetica, Arial, sans-serif`;
      const m = document.createElement("canvas").getContext("2d")!;
      m.font = font;
      const track = -0.062 * fs,
        chars = WORD.split("");
      const ws = chars.map((ch) => m.measureText(ch).width);
      const total = ws.reduce((a, b) => a + b, 0) + track * (chars.length - 1);
      const asc = m.measureText("lt").actualBoundingBoxAscent;
      const xh = m.measureText("xsaou").actualBoundingBoxAscent;
      const pad = Math.round(fs * 0.08);
      const Hc = Math.ceil(asc + pad * 2),
        base = pad + asc;
      let x = pad;
      const ls = chars.map((ch, i) => {
        const c = document.createElement("canvas");
        c.width = Math.ceil(ws[i] + pad * 2);
        c.height = Hc;
        const g = c.getContext("2d")!;
        g.font = font;
        g.fillStyle = "#fff";
        g.textBaseline = "alphabetic";
        g.fillText(ch, pad, base);
        const l = { canvas: c, left: x - pad, adv: ws[i] };
        x += ws[i] + track;
        return l;
      });
      return { letters: ls, wordW: total + pad * 2, H: Hc, base, xh, asc, pad };
    }

    function buildLetters() {
      const geo = new THREE.PlaneGeometry(1, 1);
      letters = T.letters.map((l: any) => {
        const tex = new THREE.CanvasTexture(l.canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const mat = new THREE.MeshBasicMaterial({
          map: tex,
          color: 0x0b0b0b,
          alphaTest: 0.5,
          alphaToCoverage: true,
          toneMapped: false,
          clippingPlanes: [clip],
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
        return {
          ...l,
          mesh,
          q: {
            z: 0,
            vz: 0,
            rx: 0,
            vrx: 0,
            ry: 0,
            vry: 0,
            rz: 0,
            vrz: 0,
            sc: 1,
            vsc: 0,
            flip: 0,
            vflip: 0,
            flipT: 0,
          },
        };
      });
    }

    function letterAt(x: number, y: number) {
      if (!info || y < info.baseW || y > info.baseW + info.ascW) return -1;
      for (let i = 0; i < letters.length; i++)
        if (Math.abs(x - letters[i].hitX) < letters[i].halfAdv) return i;
      return -1;
    }
    function letterImpulse(x: number, strength: number) {
      if (!info) return;
      for (const l of letters) {
        const d = Math.abs(x - l.hitX) / (info.xhW * 2.6);
        if (d >= 1) continue;
        const f = (1 - d) * strength,
          q = l.q;
        q.vsc += 1.6 * f;
        q.vrz += (Math.random() - 0.5) * 5 * f;
        q.vz += info.xhW * 3 * f;
      }
    }
    function flipLetter(i: number) {
      if (!letters[i]) return;
      const q = letters[i].q;
      q.flipT += TAU;
      q.vsc += 1.4;
      if (info)
        playNote(
          noteFor(letters[i].hitX) + 5,
          0.8,
          letters[i].hitX / (info.W * 0.5)
        );
    }

    /* ─── Sound: Karplus-Strong Web Audio API ─── */
    const audio: any = { ctx: null, on: false, master: null, cache: new Map() };
    const SCALE = [0, 3, 5, 7, 10];
    function ensureAudio() {
      if (!audio.ctx) {
        const AC =
          window.AudioContext || (window as any).webkitAudioContext;
        if (!AC) return false;
        audio.ctx = new AC();
        const comp = audio.ctx.createDynamicsCompressor();
        audio.master = audio.ctx.createGain();
        audio.master.gain.value = 0.6;
        audio.master.connect(comp).connect(audio.ctx.destination);
      }
      if (audio.ctx.state === "suspended") audio.ctx.resume();
      return true;
    }
    function noteFreq(n: number) {
      const oct = Math.floor(n / 5),
        deg = ((n % 5) + 5) % 5;
      return 146.83 * Math.pow(2, (12 * oct + SCALE[deg]) / 12);
    }
    function noteFor(x: number) {
      if (!info) return 5;
      return Math.round(
        ((clamp(x / (info.W * 0.5), -1, 1) + 1) / 2) * 11
      );
    }
    function ksBuffer(freq: number) {
      const key = Math.round(freq * 10);
      if (audio.cache.has(key)) return audio.cache.get(key);
      const sr = audio.ctx.sampleRate,
        len = Math.floor(sr * 1.8);
      const buf = audio.ctx.createBuffer(1, len, sr),
        data = buf.getChannelData(0);
      const period = Math.max(2, Math.round(sr / freq));
      const line = new Float32Array(period);
      let prev = 0;
      for (let i = 0; i < period; i++) {
        const r = Math.random() * 2 - 1;
        prev = prev * 0.45 + r * 0.55;
        line[i] = prev;
      }
      let p = 0;
      for (let i = 0; i < len; i++) {
        const cur = line[p],
          nxt = line[(p + 1) % period];
        data[i] = cur;
        line[p] = (cur + nxt) * 0.5 * 0.9965;
        p = (p + 1) % period;
      }
      audio.cache.set(key, buf);
      return buf;
    }
    function playNote(n: number, vel = 1, pan = 0) {
      if (!audio.on || !audio.ctx) return;
      const ctx = audio.ctx,
        src = ctx.createBufferSource();
      src.buffer = ksBuffer(noteFreq(n));
      const g = ctx.createGain();
      g.gain.value = 0.32 * clamp(vel, 0.1, 1.4);
      let node = src.connect(g);
      if (ctx.createStereoPanner) {
        const p = ctx.createStereoPanner();
        p.pan.value = clamp(pan, -1, 1) * 0.7;
        node = node.connect(p);
      }
      node.connect(audio.master);
      src.start();
    }
    function snapSound() {
      if (!audio.on || !audio.ctx) return;
      const ctx = audio.ctx,
        t = ctx.currentTime;
      const len = Math.floor(ctx.sampleRate * 0.22),
        b = ctx.createBuffer(1, len, ctx.sampleRate),
        d = b.getChannelData(0);
      for (let i = 0; i < len; i++)
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 6);
      const n = ctx.createBufferSource();
      n.buffer = b;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1400;
      const g = ctx.createGain();
      g.gain.value = 0.55;
      n.connect(hp).connect(g).connect(audio.master);
      n.start(t);
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(150, t);
      o.frequency.exponentialRampToValueAtTime(40, t + 0.25);
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.6, t);
      og.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      o.connect(og).connect(audio.master);
      o.start(t);
      o.stop(t + 0.32);
    }
    function tieSound() {
      playNote(5, 0.7);
      setTimeout(() => playNote(8, 0.6), 90);
    }

    /* ─── Pointer & Interactions ─── */
    const ptr = {
      x: -999,
      y: -999,
      px: -999,
      py: -999,
      nx: 0,
      ny: 0,
      inside: false,
      down: false,
      type: "mouse",
    };
    const ray = new THREE.Raycaster();
    const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const ndc = new THREE.Vector2();
    const mW = new THREE.Vector3(),
      mWPrev = new THREE.Vector3();
    let havePrev = false,
      uiHover = false,
      hoverRope = false,
      hoverLetter = -1;
    const lastNote = new Float32Array(N);

    function worldAtNDC(nx: number, ny: number, z: number, out: THREE.Vector3) {
      zPlane.constant = -z;
      ndc.set(nx, ny);
      ray.setFromCamera(ndc, camera);
      return ray.ray.intersectPlane(zPlane, out);
    }
    const worldAt = (z: number, out: THREE.Vector3) =>
      worldAtNDC(ptr.nx, ptr.ny, z, out);

    function setPtr(e: MouseEvent | PointerEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      ptr.x = cx;
      ptr.y = cy;
      ptr.type = (e as PointerEvent).pointerType || "mouse";
      ptr.nx = (cx / vw) * 2 - 1;
      ptr.ny = -(cy / vh) * 2 + 1;
    }

    const pv = new THREE.Vector3();
    function projectAll() {
      for (let i = 0; i < N; i++) {
        pv.set(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]).project(camera);
        SX[i] = (pv.x + 1) * 0.5 * vw;
        SY[i] = (1 - pv.y) * 0.5 * vh;
      }
    }
    function nearestRope() {
      let best = -1,
        bd = 1e9;
      for (let i = 2; i < N - 2; i++) {
        const d = Math.hypot(SX[i] - ptr.x, SY[i] - ptr.y);
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      return { i: best, d: bd };
    }
    const grabThresh = () =>
      info ? Math.max(30, st.radiusK * info.xhW * (vh / info.H) + 18) : 30;

    function segCross(
      ax: number,
      ay: number,
      bx: number,
      by: number,
      cx: number,
      cy: number,
      dx: number,
      dy: number
    ) {
      const d1x = bx - ax,
        d1y = by - ay,
        d2x = dx - cx,
        d2y = dy - cy;
      const den = d1x * d2y - d1y * d2x;
      if (Math.abs(den) < 1e-9) return false;
      const t = ((cx - ax) * d2y - (cy - ay) * d2x) / den;
      const u = ((cx - ax) * d1y - (cy - ay) * d1x) / den;
      return t >= 0 && t <= 1 && u >= 0 && u <= 1;
    }
    function crossings(maxHits: number) {
      const hits = [];
      for (let i = 1; i < N - 2 && hits.length < maxHits; i++) {
        if (i === cut.i) continue;
        if (
          segCross(
            ptr.px,
            ptr.py,
            ptr.x,
            ptr.y,
            SX[i],
            SY[i],
            SX[i + 1],
            SY[i + 1]
          )
        )
          hits.push(i);
      }
      return hits;
    }
    function localTension(i: number) {
      let mx = 0;
      for (let s = Math.max(0, i - 4); s < Math.min(N - 1, i + 4); s++) {
        const a = s * 3,
          b = a + 3;
        const d = Math.hypot(P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]);
        mx = Math.max(mx, d / Math.max(REST_LEN[s], 1e-6) - 1);
      }
      return mx;
    }

    function pluck(strength = 1) {
      if (!info) return;
      const Rr = info.xhW * 2.4;
      for (let i = 1; i < N - 1; i++) {
        const j = i * 3;
        const dx = P[j] - mW.x,
          dy = P[j + 1] - mW.y;
        const d = Math.hypot(dx, dy);
        if (d < Rr && d > 1e-4) {
          const f = (1 - d / Rr) ** 2 * info.xhW * 0.55 * strength;
          PP[j] -= (dx / d) * f;
          PP[j + 1] -= (dy / d) * f;
          PP[j + 2] -= (Math.random() - 0.3) * f * 0.8;
        }
      }
      letterImpulse(mW.x, 0.6 * strength);
      playNote(noteFor(mW.x), 0.9, mW.x / (info.W * 0.5));
    }
    function shakeAll(amount: number) {
      for (let i = 1; i < N - 1; i++) {
        const j = i * 3,
          w = Math.sin((i / N) * Math.PI);
        PP[j + 1] -= (Math.random() - 0.5) * amount * w;
        PP[j + 2] -= (Math.random() - 0.5) * amount * w;
      }
    }
    function ripple(x: number, y: number) {
      if (!container) return;
      const r = document.createElement("div");
      r.className = "ripple";
      r.style.left = x + "px";
      r.style.top = y + "px";
      container.appendChild(r);
      setTimeout(() => r.remove(), 950);
    }

    function doCut(i: number) {
      if (cut.i >= 0 || i < 3 || i > N - 5 || !info) return;
      cut.i = i;
      cut.t = 0;
      cut.phase = "fall";
      cut.heal = 0;
      const a = i * 3;
      const span = 34;
      for (let m = 0; m < span; m++) {
        const f = Math.pow(1 - m / span, 2) * info.xhW * 0.2;
        const L = i - m,
          Rr = i + 1 + m;
        if (L > 0) {
          const t0 = L * 3,
            t1 = Math.max(L - 1, 0) * 3;
          const dx = P[t1] - P[t0],
            dy = P[t1 + 1] - P[t0 + 1],
            dz = P[t1 + 2] - P[t0 + 2],
            dl = Math.hypot(dx, dy, dz) || 1;
          PP[t0] -= (dx / dl) * f;
          PP[t0 + 1] -= (dy / dl) * f - f * 0.3;
          PP[t0 + 2] -= (dz / dl) * f;
        }
        if (Rr < N - 1) {
          const t0 = Rr * 3,
            t1 = Math.min(Rr + 1, N - 1) * 3;
          const dx = P[t1] - P[t0],
            dy = P[t1 + 1] - P[t0 + 1],
            dz = P[t1 + 2] - P[t0 + 2],
            dl = Math.hypot(dx, dy, dz) || 1;
          PP[t0] -= (dx / dl) * f;
          PP[t0 + 1] -= (dy / dl) * f - f * 0.3;
          PP[t0 + 2] -= (dz / dl) * f;
        }
      }
      snapSound();
      letterImpulse(P[a], 1.2);
      toast("Snip. It grows back in a moment.");
    }

    function updateCut(dt: number) {
      if (cut.i < 0) return;
      cut.t += dt;
      if (cut.phase === "fall" && cut.t > 2.6) cut.phase = "heal";
      if (cut.phase === "heal") {
        cut.heal = Math.min(1, cut.heal + dt / 1.6);
        const a = cut.i * 3,
          b = a + 3;
        const d = Math.hypot(P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]);
        if ((cut.heal > 0.55 && d < REST_LEN[cut.i] * 1.8) || cut.t > 8) {
          const x = P[a];
          cut.i = -1;
          cut.phase = "";
          cut.heal = 0;
          tieSound();
          letterImpulse(x, 0.6);
        }
      }
    }

    function commitStroke() {
      if (!info) return false;
      const pts = stroke.pts
        .map((p) => worldAtNDC(p.nx, p.ny, 0, new THREE.Vector3()))
        .filter(Boolean) as THREE.Vector3[];
      if (pts.length < 2) return false;
      const cum = [0];
      for (let i = 1; i < pts.length; i++)
        cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1]));
      const Ltot = cum[cum.length - 1];
      if (Ltot < info.xhW * 1.2) return false;
      let j = 0;
      for (let i = 0; i < N; i++) {
        const tgt = (Ltot * i) / (N - 1);
        while (j < pts.length - 2 && cum[j + 1] < tgt) j++;
        const seg = cum[j + 1] - cum[j] || 1,
          f = clamp01((tgt - cum[j]) / seg);
        DRAW[i * 3] = pts[j].x + (pts[j + 1].x - pts[j].x) * f;
        DRAW[i * 3 + 1] = pts[j].y + (pts[j + 1].y - pts[j].y) * f;
        DRAW[i * 3 + 2] =
          info.xhW * 0.6 * Math.sin((tgt / (info.xhW * 1.1)) * Math.PI);
      }
      draw.target = 1;
      draw.holdUntil = time + 7.5;
      return true;
    }

    const onPointerDown = (e: PointerEvent) => {
      if (!info) return;
      setPtr(e);
      ptr.inside = true;
      ptr.down = true;
      ptr.px = ptr.x;
      ptr.py = ptr.y;
      worldAt(0, mW);
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (_) { }
      if (mode === "play") {
        projectAll();
        const n = nearestRope();
        const thresh = grabThresh() * (ptr.type === "mouse" ? 1 : 1.6);
        if (n.d < thresh) {
          drag.on = true;
          drag.i = n.i;
          drag.z = Math.max(P[n.i * 3 + 2], info.xhW * 0.9);
          worldAt(drag.z, drag.t);
        } else {
          const li = letterAt(mW.x, mW.y);
          if (li >= 0) flipLetter(li);
          else {
            pluck(1);
            ripple(ptr.x, ptr.y);
          }
        }
      } else if (mode === "draw") {
        stroke.pts = [{ x: ptr.x, y: ptr.y, nx: ptr.nx, ny: ptr.ny }];
        stroke.recording = true;
        stroke.fade = 1;
      } else if (mode === "cut") {
        slash.push({ x: ptr.x, y: ptr.y, t: time });
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      setPtr(e);
      ptr.inside = true;
      uiHover = !!(e.target && (e.target as HTMLElement).closest("a,button,.dock"));
      container?.classList.remove("out");
    };

    const release = () => {
      if (drag.on && info) {
        const ten = localTension(drag.i);
        if (ten > 0.05) {
          const x = P[drag.i * 3];
          playNote(
            clamp(Math.round(4 + ten * 18), 0, 14),
            1,
            x / (info.W * 0.5)
          );
          letterImpulse(x, clamp(ten * 4, 0.3, 1.5));
        }
      }
      drag.on = false;
      if (stroke.recording) {
        stroke.recording = false;
        if (commitStroke()) {
          toast("The rope follows your line");
          playNote(7, 0.7);
        } else toast("Draw a longer line");
      }
      ptr.down = false;
      if (ptr.type !== "mouse") {
        ptr.inside = false;
        havePrev = false;
      }
    };

    const onPointerLeave = () => {
      ptr.inside = false;
      havePrev = false;
      container?.classList.add("out");
    };

    const onWheel = (e: WheelEvent) => {
      spinVel = clamp(spinVel + e.deltaY * 0.004, -6, 6);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("wheel", onWheel, { passive: true });

    /* ─── UI & Toast ─── */
    let toastTimer: any = 0;
    function toast(msg: string) {
      const toastEl = toastRef.current;
      if (!toastEl) return;
      toastEl.textContent = msg;
      toastEl.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
    }

    const HINTS: Record<string, string> = {
      play: "Drag rope<i>/</i>Click to pluck<i>/</i>Click letters<i>/</i>Scroll",
      cut: "Slash across the rope to cut it",
      draw: "Draw a path<i>/</i>The rope will follow it",
    };
    function setMode(m: string) {
      if (m === mode) return;
      mode = m;
      drag.on = false;
      stroke.recording = false;
      container
        ?.querySelectorAll(".dk[data-mode]")
        .forEach((b) =>
          b.setAttribute(
            "aria-pressed",
            String((b as HTMLElement).dataset.mode === m)
          )
        );
      if (hintRef.current) hintRef.current.innerHTML = HINTS[m];
      if (hModeRef.current) hModeRef.current.textContent = m;
    }

    function setMaterial(name: string) {
      if (!MATS[name]) return;
      matName = name;
      rope.material = MATS[name];
      glow.visible = name === "neon";
      if (matNameRef.current) matNameRef.current.textContent = MAT_LABEL[name];
      if (hMatRef.current) hMatRef.current.textContent = MAT_LABEL[name];
      if (info) shakeAll(info.xhW * 0.25);
    }
    function cycleMaterial() {
      setMaterial(
        MAT_ORDER[(MAT_ORDER.indexOf(matName) + 1) % MAT_ORDER.length]
      );
      toast("Material: " + MAT_LABEL[matName]);
    }

    function toggleSound() {
      if (!ensureAudio()) {
        toast("Sound isn’t supported here");
        return;
      }
      audio.on = !audio.on;
      soundBtnRef.current?.setAttribute("aria-pressed", String(audio.on));
      toast(
        audio.on
          ? "Sound on. Swipe across the rope to play it."
          : "Sound off"
      );
      if (audio.on) playNote(5, 0.8);
    }

    function setBigger(v: boolean) {
      bigger = v;
      target = bigger ? BIGGER : NORMAL;
      if (biggerLabelRef.current)
        biggerLabelRef.current.textContent = bigger
          ? "Think smaller"
          : "Think bigger";
    }

    function reset() {
      setBigger(false);
      draw.target = 0;
      draw.holdUntil = 0;
      if (cut.i >= 0) {
        cut.phase = "heal";
        cut.heal = Math.max(cut.heal, 0.6);
        cut.t = Math.max(cut.t, 6.5);
      }
      spinVel = 0;
      for (const l of letters) {
        l.q.flipT = Math.round(l.q.flip / TAU) * TAU;
      }
      setMode("play");
      toast("Back to the coil");
    }

    const tmpCol = new THREE.Color();
    function changeColor(c: string) {
      setCurrentColor(c);
      container?.style.setProperty("--bg", c);
      tmpCol.set(c);
      hemi.groundColor.copy(tmpCol);
      shadowMat.color.copy(tmpCol).multiplyScalar(0.28);
      if (info) shakeAll(info.xhW * 0.35);

      // Sync color with document root & Navbar
      const hex = c.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16) || 0;
      const g = parseInt(hex.substring(2, 4), 16) || 0;
      const b = parseInt(hex.substring(4, 6), 16) || 0;
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const textCol = lum > 0.62 ? "#0b0b0b" : "#ffffff";
      const softCol = `rgba(${r}, ${g}, ${b}, ${lum > 0.62 ? 0.28 : 0.14})`;

      document.documentElement.style.setProperty("--theme-accent", c);
      document.documentElement.style.setProperty("--theme-accent-text", textCol);
      document.documentElement.style.setProperty("--theme-accent-soft", softCol);

      window.dispatchEvent(
        new CustomEvent("slatout-theme-change", {
          detail: { color: c, textCol, softCol },
        })
      );
    }

    // Attach dock listeners
    container.querySelectorAll(".dk[data-mode]").forEach((b) =>
      b.addEventListener("click", () =>
        setMode((b as HTMLElement).dataset.mode || "play")
      )
    );
    container.querySelector("#matBtn")?.addEventListener("click", cycleMaterial);
    container.querySelector("#soundBtn")?.addEventListener("click", toggleSound);
    container.querySelector("#resetBtn")?.addEventListener("click", reset);
    container.querySelector("#bigger")?.addEventListener("click", () => {
      setBigger(!bigger);
      if (info) shakeAll(info.xhW * 0.5);
      spinVel += bigger ? 3 : -2;
      playNote(bigger ? 2 : 9, 0.8);
    });

    container.querySelectorAll(".sw").forEach((sw) =>
      sw.addEventListener("click", () => {
        container.querySelectorAll(".sw").forEach((s) => s.classList.remove("on"));
        sw.classList.add("on");
        changeColor((sw as HTMLElement).dataset.c || "#ff6a13");
      })
    );

    // Magnetic buttons
    const magnetics = container.querySelectorAll("[data-magnetic]");
    magnetics.forEach((el) => {
      el.addEventListener("pointermove", (e: any) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2),
          dy = e.clientY - (r.top + r.height / 2);
        (el as HTMLElement).style.transform = `translate(${dx * 0.28}px, ${dy * 0.38
          }px)`;
      });
      el.addEventListener("pointerleave", () => {
        (el as HTMLElement).style.transform = "";
      });
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || !info) return;
      const k = e.key.toLowerCase();
      if (k === "1") setMode("play");
      else if (k === "2") setMode("cut");
      else if (k === "3") setMode("draw");
      else if (k === "m") cycleMaterial();
      else if (k === "s") toggleSound();
      else if (k === "b")
        (container.querySelector("#bigger") as HTMLElement)?.click();
      else if (k === "r") reset();
    };
    window.addEventListener("keydown", onKeyDown);

    /* ─── 2D Ink Overlay ─── */
    const ictx = ink.getContext("2d")!;
    let inkDirty = false;
    function drawInk(dt: number) {
      while (slash.length && time - slash[0].t > 0.28) slash.shift();
      if (!stroke.recording && stroke.pts.length) {
        stroke.fade -= dt * 1.4;
        if (stroke.fade <= 0) stroke.pts = [];
      }
      const has = stroke.pts.length > 1 || slash.length > 1;
      if (!has && !inkDirty) return;
      ictx.clearRect(0, 0, vw, vh);
      inkDirty = has;
      if (stroke.pts.length > 1) {
        ictx.globalAlpha = stroke.recording ? 1 : Math.max(0, stroke.fade);
        ictx.strokeStyle = "#0b0b0b";
        ictx.lineWidth = 3;
        ictx.lineCap = "round";
        ictx.lineJoin = "round";
        ictx.setLineDash([10, 9]);
        ictx.beginPath();
        ictx.moveTo(stroke.pts[0].x, stroke.pts[0].y);
        for (const p of stroke.pts) ictx.lineTo(p.x, p.y);
        ictx.stroke();
        ictx.setLineDash([]);
      }
      if (slash.length > 1) {
        ictx.strokeStyle = "#ffffff";
        ictx.lineCap = "round";
        for (let i = 1; i < slash.length; i++) {
          const a = 1 - (time - slash[i].t) / 0.28;
          ictx.globalAlpha = clamp01(a);
          ictx.lineWidth = 1 + 5 * clamp01(a) * (i / slash.length);
          ictx.beginPath();
          ictx.moveTo(slash[i - 1].x, slash[i - 1].y);
          ictx.lineTo(slash[i].x, slash[i].y);
          ictx.stroke();
        }
      }
      ictx.globalAlpha = 1;
    }

    /* ─── Cursor & HUD ─── */
    const CUR_TEXT: Record<string, string> = {
      grab: "Drag",
      pull: "Pull",
      letter: "Flip",
      cut: "Cut",
      draw: "Draw",
    };
    let curState = "";
    function setCur(s: string) {
      if (s === curState) return;
      curState = s;
      container?.setAttribute("data-cur", s);
      if (curLabelRef.current && CUR_TEXT[s])
        curLabelRef.current.textContent = CUR_TEXT[s];
    }
    const dot = dotRef.current!,
      ring = ringRef.current!;
    let rx = -100,
      ry = -100,
      hudTick = 0;

    function updateLetters(dt: number, el: number) {
      let hl = -1;
      if (
        mode === "play" &&
        ptr.inside &&
        !uiHover &&
        !drag.on &&
        !hoverRope &&
        ptr.type === "mouse"
      )
        hl = letterAt(mW.x, mW.y);
      hoverLetter = hl;
      letters.forEach((l, i) => {
        const q = l.q;
        let tz = 0,
          trx = 0,
          tryy = 0;
        if (i === hl) {
          tz = info.xhW * 0.35;
          tryy = clamp((mW.x - l.hitX) / l.halfAdv, -1, 1) * 0.32;
          trx =
            -clamp(
              (mW.y - (info.baseW + info.ascW / 2)) / (info.ascW / 2),
              -1,
              1
            ) * 0.32;
        } else if (hl >= 0 && Math.abs(i - hl) === 1) tz = info.xhW * 0.1;
        spring(q, "z", "vz", tz, 140, 12, dt);
        spring(q, "rx", "vrx", trx, 140, 12, dt);
        spring(q, "ry", "vry", tryy, 140, 12, dt);
        spring(q, "rz", "vrz", 0, 160, 9, dt);
        spring(q, "sc", "vsc", 1, 200, 10, dt);
        spring(q, "flip", "vflip", q.flipT, 60, 7, dt);
        const tp = easeOut(clamp01((el - 0.15 - i * 0.07) / 1.1));
        l.mesh.position.set(l.cx, info.planeY - info.ph * (1 - tp) * 0.95, q.z);
        l.mesh.rotation.set(q.rx, q.ry + q.flip, q.rz);
        l.mesh.scale.set(l.w * q.sc, l.h * q.sc, 1);
      });
    }

    /* ─── Layout ─── */
    function layout() {
      if (!container) return;
      vw = container.clientWidth || window.innerWidth;
      vh = container.clientHeight || window.innerHeight;
      renderer.setSize(vw, vh, false);
      camera.aspect = vw / vh;
      camera.updateProjectionMatrix();
      const H = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * CAMZ;
      const W = H * camera.aspect;
      const portrait = vw / vh < 0.9;
      const pw = W * (portrait ? 0.96 : 0.94);
      const s = pw / T.wordW,
        ph = T.H * s;
      const xhW = T.xh * s;
      const cy = portrait ? -H * 0.02 : -H * 0.075;
      const planeY = cy - (T.H / 2 - (T.base - T.xh / 2)) * s;
      const baseW = planeY + (T.H / 2 - T.base) * s;
      clipBase = -(baseW - xhW * 0.05);
      for (const l of letters) {
        l.w = l.canvas.width * s;
        l.h = ph;
        l.cx = -pw / 2 + (l.left + l.canvas.width / 2) * s;
        l.hitX = -pw / 2 + (l.left + T.pad + l.adv / 2) * s;
        l.halfAdv = (l.adv * s) / 2;
      }
      info = { W, H, xhW, cy, planeY, ph, baseW, ascW: T.asc * s };
      shadowPlane.position.z = -(xhW * 1.1 + 0.9);
      const sc = sun.shadow.camera;
      sc.left = -W * 0.8;
      sc.right = W * 0.8;
      sc.top = H * 0.8;
      sc.bottom = -H * 0.8;
      sc.near = 0.5;
      sc.far = 90;
      sc.updateProjectionMatrix();
      computeRest();
      P.set(REST);
      PP.set(REST);
      if (cut.i >= 0) {
        cut.i = -1;
        cut.phase = "";
      }
      const dpr = Math.min(window.devicePixelRatio, 2);
      if (ink) {
        ink.width = vw * dpr;
        ink.height = vh * dpr;
        ictx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    /* ─── Animation Frame Loop ─── */
    let animId: number;
    let last = performance.now(),
      acc = 0,
      t0 = Infinity;

    function frame(now: number) {
      animId = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
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
      const moved =
        ptr.inside && ptr.px > -900 && (ptr.x !== ptr.px || ptr.y !== ptr.py);
      if (ptr.inside) worldAt(0, mW);
      const sweepActive =
        overCanvas && mode === "play" && (ptr.type === "mouse" || ptr.down);
      if (sweepActive && info) {
        if (havePrev && !drag.on) {
          let vx = mW.x - mWPrev.x,
            vy = mW.y - mWPrev.y;
          const vl = Math.hypot(vx, vy),
            maxV = info.xhW * 0.6;
          if (vl > maxV) {
            vx *= maxV / vl;
            vy *= maxV / vl;
          }
          const Rr = info.xhW;
          for (let i = 1; i < N - 1; i++) {
            const j = i * 3,
              dx = P[j] - mW.x,
              dy = P[j + 1] - mW.y;
            const d = Math.hypot(dx, dy);
            if (d < Rr) {
              const f = (1 - d / Rr) ** 2 * 0.55;
              P[j] += vx * f;
              P[j + 1] += vy * f;
            }
          }
          if (moved && audio.on) {
            const speed = Math.hypot(ptr.x - ptr.px, ptr.y - ptr.py);
            for (const i of crossings(3)) {
              const b = i >> 2;
              if (time - lastNote[b] > 0.12) {
                lastNote[b] = time;
                const x = P[i * 3];
                playNote(
                  noteFor(x),
                  clamp(speed / 40, 0.3, 1.1),
                  x / (info.W * 0.5)
                );
              }
            }
          }
        }
        mWPrev.copy(mW);
        havePrev = true;
      } else havePrev = false;

      if (mode === "cut" && ptr.down && moved) {
        slash.push({ x: ptr.x, y: ptr.y, t: time });
        const hits = crossings(1);
        if (hits.length) doCut(hits[0]);
      }
      if (mode === "draw" && stroke.recording && moved) {
        const lp = stroke.pts[stroke.pts.length - 1];
        if (Math.hypot(ptr.x - lp.x, ptr.y - lp.y) > 4)
          stroke.pts.push({ x: ptr.x, y: ptr.y, nx: ptr.nx, ny: ptr.ny });
      }
      if (drag.on) worldAt(drag.z, drag.t);

      acc += dt;
      let n = 0;
      while (acc >= STEP && n < 4) {
        step();
        acc -= STEP;
        n++;
      }
      if (n === 4) acc = 0;

      hoverRope = false;
      if (mode === "play" && overCanvas && ptr.type === "mouse" && !drag.on)
        hoverRope = nearestRope().d < grabThresh();
      updateLetters(dt, el);
      if (drag.on) setCur("pull");
      else if (uiHover) setCur("link");
      else if (!ptr.inside || ptr.type !== "mouse") setCur("");
      else if (mode === "cut") setCur("cut");
      else if (mode === "draw") setCur("draw");
      else if (hoverRope) setCur("grab");
      else if (hoverLetter >= 0) setCur("letter");
      else setCur("");

      const rm = rope.material as any;
      if (rm.emissive) {
        const g = drag.on ? 0.1 : hoverRope ? 0.05 : 0;
        rm.emissiveIntensity += (g - rm.emissiveIntensity) * 0.12;
      }

      if (info) updateTube(st.radiusK * info.xhW);

      clip.constant = el > 2.4 ? 1e4 : clipBase;
      const rp = easeInOut(clamp01((el - 0.6) / 2.0));
      ropeGeo.setDrawRange(0, Math.floor(rp * (R - 1)) * M * 6);

      const tx = ptr.inside ? ptr.nx * 0.9 : 0,
        ty = ptr.inside ? ptr.ny * 0.6 : 0;
      camera.position.x += (tx - camera.position.x) * 0.04;
      camera.position.y += (ty - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      drawInk(dt);

      if (dot && ring) {
        rx += (ptr.x - rx) * 0.18;
        ry += (ptr.y - ry) * 0.18;
        dot.style.transform = `translate(${ptr.x}px, ${ptr.y}px)`;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
      }

      if (++hudTick % 6 === 0) {
        let mx = 0;
        for (let i = 0; i < N - 1; i++) {
          if (i === cut.i) continue;
          const a = i * 3,
            b = a + 3;
          mx = Math.max(
            mx,
            Math.hypot(P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]) /
            Math.max(REST_LEN[i], 1e-6) -
            1
          );
        }
        if (hTenRef.current)
          hTenRef.current.textContent =
            Math.round(clamp(mx, 0, 9.99) * 100) + "%";
        const sp = baseSpin + spinVel;
        if (hSpinRef.current)
          hSpinRef.current.textContent =
            (sp >= 0 ? "+" : "") + sp.toFixed(2);
        if (hStateRef.current)
          hStateRef.current.textContent =
            cut.i >= 0
              ? cut.phase === "fall"
                ? "Cut"
                : "Healing"
              : draw.target === 1
                ? "Drawn " + Math.max(0, Math.ceil(draw.holdUntil - time)) + "s"
                : drag.on
                  ? "Stretched"
                  : bigger
                    ? "Big coil"
                    : "Coiled";
      }

      ptr.px = ptr.x;
      ptr.py = ptr.y;
      renderer.render(scene, camera);
    }

    /* ─── Boot Scene ─── */
    async function init() {
      try {
        await Promise.race([
          document.fonts.load('900 200px "Inter Tight"'),
          new Promise((r) => setTimeout(r, 1200)),
        ]);
      } catch (e) { }
      T = makeText();
      buildLetters();
      layout();
      window.addEventListener("resize", layout);
      container?.classList.add("loaded", "ready");
      t0 = performance.now();
      last = performance.now();
      animId = requestAnimationFrame(frame);
    }
    init();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", layout);
      canvas.removeEventListener("pointerdown", onPointerDown);
      container?.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      container?.removeEventListener("pointerleave", onPointerLeave);
      container?.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      renderer.dispose();
      pmrem.dispose();
      audio.ctx?.close();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-rope-container loaded ready relative w-full h-screen overflow-hidden select-none"
      style={{
        ["--bg" as any]: currentColor,
        ["--ink" as any]: "#0b0b0b",
        ["--paper" as any]: "#ffffff",
      }}
    >

      {/* ── Background Glow & Canvases ── */}
      <div className="glow pointer-events-none" />
      <canvas
        id="gl"
        ref={glCanvasRef}
        aria-label="Interactive 3D rope wrapped around the slatout wordmark"
      />
      <canvas id="ink" ref={inkCanvasRef} />
      <div className="fallback" aria-hidden="true">
        slatout
      </div>
      <div className="grain pointer-events-none" />

      {/* ── UI Layer ── */}
      <div className="ui pointer-events-none">
        <div>
          {/* Headline */}
          <h1 style={{ fontSize: '68px', }} id="headline" ref={headlineRef}>
            Build beyond business
          </h1>
        </div>

        {/* Footer */}
        <footer>
          <p className="hint" id="hint" ref={hintRef}>
            Drag rope<i>/</i>Click to pluck<i>/</i>Click letters<i>/</i>Scroll
          </p>

          <button className="pill big" id="bigger" data-magnetic>
            <span id="biggerLabel" ref={biggerLabelRef}>
              Think bigger
            </span>
            <span className="arr">↗</span>
          </button>
        </footer>
      </div>

      {/* ── Interactive Vertical Dock Toolbar (Right Side) ── */}
      <div className="dock vertical-dock" role="toolbar" aria-label="Rope tools">
        <button
          className="dk"
          data-mode="play"
          aria-pressed="true"
          aria-label="Play mode"
        >
          <svg viewBox="0 0 24 24">
            <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-1.5V4.5a1.5 1.5 0 0 1 3 0V11m0-.5V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1.2a6 6 0 0 1-4.7-2.3L4 14.5a1.6 1.6 0 0 1 2.4-2.1L8 14" />
          </svg>
          <span className="tip">Play · 1</span>
        </button>

        <button
          className="dk"
          data-mode="cut"
          aria-pressed="false"
          aria-label="Cut mode"
        >
          <svg viewBox="0 0 24 24">
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
          </svg>
          <span className="tip">Cut · 2</span>
        </button>

        <button
          className="dk"
          data-mode="draw"
          aria-pressed="false"
          aria-label="Draw mode"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          <span className="tip">Draw · 3</span>
        </button>

        <span className="sep" />

        <button className="dk" id="matBtn" aria-label="Change material">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M4.2 9.6c4.6 2.3 11 2.3 15.6 0M4.2 14.4c4.6-2.3 11-2.3 15.6 0" />
          </svg>
          <span id="matName" ref={matNameRef} className="sr-only">
            Rope
          </span>
          <span className="tip">Material · M</span>
        </button>

        <button
          className="dk"
          id="soundBtn"
          ref={soundBtnRef}
          aria-pressed="false"
          aria-label="Toggle sound"
        >
          <svg className="off-ico" viewBox="0 0 24 24">
            <path d="M11 5 6 9H3v6h3l5 4z" />
            <path d="m22 9-6 6m0-6 6 6" />
          </svg>
          <svg className="on-ico" viewBox="0 0 24 24">
            <path d="M11 5 6 9H3v6h3l5 4z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
          <span className="tip">Sound · S</span>
        </button>

        <button className="dk" id="resetBtn" aria-label="Reset">
          <svg viewBox="0 0 24 24">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span className="tip">Reset · R</span>
        </button>

        <span className="sep" />

        {/* Swatches */}
        <button
          className="sw on"
          style={{ ["--c" as any]: "#ff6a13" }}
          data-c="#ff6a13"
          aria-label="Orange"
        />
        <button
          className="sw"
          style={{ ["--c" as any]: "#2d5bff" }}
          data-c="#2d5bff"
          aria-label="Electric blue"
        />
        <button
          className="sw"
          style={{ ["--c" as any]: "#c9f032" }}
          data-c="#c9f032"
          aria-label="Lime"
        />
        <button
          className="sw"
          style={{ ["--c" as any]: "#ff63a8" }}
          data-c="#ff63a8"
          aria-label="Pink"
        />
        <button
          className="sw"
          style={{ ["--c" as any]: "#ebe4d6" }}
          data-c="#ebe4d6"
          aria-label="Sand"
        />
      </div>

      {/* ── Toast ── */}
      <div className="toast" id="toast" ref={toastRef} />

      {/* ── Custom Trailing Cursor ── */}
      <div className="c-ring" ref={ringRef}>
        <b id="curLabel" ref={curLabelRef}>Drag</b>
      </div>
      <div className="c-dot" ref={dotRef} />

    </section>
  );
}
