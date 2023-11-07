const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
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
  webpack: function (config, _options) {
    config.experiments = {
      layers: true,
      asyncWebAssembly: true,
    }
    return config
  },
})