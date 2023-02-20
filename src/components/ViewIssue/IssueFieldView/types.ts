import type { components } from "../../../services/youtrack/openapi";
import type { User } from "../../../services/youtrack/types";
import { Maybe } from "../../../types";

export enum MappingCustomFields {
  SingleEnumIssueCustomField = "SingleEnumIssueCustomField",
  MultiEnumIssueCustomField = "MultiEnumIssueCustomField",
  SingleBuildIssueCustomField = "SingleBuildIssueCustomField",
  MultiBuildIssueCustomField = "MultiBuildIssueCustomField",
  StateIssueCustomField = "StateIssueCustomField",
  SingleVersionIssueCustomField = "SingleVersionIssueCustomField",
  MultiVersionIssueCustomField = "MultiVersionIssueCustomField",
  SingleOwnedIssueCustomField = "SingleOwnedIssueCustomField",
  MultiOwnedIssueCustomField = "MultiOwnedIssueCustomField",
  SingleUserIssueCustomField = "SingleUserIssueCustomField",
  MultiUserIssueCustomField = "MultiUserIssueCustomField",
  SingleGroupIssueCustomField = "SingleGroupIssueCustomField",
  MultiGroupIssueCustomField = "MultiGroupIssueCustomField",
  PeriodIssueCustomField = "PeriodIssueCustomField",
  TextIssueCustomField = "TextIssueCustomField",
  DateIssueCustomField = "DateIssueCustomField",
  SimpleIssueCustomField = "SimpleIssueCustomField",
  // StateMachineIssueCustomField,
}

export type PeriodValue = components["schemas"]["PeriodValue"] & {
  $type: "PeriodValue",
};

export type SimpleValue = Maybe<string|number>;

export type DateValue = number; // The date is presented by the timestamp that designates the midday of this date in UTC+0 timezone

export type StateBundleElement = components["schemas"]["StateBundleElement"] & {
  $type: "StateBundleElement",
};

export type BuildBundleElement = components["schemas"]["BuildBundleElement"];

export type VersionBundleElement = components["schemas"]["VersionBundleElement"];

export type OwnedBundleElement = components["schemas"]["OwnedBundleElement"] & {
  owner: User,
};

export type EnumBundleElement = components["schemas"]["EnumBundleElement"];

export type UserGroup = components["schemas"]["UserGroup"] & {
  $type: "UserGroup",
};

export type TextFieldValue = components["schemas"]["TextFieldValue"] & {
  $type: "TextFieldValue",
};

export type CustomFields = {
  [MappingCustomFields.PeriodIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "PeriodIssueCustomField",
    value: PeriodValue,
  },
  [MappingCustomFields.SimpleIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type:"SimpleIssueCustomField",
    value: SimpleValue,
  },
  [MappingCustomFields.DateIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "DateIssueCustomField",
    value: DateValue,
  }
  [MappingCustomFields.StateIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: MappingCustomFields.StateIssueCustomField,
    value: StateBundleElement,
  },
  [MappingCustomFields.SingleBuildIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "SingleBuildIssueCustomField",
    value: BuildBundleElement,
  },
  [MappingCustomFields.SingleUserIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "SingleUserIssueCustomField",
    value: User,
  },
  [MappingCustomFields.SingleGroupIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "SingleGroupIssueCustomField",
    value: UserGroup,
  },
  [MappingCustomFields.SingleVersionIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "SingleVersionIssueCustomField",
    value: VersionBundleElement,
  },
  [MappingCustomFields.SingleOwnedIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "SingleOwnedIssueCustomField",
    value: OwnedBundleElement,
  },
  [MappingCustomFields.SingleEnumIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: MappingCustomFields.SingleEnumIssueCustomField,
    value: EnumBundleElement,
  },
  [MappingCustomFields.MultiBuildIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "MultiBuildIssueCustomField",
    value: BuildBundleElement[],
  },
  [MappingCustomFields.MultiGroupIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "MultiGroupIssueCustomField",
    value:  UserGroup[],
  },
  [MappingCustomFields.MultiVersionIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "MultiVersionIssueCustomField",
    value: VersionBundleElement[],
  },
  [MappingCustomFields.MultiOwnedIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "MultiOwnedIssueCustomField",
    value: OwnedBundleElement[],
  },
  [MappingCustomFields.MultiEnumIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "MultiEnumIssueCustomField",
    value: EnumBundleElement[],
  },
  [MappingCustomFields.MultiUserIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "MultiUserIssueCustomField",
    value: User[],
  },
  [MappingCustomFields.TextIssueCustomField]: Omit<components["schemas"]["IssueCustomField"], "value"> & {
    $type: "TextIssueCustomField",
    value: TextFieldValue,
  },
};

export type CustomFieldKey = keyof typeof MappingCustomFields;

export type CustomFieldValue = CustomFields[CustomFieldKey];
