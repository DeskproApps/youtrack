import { z } from "zod";
import { validationSchema } from "./utils";
import type {
  UseFormStateReturn,
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import type { components } from "../../services/youtrack/openapi";
import type { Project, Issue } from "../../services/youtrack/types";
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
  onSubmit: (data: IssueValues) => Promise<void>,
  onCancel?: () => void,
  isEditMode?: boolean,
  issue?: Issue,
  error?: Maybe<string|string[]>
};

export type CustomFieldProps = {
  projectId: Project["id"],
  field: components["schemas"]["ProjectCustomField"],
  formControl: {
    field: ControllerRenderProps<Pick<FormValidationSchema, "customFields">>,
    fieldState: ControllerFieldState,
    formState: UseFormStateReturn<Pick<FormValidationSchema, "customFields">>,
  },
};
