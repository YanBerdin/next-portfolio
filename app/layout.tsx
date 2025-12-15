import type { Metadata } from "next";
//import Script from "next/script";
import ClientClarity from "./ClientClarity";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yan's Portfolio",
  description: "Fort d'une formation Fullstack et d'une expérience pratique acquise à travers plusieurs projets, j'ai réorienté ma carrière du e-commerce vers le développement web...",
  metadataBase: new URL('https://www.yanberdin.com'),
  alternates: {
    canonical: 'https://www.yanberdin.com/',
  },
  referrer: 'origin-when-cross-origin',
  robots: 'index, follow',
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Yan Berdin', 'Portfolio'],
  authors: [{ name: 'Yan Berdin', url: 'https://www.yanberdin.com' }],
  creator: 'Yan Berdin',
  publisher: 'Yan Berdin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Suppression de l'appel direct à useClarity (hook client)
  return (
    <html lang="fr" suppressHydrationWarning>
      {/* Pour conserver votre statut de propriétaire confirmé, ne supprimez pas la balise Meta, même une fois la validation effectuée. */}
      <head>
        <meta name="google-site-verification" content="qElH7ZIqIo2a83PF-VyjSq-F_8M13Q6QaTbyu7bvgnU" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={inter.className}>
        {/* Clarity tracking côté client (auto-consent enabled) */}
        <ClientClarity />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // themes={['dark, light, system']}
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
