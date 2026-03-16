import type { Metadata } from "next";
import { Noto_Sans_Mono as PageFont } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';

import "@/styles/globals.css";

const pagefont = PageFont({ // Load font with latin character support
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Ash Richter",
  description: "Personal Portfolio Website",
};

export default function RootLayout({ // Whatever page is being rendered becomes children
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/svgs/favicon.svg" type="image/svg+xml" />
        {/* <GoogleAnalytics gaId="" /> */}
      </head>
      <body className={pagefont.className}>
        {children}
      </body>
    </html>
  );
}