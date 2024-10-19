import type { Metadata } from "next";
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
  return (
    <html lang="fr" suppressHydrationWarning>
      {/* Pour conserver votre statut de propriétaire confirmé, ne supprimez pas la balise Meta, même une fois la validation effectuée. */}
      <head>
        <meta name="google-site-verification" content="qElH7ZIqIo2a83PF-VyjSq-F_8M13Q6QaTbyu7bvgnU" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/png" href="https://www.yanberdin.com/favicon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="https://www.yanberdin.com/favicon.ico" />
      </head>
      
      <body className={inter.className}>
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
