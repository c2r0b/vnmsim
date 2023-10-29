'use client';

import React from "react";

import { createDOMRenderer, SSRProvider, RendererProvider, GriffelRenderer } from "@fluentui/react-components";

import { SimulatorContext, SimulatorStore } from "src/store/dispatcher";
import { ThemeContext, ThemeStore } from "src/themes/dispatcher";

const theme = new ThemeStore();
const sim = new SimulatorStore();

export default ({ children }) => {
  return (
		<RendererProvider renderer={createDOMRenderer()}>
      <SSRProvider>
          <ThemeContext.Provider value={ theme }>
              <SimulatorContext.Provider value={ sim }>
                  {children}
              </SimulatorContext.Provider>
          </ThemeContext.Provider>
      </SSRProvider>
    </RendererProvider>
  );
}