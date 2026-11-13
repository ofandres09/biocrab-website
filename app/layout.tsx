import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/geist";
import "./globals.css";
import "./components/premium-type.css";
import "./components/hero-composition.css";
import "./components/readability.css";
import "./components/motion-system.css";
const title = "BioCrab | Quitosano, almidón de yuca y biomateriales";
const description =
  "BioCrab: investigación de biopelículas de quitosano y almidón de yuca, metodología científica y economía circular.";
export const metadata: Metadata = {
  metadataBase: new URL("https://biocrab-website.vercel.app"),
  alternates: { canonical: "/" },
  title: { default: title, template: "%s | BioCrab" },
  description,
  applicationName: "BioCrab",
  keywords: [
    "BioCrab",
    "quitosano",
    "almidón de yuca",
    "biopelículas",
    "biomateriales",
    "economía circular",
  ],
  openGraph: {
    title,
    description,
    locale: "es_ES",
    type: "website",
    siteName: "BioCrab",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BioCrab — Del residuo a biopelícula.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark light",
};
const themeScript =
  "try{document.documentElement.dataset.theme=localStorage.getItem('biocrab-theme')||'dark';if(localStorage.getItem('biocrab-motion')==='paused')document.documentElement.dataset.motion='paused'}catch{document.documentElement.dataset.theme='dark'}";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <noscript>
          <style>{`.loading-scene{display:none!important}body>div[hidden][id^="S:"]{display:block!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
