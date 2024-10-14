import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Stock {
  symbol: string;
  name: string;
  currency: string;
  type: string;
  country?: string;
  exchange?: string;
  figi_code?: string;
  mic_code?: string;
}

export interface StocksDetails {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface StockState {
  data: StocksDetails[];
  stocksLoading: boolean;
  stocks: Stock[];
  loading: boolean;
  error: string | null;
  selectedStock: Stock | null;
}

const initialState: StockState = {
  data: [],
  loading: false,
  error: null,
  stocksLoading: false,
  stocks: [],
  selectedStock: null,
};

const API_KEY = "";

export const fetchStocks = createAsyncThunk(
  "stock/fetchStocks",
  async (symbol: string) => {
    const response = await axios.get("https://api.twelvedata.com/stocks", {
      params: { symbol },
    });
    return response.data.data;
  }
);

type FetchStocksPricesArgs = {
  symbol: string;
  interval: string;
  startDate?: string;
  endDate?: string;
};

export const fetchStockPrices = createAsyncThunk(
  "stock/fetchStockPrices",
  async ({ symbol, interval, startDate, endDate }: FetchStocksPricesArgs) => {
    const response = await axios.get("https://api.twelvedata.com/time_series", {
      params: {
        symbol,
        interval,
        apikey: API_KEY,
        start_date: startDate,
        end_date: endDate,
        outputsize: 6,
      },
    });
    return response.data.values;
  }
);

const stocksSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setSelectedStock: (state, action: PayloadAction<Stock>) => {
      state.selectedStock = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.stocksLoading = true;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.stocksLoading = false;
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, (state) => {
        state.stocksLoading = false;
        state.error = "Error fetching stock data";
      })
      .addCase(fetchStockPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStockPrices.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching stock data";
      });
  },
});

export const { setSelectedStock } = stocksSlice.actions;
export const stockReducer = stocksSlice.reducer;
