import type { Metadata } from "next";
import { Noto_Sans_Mono as PageFont } from "next/font/google";
import "@/styles/globals.css";
import ThemeProvider from "@/components/themewrapper";

const pagefont = PageFont({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ash Richter",
  description: "Personal Portfolio Website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/svgs/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={pagefont.className}>
        <ThemeProvider>
          <div className="page-wrapper">
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}