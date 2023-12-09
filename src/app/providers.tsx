'use client'

import React from 'react'
import { Provider } from 'react-redux'

import { createDOMRenderer, SSRProvider, RendererProvider } from '@fluentui/react-components'

import { persistor, store } from 'src/store'
import { PersistGate } from 'redux-persist/integration/react'

export default ({ children }) => {
  return (
		<RendererProvider renderer={createDOMRenderer()}>
      <SSRProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </SSRProvider>
    </RendererProvider>
  )
}