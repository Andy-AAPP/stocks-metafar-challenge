import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { Interval } from "../../Graph/Graph";


type SelectDataItems = DataItem[];

interface SelectProps {
  labelText?: string;
  // selectValue:
  sx?: object;
  value?: string;
  dataItems?: SelectDataItems;
  // handleChange?: (value?: string) => void;
   
  handleChange?: (value: Interval) => void;
  placeholder?: string;
  disabled?: boolean;
  disableClear?: boolean;
  size?: 1 | 2 | 3;
  titleKey?: string;
  valueKey?: string;
  variant?: "outlined" | "filled" | "standard";
  textWhite?: boolean;
  defaultValue?: DataItem;
  heightProp?: string;
  minWidthProp?: string;
}

export const CustomSelect: React.FC<SelectProps> = ({
  variant,
  labelText,
  sx,
  value,
  handleChange,
  placeholder,
  dataItems,
  disabled
}) => {

  return (
    <FormControl variant={variant} sx={sx ?? { m: 1, minWidth: 175 }}>
      <InputLabel id="demo-simple-select-standard-label">
        {labelText}
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        disabled={disabled}
        onChange={handleChange}
      >
        <MenuItem disabled={disabled} value="">
            {placeholder}
        </MenuItem>
        {dataItems && dataItems.map((item: unknown, index: number) =>
            <MenuItem
                key={index}
                value={item?.id}>
                {/* {item.descripcion || item.displayName || item.descripcionStealth} */}
                {item?.value || 'vacio'}
            </MenuItem>
        )}
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>
  );
};
