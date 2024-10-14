import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface DatePickerComponentProps {
  label: string;
  value: Dayjs | null
  onChange: (newValue: Dayjs | null) => void;
  disabled?: boolean;
  sx?: object;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  value,
  onChange,
  disabled,
  sx,
  minDate,
  maxDate,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        sx={sx ?? { margin: "5px" }}
        format="DD/MM/YYYY"
        minDate={minDate}
        maxDate={maxDate}
      />
    </LocalizationProvider>
  );
};