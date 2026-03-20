import { Rubik, Space_Mono } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Hugo Leuchs — Frontend Engineer",
  description:
    "Frontend Engineer specializing in high-performance web platforms and marketing websites. React, Next.js, TypeScript, Vue.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
