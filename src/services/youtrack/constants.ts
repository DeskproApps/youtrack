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

export const PROJECT_FIELDS = ["id", "shortName", "name"];

export const CUSTOM_FIELD_VALUE_FIELDS = [
  "id",
  "name",
  "description",
  "archived",
  "ordinal",
  "color(id,background,foreground)",
  "hasRunningJob",
  "isResolved",
  "localizedName",
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
  ...USER_FIELDS,
];

export const PROJECT_CUSTOM_FIELD_FIELDS = ["id","value","name"];

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
