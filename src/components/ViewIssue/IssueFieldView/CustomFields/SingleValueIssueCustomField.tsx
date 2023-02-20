import React from "react";
import get from "lodash/get";
import { P5, Pill, useDeskproAppTheme } from "@deskpro/app-sdk";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CustomFields, MappingCustomFields } from "../types";

type Props = Partial<
    | CustomFields[MappingCustomFields.StateIssueCustomField]
    | CustomFields[MappingCustomFields.SingleEnumIssueCustomField]
    | CustomFields[MappingCustomFields.SingleVersionIssueCustomField]
    | CustomFields[MappingCustomFields.SingleBuildIssueCustomField]
    | CustomFields[MappingCustomFields.SingleOwnedIssueCustomField]
    | CustomFields[MappingCustomFields.SingleGroupIssueCustomField]
  > & {
    separator?: string,
  };

const SingleValueIssueCustomField: FC<Props> = ({ value, separator }) => {
  const { theme } = useDeskproAppTheme();
  const name = get(value, ["localizedName"]) || get(value, ["name"]);

  if (!name) {
    return (<NoValue/>)
  }

  if (Number(get(value, ["color", "id"], 0)) === 0) {
    return (<P5>{name}{!separator ? "" : `${separator} `}</P5>);
  }

  return (
      <Pill
        label={name}
        textColor={get(value, ["color", "foreground"], theme.colors.grey80)}
        backgroundColor={get(value, ["color", "background"], theme.colors.grey10)}
      />
    )
};

export { SingleValueIssueCustomField };
