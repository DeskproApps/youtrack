import { z } from "zod";
import isEmpty from "lodash/isEmpty";
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
    project: { id: data.project.value },
    ...(isEmpty(data.description) ? {} : { description: data.description }),
  };
};

export { validationSchema, getInitValues, getIssueValues };
