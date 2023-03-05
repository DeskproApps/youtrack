import { InputWithDisplay } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const SimpleProjectCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: formControlField } = formControl;

  return (
    <InputWithDisplay
      type="text"
      inputsize="small"
      placeholder="Enter value"
      {...formControlField}
    />
  )
};

export { SimpleProjectCustomField };
