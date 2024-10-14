import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Body } from "./components/Body/Body";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<Body />} />
      </Routes>
    </Box>
  );
}

export default App;
