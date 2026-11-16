import React from "react";
import "@/styles/service-pages.css";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="services-root-container min-h-screen">
      {children}
    </div>
  );
}
