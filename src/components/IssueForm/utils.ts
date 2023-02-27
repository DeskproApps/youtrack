import { z } from "zod";
import { getOption } from "../../utils";
import type { IssueValues, FormValidationSchema } from "./types";

const validationSchema = z.object({
  summary: z.string().nonempty(),
  description: z.string(),
  project: z.object({
    value: z.string().nonempty(),
  })
});

const getInitValues = (): FormValidationSchema => {
  return {
    summary: "",
    description: "",
    project: getOption("", ""),
  };
};

const getIssueValues = (data: FormValidationSchema): IssueValues => {
  return {
    summary: data.summary,
    description: data.description,
    project: { id: data.project.value },
  };
};

export { validationSchema, getInitValues, getIssueValues };
