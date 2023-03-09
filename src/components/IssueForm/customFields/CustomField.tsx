import isNil from "lodash/isNil";
import { map } from "./map";
import get from "lodash/get";
import type { FC } from "react";
import type {
  UseFormStateReturn,
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import type { Project, ProjectCustomField } from "../../../services/youtrack/types";
import type { FormValidationSchema } from "../types";

type Props = {
  projectId: Project["id"],
  field: ProjectCustomField,
  formControl: {
    field: ControllerRenderProps<Pick<FormValidationSchema, "customFields">>,
    fieldState: ControllerFieldState,
    formState: UseFormStateReturn<Pick<FormValidationSchema, "customFields">>,
  },
};

const CustomField: FC<Props> = ({ projectId, field, formControl }) => {
  const Field = map(field);

  if (isNil(Field)) {
    // eslint-disable-next-line no-console
    console.warn(`Could not render field view, mapping missing for YouTrack field type ${get(field, ["field", "fieldType", "id"])}`);
    return null;
  }

  return (
    <Field field={field} formControl={formControl} projectId={projectId} />
  )
};

export { CustomField };
