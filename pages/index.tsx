import React from "react";
import Head from "next/head";

import { App } from "../src/app/app";
import { SimulatorContext, SimulatorStore } from "../src/store/dispatcher";
import { ThemeContext, ThemeStore } from "../src/themes/dispatcher";

export default () => {
  return (
    <>
      <Head>
        <title>Von Neumann machine simulator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Security-Policy" content="style-src 'self' 'unsafe-inline'; connect-src self * 'unsafe-inline' blob: data: gap:;" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/images/touch/192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/16x16.png" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="stylesheet" href="styles.css" />  
      </Head>
      <ThemeContext.Provider value={ new ThemeStore() }>
        <SimulatorContext.Provider value={ new SimulatorStore() }>
          <App />
        </SimulatorContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};