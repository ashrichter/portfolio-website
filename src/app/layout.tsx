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
    <html
      lang="en"
      style={{ backgroundColor: "#2E3440", colorScheme: "dark" }}
    >
      <head>
        <link rel="icon" href="/svgs/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#2E3440" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var saved = localStorage.getItem("theme");
                  var theme = (saved === "light" || saved === "dark") ? saved : "dark";
                  var root = document.documentElement;
                  var bg = theme === "light" ? "#ECEFF4" : "#2E3440";
                  var fg = theme === "light" ? "#2E3440" : "#ECEFF4";

                  root.classList.toggle("light-theme", theme === "light");
                  root.classList.toggle("dark-theme", theme === "dark");
                  root.setAttribute("data-theme-applied", "true");

                  root.style.backgroundColor = bg;
                  root.style.colorScheme = theme;
                  document.body && (document.body.style.backgroundColor = bg);
                  document.body && (document.body.style.color = fg);

                  var metaTheme = document.querySelector('meta[name="theme-color"]');
                  if (metaTheme) metaTheme.setAttribute("content", bg);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={pagefont.className}
        style={{ backgroundColor: "#2E3440", color: "#ECEFF4" }}
      >
        <ThemeProvider>
          <div className="page-wrapper">
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}