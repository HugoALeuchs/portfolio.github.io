import { Rubik } from "next/font/google";
import "./globals.css";

const inter = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Hugo Leuchs Web/Front-End Developer",
  description:
    "Passionate Web/Front-End Developer with a proven track record of delivering innovative and visually stunning web solutions. Leveraging a robust skill set in technologies such as React, Next.js, HTML, and CSS, I bring a creative approach to every project. Explore my portfolio to witness a journey of transforming concepts into compelling and functional digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
