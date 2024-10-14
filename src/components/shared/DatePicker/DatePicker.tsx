import React from "react";
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
        // Puedes añadir más propiedades aquí según necesites, como `minDate`, `maxDate`, etc.
      />
    </LocalizationProvider>
  );
};

// import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// interface DatePickerProps {
//   label: string;
//   value?: Date | null;
//   onChange: (newValue: Date | null) => void;
//   sx?: object
//   disabled?: boolean
// }

// export const DatePicker: React.FC<DatePickerProps> = ({label, value, onChange, sx, disabled}) => {

//   const handleChange = (newValue: Date | null) => {
//     // Verifica si newValue es una fecha válida antes de cambiar
//     if (newValue && newValue instanceof Date && !isNaN(newValue.getTime())) {
//       onChange(newValue);
//     } else {
//       onChange(null);
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateTimePicker
//       disabled={disabled}
//       sx={sx ?? {margin: '5px'}}
//       label={label}
//       value={value}
//       onChange={handleChange}
//       // renderInput={(params) => <TextField {...params} />}
//     />
//     </LocalizationProvider>

//   );
// };
