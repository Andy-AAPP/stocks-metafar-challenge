import { Autocomplete, Box, TextField } from "@mui/material";

interface AutocompleteProps {
  options?: { label: string }[];
  searchValue: string;
  setSearchValue(param: string): void;
  label?: string;
}

export const AutocompleteSelect: React.FC<AutocompleteProps> = ({
  searchValue,
  setSearchValue,
  label,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        margin: "10px",
        width: "300px",
      }}
    >
      <Autocomplete
        disablePortal
        options={[]}
        inputValue={searchValue}
        renderInput={(params) => (
          <TextField
            onChange={(value) => setSearchValue(value.target.value)}
            {...params}
            label={label}
          />
        )}
      />
    </Box>
  );
};
