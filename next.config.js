const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['default', 'en_US', 'it_IT', 'es', 'de'],
    defaultLocale: 'default',
    localeDetection: true,
  },
  publicRuntimeConfig: {
    TxNativePublicToken: '1/479122c5eb41260fececf770501d06ef2f76d94e',
  }
})