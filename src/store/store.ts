import { configureStore } from "@reduxjs/toolkit";
import { stockReducer } from "./stocks/stocks.slice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    stock: stockReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store