export const placeholders = {
  INSTANCE_URL: "__instance_url__",
  PERMANENT_AUTH_TOKEN: "__permanent_auth_token__",
};

export const BASE_URL = `${placeholders.INSTANCE_URL}/api`;

export const ATTACHMENT_FIELDS = ["id", "name", "extension", "url", "base64Content"];

export const USER_FIELDS = ["id", "login", "fullName", "email", "avatarUrl"];

export const COMMENT_FIELDS = [
  "id",
  "created",
  "updated",
  "text",
  `author(${USER_FIELDS.join(",")})`,
  `attachments(${ATTACHMENT_FIELDS.join(",")})`
];

export const PROJECT_CUSTOM_FIELDS = [
  "id",
  `field(${[
    "id",
    "name",
    "localizedName",
    "fieldType(valueType,id)", // ./src/components/ViewIssue/IssueFieldView/types.ts:MappingFieldTypes
    "isAutoAttached",
    "isDisplayedInIssueList",
    "ordinal",
    "aliases",
    `fieldDefaults(${[
      "id",
      "canBeEmpty",
      "emptyFieldText",
      "isPublic",
      "bundle",
      "defaultValues",
    ].join(",")})`,
    "hasRunningJob",
    "isUpdateable",
  ].join(",")})`,
  "project(id,shortName,name)",
  "canBeEmpty",
  "emptyFieldText",
  "ordinal",
  "isPublic",
  "condition",
];

export const PROJECT_FIELDS = [
  "id",
  "shortName",
  "name",
  `customFields(${PROJECT_CUSTOM_FIELDS.join(",")})`,
];

export const CUSTOM_FIELD_VALUE_FIELDS = [
  "id",
  "name",
  "description",
  "archived",
  "ordinal",
  "color(id,background,foreground)",
  "hasRunningJob",
  "isResolved",
  "assembleDate",
  "releaseDate",
  "released",
  "owner",
  "localizedName",
  "ringId",
  "usersCount",
  "icon",
  "text",
  "markdownText",
  "minutes",
  "presentation",
  ...USER_FIELDS,
];

export const PROJECT_CUSTOM_FIELD_FIELDS = [
  "id",
  "value",
  "name",
  "field(id,fieldType(id,valueType))",
];

export const CUSTOM_FIELD_FIELDS = [
  "id",
  "name",
  `value(${CUSTOM_FIELD_VALUE_FIELDS.join(",")})`,
  `projectCustomField(${PROJECT_CUSTOM_FIELD_FIELDS.join(",")})`
];

export const ISSUE_FIELDS = [
  "id",
  "idReadable",
  "summary",
  "description",
  `project(${PROJECT_FIELDS.join(",")})`,
  `comments(${COMMENT_FIELDS.join(",")})`,
  `customFields(${CUSTOM_FIELD_FIELDS.join(",")})`,
];
