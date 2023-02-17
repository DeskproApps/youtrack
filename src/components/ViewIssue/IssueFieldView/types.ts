import type { components } from "../../../services/youtrack/openapi";
import type { Project, User } from "../../../services/youtrack/types";

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

export type ProjectCustomField = {
  //...
};

export type PeriodValue = {
  id: string,
  minutes: number, // Value in minutes.
  presentation: string, // Human-readable representation.
};

export type SimpleValue = string|number;

export type DateValue = number; // The date is presented by the timestamp that designates the midday of this date in UTC+0 timezone

export type BundleElement = {
  $type: string,
  id: string,
  name: string,
  bundle: components["schemas"]["Bundle"],
  description: string,
  archived: boolean,
  ordinal: number, /** Format: int32 */
  color: Required<components["schemas"]["FieldStyle"]>,
  hasRunningJob: boolean,
};
export type StateBundleElement = BundleElement & {
  isResolved: boolean,
  localizedName: string,
};
export type BuildBundleElement = BundleElement & {
  assembleDate: number, /** Format: int64 */
};
export type VersionBundleElement = BundleElement & {
  releaseDate: number, /** Format: int64 */
  released: boolean,
};
export type OwnedBundleElement = BundleElement & {
  owner: User,
};
export type EnumBundleElement = BundleElement &  {
  localizedName: string,
};
export type UserGroup = {
  id: string;
  name: string;
  ringId: string;
  usersCount: number; /** Format: int64 */
  icon: string;
  allUsersGroup: boolean;
  teamForProject: Project;
};

export type TextFieldValue = {
  id: string,
  text: string,
  markdownText: string,
};

export type CustomFields = {
  [MappingCustomFields.PeriodIssueCustomField]: {
    id: string,
    name: string,
    value: PeriodValue,
    project: ProjectCustomField,
  }
  [MappingCustomFields.SimpleIssueCustomField]: {
    $type:"SimpleIssueCustomField",
    id: string,
    name: string,
    value: SimpleValue,
    project: ProjectCustomField,
  },
  [MappingCustomFields.DateIssueCustomField]: {
    $type: "DateIssueCustomField",
    id: string,
    name: string,
    project: ProjectCustomField,
    value: DateValue,
  }
  [MappingCustomFields.StateIssueCustomField]: {
    $type: MappingCustomFields.StateIssueCustomField,
    id: string,
    name: string,
    value: StateBundleElement,
    project: ProjectCustomField,
  },
  [MappingCustomFields.SingleBuildIssueCustomField]: {
    $type: "SingleBuildIssueCustomField",
    id: string,
    name: string,
    value: BuildBundleElement,
    project: ProjectCustomField,
  },
  [MappingCustomFields.SingleUserIssueCustomField]: {
    $type: "SingleUserIssueCustomField",
    id: string,
    name: string,
    project: ProjectCustomField,
    value: User,
  },
  [MappingCustomFields.SingleGroupIssueCustomField]: {
    id: string,
    name: string,
    project: ProjectCustomField,
    value: UserGroup,
  },
  [MappingCustomFields.SingleVersionIssueCustomField]: {
    $type: "SingleVersionIssueCustomField",
    id: string,
    name: string,
    project: ProjectCustomField,
    value: VersionBundleElement,
  },
  [MappingCustomFields.SingleOwnedIssueCustomField]: {
    id: string,
    name: string,
    project: ProjectCustomField,
    value: OwnedBundleElement,
  },
  [MappingCustomFields.SingleEnumIssueCustomField]: {
    $type: MappingCustomFields.SingleEnumIssueCustomField,
    id: string,
    name: string,
    project: ProjectCustomField,
    value: EnumBundleElement,
  },
  [MappingCustomFields.MultiBuildIssueCustomField]: {
    $type: "MultiBuildIssueCustomField",
    id: string,
    name: string,
    project: ProjectCustomField,
    value: BuildBundleElement[],
  },
  [MappingCustomFields.MultiGroupIssueCustomField]: {
    id: string,
    name: string,
    project: ProjectCustomField,
    value:  UserGroup[],
  },
  [MappingCustomFields.MultiVersionIssueCustomField]: {
    $type: "MultiVersionIssueCustomField",
    id: string,
    name: string,
    project: ProjectCustomField,
    value: VersionBundleElement[],
  },
  [MappingCustomFields.MultiOwnedIssueCustomField]: {
    $type: "MultiOwnedIssueCustomField",
    id: string,
    name: string,
    project: ProjectCustomField,
    value: OwnedBundleElement[],
  },
  [MappingCustomFields.MultiEnumIssueCustomField]: {
    $type: "MultiEnumIssueCustomField",
    id: string,
    name: string,
    project: ProjectCustomField,
    value: EnumBundleElement[],
  },
  [MappingCustomFields.MultiUserIssueCustomField]: {
    $type: "MultiUserIssueCustomField",
    id: string,
    name: string,
    project: ProjectCustomField,
    value: User[],
  },
  [MappingCustomFields.TextIssueCustomField]: {
    $type: "TextIssueCustomField",
    id: string,
    name: string,
    value: TextFieldValue,
    project: ProjectCustomField,
  },
};
