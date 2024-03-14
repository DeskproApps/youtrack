import React from "react";
import { Stack } from "@deskpro/deskpro-ui";
import { SingleValueIssueCustomField } from "./SingleValueIssueCustomField";
import { NoValue } from "./NoValue";
import type { FC } from "react";

const MultiValueIssueCustomField: FC<{ value: unknown }> = ({ value }) => {
  return (
    <Stack gap={6} wrap="wrap">
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
