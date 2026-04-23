import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Platemap — Your menu. Digitized. Nutrition-calculated.",
  description:
    "Photograph your handwritten menu. Get a clean digital version with calories, allergens, and QR-ready pages.",
  openGraph: {
    title: "Platemap — Your menu. Digitized. Nutrition-calculated.",
    description:
      "Photograph your handwritten menu. Get a clean digital version with calories, allergens, and QR-ready pages.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Platemap&accent=orange&category=Small%20business",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Platemap&accent=orange&category=Small%20business",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
