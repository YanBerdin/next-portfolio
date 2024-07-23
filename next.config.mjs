/** @type {import('next').NextConfig} */
// const nextConfig = {};

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // Appliquer les en-têtes à toutes les routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://www.yanberdin.com', // Autoriser les requêtes depuis ce domaine spécifique
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Empêche les attaques de type clickjacking
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live; style-src 'self' 'unsafe-inline' https://vercel.live; img-src 'self' data: https://cdn.jsdelivr.net https://vercel.com; connect-src 'self' https://cdn.jsdelivr.net https://raw.githubusercontent.com https://vercel.live https://vercel.com; frame-src 'self' https://vercel.live; object-src 'self' data:;", // Politique de sécurité du contenu
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Empêche le navigateur d'interpréter incorrectement les types MIME
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload', // HSTS avec une durée de 2 ans, inclure les sous-domaines et précharger
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Activer la protection XSS
          },
        ],
      },
    ]
  },
}

export default nextConfig