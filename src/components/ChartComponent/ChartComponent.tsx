import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface ChartProps {
  symbol: string;
  graphData: {
    value: string;
    time: string;
  }[];
}

export const ChartComponent: React.FC<ChartProps> = ({ symbol, graphData = [] }) => {

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const graphFormat = [...graphData].reverse();

  return (
    <Box
      sx={{ backgroundColor: "white", padding: "20px", borderRadius: "5px" }}
    >
      <Typography align="center" sx={{ color: "black" }}>
        {symbol}
      </Typography>
      <Box>
        <Typography align="left" sx={{ color: "black", padding: "8px" }}>
          Cotización
        </Typography>
        <LineChart
          width={700}
          height={300}
          data={graphFormat}
          margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={formatDateTime} />
          <YAxis dataKey="value" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <Tooltip />
          <Legend />
        </LineChart>
      </Box>

      <Typography align="center" sx={{ color: "black" }}>
        Intervalo
      </Typography>
    </Box>
  );
};
