const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'fr', 'de', 'el'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  publicRuntimeConfig: {
    TxNativePublicToken: '1/e66f946c957a76391dbb53ef053953403662e662',
  }
})