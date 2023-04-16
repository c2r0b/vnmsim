const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = async () => withPWA({
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  publicRuntimeConfig: {
    TxNativePublicToken: process.env.TX_NATIVE_PUBLIC_TOKEN,
  },
});