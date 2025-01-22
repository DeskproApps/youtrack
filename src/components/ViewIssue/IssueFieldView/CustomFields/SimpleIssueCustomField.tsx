import isObject from "lodash/isObject";
import { P5 } from "@deskpro/deskpro-ui";
import { DATETIME_FORMAT } from "../../../../constants";
import { isDateTime } from "../utils";
import { NoValue } from "./NoValue";
import { DateIssueCustomField } from "./DateIssueCustomField";
import type { FC } from "react";
import type { CustomFields, FieldTypeValue, MappingCustomFields } from "../types";

type Props = CustomFields[MappingCustomFields.SimpleIssueCustomField];

const SimpleIssueCustomField: FC<Props> = ({ value, projectCustomField }) => {
  const fieldType = projectCustomField?.field?.fieldType;

  // Were asserting the type here because the genrated type
  // is different from the shape of the data (could be looked into further in the future)
  if (isDateTime(fieldType as FieldTypeValue)) {
    return (<DateIssueCustomField value={value as number} pattern={DATETIME_FORMAT}/>);
  }

  return (
    (isObject(value) || !value) ? <NoValue/> : <P5>{value}</P5>
  );
}

export { SimpleIssueCustomField };
