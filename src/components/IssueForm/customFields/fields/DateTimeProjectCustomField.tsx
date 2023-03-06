import { forwardRef } from "react";
import { DateField } from "../../../common";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const DateTimeProjectCustomField: FC<CustomFieldProps> = forwardRef(({ formControl }, ref) => {
  const { field: formControlField } = formControl;

  return (
    <DateField
      withTime
      id={formControlField.name}
      {...formControlField}
      ref={ref}
      onChange={(date: [Date]) => formControlField.onChange(date[0])}
    />
  );
});

export { DateTimeProjectCustomField };
