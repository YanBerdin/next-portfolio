/** @type {import('next').NextConfig} */
// const nextConfig = {};

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // Appliquer les headers à toutes les routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://www.yanberdin.com', // Autoriser les requêtes depuis ce domaine
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Empêche le clickjacking
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://raw.githubusercontent.com; object-src 'self' data:;",
            // Politique de sécurité du contenu
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Empêche l'analyse des types MIME
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer', // Politique de référent
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload', // HSTS
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Protection contre les attaques XSS
          },
        ],
      },
    ]
  },
}

export default nextConfig
