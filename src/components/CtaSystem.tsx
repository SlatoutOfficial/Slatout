"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";

type CtaCommon = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

function CtaAnchor({
  href,
  className,
  onClick,
  children,
}: CtaCommon) {
  if (href.startsWith("/") && !isExternal(href)) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

/** Primary — solid brand orange. Major conversion only. */
export function PrimaryCta({
  href,
  children,
  className,
  onClick,
  fullWidth,
}: CtaCommon & { fullWidth?: boolean }) {
  return (
    <CtaAnchor
      href={href}
      onClick={onClick}
      className={clsx(
        "group inline-flex items-center gap-2 bg-[#F26522] text-white type-button text-[13px] sm:text-[14px] rounded-full pl-5 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2",
        "shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-[0_10px_28px_rgba(242,101,34,0.28)]",
        "hover:bg-[#FE7004] hover:-translate-y-0.5 active:translate-y-0",
        "transition-all duration-500 ease-out-expo",
        fullWidth && "w-full justify-between sm:w-auto sm:justify-start",
        className
      )}
    >
      <span className="overflow-hidden h-[20px] relative block">
        <span className="flex flex-col transition-transform duration-500 ease-custom group-hover:-translate-y-1/2">
          <span className="h-[20px] flex items-center leading-none">{children}</span>
          <span className="h-[20px] flex items-center leading-none">{children}</span>
        </span>
      </span>
      <span className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-[#F26522] transition-transform duration-500 ease-custom group-hover:-rotate-45 group-hover:scale-105">
        <ArrowRight size={14} className="stroke-[2.5]" />
      </span>
    </CtaAnchor>
  );
}

/** Secondary — outline. Medium emphasis, exploration. */
export function SecondaryCta({
  href,
  children,
  className,
  onClick,
  dark,
}: CtaCommon & { dark?: boolean }) {
  return (
    <CtaAnchor
      href={href}
      onClick={onClick}
      className={clsx(
        "group inline-flex items-center gap-2.5 type-button text-[13px] sm:text-[14px] rounded-full pl-5 sm:pl-6 pr-4 py-2 sm:py-2.5",
        "border transition-all duration-500 ease-out-expo hover:-translate-y-0.5 active:translate-y-0",
        dark
          ? "border-white/20 text-white hover:border-white/50 hover:bg-white/5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          : "border-gray-300 text-gray-900 bg-white/60 hover:border-gray-900 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <span className="transition-transform duration-500 ease-custom group-hover:translate-x-0.5">
        {children}
      </span>
      <ArrowRight
        size={14}
        className="stroke-[2] transition-transform duration-500 ease-custom group-hover:translate-x-1"
      />
    </CtaAnchor>
  );
}

/** Text — minimal link with growing underline + arrow. Used throughout. */
export function TextCta({
  href,
  children,
  className,
  onClick,
  tone = "dark",
}: CtaCommon & { tone?: "dark" | "muted" | "light" | "brand" }) {
  const tones = {
    dark: "text-gray-900 hover:text-[#F26522]",
    muted: "text-gray-600 hover:text-[#F26522]",
    light: "text-white/90 hover:text-white",
    brand: "text-[#F26522] hover:text-[#FE7004]",
  };

  const underline = {
    dark: "bg-gray-900 group-hover:bg-[#F26522]",
    muted: "bg-gray-400 group-hover:bg-[#F26522]",
    light: "bg-white/50 group-hover:bg-white",
    brand: "bg-[#F26522]",
  };

  return (
    <CtaAnchor
      href={href}
      onClick={onClick}
      className={clsx(
        "group inline-flex items-center gap-1.5 type-nav text-[13px] sm:text-[14px] w-fit",
        "transition-colors duration-300",
        tones[tone],
        className
      )}
    >
      <span className="relative inline-block transition-transform duration-500 ease-custom group-hover:translate-x-0.5">
        {children}
        <span
          className={clsx(
            "absolute left-0 -bottom-0.5 h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out-expo group-hover:scale-x-100",
            underline[tone]
          )}
        />
      </span>
      <ArrowRight
        size={14}
        className="stroke-[2.25] transition-transform duration-500 ease-custom group-hover:translate-x-1"
      />
    </CtaAnchor>
  );
}

/** Compact text CTA for tight card footers */
export function CardCta({
  href,
  children,
  className,
}: CtaCommon) {
  return (
    <CtaAnchor
      href={href}
      className={clsx(
        "group/link inline-flex items-center gap-1.5 type-nav text-[11px] text-gray-900 hover:text-[#F26522] transition-colors duration-300",
        className
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute left-0 -bottom-px h-[1px] w-full origin-left scale-x-0 bg-[#F26522] transition-transform duration-400 ease-out-expo group-hover/link:scale-x-100" />
      </span>
      <ArrowRight
        size={13}
        className="transition-transform duration-300 group-hover/link:translate-x-1"
      />
    </CtaAnchor>
  );
}
