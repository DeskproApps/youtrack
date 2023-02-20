import React from "react";
import { Stack } from "@deskpro/app-sdk";
import { SingleUserIssueCustomField } from "./SingleUserIssueCustomField";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = CustomFields[MappingCustomFields.MultiUserIssueCustomField];

const MultiUserIssueCustomField: FC<Props> = ({ value }) => {
  return (
    <Stack gap={6} wrap="wrap">
      {(Array.isArray(value) && value.length > 0)
        ? value.map((item) => (<SingleUserIssueCustomField key={item.id} value={item} />))
        : (<NoValue/>)
      }
    </Stack>
  );
};

export { MultiUserIssueCustomField };
