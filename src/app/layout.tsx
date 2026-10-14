import type { Metadata, Viewport } from "next";
import { Lato, Lexend } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend", weight: ["400", "500", "600", "700"], display: "swap" });
const lato = Lato({ subsets: ["latin"], variable: "--font-lato", weight: ["400", "700", "900"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Waggle | Pet Safety Monitors & Cameras That Work Anywhere", template: "%s | Waggle" },
  description: SITE.description,
  applicationName: "Waggle",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Waggle", locale: "en_US", url: SITE.url },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#111318",
  width: "device-width",
  initialScale: 1,
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lexend.variable} ${lato.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <JsonLd data={organizationLd()} />
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
