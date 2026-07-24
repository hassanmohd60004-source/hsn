import type { Metadata } from "next";
import { Cairo, Cormorant_Garamond, Amiri, Aref_Ruqaa, El_Messiri, Marhey } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-ruqaa",
  display: "swap",
});

const elMessiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-messiri",
  display: "swap",
});

const marhey = Marhey({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-marhey",
  display: "swap",
});

export const metadata: Metadata = {
  title: "دعوة زفاف أحمد & نورا | الفرحة الكبرى",
  description: "تشرفنا دعوتكم لمشاركتنا أجمل لحظات العمر في حفل زفاف أحمد ونورا. نسعد بوجودكم معنا.",
  openGraph: {
    title: "دعوة زفاف أحمد & نورا",
    description: "تشرفنا دعوتكم لمشاركتنا أجمل لحظات العمر في حفل زفاف أحمد ونورا.",
    images: [{ url: "/images/invitation.jpg", width: 800, height: 600, alt: "دعوة زفاف أحمد ونورا" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "دعوة زفاف أحمد & نورا",
    description: "تشرفنا دعوتكم لمشاركتنا أجمل لحظات العمر في حفل زفاف أحمد ونورا.",
    images: ["/images/invitation.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${cormorant.variable} ${amiri.variable} ${arefRuqaa.variable} ${elMessiri.variable} ${marhey.variable} h-full antialiased`}
    >
      <body className="min-h-full font-arabic antialiased bg-background text-foreground bg-grain">
        {children}
      </body>
    </html>
  );
}
