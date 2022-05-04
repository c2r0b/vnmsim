const esbuild = require("esbuild");
const autoprefixer = require("autoprefixer");
const postCssNested = require("postcss-nested");
const postCssPlugin = require("@deanc/esbuild-plugin-postcss");

const serverOptions = {
  port: 8000,
  servedir: process.argv[2] ? "dist/" : "build/"
};

const buildOptions = {
  color: true,
  entryPoints: ["./src/index.tsx"],
  outdir: process.argv[2] ? "./dist/" : "./build/",
  minify: process.argv[2] ? true : false,
  bundle: true,
  sourcemap: true,
  splitting: true,
  format: "esm",
  tsconfig: "./tsconfig.json",
  platform: "browser",
  logLevel: "info",
  plugins: [
    postCssPlugin({
      plugins: [autoprefixer, postCssNested],
    }),
  ],
  define: {
    'global': 'window',
    'process.env.NODE_ENV': process.argv[2] ? '"production"' : '"development"'
  }
};

esbuild.build(buildOptions);
esbuild.serve(serverOptions, {});

const fs = require("fs");
const version = require("./package.json").version;

// copy service worker
fs.readFile("src/sw.js", (error, data) => {
  fs.writeFile(
    (process.argv[2] ? "dist" : "build") + "/sw.js",
    data.toString().replace(/\{\{version\}\}/g, version),
    () => {}
  );
});

// copy manifest
fs.readFile("manifest.json", (error, data) => {
  fs.writeFile(
    (process.argv[2] ? "dist" : "build") + "/manifest.json",
    data.toString(),
    () => {}
  );
});