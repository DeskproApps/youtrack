import React from "react";
import has from "lodash/has";
import { useExternalLink } from "../../../../hooks";
import { Member } from "../../../common";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = Partial<CustomFields[MappingCustomFields.SingleUserIssueCustomField]>;

const SingleUserIssueCustomField: FC<Props> = ({ value }) => {
  const { getBaseUrl } = useExternalLink();

  if (!has(value, ["fullName"]) || !has(value, ["login"])) {
    return (
      <NoValue />
    );
  }

  return (
    <Member
      name={value?.fullName || value?.login}
      avatarUrl={value?.avatarUrl ? `${getBaseUrl()}${value?.avatarUrl}` : null}
    />
  );
};

export { SingleUserIssueCustomField };
