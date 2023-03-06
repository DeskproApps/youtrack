import styled from "styled-components";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { DatePickerInputWithDisplay } from "@deskpro/deskpro-ui";
import {
  DatePicker,
  DateTimePicker,
  DatePickerProps,
  useDeskproAppTheme,
} from "@deskpro/app-sdk";
import type { FC } from "react";
import "./DateField.css";

export type Props = DatePickerProps & {
  id: string;
  error: boolean,
  value?: string,
  required?: boolean,
  withTime?: boolean,
  placeholder?: string,
  onChange: (date: [Date]) => void,
}

const DateInput = styled(DatePickerInputWithDisplay)`
  :read-only {
    cursor: pointer;
  }
`;

const DateField: FC<Props> = ({
  id,
  value,
  error,
  required,
  onChange,
  withTime,
  placeholder = "Enter Value",
  ...props
}: Props) => {
  const { theme } = useDeskproAppTheme();
  const Picker = withTime ? DateTimePicker : DatePicker;
  const options = {
    position: "left",
    dateFormat: "j F Y",
    ...(!withTime ? {} : {
      altInput: true,
      altFormat: "j F Y H:i",
      timeFormat: "H:i",
    }),
  };

  return (
    <Picker
      options={options}
      value={value}
      onChange={onChange}
      {...props}
      render={(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _: any, ref: any
      ) => (
        <DateInput
          id={id}
          ref={ref}
          error={error}
          variant="inline"
          inputsize="small"
          placeholder={placeholder}
          style={{ paddingRight: 0 }}
          rightIcon={{
            icon: faCalendarDays,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style: {
              color: theme.colors.grey40,
            }
          }}
        />
      )}
    />
  );
}

export { DateField };
