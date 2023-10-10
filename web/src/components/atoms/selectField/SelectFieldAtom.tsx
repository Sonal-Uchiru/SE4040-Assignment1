import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FormHelperText } from "@mui/material";
import { SelectFieldOptions } from "../../../types/selectFields/SelectFieldTypes";

interface IProps {
  width?: number;
  height?: number;
  label: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  options: SelectFieldOptions[];
  onChange?: (event: SelectChangeEvent) => void; // Update the type
  onBlur?(event: React.FocusEvent<any>): void;
  name?: string;
  error?: boolean | undefined;
  errorText?: string;
  size?: "small" | "medium";
  readOnly?: boolean | undefined;
}

export default function SelectField({
  width = 300,
  height = 40,
  label,
  value = "",
  placeholder,
  required = false,
  options,
  onChange, // Remove the type declaration
  name = "",
  onBlur,
  error = false,
  errorText = "",
  size = "medium",
  readOnly = false,
}: IProps) {


  return (
    <FormControl
      style={{ width: width, height: height }}
      error={error}
      size={size}
    >
      <InputLabel id="demo-simple-select-label" style={styles.label} shrink>
        {label}
        {required && <span style={styles.asterisk}>*</span>}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={onChange} // Pass the onChange prop directly
        displayEmpty
        name={name}
        onBlur={onBlur}
        required={required}
        readOnly={readOnly}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={`${option.label}-${option.value}`}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
}

const styles = {
  label: {
    backgroundColor: "white",
    paddingLeft: 6,
  },
  sample: {
    backgroundColor: "white",
  },
  asterisk: {
    color: "red",
    marginLeft: 4,
    marginRight: 6,
  },
};
