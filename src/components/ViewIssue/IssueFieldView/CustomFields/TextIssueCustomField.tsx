import React from "react";
import get from "lodash/get";
import { P5 } from "@deskpro/deskpro-ui";
import { mdToHtml } from "../../../../utils";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = CustomFields[MappingCustomFields.TextIssueCustomField];

const TextIssueCustomField: FC<Props> = ({ value }) => {
  const text = get(value, ["text"]);

  return !text
    ? (<NoValue/>)
    : (
      <P5>
        <span dangerouslySetInnerHTML={{ __html: mdToHtml(text) }} />
      </P5>
    )
};

export { TextIssueCustomField };
