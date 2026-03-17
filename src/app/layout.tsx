import type { Metadata } from "next";
import { Noto_Sans_Mono as PageFont } from "next/font/google";

import "@/styles/globals.css";

const pagefont = PageFont({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ash Richter",
  description: "Personal Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/svgs/favicon.svg" type="image/svg+xml" />

        {/* ✅ APPLY THEME BEFORE RENDER */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const savedTheme = localStorage.getItem("theme");
                  const root = document.documentElement;

                  if (savedTheme === "light") {
                    root.classList.add("light-theme");
                  } else {
                    root.classList.remove("light-theme");
                  }

                  root.setAttribute("data-theme-applied", "true");
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>

      <body className={pagefont.className}>
        <div className="page-wrapper">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}