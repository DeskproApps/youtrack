import React from "react";
import get from "lodash/get";
import { P5 } from "@deskpro/deskpro-ui";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = CustomFields[MappingCustomFields.PeriodIssueCustomField];

const PeriodIssueCustomField: FC<Props> = ({ value }) => {
  const presentation = get(value, ["presentation"]);

  return presentation ? <P5>{presentation}</P5> : <NoValue />;
};

export { PeriodIssueCustomField };
