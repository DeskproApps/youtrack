import { z } from "zod";
import { validationSchema } from "./utils";
import type { SubmitHandler } from "react-hook-form";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type IssueValues = {
  summary: string,
  project: { id: string },
  description?: string,
};

export type Props = {
  isEditMode?: boolean,
  onSubmit: SubmitHandler<FormValidationSchema>,
  onCancel?: () => void,
};
