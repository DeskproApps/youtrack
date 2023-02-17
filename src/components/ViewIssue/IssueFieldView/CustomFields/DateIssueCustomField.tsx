import React from "react";
import { P5 } from "@deskpro/app-sdk";
import { format } from "../../../../utils/date";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = CustomFields[MappingCustomFields.DateIssueCustomField];

const DateIssueCustomField: FC<Props> = ({ value }) => {
  return !value ? (<NoValue/>) : (<P5>{format(value)}</P5>);
};

export { DateIssueCustomField };
