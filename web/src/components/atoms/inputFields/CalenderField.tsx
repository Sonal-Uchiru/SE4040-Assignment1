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
  onChange?: any;
  onBlur?(event: React.FocusEvent<any>): void;
  required?: boolean;
  error?: boolean | undefined;
  defaultValue?: string;
  name?: string;
  value?: any;
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

  name = "",
  readOnly = false,
}: IProps) {
  const [values, setValue] = React.useState<Dayjs | null>(dayjs(""));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            size: size,

            error: error,
            required: required,
            // value: value,

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
