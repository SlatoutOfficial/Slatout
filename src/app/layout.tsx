import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Slatout | Development, Digital Marketing & Creative Agency",
  description: "Slatout crafts strategy-led development, conversion-focused digital marketing engines, and category-dominating design experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#FAF8F5]">
        <Script id="slatout-js-enhancement" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js");`}
        </Script>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
