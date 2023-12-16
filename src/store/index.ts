import { AnyAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistCombineReducers, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import createBigIntTransform from 'redux-persist-transform-bigint'
import storage from 'redux-persist/lib/storage'

import pcReducer from './pc.slice'
import aluReducer from './alu.slice'
import irReducer from './ir.slice'
import simReducer from './sim.slice'
import statsReducer from './stats.slice'
import ramReducer from './ram.slice'
import themeReducer from './theme.slice'
import errorsReducer from './errors.slice'

const persistConfig = {
  key: 'root',
  storage,
  transforms: [createBigIntTransform({
    whitelist: ['alu', 'ram']
  })]
}

const reducers = {
  pc: pcReducer,
  alu: aluReducer,
  ir: irReducer,
  sim: simReducer,
  stats: statsReducer,
  ram: ramReducer,
  theme: themeReducer,
  errors: errorsReducer
}

const persistedReducer = persistCombineReducers(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

export { LocaleContext } from './locale.context'