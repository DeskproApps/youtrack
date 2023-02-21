import React from "react";
import isObject from "lodash/isObject";
import {} from "lodash/isEmpty";
import { P5 } from "@deskpro/app-sdk";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = CustomFields[MappingCustomFields.SimpleIssueCustomField];

const SimpleIssueCustomField: FC<Props> = ({ value }) => (
  (isObject(value) || !value) ? <NoValue/> : <P5>{value}</P5>
);

export { SimpleIssueCustomField };
