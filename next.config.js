const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['default', 'en-us', 'it-it', 'es-es', 'de-de'],
    defaultLocale: 'default',
    localeDetection: true,
  },
  publicRuntimeConfig: {
    TxNativePublicToken: '1/479122c5eb41260fececf770501d06ef2f76d94e',
  }
})