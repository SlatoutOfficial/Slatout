"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const vendors = [
  { name: "Company Secretary", initials: "CS", open: 2, service: "Business Setup", tint: "#E3EEDC", mid: "#A9CFA2", deep: "#2E5B34", tasks: ["Brief", "Filing", "Follow-up"] },
  { name: "Retail & Market Consultant", initials: "RM", open: 1, service: "Offline Launch", tint: "#F4EAD8", mid: "#DCC08C", deep: "#6E5320", tasks: ["Research", "Plan", "Execution"] },
  { name: "Web & Software Developer", initials: "WS", open: 4, service: "Technology & AI", tint: "#E2E6FF", mid: "#A3AEF4", deep: "#3140A3", tasks: ["Scope", "Invoice", "Access"] },
  { name: "Brand Identity Designer", initials: "BI", open: 2, service: "Branding", tint: "#FBE1E6", mid: "#EFA2B3", deep: "#A1324C", tasks: ["Brief", "Revisions", "Approval"] },
  { name: "Content Strategist", initials: "CT", open: 3, service: "Content Strategy", tint: "#FFF3CC", mid: "#F2D165", deep: "#7A5900", tasks: ["Strategy", "Calendar", "Content"] },
  { name: "SEO & Digital Marketing Agency", initials: "SD", open: 5, service: "Digital Marketing", tint: "#D8F2EA", mid: "#86D6C1", deep: "#126B5A", tasks: ["SEO", "Ads", "Reporting"] },
  { name: "E-Commerce Marketplace Specialist", initials: "EM", open: 2, service: "Marketplace Growth", tint: "#EDE3FB", mid: "#BCA4EE", deep: "#5C3C9F", tasks: ["Listings", "Catalogue", "Ads"] },
  { name: "Programmatic Media Buyer", initials: "PM", open: 1, service: "Programmatic Ads", tint: "#DDEFFB", mid: "#93C8EC", deep: "#175C88", tasks: ["Campaigns", "Budget", "Reporting"] },
  { name: "B2B Lead Generation Agency", initials: "BL", open: 3, service: "BD Outsourcing", tint: "#FFE6D1", mid: "#FFB683", deep: "#A2470F", tasks: ["Leads", "Outreach", "Follow-up"] },
  { name: "Chartered Accountant", initials: "CA", open: 6, service: "Finance & Tax", tint: "#DDEDEC", mid: "#93C5C3", deep: "#24555A", tasks: ["Accounts", "Tax", "Compliance"] },
];

const desktopSpots = [[.06,.06,-9],[.62,.02,7],[.34,.22,-4],[.9,.24,11],[.04,.5,6],[.5,.46,-12],[.86,.6,-6],[.22,.76,9],[.58,.9,4],[.97,.78,-10]];
const mobileSpots = [[.02,.02,-6],[.98,.06,5],[.04,.24,4],[.96,.28,-7],[.03,.47,-3],[.97,.5,6],[.05,.7,5],[.95,.73,-5],[.02,.93,-4],[.98,.97,6]];
const pings = [
  [9, "GST return due in 3 days"],
  [3, "Who has the latest logo files?"],
  [2, "Website update: next sprint"],
  [6, "Listings paused: missing images"],
  [0, "ROC filing: documents pending"],
  [5, "Rankings dropped. Why?"],
  [8, "Lead list: different format again"],
] as const;

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => {
  const normalized = clamp(value);
  return normalized * normalized * (3 - 2 * normalized);
};
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;
const backEase = (value: number) => {
  const normalized = clamp(value);
  const c = 1.6;
  return 1 + (c + 1) * Math.pow(normalized - 1, 3) + c * Math.pow(normalized - 1, 2);
};
const rgb = (hex: string) => {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
};

export default function TeamComparisonScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const goalRef = useRef(0);
  const manualRef = useRef<number | null>(null);

  const chooseState = (value: number) => {
    manualRef.current = value;
    goalRef.current = value;
  };

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const copy = copyRef.current;
    const glow = glowRef.current;
    const field = panel?.querySelector<HTMLElement>(".field");
    if (!section || !panel || !copy || !glow || !field) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(field.querySelectorAll<HTMLElement>(".cd"));
    const labels = Array.from(field.querySelectorAll<HTMLElement>(".lbl"));
    const pingElements = Array.from(field.querySelectorAll<HTMLElement>(".ping"));
    const switchButtons = Array.from(panel.querySelectorAll<HTMLButtonElement>(".sw button"));
    let progress = 0;
    let width = 0;
    let height = 0;
    let isMobile = false;
    let visible = true;
    let animationFrame = 0;
    let pingIndex = 0;
    const startedAt = performance.now();

    const measure = () => {
      const bounds = panel.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      isMobile = width < 900;
    };
    const updateGoal = () => {
      const bounds = section.getBoundingClientRect();
      visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      const scrollable = section.offsetHeight - window.innerHeight;
      const position = clamp(-bounds.top / Math.max(scrollable, 1));
      if (manualRef.current === null) goalRef.current = clamp((position - 0.06) / 0.8);
    };

    const updateFrame = () => {
      const time = reduceMotion ? 0 : (performance.now() - startedAt) / 1000;
      const copyBottom = copy.getBoundingClientRect().bottom - panel.getBoundingClientRect().top;
      const bottomReserve = isMobile ? 84 : 0;
      const availableSceneHeight = isMobile
        ? Math.max(80, height - copyBottom - bottomReserve)
        : height - 68;
      const areaX = isMobile ? 14 : width * 0.43;
      const areaY = isMobile ? copyBottom + 8 : 34;
      const areaWidth = isMobile ? width - 28 : width * 0.55;
      const areaHeight = availableSceneHeight;
      const cardWidth = isMobile ? Math.min(190, width * 0.5) : 284;
      const cardHeight = isMobile ? 48 : 104;
      const stackSize = isMobile
        ? Math.min(88, width * 0.24, availableSceneHeight * 0.52)
        : Math.min(210, height * 0.27);
      const centerX = isMobile ? width * 0.29 : width * 0.64;
      const centerY = isMobile
        ? copyBottom + availableSceneHeight * 0.5
        : height * 0.56;
      const stackGap = isMobile
        ? Math.min(6, Math.max(3, (availableSceneHeight - stackSize) / 9))
        : Math.min(26, height * 0.032);

      glow.style.setProperty("--g", smooth((progress - 0.35) / 0.5).toFixed(3));
      glow.style.setProperty("--gx", `${(centerX / width * 100).toFixed(1)}%`);

      cards.forEach((card, index) => {
        const amount = clamp((progress - 0.06 - index * 0.035) / 0.45);
        const eased = smooth(amount);
        const stackEase = backEase(amount);
        const spot = (isMobile ? mobileSpots : desktopSpots)[index];
        const bob = reduceMotion ? 0 : Math.sin(time * 1.1 + index * 1.3) * 5 * (1 - eased);
        const startX = areaX + spot[0] * (areaWidth - cardWidth);
        const startY = areaY + spot[1] * (areaHeight - cardHeight) + bob;
        const startRotate = spot[2] + (reduceMotion ? 0 : Math.sin(time * 0.7 + index) * 1.2 * (1 - eased));
        const stackX = centerX - stackSize / 2;
        const stackY = centerY - stackSize / 2 - (index - 4.5) * stackGap;
        const currentWidth = lerp(cardWidth, stackSize, eased);
        const currentHeight = lerp(cardHeight, stackSize, eased);
        const x = lerp(startX + (cardWidth - currentWidth) / 2, stackX, eased);
        const y = lerp(startY + (cardHeight - currentHeight) / 2, stackY, stackEase);
        const rotateX = lerp(0, 58, eased);
        const rotateZ = lerp(startRotate, -45, eased);
        card.style.width = `${currentWidth}px`;
        card.style.height = `${currentHeight}px`;
        card.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotateX(${rotateX.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg)`;
        card.style.zIndex = String(Math.round(lerp(index % 3 + 1, 10 + index, eased)));
        card.firstElementChild?.setAttribute("style", `--r:${lerp(18, 24, eased)}px`);

        const vendorFace = card.querySelector<HTMLElement>(".vf");
        const stackFace = card.querySelector<HTMLElement>(".sf");
        const faceBlend = smooth((amount - 0.25) / 0.4);
        if (vendorFace) vendorFace.style.opacity = (1 - faceBlend).toFixed(3);
        if (stackFace) {
          stackFace.style.opacity = faceBlend.toFixed(3);
          const deep = rgb(vendors[index].deep);
          const mid = rgb(vendors[index].mid);
          const shadowDepth = Math.round(10 * eased);
          const shadows = Array.from({ length: shadowDepth }, (_, shadowIndex) => {
            const step = shadowIndex + 1;
            const mix = step / 14;
            const color = mid.map((channel, channelIndex) => Math.round(lerp(channel, deep[channelIndex], mix)));
            return `${step}px ${step}px 0 rgb(${color.join(",")})`;
          });
          shadows.push(`${(16 * eased).toFixed(0)}px ${(18 * eased).toFixed(0)}px ${(34 * eased).toFixed(0)}px rgba(60,30,10,${(0.2 * eased).toFixed(2)})`);
          stackFace.style.boxShadow = `inset 0 0 0 1px rgba(255,255,255,.65),${shadows.join(",")}`;
        }

        const label = labels[index];
        if (label) {
          label.style.left = `${centerX + stackSize * 0.78}px`;
          label.style.top = `${centerY - (index - 4.5) * stackGap - 10}px`;
          label.classList.toggle("on", amount > 0.95);
        }
      });

      if (progress < 0.1) {
        pingElements.forEach((ping, index) => {
          const cardBounds = cards[pings[index][0]].getBoundingClientRect();
          const panelBounds = panel.getBoundingClientRect();
          let x = cardBounds.left - panelBounds.left + 30;
          let y = cardBounds.top - panelBounds.top - 58;
          if (y < 12) y = cardBounds.bottom - panelBounds.top + 10;
          if (isMobile) {
            x = (width - ping.offsetWidth) / 2;
            y = height - 70;
          }
          ping.style.left = `${Math.max(12, Math.min(width - 250, x))}px`;
          ping.style.top = `${y}px`;
        });
      }

      panel.classList.toggle("done", progress > 0.55);
      panel.classList.toggle("fin", progress > 0.82);
      section.classList.toggle("moved", progress > 0.03);
      switchButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String((button.dataset.go === "1") === (progress > 0.55)));
      });
    };

    const onScroll = () => {
      manualRef.current = null;
      updateGoal();
    };
    const onResize = () => {
      measure();
      updateFrame();
    };
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; })
      : null;
    const pingTimer = window.setInterval(() => {
      if (progress > 0.05 || reduceMotion || pingElements.length === 0) return;
      pingElements.forEach((ping) => ping.classList.remove("on"));
      pingElements[pingIndex % pingElements.length]?.classList.add("on");
      pingIndex += 1;
    }, 1700);

    const loop = () => {
      progress += (goalRef.current - progress) * (reduceMotion ? 1 : manualRef.current === null ? 0.1 : 0.03);
      if (visible) updateFrame();
      animationFrame = requestAnimationFrame(loop);
    };

    measure();
    updateGoal();
    updateFrame();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    observer?.observe(section);
    animationFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
      window.clearInterval(pingTimer);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="stk" id="comparison" aria-labelledby="stk-h" ref={sectionRef}>
      <div className="stk-s">
        <div className="panel" ref={panelRef}>
          <div className="glow" ref={glowRef} />
          <div className="dots" />
          <div className="copy" ref={copyRef}>
            <p className="eyebrow"><i />Ten vendors, or one team?</p>
            <div className="hl" id="stk-h">
              <h2 className="h-a"><span className="ln"><span style={{ "--d": 0 } as React.CSSProperties}>Ten vendors.</span></span><span className="ln"><span style={{ "--d": 1 } as React.CSSProperties}>Ten loose</span></span><span className="ln"><span style={{ "--d": 2 } as React.CSSProperties}><em>pieces.</em></span></span></h2>
              <h2 className="h-b" aria-hidden="true"><span className="ln"><span style={{ "--d": 0 } as React.CSSProperties}>One team.</span></span><span className="ln"><span style={{ "--d": 1 } as React.CSSProperties}>One solid</span></span><span className="ln"><span style={{ "--d": 2 } as React.CSSProperties}><em>stack.</em></span></span></h2>
            </div>
            <div className="sub" aria-live="polite">
              <p className="s-a">Ten briefs, ten invoices, ten logins. Nothing lines up, and you spend your week holding the pieces together.</p>
              <p className="s-b">Built like our logo: every service is a layer that sits on the one beneath it, with one plan and one point of contact.</p>
            </div>
            <div className="sw" role="group" aria-label="Compare">
              <i className="kn" aria-hidden="true" />
              <button type="button" aria-pressed="true" data-go="0" onClick={() => chooseState(0)}>Ten vendors</button>
              <button type="button" aria-pressed="false" data-go="1" onClick={() => chooseState(1)}>One Slatout team</button>
            </div>
          </div>

          <div className="field" aria-hidden="true">
            {vendors.map((vendor, index) => (
              <div className="cd" key={vendor.name} style={{ "--t": vendor.tint, "--k": vendor.deep } as React.CSSProperties}>
                <div className="in">
                  <div className="vf">
                    <span className="av">{vendor.initials}</span><b>{vendor.name}</b><span className="bd">{vendor.open}</span>
                    <div className="ch">{vendor.tasks.map((task) => <i key={task}>{task}</i>)}</div>
                  </div>
                  <div className="sf"><span>{String(index + 1).padStart(2, "0")}</span></div>
                </div>
              </div>
            ))}
            {vendors.map((vendor, index) => (
              <div className="lbl" key={vendor.service} style={{ "--m": vendor.mid } as React.CSSProperties}>
                <i />{vendor.service} <small>{String(index + 1).padStart(2, "0")}</small>
              </div>
            ))}
            {pings.map(([vendorIndex, message]) => (
              <div className="ping" key={message}><b>{vendors[vendorIndex].name}</b><span>{message}</span></div>
            ))}
          </div>

          <p className="hint" aria-hidden="true"><i />Scroll to stack</p>
          <div className="tiles" aria-label="What changes">
            {[["10", "1", "Briefs to write"], ["10", "1", "Invoices a month"], ["10", "1", "People to chase"], ["0", "1", "Shared plan"]].map(([from, to, label], index) => (
              <div className="tile" key={label} style={{ "--d": index } as React.CSSProperties}>
                <span className="num"><span><b>{from}</b><b>{to}</b></span></span><small>{label}</small>
              </div>
            ))}
          </div>
          <Link className="cta" href="/contact/#enquire">Build my stack <i aria-hidden="true">&rarr;</i></Link>
        </div>
      </div>
    </section>
  );
}
