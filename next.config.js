const isProd = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: !isProd,
});

module.exports = async () => {
  let internalHost = null;
  // In dev mode we use the internal-ip to serve the assets
  if (!isProd) {
    const { internalIpV4 } = await import("internal-ip");
    internalHost = await internalIpV4();
  }

  return withPWA({
    output: "export",
    reactStrictMode: false,
    images: {
      unoptimized: true,
    },
    publicRuntimeConfig: {
      TxNativePublicToken: process.env.TX_NATIVE_PUBLIC_TOKEN,
    },
    webpack: function (config, _options) {
      return {
        ...config,
        experiments: {
          layers: true,
          asyncWebAssembly: true,
        },
      };
    },
    experimental: {
      swcPlugins: [
        [
          "fluentui-next-appdir-directive",
          { paths: ["@griffel", "@fluentui"] },
        ],
      ],
    },
  });
};
