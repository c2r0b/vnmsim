const withPWA = require('next-pwa')({
  dest: 'public'
})

const { tx } = require('@transifex/native');

tx.init({
  token: process.env.TX_NATIVE_PUBLIC_TOKEN,
});

module.exports = async () => withPWA({
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['default', ...(
      await tx.getLanguages())
        .filter((lang) => lang.code !== 'en')
        .map((lang) => lang.code.replace('_', '-').toLocaleLowerCase())
    ],
    defaultLocale: 'default',
    localeDetection: true,
  },
  publicRuntimeConfig: {
    TxNativePublicToken: process.env.TX_NATIVE_PUBLIC_TOKEN,
  }
});