import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IProps {
  width?: number;
  height?: number;
  size?: "small" | "medium";
  label: string;
  onChange?: (event: React.ChangeEvent<any>) => void;
  onBlur?(event: React.FocusEvent<any>): void;
  required?: boolean;
  error?: boolean | undefined;
  helperText?: string;
  defaultValue?: string;
  name?: string;
  value?: string;
  readOnly?: boolean;
}

export default function CalenderField({
  width = 250,
  height = 40,
  label,
  onChange,
  onBlur,
  value,
  size = "medium",
  required = false,
  error = false,
  helperText = "",
  defaultValue = "",
  name = "",
  readOnly = false,
}: IProps) {
  const [values, setValue] = React.useState<Dayjs | null>(dayjs(""));
  const showHelperText = helperText;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={values}
        onChange={(newValue) => setValue(newValue)}
        slotProps={{
          textField: {
            helperText: showHelperText,
            size: size,
            error: error,
            required: required,
            onBlur: onBlur,
            variant: "outlined",
            style: { width: width, height: height },
            InputLabelProps: {
              classes: {
                asterisk: "required-asterisk",
              },
            },
            name: name,
          },
        }}
        aria-readonly={readOnly}
      />
    </LocalizationProvider>
  );
}
