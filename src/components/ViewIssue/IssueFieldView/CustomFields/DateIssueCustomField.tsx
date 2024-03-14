import React from "react";
import isNumber from "lodash/isNumber";
import { P5 } from "@deskpro/deskpro-ui";
import { format } from "../../../../utils/date";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = Partial<CustomFields[MappingCustomFields.DateIssueCustomField]> & {
  pattern?: string,
};

const DateIssueCustomField: FC<Props> = ({ value, pattern }) => {
  return isNumber(value) ? (<P5>{format(value, pattern)}</P5>) : (<NoValue/>);
};

export { DateIssueCustomField };
