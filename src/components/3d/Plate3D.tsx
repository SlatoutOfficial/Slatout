"use client";

import React from "react";

interface Plate3DProps {
  index: number;
  className?: string;
  artSvg?: string;
  children?: React.ReactNode;
  gap?: number | string;
  land?: number;
  draw?: number;
  tx?: string;
  ty?: string;
  isHot?: boolean;
  isDim?: boolean;
  style?: React.CSSProperties;
}

export default function Plate3D({
  index,
  className = "",
  artSvg,
  children,
  gap = "34px",
  land = 1,
  draw = 1,
  tx = "0px",
  ty = "0px",
  isHot = false,
  isDim = false,
  style = {}
}: Plate3DProps) {
  const dynamicStyle = {
    "--i": index,
    "--gap": typeof gap === "number" ? `${gap}px` : gap,
    "--land": land,
    "--draw": draw,
    "--tx": tx,
    "--ty": ty,
    ...style
  } as React.CSSProperties;

  const classes = [
    "pl",
    className,
    isHot ? "hot" : "",
    isDim ? "dim" : ""
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} style={dynamicStyle}>
      {/* 7 thickness slices along -Z to form a solid physical extruded slab */}
      <div className="th" style={{ transform: "translateZ(-11.2px)" }} />
      <div className="th" style={{ transform: "translateZ(-9.6px)" }} />
      <div className="th" style={{ transform: "translateZ(-8.0px)" }} />
      <div className="th" style={{ transform: "translateZ(-6.4px)" }} />
      <div className="th" style={{ transform: "translateZ(-4.8px)" }} />
      <div className="th" style={{ transform: "translateZ(-3.2px)" }} />
      <div className="th" style={{ transform: "translateZ(-1.6px)" }} />

      {/* Front Face with SVG Icon Artwork or Custom Children */}
      <div className="fc">
        {artSvg && (
          <svg
            className="art"
            viewBox="0 0 200 200"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: artSvg }}
          />
        )}
        {children}
      </div>
    </div>
  );
}
