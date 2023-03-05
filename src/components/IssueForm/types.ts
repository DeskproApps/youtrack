import { z } from "zod";
import { validationSchema } from "./utils";
import type {
  UseFormStateReturn,
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import type { components } from "../../services/youtrack/openapi";
import type { Project } from "../../services/youtrack/types";
import type { Maybe } from "../../types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomFieldValue = any;

export type IssueValues = {
  summary: string,
  project: { id: string },
  description?: string,
  customFields: CustomFieldValue[],
};

export type Props = {
  onSubmit: (data: IssueValues) => Maybe<Promise<void>>,
  onCancel?: () => void,
  isEditMode?: boolean,
  error?: Maybe<string|string[]>
};

export type CustomFieldProps = {
  projectId: Project["id"],
  field: components["schemas"]["ProjectCustomField"],
  formControl: {
    field: ControllerRenderProps<FormValidationSchema>,
    fieldState: ControllerFieldState,
    formState: UseFormStateReturn<FormValidationSchema>;
  },
};
