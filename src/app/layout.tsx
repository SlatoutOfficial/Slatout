import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased bg-[#FAF8F5]">
        {children}
      </body>
    </html>
  );
}
