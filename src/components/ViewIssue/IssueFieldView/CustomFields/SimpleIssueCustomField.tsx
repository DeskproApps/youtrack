import React from "react";
import { P5 } from "@deskpro/app-sdk";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = CustomFields[MappingCustomFields.SimpleIssueCustomField];

const SimpleIssueCustomField: FC<Props> = ({ value }) => (
  !value ? <NoValue/> : <P5>{value}</P5>
);

export { SimpleIssueCustomField };
