import crypto from 'crypto'

/** @type {import('next').NextConfig} */
// const nextConfig = {};

const nextConfig = {
  async headers() {
    const nonce = crypto.randomBytes(16).toString('base64')
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
            value: ` img-src 'self' data: https://cdn.jsdelivr.net https://vercel.com https://www.yanberdin.com; connect-src 'self' https://cdn.jsdelivr.net https://raw.githubusercontent.com https://vercel.live https://vercel.com wss://ws-us3.pusher.com https://sockjs-us3.pusher.com https://z.clarity.ms; frame-src 'self' https://vercel.live; object-src 'self' data:;`, // Politique de sécurité du contenu
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
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload', // HSTS avec une durée de 2 ans, inclure les sous-domaines et précharger
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Activer la protection XSS
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()', // Politique de permissions
          },
        ],
      },
    ]
  },
}

export default nextConfig
