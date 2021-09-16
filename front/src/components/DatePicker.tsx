import React from "react";

import { TextField } from "@mui/material";

import {
  DatePicker as DatePickerBase,
  LocalizationProvider,
} from "@mui/lab";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

import esLocale from "date-fns/locale/es";

interface DatePickerProps {
  label: string,
  value: Date | null,
  onChange: (date: Date | null) => void,
  error?: boolean,
  helperText?: React.ReactNode,
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
      <DatePickerBase
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} error={error} helperText={helperText} />}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
