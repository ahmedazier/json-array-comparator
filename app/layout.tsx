import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSON Array Comparator - Compare and Analyze JSON Arrays",
  description: "A powerful tool to compare, analyze, and manipulate JSON arrays. Find differences, similarities, and perform advanced queries on your JSON data with an intuitive interface.",
  keywords: ["JSON", "array", "comparator", "data analysis", "JSON tools", "web development"],
  authors: [{ name: "Ahmed Azier" }],
  creator: "Ahmed Azier",
  publisher: "MaffeiFlow",
  robots: "index, follow",
  openGraph: {
    title: "JSON Array Comparator - Compare and Analyze JSON Arrays",
    description: "A powerful tool to compare, analyze, and manipulate JSON arrays. Find differences, similarities, and perform advanced queries on your JSON data.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Array Comparator - Compare and Analyze JSON Arrays",
    description: "A powerful tool to compare, analyze, and manipulate JSON arrays.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
