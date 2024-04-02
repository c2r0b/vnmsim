"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";

import {
  createDOMRenderer,
  SSRProvider,
  RendererProvider,
  renderToStyleElements,
} from "@fluentui/react-components";

import { persistor, store } from "src/store";
import { PersistGate } from "redux-persist/integration/react";
import { useServerInsertedHTML } from "next/navigation";

export default ({ children }) => {
  const [renderer] = useState(() => createDOMRenderer());

  useServerInsertedHTML(() => {
    return <>{renderToStyleElements(renderer)}</>;
  });

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </SSRProvider>
    </RendererProvider>
  );
};
