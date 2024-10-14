import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { ChartComponent } from "../ChartComponent/ChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "../../store/store";
import { fetchStockPrices } from "../../store/stocks/stocks.slice";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useApiPolling } from "../../hooks/useApiPolling";
import { Header } from "../Header/Header";
import { DatePickerComponent } from "../shared/DatePicker/DatePicker";
import dayjs, { Dayjs } from "dayjs";

type TimeRange = "history" | "real_time";

export const Graph: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [interval, setInterval] = useState<string>("");
  const [buttonPressed, setButtonPressed] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("real_time");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const defaultTimeRange = timeRange === "real_time";
  const selectedStock = useAppSelector((state) => state.stock.selectedStock);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const symbol = queryParams.get("symbol") || "";
  const { data } = useSelector((state: RootState) => state.stock);

  const handleButton = () => {
    if (defaultTimeRange) {
      dispatch(fetchStockPrices({ symbol, interval }));
      setButtonPressed(true);
    }

    if (!defaultTimeRange && startDate && endDate) {
      dispatch(
        fetchStockPrices({
          symbol,
          interval,
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
        })
      );
      setButtonPressed(true);
    }
  };

  const isFetchingActivated = buttonPressed && defaultTimeRange;

  const graphData = data.map((item) => ({
    value: item.close,
    time: item.datetime,
  }));

  useApiPolling(symbol, interval, isFetchingActivated);

  return (
    <Box>
      <Header
        symbol={selectedStock?.symbol}
        name={selectedStock?.name}
        currency={selectedStock?.currency}
      />
      <Box
        sx={{
          paddingTop: "50px",
          display: "flex",
          padding: "20px",
          borderRadius: "5px",
          flexDirection: "column",
          backgroundColor: "#529ee5",
        }}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="real_time"
            onChange={(value) => setTimeRange(value.target.value as TimeRange)}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="real_time"
              control={<Radio />}
              label="Tiempo Real"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel
                value="history"
                control={<Radio />}
                label="Histórico"
              />
              <Box>
                <DatePickerComponent
                  label="Fecha desde"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  disabled={defaultTimeRange}
                  maxDate={endDate || dayjs()}
                />
                <DatePickerComponent
                  label="Fecha hasta"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  disabled={defaultTimeRange}
                  minDate={startDate || undefined}
                  maxDate={dayjs()}
                />
              </Box>
            </Box>
          </RadioGroup>
        </FormControl>

        <Box>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <Typography>Intervalo</Typography>
              <Select
                placeholder="Intervalo:"
                sx={{ width: "100px" }}
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                variant="standard"
              >
                <MenuItem key={0} value={"1min"}>
                  1 min
                </MenuItem>
                <MenuItem key={1} value={"5min"}>
                  5 min
                </MenuItem>
                <MenuItem key={2} value={"15min"}>
                  15 min
                </MenuItem>
              </Select>
            </Box>
            <Button
              onClick={handleButton}
              variant="contained"
              disabled={!interval}
            >
              Graficar
            </Button>
          </Box>

          <ChartComponent symbol={symbol} graphData={graphData} />
        </Box>
      </Box>
    </Box>
  );
};
