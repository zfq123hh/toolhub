import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdContainer from "@/components/AdContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ToolHub - Free Online Calculators & Tools",
    template: "%s | ToolHub - Free Online Calculators",
  },
  description:
    "Free online calculators and tools: loan calculator, mortgage calculator, BMI calculator, calorie calculator, investment calculator and more.",
  keywords: [
    "online calculator",
    "free tools",
    "loan calculator",
    "mortgage calculator",
    "BMI calculator",
    "calorie calculator",
    "investment calculator",
  ],
  openGraph: {
    title: "ToolHub - Free Online Calculators & Tools",
    description:
      "Free online calculators and tools for everyday math, finance, health, and more.",
    type: "website",
    locale: "en_US",
    siteName: "ToolHub",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Replace with your Google Search Console verification code
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1456686027814881"
          crossOrigin="anonymous"
        />
        {/* Google Analytics - Replace with your GA ID */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <Header />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
