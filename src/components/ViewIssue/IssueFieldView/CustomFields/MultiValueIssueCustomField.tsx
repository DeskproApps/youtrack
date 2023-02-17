import React from "react";
import { Stack } from "@deskpro/app-sdk";
import { SingleValueIssueCustomField } from "./SingleValueIssueCustomField";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = CustomFields[MappingCustomFields.MultiVersionIssueCustomField];

const MultiValueIssueCustomField: FC<Props> = ({ value }) => {
  return (
    <Stack gap={6}>
      {(Array.isArray(value) && value.length > 0)
        ? (value.map((item, index) => (
          <SingleValueIssueCustomField
            key={item.id}
            value={item}
            separator={(value.length - 1 === index) ? "" : ","}
          />
        )))
        : (<NoValue/>)
      }
    </Stack>
  )
};

export { MultiValueIssueCustomField };
