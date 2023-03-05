import { InputWithDisplay } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const PeriodProjectCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: formControlField } = formControl;

  return (
    <InputWithDisplay
      type="text"
      inputsize="small"
      placeholder="1w 1d 1h 1m"
      {...formControlField}
    />
  )
};

export { PeriodProjectCustomField };
