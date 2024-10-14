import { Box, Typography } from "@mui/material";

interface HeaderProps {
  symbol?: string;
  name?: string;
  currency?: string;
  user?: string;
}

const USER_MOCK = 'Juan';

export const Header: React.FC<HeaderProps> = ({ symbol, name, currency }) => {
  return (
    <Box style={{ width: "100%" }}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <Typography>
          {symbol} - {name} - {currency}
        </Typography>
        <Typography>Usuario: {USER_MOCK}</Typography>
      </Box>
      <hr />
    </Box>
  );
};
