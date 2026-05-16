// Root Layout: Header, Footer, Font, Providers
import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import NextTopLoader from "nextjs-toploader";
import { env } from "@/lib/env";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Info } from "lucide-react";
import DemoBubble from "@/components/ui/DemoBubble";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

// Base Metadata & OpenGraph
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
  title: {
    default: "Fluence | Global Interview Simulator",
    template: "%s | Fluence",
  },
  description:
    "Master the global interview with a patient, culturally-aware AI.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.NEXT_PUBLIC_URL,
    siteName: "Fluence | AI Interview Simulator",
    images: [{ url: "/images/default-og-cover.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body
        className={`${dmSans.variable} ${outfit.variable} font-body bg-background text-foreground min-h-screen flex flex-col antialiased`}
      >
        <NextTopLoader
          color="#C89B7B" // Soft clay accent
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <CustomCursor />
        <DemoBubble />
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
