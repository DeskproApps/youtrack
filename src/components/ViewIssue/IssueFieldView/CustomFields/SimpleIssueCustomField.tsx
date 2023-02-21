import React from "react";
import get from "lodash/get";
import isObject from "lodash/isObject";
import { P5 } from "@deskpro/app-sdk";
import { DATETIME_FORMAT } from "../../../../constants";
import { isDateTime } from "../utils";
import { NoValue } from "./NoValue";
import { DateIssueCustomField } from "./DateIssueCustomField";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = CustomFields[MappingCustomFields.SimpleIssueCustomField];

const SimpleIssueCustomField: FC<Props> = ({ value, projectCustomField }) => {
  const fieldType = get(projectCustomField, ["field", "fieldType"]);

  if (isDateTime(fieldType)) {
    return (<DateIssueCustomField value={value as number} pattern={DATETIME_FORMAT}/>);
  }

  return (
    (isObject(value) || !value) ? <NoValue/> : <P5>{value}</P5>
  );
}

export { SimpleIssueCustomField };
