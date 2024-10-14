import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchStocks, setSelectedStock } from "../../store/stocks/stocks.slice";
import { Link } from "react-router-dom";
import { AutocompleteSelect } from "../AutocompleteSelect/AutocompleteSelect";

interface DataRow {
  symbol: string;
  name: string;
  currency: string;
  type: string;
  exchange: string;
}

const columns: GridColDef[] = [
  {
    field: "symbol",
    headerName: "Símbolo",
    width: 150,
    renderCell: (params) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useAppDispatch();
      const handleClick = () => {
        const selectedRow: DataRow = {
          symbol: params.row.symbol,
          name: params.row.name,
          currency: params.row.currency,
          type: params.row.type,
          exchange: params.row.exchange,
        };
        dispatch(setSelectedStock(selectedRow));
      }
        return (
          <Link to={`/graph?symbol=${params.value}`} onClick={handleClick}>
            {params.formattedValue}
          </Link>
        )
      }
  },
  { field: "name", headerName: "Nombre", width: 250 },
  { field: "currency", headerName: "Moneda", width: 150 },
  { field: "type", headerName: "Tipo", width: 150 },
];

export const StocksGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stocks, stocksLoading } = useAppSelector(
    (state) => state.stock
  );
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    dispatch(fetchStocks(searchValue));
  }, [dispatch, searchValue]);

  return (
    <Box
      sx={{
        flexDirection: "column",
        width: "100%",
      }}
    >
      <AutocompleteSelect
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        label="Buscar acciones..."
      />
      <Box
        sx={{ backgroundColor: "white", borderRadius: "10px", height: "500px" }}
      >
        <DataGrid
          loading={stocksLoading}
          rows={stocks}
          columns={columns}
          getRowId={(row) => `${row.symbol}-${row.name}-${row.currency}-${row.exchange}`}
          pagination
          localeText={{
            columnMenuSortAsc: "Orden ASC",
            columnMenuSortDesc: "Orden DESC",
            columnMenuHideColumn: "Ocultar Columna",
            columnMenuFilter: "Filtrar",
            columnMenuManageColumns: "Configurar Columnas",

            MuiTablePagination: {
              labelDisplayedRows: ({ from, to, count }) =>
                `${from}-${to} de ${count}`,
              labelRowsPerPage: " Filas por página:",
            },
            noRowsLabel: "Sin resultados.",
          }}
        />
      </Box>
    </Box>
  );
};
