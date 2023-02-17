import React from "react";
import { P5 } from "@deskpro/app-sdk";
import { mdToHtml } from "../../../../utils";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = CustomFields[MappingCustomFields.TextIssueCustomField];

const TextIssueCustomField: FC<Props> = ({ value }) => {
  return !value.text
    ? (<NoValue/>)
    : (<P5 dangerouslySetInnerHTML={{ __html: mdToHtml(value.text) }} />)
};

export { TextIssueCustomField };
