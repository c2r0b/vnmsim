const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'it', 'de', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  publicRuntimeConfig: {
    TxNativePublicToken: '1/479122c5eb41260fececf770501d06ef2f76d94e',
  }
})