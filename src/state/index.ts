import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import FlashloanReducer from './Flashloan'



const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    Flashloan: FlashloanReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
