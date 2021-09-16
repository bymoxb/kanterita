import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectBase,
  FormHelperText,
} from "@mui/material";

interface SelectProps {
  id: string,
  label: string,
  items: { id: number, label: string }[]
  value: number | null | undefined,
  error?: boolean,
  helperText?: React.ReactNode,
  onChange: (id: number) => void,
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  items,
  value,
  error,
  helperText,
  onChange,
}) => {
  return (
    <FormControl fullWidth error={error}>
      <InputLabel id={id}>{label}</InputLabel>
      <SelectBase
        labelId={id}
        id={id}
        value={items.length === 0 ? -1 : value || -1}
        label={label}
        onChange={(e) => onChange(+e.target.value)}
      >
        <MenuItem value={-1}>
          <em>Seleccionar</em>
        </MenuItem>

        {
          items.map(item => (
            <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
          ))
        }

      </SelectBase>

      {
        helperText && (
          <FormHelperText>{helperText}</FormHelperText>
        )
      }
    </FormControl>
  );
};

export default Select;
