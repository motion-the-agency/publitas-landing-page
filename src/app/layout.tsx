import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Clash Grotesk (Fontshare, ITF Free Font License) for display type.
const clash = localFont({
  variable: "--font-clash",
  display: "swap",
  src: [
    { path: "./fonts/ClashGrotesk-Medium.woff2", weight: "500" },
    { path: "./fonts/ClashGrotesk-Semibold.woff2", weight: "600" },
    { path: "./fonts/ClashGrotesk-Bold.woff2", weight: "700" },
  ],
});

export const metadata: Metadata = {
  // Vercel supplies the deployment URL automatically; set NEXT_PUBLIC_SITE_URL on any other host
  // so the share image resolves to an absolute public URL.
  ...(process.env.NEXT_PUBLIC_SITE_URL && { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }),
  title: "Publitas 2.0 launch proposal | Motion The Agency",
  description:
    "Motion The Agency's launch plan for Publitas 2.0: one campaign concept, three audiences and a dedicated creative team, from the November teaser to the Q1 2027 general launch.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Know your next move. The Publitas 2.0 launch plan",
    description: "One campaign for the whole launch, from the November teaser to Q1 2027. Prepared by Motion The Agency.",
    type: "website",
    siteName: "Motion The Agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Know your next move. The Publitas 2.0 launch plan",
    description: "One campaign for the whole launch, from the November teaser to Q1 2027.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a5fd0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} ${clash.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
