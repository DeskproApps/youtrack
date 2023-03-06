import { TextArea } from "../../../common";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const TextProjectCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: formControlField } = formControl;

  return (
    <TextArea
      variant="inline"
      minHeight="auto"
      placeholder="Enter value"
      id={formControlField.name}
      {...formControlField}
    />
  );
};

export { TextProjectCustomField };
