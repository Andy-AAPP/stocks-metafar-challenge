import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { fetchStockPrices } from "../store/stocks/stocks.slice";

const getTimeInterval = (interval: string) => {
  if (interval === "1min") {
    return 60000;
  }
  if (interval === "5min") {
    return 300000;
  }
  return 900000;
};

export const useApiPolling = (
  symbol: string,
  interval: string = "1min",
  isFetchingActivated: boolean = false
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFetchingActivated) return;
    const intervalId = setInterval(() => {
      dispatch(fetchStockPrices({ symbol, interval }));
    }, getTimeInterval(interval));
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, symbol, interval, isFetchingActivated]);
};
