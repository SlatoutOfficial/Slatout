"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Services3DStageProps {
  activeIdx: number;
  totalServices: number;
}

export default function Services3DStage({ activeIdx, totalServices }: Services3DStageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(activeIdx);
  const prevIdxRef = useRef(activeIdx);
  const [hintVisible, setHintVisible] = useState(true);

  // Keep ref updated for RAF loop
  useEffect(() => {
    prevIdxRef.current = activeIdxRef.current;
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0e0e11, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const orangeLight = new THREE.PointLight(0xf97432, 4.0, 15);
    orangeLight.position.set(-3, 2, 4);
    scene.add(orangeLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 2.5, 12);
    rimLight.position.set(4, -3, 3);
    scene.add(rimLight);

    // --- BACKGROUND FLOOR GRID / PEDESTAL ---
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.y = -2.3;

    // Concentric glowing rings
    for (let r = 1.0; r <= 3.2; r += 0.8) {
      const ringGeo = new THREE.RingGeometry(r, r + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf97432,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: Math.max(0.04, 0.22 - r * 0.05),
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      pedestalGroup.add(ringMesh);
    }

    // Grid Floor
    const gridHelper = new THREE.GridHelper(8, 16, 0xf97432, 0x27272a);
    gridHelper.position.y = -0.02;
    // @ts-ignore
    if (gridHelper.material) gridHelper.material.opacity = 0.25;
    // @ts-ignore
    if (gridHelper.material) gridHelper.material.transparent = true;
    pedestalGroup.add(gridHelper);
    scene.add(pedestalGroup);

    // Floating particles
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf97432,
      size: 0.045,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- MATERIALS FACTORY ---
    const orangeMetalMat = new THREE.MeshStandardMaterial({
      color: 0xf97432,
      roughness: 0.2,
      metalness: 0.85,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.8,
    });
    const darkChassisMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.35,
      metalness: 0.65,
    });
    const glowingCoreMat = new THREE.MeshBasicMaterial({
      color: 0xff6a00,
    });
    const glassCyanMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 0.8,
      transparent: true,
      opacity: 0.85,
    });

    // --- 8 PROCEDURAL SERVICE 3D MODELS ---
    const serviceGroups: THREE.Group[] = [];

    // Helper: register a model group
    const addModel = (builder: (grp: THREE.Group) => void) => {
      const grp = new THREE.Group();
      builder(grp);
      scene.add(grp);
      serviceGroups.push(grp);
      // initially position off-screen if not active
      grp.position.set(0, 0, 0);
      grp.visible = false;
    };

    // 01. BUSINESS SETUP & LEGAL: Monumental Obelisk with Orbiting Golden Scales Rings
    addModel((grp) => {
      // Octagonal Central Pillar
      const pillarGeo = new THREE.CylinderGeometry(0.5, 0.7, 2.2, 8);
      const pillar = new THREE.Mesh(pillarGeo, darkChassisMat);
      grp.add(pillar);

      // Inset Golden Accents
      const accentGeo = new THREE.CylinderGeometry(0.52, 0.72, 0.2, 8);
      const accentTop = new THREE.Mesh(accentGeo, orangeMetalMat);
      accentTop.position.y = 0.6;
      const accentBottom = new THREE.Mesh(accentGeo, orangeMetalMat);
      accentBottom.position.y = -0.6;
      grp.add(accentTop, accentBottom);

      // Floating Crown Diamond
      const crownGeo = new THREE.OctahedronGeometry(0.45);
      const crown = new THREE.Mesh(crownGeo, goldMat);
      crown.position.y = 1.55;
      grp.add(crown);

      // Tilted Orbiting Ring (Legal Balance ring)
      const ringGeo = new THREE.TorusGeometry(1.25, 0.035, 16, 64);
      const ring = new THREE.Mesh(ringGeo, orangeMetalMat);
      ring.rotation.x = Math.PI / 3;
      grp.add(ring);
      // @ts-ignore
      grp.userData.ring = ring;
    });

    // 02. FINANCE, TAX & COMPLIANCE: 3D Isometric Bar Chart & Treasury Core
    addModel((grp) => {
      // 3 Rising Hexagonal Financial Columns
      const heights = [1.0, 1.6, 2.3];
      const xOffsets = [-0.85, 0, 0.85];
      const zOffsets = [0.3, -0.1, 0.2];

      heights.forEach((h, i) => {
        const barGeo = new THREE.CylinderGeometry(0.35, 0.35, h, 6);
        const bar = new THREE.Mesh(barGeo, darkChassisMat);
        bar.position.set(xOffsets[i], h / 2 - 1.1, zOffsets[i]);

        // Glowing Cap
        const capGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.1, 6);
        const cap = new THREE.Mesh(capGeo, orangeMetalMat);
        cap.position.set(xOffsets[i], h - 1.05, zOffsets[i]);
        grp.add(bar, cap);
      });

      // Ascending growth trend curve
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.0, -0.8, 0.4),
        new THREE.Vector3(-0.4, -0.2, 0.1),
        new THREE.Vector3(0.0, 0.6, -0.1),
        new THREE.Vector3(0.5, 0.9, 0.0),
        new THREE.Vector3(1.0, 1.4, 0.2),
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.06, 12, false);
      const tube = new THREE.Mesh(tubeGeo, goldMat);
      grp.add(tube);

      // Peak Indicator Sphere
      const peakSphere = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), glowingCoreMat);
      peakSphere.position.set(1.0, 1.4, 0.2);
      grp.add(peakSphere);
    });

    // 03. CONSULTING & STRATEGY: 3D Triple Gyroscope & Strategic Compass
    addModel((grp) => {
      // Central Diamond Gem
      const coreGeo = new THREE.IcosahedronGeometry(0.55);
      const core = new THREE.Mesh(coreGeo, orangeMetalMat);
      grp.add(core);

      // Inner Gimbal Ring
      const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.035, 16, 64), goldMat);
      grp.add(innerRing);

      // Middle Gimbal Ring
      const midRing = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.035, 16, 64), darkChassisMat);
      midRing.rotation.x = Math.PI / 2.5;
      grp.add(midRing);

      // Outer Gimbal Ring
      const outerRing = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.04, 16, 64), orangeMetalMat);
      outerRing.rotation.y = Math.PI / 3;
      grp.add(outerRing);

      // @ts-ignore
      grp.userData.innerRing = innerRing;
      // @ts-ignore
      grp.userData.midRing = midRing;
      // @ts-ignore
      grp.userData.outerRing = outerRing;
    });

    // 04. TECHNOLOGY & AI SOLUTIONS: Neural Cyber-Cube & Holographic Quantum Frame
    addModel((grp) => {
      // Core Processor Box
      const boxGeo = new THREE.BoxGeometry(1.15, 1.15, 1.15);
      const box = new THREE.Mesh(boxGeo, darkChassisMat);
      grp.add(box);

      // Neon Core Lines (Edges)
      const edgesGeo = new THREE.EdgesGeometry(boxGeo);
      const edges = new THREE.LineSegments(edgesGeo, new THREE.LineBasicMaterial({ color: 0xf97432, linewidth: 2 }));
      grp.add(edges);

      // Outer Holographic Wireframe Cage
      const cageGeo = new THREE.IcosahedronGeometry(1.4, 1);
      const cageMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.45 });
      const cage = new THREE.Mesh(cageGeo, cageMat);
      grp.add(cage);

      // 4 Orbiting Satellite Node Beads
      const nodesGroup = new THREE.Group();
      for (let i = 0; i < 4; i++) {
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), orangeMetalMat);
        const angle = (i / 4) * Math.PI * 2;
        node.position.set(Math.cos(angle) * 1.6, Math.sin(angle) * 0.5, Math.sin(angle) * 1.6);
        nodesGroup.add(node);
      }
      grp.add(nodesGroup);

      // @ts-ignore
      grp.userData.cage = cage;
      // @ts-ignore
      grp.userData.nodesGroup = nodesGroup;
    });

    // 05. E-COMMERCE SOLUTIONS: 3D Holographic Delivery Hub & Retail Matrix
    addModel((grp) => {
      // Central Package / Isometric Pod
      const crateGeo = new THREE.BoxGeometry(1.3, 1.1, 1.3);
      const crate = new THREE.Mesh(crateGeo, darkChassisMat);
      grp.add(crate);

      // Contrasting Delivery Ribbons (Orange Crossing Straps)
      const strapX = new THREE.Mesh(new THREE.BoxGeometry(1.32, 1.12, 0.25), orangeMetalMat);
      const strapZ = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.12, 1.32), orangeMetalMat);
      grp.add(strapX, strapZ);

      // Floating Horizontal Scanner Halo
      const haloGeo = new THREE.TorusGeometry(1.4, 0.03, 16, 64);
      const halo = new THREE.Mesh(haloGeo, glassCyanMat);
      halo.rotation.x = Math.PI / 2;
      halo.position.y = 0.8;
      grp.add(halo);

      // Lower Platform Ring
      const baseRing = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.025, 16, 64), goldMat);
      baseRing.rotation.x = Math.PI / 2;
      baseRing.position.y = -0.8;
      grp.add(baseRing);

      // @ts-ignore
      grp.userData.halo = halo;
    });

    // 06. BRANDING & CREATIVE: 3D Sculptural Torus Knot & Chromatic Gem
    addModel((grp) => {
      const knotGeo = new THREE.TorusKnotGeometry(0.85, 0.26, 128, 32, 2, 3);
      const knotMat = new THREE.MeshStandardMaterial({
        color: 0xf97432,
        roughness: 0.15,
        metalness: 0.9,
      });
      const knot = new THREE.Mesh(knotGeo, knotMat);
      grp.add(knot);

      // Surrounding Color Palette Orbs (Cyan, Gold, Rose)
      const colors = [0x38bdf8, 0xf59e0b, 0xf43f5e];
      const orbsGroup = new THREE.Group();
      colors.forEach((col, idx) => {
        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 16, 16),
          new THREE.MeshStandardMaterial({ color: col, roughness: 0.2, metalness: 0.5 })
        );
        const ang = (idx / 3) * Math.PI * 2;
        orb.position.set(Math.cos(ang) * 1.5, Math.sin(ang) * 0.6, Math.sin(ang) * 1.5);
        orbsGroup.add(orb);
      });
      grp.add(orbsGroup);

      // @ts-ignore
      grp.userData.knot = knot;
      // @ts-ignore
      grp.userData.orbsGroup = orbsGroup;
    });

    // 07. MARKETING & GROWTH: 3D Ascending Growth Funnel & Target Radar
    addModel((grp) => {
      // Sleek Upward Arrowhead Rocket
      const coneGeo = new THREE.ConeGeometry(0.75, 1.8, 4);
      const cone = new THREE.Mesh(coneGeo, orangeMetalMat);
      cone.rotation.y = Math.PI / 4;
      grp.add(cone);

      // Base Stabilizer Fins
      const finGeo = new THREE.BoxGeometry(1.4, 0.15, 0.35);
      const fins1 = new THREE.Mesh(finGeo, darkChassisMat);
      fins1.position.y = -0.7;
      const fins2 = new THREE.Mesh(finGeo, darkChassisMat);
      fins2.rotation.y = Math.PI / 2;
      fins2.position.y = -0.7;
      grp.add(fins1, fins2);

      // Concentric Radar Rings below
      for (let r = 0.6; r <= 1.4; r += 0.4) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.025, 16, 48), goldMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -1.1 - r * 0.2;
        grp.add(ring);
      }

      // @ts-ignore
      grp.userData.cone = cone;
    });

    // 08. LEGAL & REGULATORY COMPLIANCE: 3D Cyber Defense Shield & Security Vault
    addModel((grp) => {
      // Hexagonal Shield Body
      const shieldGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.25, 6);
      const shield = new THREE.Mesh(shieldGeo, darkChassisMat);
      shield.rotation.x = Math.PI / 2;
      grp.add(shield);

      // Front Armor Bezel
      const bezelGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.35, 6);
      const bezel = new THREE.Mesh(bezelGeo, orangeMetalMat);
      bezel.rotation.x = Math.PI / 2;
      grp.add(bezel);

      // Central Lock Sphere / Core
      const coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.4, 24, 24), goldMat);
      coreSphere.position.z = 0.25;
      grp.add(coreSphere);

      // Outer Interlocking Forcefield Ring
      const outerShieldRing = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.035, 16, 64), glassCyanMat);
      grp.add(outerShieldRing);

      // @ts-ignore
      grp.userData.outerShieldRing = outerShieldRing;
    });

    // Make the initial active group visible
    if (serviceGroups[activeIdx]) {
      serviceGroups[activeIdx].visible = true;
      serviceGroups[activeIdx].position.set(0, 0, 0);
    }

    // --- INTERACTIVE MOUSE / TOUCH DRAG & TILT ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setHintVisible(false);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // --- TRANSITION ANIMATION STATE ---
    // Tracks each group's position Y and scale
    const groupStates = serviceGroups.map((_, i) => ({
      y: i === activeIdx ? 0 : 5.0,
      scale: i === activeIdx ? 1 : 0.01,
      targetY: i === activeIdx ? 0 : 5.0,
      targetScale: i === activeIdx ? 1 : 0.01,
    }));

    // --- RENDER & ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Update positions based on active index
      const currIdx = activeIdxRef.current;
      const prevIdx = prevIdxRef.current;

      serviceGroups.forEach((grp, i) => {
        const state = groupStates[i];

        if (i === currIdx) {
          // ACTIVE MODEL: swoops into center (y: 0)
          grp.visible = true;
          state.targetY = 0;
          state.targetScale = 1;
        } else {
          // INACTIVE MODEL: exits top or bottom depending on direction
          if (currIdx > prevIdx) {
            // Scrolled down -> older items drop out to bottom
            state.targetY = i < currIdx ? -4.5 : 4.5;
          } else {
            // Scrolled up -> older items rise up to top
            state.targetY = i > currIdx ? 4.5 : -4.5;
          }
          state.targetScale = 0.1;

          // If far enough, hide to save draw calls
          if (Math.abs(state.y) > 4.2) {
            grp.visible = false;
          }
        }

        // Smooth spring lerp for vertical motion (top-to-bottom motion)
        state.y += (state.targetY - state.y) * 0.09;
        state.scale += (state.targetScale - state.scale) * 0.09;

        // Apply idle floating bob only when near center
        const idleBob = Math.abs(state.y) < 0.2 ? Math.sin(elapsed * 1.8 + i) * 0.09 : 0;
        grp.position.y = state.y + idleBob;
        grp.scale.set(state.scale, state.scale, state.scale);

        // Continuous slow idle spin + user drag rotation
        currentRotY += (targetRotY - currentRotY) * 0.08;
        currentRotX += (targetRotX - currentRotX) * 0.08;

        grp.rotation.y = elapsed * 0.35 + currentRotY;
        grp.rotation.x = currentRotX * 0.8;

        // Custom internal part animations
        // @ts-ignore
        if (grp.userData.ring) grp.userData.ring.rotation.z += 0.015;
        // @ts-ignore
        if (grp.userData.innerRing) grp.userData.innerRing.rotation.y += 0.02;
        // @ts-ignore
        if (grp.userData.midRing) grp.userData.midRing.rotation.x -= 0.015;
        // @ts-ignore
        if (grp.userData.outerRing) grp.userData.outerRing.rotation.z += 0.01;
        // @ts-ignore
        if (grp.userData.cage) grp.userData.cage.rotation.y -= 0.008;
        // @ts-ignore
        if (grp.userData.nodesGroup) grp.userData.nodesGroup.rotation.y += 0.02;
        // @ts-ignore
        if (grp.userData.halo) grp.userData.halo.rotation.z += 0.018;
        // @ts-ignore
        if (grp.userData.orbsGroup) grp.userData.orbsGroup.rotation.y += 0.016;
        // @ts-ignore
        if (grp.userData.outerShieldRing) grp.userData.outerShieldRing.rotation.z -= 0.015;
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsed * 0.04;
      pedestalGroup.rotation.y = -elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // --- WINDOW RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[580px] flex items-center justify-center">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: "none" }}
      />

      {/* Interactive 3D Orbit Drag Hint Badge */}
      {hintVisible && (
        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2 shadow-xl animate-pulse">
          <span className="w-2 h-2 rounded-full bg-[#f97432]" />
          <span>DRAG TO ROTATE 3D MODEL</span>
        </div>
      )}
    </div>
  );
}
