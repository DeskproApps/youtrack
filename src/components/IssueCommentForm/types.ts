import { z } from "zod";
import { validationSchema } from "./utils";
import type { SubmitHandler } from "react-hook-form";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type CommentValues = {
  text: string,
};

export type Props = {
  onSubmit: SubmitHandler<FormValidationSchema>,
  onCancel?: () => void,
};
