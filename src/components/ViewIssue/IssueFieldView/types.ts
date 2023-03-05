import type { components } from "../../../services/youtrack/openapi";
import type { User } from "../../../services/youtrack/types";
import type { Maybe } from "../../../types";

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

export type DateValue = Maybe<number>; // The date is presented by the timestamp that designates the midday of this date in UTC+0 timezone

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

export enum MappingFieldTypes {
  TEXT = "text",
  STATE = "state[1]",
  DATE = "date",
  DATE_TIME = "date and time",
  FLOAT = "float",
  INTEGER = "integer",
  STRING = "string",
  PERIOD = "period",
  SINGLE_BUILD = "build[1]",
  MULTI_BUILD = "build[*]",
  SINGLE_ENUM = "enum[1]",
  MULTI_ENUM = "enum[*]",
  SINGLE_GROUP = "group[1]",
  MULTI_GROUP = "group[*]",
  SINGLE_OWNED = "ownedField[1]",
  MULTI_OWNED = "ownedField[*]",
  SINGLE_USER = "user[1]",
  MULTI_USER = "user[*]",
  SINGLE_VERSION = "version[1]",
  MULTI_VERSION = "version[*]",
}

export const MappingTypesToIssueTypes = {
  [MappingFieldTypes.TEXT]: MappingCustomFields.TextIssueCustomField,
  [MappingFieldTypes.STATE]: MappingCustomFields.StateIssueCustomField,
  [MappingFieldTypes.DATE]: MappingCustomFields.DateIssueCustomField,
  [MappingFieldTypes.DATE_TIME]: MappingCustomFields.SimpleIssueCustomField,
  [MappingFieldTypes.FLOAT]: MappingCustomFields.SimpleIssueCustomField,
  [MappingFieldTypes.INTEGER]: MappingCustomFields.SimpleIssueCustomField,
  [MappingFieldTypes.STRING]: MappingCustomFields.SimpleIssueCustomField,
  [MappingFieldTypes.PERIOD]: MappingCustomFields.PeriodIssueCustomField,
  [MappingFieldTypes.SINGLE_BUILD]: MappingCustomFields.SingleBuildIssueCustomField,
  [MappingFieldTypes.MULTI_BUILD]: MappingCustomFields.MultiBuildIssueCustomField,
  [MappingFieldTypes.SINGLE_ENUM]: MappingCustomFields.SingleEnumIssueCustomField,
  [MappingFieldTypes.MULTI_ENUM]: MappingCustomFields.MultiEnumIssueCustomField,
  [MappingFieldTypes.SINGLE_GROUP]: MappingCustomFields.SingleGroupIssueCustomField,
  [MappingFieldTypes.MULTI_GROUP]: MappingCustomFields.MultiGroupIssueCustomField,
  [MappingFieldTypes.SINGLE_OWNED]: MappingCustomFields.SingleOwnedIssueCustomField,
  [MappingFieldTypes.MULTI_OWNED]: MappingCustomFields.MultiOwnedIssueCustomField,
  [MappingFieldTypes.SINGLE_USER]: MappingCustomFields.SingleUserIssueCustomField,
  [MappingFieldTypes.MULTI_USER]: MappingCustomFields.MultiUserIssueCustomField,
  [MappingFieldTypes.SINGLE_VERSION]: MappingCustomFields.SingleVersionIssueCustomField,
  [MappingFieldTypes.MULTI_VERSION]: MappingCustomFields.MultiVersionIssueCustomField,
}

export type FieldTypes = {
  [MappingFieldTypes.TEXT]: { "valueType": "text", "id": "text", "$type": "FieldType" },
  [MappingFieldTypes.STATE]: { "valueType": "state", "id": "state[1]", "$type": "FieldType" },
  [MappingFieldTypes.DATE]: { "valueType": "date", "id": "date", "$type": "FieldType" },
  [MappingFieldTypes.DATE_TIME]: { "valueType": "date and time", "id": "date and time", "$type": "FieldType" },
  [MappingFieldTypes.FLOAT]: { "valueType": "float", "id": "float", "$type": "FieldType" },
  [MappingFieldTypes.INTEGER]: { "valueType": "integer", "id": "integer", "$type": "FieldType" },
  [MappingFieldTypes.STRING]: { "valueType": "string", "id": "string", "$type": "FieldType" },
  [MappingFieldTypes.PERIOD]: { "valueType": "period", "id": "period", "$type": "FieldType" },
  [MappingFieldTypes.SINGLE_BUILD]: { "valueType": "build", "id": "build[1]", "$type": "FieldType" },
  [MappingFieldTypes.MULTI_BUILD]: { "valueType": "build", "id": "build[*]", "$type": "FieldType" },
  [MappingFieldTypes.SINGLE_ENUM]: { "valueType": "enum", "id": "enum[1]", "$type": "FieldType" },
  [MappingFieldTypes.MULTI_ENUM]: { "valueType": "enum", "id": "enum[*]", "$type": "FieldType" },
  [MappingFieldTypes.SINGLE_GROUP]: { "valueType": "group", "id": "group[1]", "$type": "FieldType" },
  [MappingFieldTypes.MULTI_GROUP]: { "valueType": "group", "id": "group[*]", "$type": "FieldType" },
  [MappingFieldTypes.SINGLE_OWNED]: { "valueType": "ownedField", "id": "ownedField[1]", "$type": "FieldType" },
  [MappingFieldTypes.MULTI_OWNED]: { "valueType": "ownedField", "id": "ownedField[*]", "$type": "FieldType" },
  [MappingFieldTypes.SINGLE_USER]: { "valueType": "user", "id": "user[1]", "$type": "FieldType" },
  [MappingFieldTypes.MULTI_USER]: { "valueType": "user", "id": "user[*]", "$type": "FieldType" },
  [MappingFieldTypes.SINGLE_VERSION]: { "valueType": "version", "id": "version[1]", "$type": "FieldType" },
  [MappingFieldTypes.MULTI_VERSION]: { "valueType": "version", "id": "version[*]", "$type": "FieldType" },
};

export type FieldTypeValue = FieldTypes[MappingFieldTypes];
