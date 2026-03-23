import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Aimel Hassan | AI Founder & Developer",
  description:
    "Aimel Hassan is an AI Founder & Developer from Pakistan. Creator of Hermes AI, Boostly Bot, and Surah Recommender AI. Architecting the future of intelligence.",
  keywords: [
    "Aimel Hassan",
    "AI Founder",
    "Python Developer",
    "Next.js Developer",
    "Valith",
    "Pakistan",
    "Software Engineer",
    "Machine Learning Engineer",
  ],
  authors: [{ name: "Aimel Hassan", url: "https://aimelhassan.com" }],
  creator: "Aimel Hassan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aimelhassan.com",
    title: "Aimel Hassan | AI Founder & Developer",
    description:
      "Aimel Hassan is an AI Founder & Developer from Pakistan. Creator of Hermes AI. Architecting the future of intelligence.",
    siteName: "Aimel Hassan Portfolio",
    images: [
      {
        url: "/og-image.jpg", // The user will need to place this in /public
        width: 1200,
        height: 630,
        alt: "Aimel Hassan - AI Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aimel Hassan | AI Founder & Developer",
    description:
      "Aimel Hassan is an AI Founder & Developer from Pakistan. Creator of Hermes AI. Architecting the future of intelligence.",
    creator: "@aimel_h",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aimelhassan.com",
  },
};

// JSON-LD Structured Data for Google Knowledge Graph
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aimel Hassan",
  url: "https://aimelhassan.com",
  jobTitle: "Founder & AI Developer",
  worksFor: {
    "@type": "Organization",
    name: "Valith",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "NUST", // Adjust if needed
  },
  sameAs: [
    "https://github.com/aimelhassan",
    "https://linkedin.com/in/aimelhassan",
    "https://twitter.com/aimel_h",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Python",
    "Next.js",
    "React",
    "GenAI",
    "RAG",
    "Multi-Agent Systems",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressRegion: "South Punjab",
    addressCountry: "PK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${cormorantGaramond.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
