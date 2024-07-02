import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yan's Portfolio",
  description: "Fort d'une récente reconversion en développement web, mon parcours professionnel s'est enrichi d'une expertise technique en conception et sécurité web, acquise en téléprésentiel auprès de l'école O'clock.",
  metadataBase: new URL('https://yanberdin.com'),
  alternates: {
    canonical: '/',
  },
  referrer: 'origin-when-cross-origin',
  robots: 'index, follow',
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Yan Berdin', 'Portfolio'],
  authors: [{ name: 'Yan Berdin', url: 'https://yanberdin.com' }],
  creator: 'Yan Berdin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
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
