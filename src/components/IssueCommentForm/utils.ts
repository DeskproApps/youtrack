import { z } from "zod";
import get from "lodash/get";
import type { FormValidationSchema, CommentValues } from "./types";

const validationSchema = z.object({
  comment: z.string().nonempty(),
});

const getInitValues = () => {
  return {
    comment: "",
  };
};

const getValues = (data: FormValidationSchema): CommentValues => {
  return {
    text: get(data, ["comment"], ""),
  }
};

export { validationSchema, getInitValues, getValues };
