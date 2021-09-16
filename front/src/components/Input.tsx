import {
  StandardTextFieldProps,
  TextField
} from "@mui/material";
import React from "react";

const Input: React.FC<StandardTextFieldProps> = ({ ...props }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};

export default Input;
