if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-09483baf"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/05286222-9a5dffc77add9311.js",revision:"9a5dffc77add9311"},{url:"/_next/static/chunks/0619bbfe-36485993fd991655.js",revision:"36485993fd991655"},{url:"/_next/static/chunks/0cba7c1e-023d565731269b64.js",revision:"023d565731269b64"},{url:"/_next/static/chunks/0f1159e5-06252e3135c7fe4c.js",revision:"06252e3135c7fe4c"},{url:"/_next/static/chunks/168e4476-135cb8b4f1e753fd.js",revision:"135cb8b4f1e753fd"},{url:"/_next/static/chunks/31b45c90-11cd3bf895ffaa81.js",revision:"11cd3bf895ffaa81"},{url:"/_next/static/chunks/43147d3e-2713669352dde8b2.js",revision:"2713669352dde8b2"},{url:"/_next/static/chunks/4ad82c5e-e181245f57ae5ce5.js",revision:"e181245f57ae5ce5"},{url:"/_next/static/chunks/52c63b42-0a7a93f0b722b504.js",revision:"0a7a93f0b722b504"},{url:"/_next/static/chunks/552a4dd0-8488b19e60614260.js",revision:"8488b19e60614260"},{url:"/_next/static/chunks/5fa41655-19300b32d1e6bd7f.js",revision:"19300b32d1e6bd7f"},{url:"/_next/static/chunks/741e038c-5aefc653cb6a4ca6.js",revision:"5aefc653cb6a4ca6"},{url:"/_next/static/chunks/7a09bc7f-68fbb931a481b4b5.js",revision:"68fbb931a481b4b5"},{url:"/_next/static/chunks/7fab36dd-c7f1739b13667551.js",revision:"c7f1739b13667551"},{url:"/_next/static/chunks/8a8d09a4-5e631364d97c1031.js",revision:"5e631364d97c1031"},{url:"/_next/static/chunks/976-c727c833a208bcd6.js",revision:"c727c833a208bcd6"},{url:"/_next/static/chunks/b55107cc-78c649bb0af70dbe.js",revision:"78c649bb0af70dbe"},{url:"/_next/static/chunks/c9f6bf5e-ead63bd53ecbab3f.js",revision:"ead63bd53ecbab3f"},{url:"/_next/static/chunks/cc594a49-d6ea0efbb08b1f1e.js",revision:"d6ea0efbb08b1f1e"},{url:"/_next/static/chunks/e82996df-a1f5fb736f9447f0.js",revision:"a1f5fb736f9447f0"},{url:"/_next/static/chunks/f4debfa0-55b4e72d127048fb.js",revision:"55b4e72d127048fb"},{url:"/_next/static/chunks/framework-c2ad7fab13964d57.js",revision:"c2ad7fab13964d57"},{url:"/_next/static/chunks/main-573a0d838a7cc99e.js",revision:"573a0d838a7cc99e"},{url:"/_next/static/chunks/pages/_app-e19a95cd1c0ee53d.js",revision:"e19a95cd1c0ee53d"},{url:"/_next/static/chunks/pages/_error-0a004b8b8498208d.js",revision:"0a004b8b8498208d"},{url:"/_next/static/chunks/pages/index-3c274cad48ff1abd.js",revision:"3c274cad48ff1abd"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-df4cf1c8d23aa877.js",revision:"df4cf1c8d23aa877"},{url:"/_next/static/css/b0bee7adb45d5124.css",revision:"b0bee7adb45d5124"},{url:"/_next/static/media/powered-by-vercel.a2517ec0.svg",revision:"b92e4d8d4e56833d0174e2ddf856b287"},{url:"/_next/static/tYbq63QgjDwBOnNVWgPLr/_buildManifest.js",revision:"1545b0bfb05754bf22fb12fd8a39cda0"},{url:"/_next/static/tYbq63QgjDwBOnNVWgPLr/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/tYbq63QgjDwBOnNVWgPLr/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/images/favicon/16x16.png",revision:"fbd966eda0c0d8aeb01655ee9dc52ed3"},{url:"/images/favicon/32x32.png",revision:"194917673db9beb8e71739b6e8acc085"},{url:"/images/touch/144x144.png",revision:"cdeeb7f62b8cb4237b25e6aee1214623"},{url:"/images/touch/168x168.png",revision:"86f54e10858af32083037aeb39d348f8"},{url:"/images/touch/192x192.png",revision:"ad33225e9fed446d246e93c85b12414e"},{url:"/images/touch/48x48.png",revision:"da4c2adaccc9771b13cfb459e6ad5be3"},{url:"/images/touch/72x72.png",revision:"89a118c8b5de9f3710429b349e4add04"},{url:"/images/touch/96x96.png",revision:"e7a4613b73e13843286598683a1c1a38"},{url:"/manifest.json",revision:"a3a364665d9d7c74860aedd1b1640988"},{url:"/powered-by-vercel.svg",revision:"b92e4d8d4e56833d0174e2ddf856b287"},{url:"/styles.css",revision:"c8ff792bf6ba7b9e27b233499334aaea"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
